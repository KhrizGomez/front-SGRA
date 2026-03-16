import { ChangeDetectorRef, Component, DestroyRef, OnInit, inject, signal, computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { firstValueFrom, interval } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminBackupService } from '../../../services/administration/admin-backup/admin-backup.service';
import { ToastService } from '../../../services/shared/toast.service';
import { BackupHistoryItem, BackupLocalConfig, BackupScheduleEntry, PgDumpValidation } from '../../../models/administration/admin-backup/backup.model';

@Component({
  selector: 'app-admin-backup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-backup.component.html',
  styleUrl: './admin-backup.component.css',
})
export class AdminBackupComponent implements OnInit {
  private backupService = inject(AdminBackupService);
  private toastService  = inject(ToastService);
  private destroyRef    = inject(DestroyRef);
  private cdr           = inject(ChangeDetectorRef);
  private readonly historyCacheKey  = 'sgra_admin_backup_history';
  private readonly POLL_INTERVAL_MS = 15_000;
  private optimisticAdds    = new Set<string>();
  private optimisticDeletes = new Set<string>();

  // ── Estado general ──────────────────────────────────────────────────────────
  pgDump      = signal<PgDumpValidation | null>(null);
  history     = signal<BackupHistoryItem[]>([]);
  isLoading   = signal(true);
  isRunning   = signal(false);
  downloading       = signal<string | null>(null);
  deleting          = signal<string | null>(null);
  confirmingDelete  = signal<string | null>(null);
  restoring         = signal<string | null>(null);
  confirmingRestore = signal<string | null>(null);
  restoreCountdown  = signal<number | null>(null);

  // ── Modal de opciones de restore ─────────────────────────────────────────
  showRestoreModal     = signal(false);
  selectedRestoreFile  = signal<string | null>(null);
  restoringToNewDb     = signal(false);

  // ── KPIs ───────────────────────────────────────────────────────────────────
  totalCount = computed(() => this.history().length);
  lastDate   = computed(() => this.history()[0]?.createdAt ?? '—');
  totalSize  = computed(() =>
    this.formatSize(this.history().reduce((acc, h) => acc + (h.fileSizeBytes ?? 0), 0))
  );

  // ── Configuración ruta local (server-side, tabla tbconfigrespaldolocal) ────
  localConfig       = signal<BackupLocalConfig | null>(null);
  // Browser de directorios (modal)
  isBrowsing        = signal(false);
  isBrowseLoading   = signal(false);
  browseCurrentPath = signal<string>('');
  browseParentPath  = signal<string | null>(null);
  browseDirs        = signal<string[]>([]);

  /** Partes navegables del path actual para el breadcrumb. */
  breadcrumbParts = computed(() => {
    const path = this.browseCurrentPath();
    if (!path) return [];
    const isWin = path.includes('\\');
    if (isWin) {
      const parts = path.split('\\').filter(p => p);
      return parts.map((part, i) => ({
        label: i === 0 ? part + '\\' : part,
        path:  i === 0 ? part + '\\' : parts.slice(0, i + 1).join('\\')
      }));
    } else {
      const parts = path.split('/').filter(p => p);
      return [
        { label: '/', path: '/' },
        ...parts.map((part, i) => ({
          label: part,
          path:  '/' + parts.slice(0, i + 1).join('/')
        }))
      ];
    }
  });

  // ── Programaciones ─────────────────────────────────────────────────────────
  schedulesOpen    = signal(true);
  schedules        = signal<BackupScheduleEntry[]>([]);
  isLoadingScheds  = signal(true);
  showForm         = signal(false);
  isSaving         = signal(false);
  deletingId       = signal<number | null>(null);
  togglingId       = signal<number | null>(null);

  form: BackupScheduleEntry = this.emptyForm();

  readonly diasSemana = [
    { label: 'Domingo',   short: 'Do', value: 'SUN' },
    { label: 'Lunes',     short: 'Lu', value: 'MON' },
    { label: 'Martes',    short: 'Ma', value: 'TUE' },
    { label: 'Miércoles', short: 'Mi', value: 'WED' },
    { label: 'Jueves',    short: 'Ju', value: 'THU' },
    { label: 'Viernes',   short: 'Vi', value: 'FRI' },
    { label: 'Sábado',    short: 'Sa', value: 'SAT' },
  ];
  readonly mesesCatalogo = [
    { short: 'Ene', value: 1  }, { short: 'Feb', value: 2  }, { short: 'Mar', value: 3  },
    { short: 'Abr', value: 4  }, { short: 'May', value: 5  }, { short: 'Jun', value: 6  },
    { short: 'Jul', value: 7  }, { short: 'Ago', value: 8  }, { short: 'Sep', value: 9  },
    { short: 'Oct', value: 10 }, { short: 'Nov', value: 11 }, { short: 'Dic', value: 12 },
  ];
  readonly diasMes = Array.from({ length: 31 }, (_, i) => i + 1);
  readonly horas   = Array.from({ length: 24 }, (_, i) => i);
  readonly minutos = Array.from({ length: 60 }, (_, i) => i);

  // ─────────────────────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.restoreHistoryCache();
    this.loadValidation();
    this.loadHistory();
    this.loadSchedules();
    this.loadLocalConfig();

    interval(this.POLL_INTERVAL_MS)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.pollHistory());
  }

  loadValidation(): void {
    this.backupService.validate().subscribe({
      next:  (v) => this.pgDump.set(v),
      error: ()  => this.pgDump.set({ available: false, version: 'Error al verificar' })
    });
  }

  loadHistory(): void {
    this.isLoading.set(true);
    this.backupService.history().subscribe({
      next: (data) => {
        const list = Array.isArray(data) ? data : [];
        if (list.length === 0 && this.history().length > 0) { this.isLoading.set(false); return; }
        if (list.length === 0) {
          const cached = this.readHistoryCache();
          if (cached.length > 0) { this.setHistory(cached, false); this.isLoading.set(false); return; }
        }
        const merged = this.mergeHistory(list);
        this.setHistory(merged, merged.length > 0);
        this.isLoading.set(false);
      },
      error: () => { this.isLoading.set(false); }
    });
  }

  private pollHistory(): void {
    this.backupService.history().subscribe({
      next: (data) => {
        const list = Array.isArray(data) ? data : [];
        if (list.length === 0) return;
        const merged = this.mergeHistory(list);
        const current = this.history();
        const changed = merged.length !== current.length ||
          merged.some((item, i) => item.fileName !== current[i]?.fileName);
        if (changed) this.setHistory(merged, true);
      },
      error: () => {}
    });
    this.backupService.listSchedules().subscribe({
      next:  (data) => this.schedules.set(data),
      error: () => {}
    });
  }

  loadSchedules(): void {
    this.isLoadingScheds.set(true);
    this.backupService.listSchedules().subscribe({
      next:  (data) => { this.schedules.set(data); this.isLoadingScheds.set(false); },
      error: ()     => { this.isLoadingScheds.set(false); }
    });
  }

  // ── Configuración ruta local ────────────────────────────────────────────────

  loadLocalConfig(): void {
    this.backupService.getLocalConfig().subscribe({
      next:  (cfg) => this.localConfig.set(cfg),
      error: ()    => this.localConfig.set(null)
    });
  }

  // ── Browser de directorios (server-side) ────────────────────────────────────

  openBrowser(): void {
    this.isBrowsing.set(true);
    this.navigateTo(undefined); // carga raíces del sistema de archivos
  }

  closeBrowser(): void {
    this.isBrowsing.set(false);
  }

  navigateTo(path: string | undefined): void {
    this.isBrowseLoading.set(true);
    this.backupService.browsePath(path).subscribe({
      next: (res) => {
        this.browseCurrentPath.set(res.currentPath);
        this.browseParentPath.set(res.parentPath);
        this.browseDirs.set(res.directories);
        this.isBrowseLoading.set(false);
      },
      error: () => {
        this.isBrowseLoading.set(false);
        this.toastService.show(false, 'No se pudo leer el directorio.');
      }
    });
  }

  navigateToBreadcrumb(index: number): void {
    const parts = this.breadcrumbParts();
    if (index < parts.length) this.navigateTo(parts[index].path);
  }

  browseInto(dirName: string): void {
    const current = this.browseCurrentPath();
    const separator = current.includes('\\') ? '\\' : '/';
    const next = current ? current.replace(/[/\\]$/, '') + separator + dirName : dirName;
    this.navigateTo(next);
  }

  selectCurrentPath(): void {
    const ruta = this.browseCurrentPath();
    if (!ruta) { this.toastService.show(false, 'Navega a un directorio antes de seleccionar.'); return; }
    this.backupService.saveLocalConfig(ruta).subscribe({
      next: (saved) => {
        this.localConfig.set(saved);
        this.isBrowsing.set(false);
        this.toastService.show(true, `Ruta configurada: ${saved.ruta}`);
      },
      error: () => this.toastService.show(false, 'No se pudo guardar la ruta.')
    });
  }

  // ── Backup manual ──────────────────────────────────────────────────────────

  async triggerBackup(): Promise<void> {
    if (this.isRunning()) return;

    let dirHandle: any = null;
    try {
      dirHandle = await (window as any).showDirectoryPicker({ mode: 'readwrite' });
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        this.toastService.show(false, 'No se pudo seleccionar la carpeta de destino.');
      }
      return;
    }

    this.isRunning.set(true);
    this.backupService.trigger().subscribe({
      next: async (result) => {
        this.isRunning.set(false);
        if (result.success) {
          this.toastService.show(true, `Respaldo completado: ${result.fileName} (${this.formatSize(result.fileSizeBytes)})`);
          if (result.fileName) {
            const newItem: BackupHistoryItem = {
              fileName: result.fileName,
              blobUrl:  result.blobUrl ?? '',
              fileSizeBytes: result.fileSizeBytes ?? 0,
              createdAt: result.executedAt ?? '—'
            };
            this.optimisticAdds.add(result.fileName);
            this.optimisticDeletes.delete(result.fileName);
            this.setHistory([newItem, ...this.history().filter(h => h.fileName !== result.fileName)], true);
            await this.guardarEnDir(dirHandle, result.fileName);
          }
          setTimeout(() => this.loadHistory(), 1500);
        } else {
          this.toastService.show(false, result.message);
        }
      },
      error: (err) => {
        this.isRunning.set(false);
        this.toastService.show(false, 'Error al ejecutar el respaldo.');
        console.error(err);
      }
    });
  }

  private async guardarEnDir(dirHandle: any, fileName: string): Promise<void> {
    try {
      const blob       = await firstValueFrom(this.backupService.downloadBlob(fileName));
      const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
      const writable   = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
      this.toastService.show(true, `Copia local guardada en "${dirHandle.name}"`);
    } catch (err) {
      console.error('[backup local]', err);
      this.toastService.show(false, `No se pudo guardar la copia local en "${dirHandle.name}".`);
    }
  }

  // ── Descarga ───────────────────────────────────────────────────────────────

  async downloadBackup(fileName: string): Promise<void> {
    if (this.downloading() === fileName) return;

    let fileHandle: any = null;
    try {
      fileHandle = await (window as any).showSaveFilePicker({
        suggestedName: fileName,
        types: [{ description: 'PostgreSQL Backup', accept: { 'application/octet-stream': ['.backup'] } }]
      });
    } catch (err: any) {
      if (err?.name !== 'AbortError') this.toastService.show(false, 'No se pudo abrir el selector de archivo.');
      return;
    }

    this.downloading.set(fileName);
    try {
      const blob     = await firstValueFrom(this.backupService.downloadBlob(fileName));
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
      this.toastService.show(true, 'Respaldo descargado correctamente.');
    } catch (err) {
      console.error('[download]', err);
      this.toastService.show(false, 'Error al descargar el respaldo.');
    } finally {
      this.downloading.set(null);
    }
  }

  confirmRestore(fileName: string): void {
    this.confirmingDelete.set(null);
    this.selectedRestoreFile.set(fileName);
    this.showRestoreModal.set(true);
  }

  cancelRestore(): void { this.confirmingRestore.set(null); }

  closeRestoreModal(): void {
    this.showRestoreModal.set(false);
    this.selectedRestoreFile.set(null);
  }

  restoreToSameDb(): void {
    const fileName = this.selectedRestoreFile();
    if (!fileName || this.restoring() === fileName) return;
    this.showRestoreModal.set(false);
    this.restoring.set(fileName);
    this.backupService.restore(fileName).subscribe({
      next: (result) => {
        this.restoring.set(null);
        this.selectedRestoreFile.set(null);
        if (result.success) { this.iniciarCountdownRecarga(); }
        else { this.toastService.show(false, result.message); }
      },
      error: () => {
        this.restoring.set(null);
        this.selectedRestoreFile.set(null);
        this.toastService.show(false, 'Error al restaurar la base de datos.');
      }
    });
  }

  restoreToNewDb(): void {
    const fileName = this.selectedRestoreFile();
    if (!fileName || this.restoringToNewDb()) return;
    this.showRestoreModal.set(false);
    this.restoringToNewDb.set(true);
    this.backupService.restoreToNewDatabase(fileName).subscribe({
      next: (result) => {
        this.restoringToNewDb.set(false);
        this.selectedRestoreFile.set(null);
        if (result.success) {
          this.toastService.show(true, result.message || 'Respaldo restaurado en una nueva base de datos exitosamente.');
        } else {
          this.toastService.show(false, result.message);
        }
      },
      error: () => {
        this.restoringToNewDb.set(false);
        this.selectedRestoreFile.set(null);
        this.toastService.show(false, 'Error al restaurar en la nueva base de datos.');
      }
    });
  }

  restoreBackup(fileName: string): void {
    if (this.restoring() === fileName) return;
    this.confirmingRestore.set(null);
    this.restoring.set(fileName);
    this.backupService.restore(fileName).subscribe({
      next: (result) => {
        this.restoring.set(null);
        if (result.success) { this.iniciarCountdownRecarga(); }
        else { this.toastService.show(false, result.message); }
      },
      error: () => { this.restoring.set(null); this.toastService.show(false, 'Error al restaurar la base de datos.'); }
    });
  }

  confirmDelete(fileName: string): void {
    this.confirmingRestore.set(null);
    this.confirmingDelete.set(fileName);
  }

  cancelDelete(): void { this.confirmingDelete.set(null); }

  deleteBackup(fileName: string): void {
    this.confirmingDelete.set(null);
    this.deleting.set(fileName);
    this.backupService.deleteBackup(fileName).subscribe({
      next: () => {
        this.updateHistory(list => list.filter(h => h.fileName !== fileName), true);
        this.optimisticDeletes.add(fileName);
        this.optimisticAdds.delete(fileName);
        this.deleting.set(null);
        this.toastService.show(true, 'Respaldo eliminado.');
      },
      error: () => { this.deleting.set(null); this.toastService.show(false, 'No se pudo eliminar el respaldo.'); }
    });
  }

  // ── Programaciones ─────────────────────────────────────────────────────────

  openForm(): void {
    if (!this.localConfig()) {
      this.toastService.show(false, 'Configura primero la ruta local para respaldos automáticos antes de agregar una programación.');
      return;
    }
    this.form = this.emptyForm();
    this.showForm.set(true);
  }

  cancelForm(): void { this.showForm.set(false); }

  saveSchedule(): void {
    if (this.isSaving()) return;
    if (this.form.frecuencia === 'SEMANAL' && !this.form.diaSemana) {
      this.toastService.show(false, 'Selecciona al menos un día de la semana.'); return;
    }
    if (this.form.frecuencia === 'MENSUAL' && !this.form.diaMes) {
      this.toastService.show(false, 'Selecciona al menos un día del mes.'); return;
    }
    this.isSaving.set(true);
    this.backupService.createSchedule(this.form).subscribe({
      next: (entry) => {
        this.schedules.update(list => [...list, entry]);
        this.showForm.set(false);
        this.isSaving.set(false);
        this.toastService.show(true, `Programación creada: ${this.describeSchedule(entry)}`);
      },
      error: () => {
        this.isSaving.set(false);
        this.toastService.show(false, 'Error al guardar la programación.');
      }
    });
  }

  toggleSchedule(entry: BackupScheduleEntry): void {
    if (this.togglingId() === entry.id) return;
    this.togglingId.set(entry.id!);
    const updated = { ...entry, habilitado: !entry.habilitado };
    this.backupService.updateSchedule(entry.id!, updated).subscribe({
      next: (saved) => {
        this.schedules.update(list => list.map(e => e.id === saved.id ? saved : e));
        this.togglingId.set(null);
        this.toastService.show(true, saved.habilitado ? 'Programación activada.' : 'Programación desactivada.');
      },
      error: () => { this.togglingId.set(null); this.toastService.show(false, 'Error al cambiar estado.'); }
    });
  }

  deleteSchedule(entry: BackupScheduleEntry): void {
    if (this.deletingId() === entry.id) return;
    this.deletingId.set(entry.id!);
    this.backupService.deleteSchedule(entry.id!).subscribe({
      next: () => {
        this.schedules.update(list => list.filter(e => e.id !== entry.id));
        this.deletingId.set(null);
        this.toastService.show(true, 'Programación eliminada.');
      },
      error: () => { this.deletingId.set(null); this.toastService.show(false, 'Error al eliminar.'); }
    });
  }

  // ── Post-restore countdown ──────────────────────────────────────────────────

  private iniciarCountdownRecarga(): void {
    this.toastService.show(true, 'Base de datos restaurada exitosamente. Recargando aplicación...', 10_000);
    let segundos = 8;
    this.restoreCountdown.set(segundos);
    const tick = setInterval(() => {
      segundos--;
      if (segundos <= 0) { clearInterval(tick); window.location.reload(); }
      else { this.restoreCountdown.set(segundos); }
    }, 1000);
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────

  describeSchedule(e: BackupScheduleEntry): string {
    const hora = String(e.hora).padStart(2, '0') + ':' + String(e.minuto).padStart(2, '0');
    if (e.frecuencia === 'DIARIO') return `Diario a las ${hora}`;
    if (e.frecuencia === 'SEMANAL') {
      const dias = e.diaSemana
        ? e.diaSemana.split(',').map(d => this.labelDiaSemana(d)).join(', ')
        : '—';
      return `Semanal — ${dias} — ${hora}`;
    }
    if (e.frecuencia === 'MENSUAL') {
      const diasStr = e.diaMes ? `Días ${e.diaMes}` : 'Día 1';
      const mesesStr = (e.meses && e.meses !== '*')
        ? e.meses.split(',').map(m => this.labelMes(Number(m))).join(', ')
        : 'todos los meses';
      return `Mensual — ${diasStr} — ${mesesStr} — ${hora}`;
    }
    return hora;
  }

  labelDiaSemana(val?: string | null): string {
    return this.diasSemana.find(d => d.value === val)?.label ?? val ?? '';
  }

  // ── Toggle multi-select para formulario de programación ─────────────────────

  toggleDiaSemana(day: string): void {
    const parts = this.form.diaSemana ? this.form.diaSemana.split(',').filter(d => d) : [];
    const idx = parts.indexOf(day);
    if (idx >= 0) parts.splice(idx, 1); else parts.push(day);
    this.form.diaSemana = parts.join(',') || null as any;
    this.cdr.markForCheck();
  }

  isDiaSemanaSelected(day: string): boolean {
    return !!this.form.diaSemana?.split(',').includes(day);
  }

  toggleDiaMes(day: number): void {
    const parts = this.form.diaMes ? this.form.diaMes.split(',').filter(d => d).map(Number) : [];
    const idx = parts.indexOf(day);
    if (idx >= 0) parts.splice(idx, 1); else parts.push(day);
    parts.sort((a, b) => a - b);
    this.form.diaMes = parts.join(',') || null as any;
    this.cdr.markForCheck();
  }

  isDiaMesSelected(day: number): boolean {
    return !!this.form.diaMes?.split(',').map(Number).includes(day);
  }

  toggleMes(mes: number): void {
    const todos = !this.form.meses || this.form.meses === '*';
    const parts = todos ? [] : this.form.meses!.split(',').filter(m => m).map(Number);
    const idx = parts.indexOf(mes);
    if (idx >= 0) parts.splice(idx, 1); else parts.push(mes);
    parts.sort((a, b) => a - b);
    this.form.meses = parts.length > 0 ? parts.join(',') : '*';
    this.cdr.markForCheck();
  }

  isMesSelected(mes: number): boolean {
    if (!this.form.meses || this.form.meses === '*') return false;
    return this.form.meses.split(',').map(Number).includes(mes);
  }

  labelMes(val: number): string {
    return this.mesesCatalogo.find(m => m.value === val)?.short ?? String(val);
  }

  lastRunOk(e: BackupScheduleEntry): boolean {
    return e.resultadoUltimaEjecucion?.startsWith('OK:') ?? false;
  }

  formatSize(bytes: number | null): string {
    if (bytes === null || bytes === undefined) return '—';
    if (bytes < 1024)        return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  private emptyForm(): BackupScheduleEntry {
    return { habilitado: true, frecuencia: 'DIARIO', hora: 2, minuto: 0,
             diaSemana: 'MON', diaMes: '1', meses: '*' };
  }

  private restoreHistoryCache(): void {
    const cached = this.readHistoryCache();
    if (cached.length > 0) { this.setHistory(cached, false); this.isLoading.set(false); }
  }

  private readHistoryCache(): BackupHistoryItem[] {
    try {
      const raw = sessionStorage.getItem(this.historyCacheKey);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  }

  private writeHistoryCache(list: BackupHistoryItem[]): void {
    try { sessionStorage.setItem(this.historyCacheKey, JSON.stringify(list)); } catch { }
  }

  private setHistory(list: BackupHistoryItem[], writeCache: boolean): void {
    this.history.set([...list]);
    if (writeCache) this.writeHistoryCache(list);
    this.cdr.markForCheck();
  }

  private updateHistory(updater: (list: BackupHistoryItem[]) => BackupHistoryItem[], writeCache: boolean): void {
    this.setHistory(updater(this.history()), writeCache);
  }

  private mergeHistory(serverList: BackupHistoryItem[]): BackupHistoryItem[] {
    const current = this.history();
    const serverByName = new Map<string, BackupHistoryItem>();
    for (const item of serverList) serverByName.set(item.fileName, item);

    for (const name of Array.from(this.optimisticDeletes)) {
      if (serverByName.has(name)) { serverByName.delete(name); }
      else { this.optimisticDeletes.delete(name); }
    }

    for (const name of Array.from(this.optimisticAdds)) {
      if (serverByName.has(name)) { this.optimisticAdds.delete(name); }
      else {
        const local = current.find(h => h.fileName === name);
        if (local) serverByName.set(name, local);
      }
    }

    const merged: BackupHistoryItem[] = [];
    const seen = new Set<string>();
    for (const item of serverList) {
      const resolved = serverByName.get(item.fileName);
      if (resolved && !seen.has(resolved.fileName)) { merged.push(resolved); seen.add(resolved.fileName); }
    }
    for (const name of this.optimisticAdds) {
      const resolved = serverByName.get(name);
      if (resolved && !seen.has(resolved.fileName)) { merged.unshift(resolved); seen.add(resolved.fileName); }
    }
    return merged;
  }
}
