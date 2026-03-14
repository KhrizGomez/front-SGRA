import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject, signal, computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminBackupService } from '../../../services/administration/admin-backup/admin-backup.service';
import { ToastService } from '../../../services/shared/toast.service';
import { BackupHistoryItem, BackupScheduleEntry, PgDumpValidation } from '../../../models/administration/admin-backup/backup.model';

@Component({
  selector: 'app-admin-backup',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-backup.component.html',
  styleUrl: './admin-backup.component.css',
})
export class AdminBackupComponent implements OnInit {
  private backupService = inject(AdminBackupService);
  private toastService  = inject(ToastService);
  private cdr           = inject(ChangeDetectorRef);
  private destroyRef    = inject(DestroyRef);
  private readonly historyCacheKey  = 'sgra_admin_backup_history';
  private readonly POLL_INTERVAL_MS = 30_000;
  private optimisticAdds = new Set<string>();
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

  // ── KPIs (derivados de history, siempre en sincronía) ──────────────────────
  totalCount = computed(() => this.history().length);
  lastDate   = computed(() => this.history()[0]?.createdAt ?? '—');
  totalSize  = computed(() =>
    this.formatSize(this.history().reduce((acc, h) => acc + (h.fileSizeBytes ?? 0), 0))
  );

  // ── Programaciones ─────────────────────────────────────────────────────────
  schedulesOpen    = signal(true);
  schedules        = signal<BackupScheduleEntry[]>([]);
  isLoadingScheds  = signal(true);
  showForm         = signal(false);
  isSaving         = signal(false);
  deletingId       = signal<number | null>(null);
  togglingId       = signal<number | null>(null);

  // Formulario de nueva programación
  form: BackupScheduleEntry = this.emptyForm();

  // Catálogos
  readonly diasSemana = [
    { label: 'Domingo',   value: 'SUN' },
    { label: 'Lunes',     value: 'MON' },
    { label: 'Martes',    value: 'TUE' },
    { label: 'Miércoles', value: 'WED' },
    { label: 'Jueves',    value: 'THU' },
    { label: 'Viernes',   value: 'FRI' },
    { label: 'Sábado',    value: 'SAT' },
  ];

  readonly diasMes = Array.from({ length: 28 }, (_, i) => i + 1);
  readonly horas   = Array.from({ length: 24 }, (_, i) => i);
  readonly minutos = Array.from({ length: 60 }, (_, i) => i);

  // ─────────────────────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.restoreHistoryCache();
    this.loadValidation();
    this.loadHistory();
    this.loadSchedules();

    // Auto-refresh: detecta respaldos automáticos sin que el usuario presione "Actualizar"
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
      next:  (data) => {
        const list = Array.isArray(data) ? data : [];
        if (list.length === 0 && this.history().length > 0) {
          this.isLoading.set(false);
          return;
        }
        if (list.length === 0) {
          const cached = this.readHistoryCache();
          if (cached.length > 0) {
            this.setHistory(cached, false);
            this.isLoading.set(false);
            return;
          }
        }
        const merged = this.mergeHistory(list);
        this.setHistory(merged, merged.length > 0);
        this.isLoading.set(false);
      },
      error: ()     => { this.isLoading.set(false); }
    });
  }

  /** Refresca historial y programaciones en segundo plano sin mostrar spinner. */
  private pollHistory(): void {
    this.backupService.history().subscribe({
      next: (data) => {
        const list = Array.isArray(data) ? data : [];
        if (list.length === 0) return;
        const merged = this.mergeHistory(list);
        // Solo actualiza si hay cambios reales para evitar renders innecesarios
        const current = this.history();
        const changed = merged.length !== current.length ||
          merged.some((item, i) => item.fileName !== current[i]?.fileName);
        if (changed) this.setHistory(merged, true);
      },
      error: () => {}
    });
    // También refresca las programaciones para ver última ejecución actualizada
    this.backupService.listSchedules().subscribe({
      next:  (data) => this.schedules.set(data),
      error: () => {}
    });
  }

  loadSchedules(): void {
    this.isLoadingScheds.set(true);
    this.backupService.listSchedules().subscribe({
      next:  (data) => { this.schedules.set(data);  this.isLoadingScheds.set(false); },
      error: ()     => { this.isLoadingScheds.set(false); }
    });
  }

  // ── Backup manual ──────────────────────────────────────────────────────────

  triggerBackup(): void {
    if (this.isRunning()) return;
    this.isRunning.set(true);
    this.backupService.trigger().subscribe({
      next: (result) => {
        this.isRunning.set(false);
        if (result.success) {
          this.toastService.show(true, `Respaldo completado: ${result.fileName} (${this.formatSize(result.fileSizeBytes)})`);
          if (result.fileName) {
            const newItem: BackupHistoryItem = {
              fileName: result.fileName,
              blobUrl: result.blobUrl ?? '',
              fileSizeBytes: result.fileSizeBytes ?? 0,
              createdAt: result.executedAt ?? '—'
            };
            this.optimisticAdds.add(result.fileName);
            this.optimisticDeletes.delete(result.fileName);
            const next = [newItem, ...this.history().filter(h => h.fileName !== result.fileName)];
            this.setHistory(next, true);
          }
          this.loadHistory();
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

  // ── Descarga y eliminación ─────────────────────────────────────────────────

  downloadBackup(fileName: string): void {
    if (this.downloading() === fileName) return;
    this.downloading.set(fileName);
    this.backupService.getDownloadUrl(fileName).subscribe({
      next:  (res) => { this.downloading.set(null); window.open(res.url, '_blank'); },
      error: ()    => { this.downloading.set(null); this.toastService.show(false, 'No se pudo generar el enlace.'); }
    });
  }

  confirmRestore(fileName: string): void {
    this.confirmingDelete.set(null);
    this.confirmingRestore.set(fileName);
  }

  cancelRestore(): void {
    this.confirmingRestore.set(null);
  }

  restoreBackup(fileName: string): void {
    if (this.restoring() === fileName) return;
    this.confirmingRestore.set(null);
    this.restoring.set(fileName);
    this.backupService.restore(fileName).subscribe({
      next: (result) => {
        this.restoring.set(null);
        if (result.success) {
          this.iniciarCountdownRecarga();
        } else {
          this.toastService.show(false, result.message);
        }
      },
      error: () => {
        this.restoring.set(null);
        this.toastService.show(false, 'Error al restaurar la base de datos.');
      }
    });
  }

  confirmDelete(fileName: string): void {
    this.confirmingRestore.set(null);
    this.confirmingDelete.set(fileName);
  }

  cancelDelete(): void {
    this.confirmingDelete.set(null);
  }

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
      error: () => {
        this.deleting.set(null);
        this.toastService.show(false, 'No se pudo eliminar el respaldo.');
      }
    });
  }

  // ── Programaciones ─────────────────────────────────────────────────────────

  openForm(): void {
    this.form = this.emptyForm();
    this.showForm.set(true);
  }

  cancelForm(): void {
    this.showForm.set(false);
  }

  saveSchedule(): void {
    if (this.isSaving()) return;
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

  // ── Post-restore: countdown y recarga ──────────────────────────────────────

  private iniciarCountdownRecarga(): void {
    this.toastService.show(true, 'Base de datos restaurada exitosamente. Recargando aplicación...');
    let segundos = 5;
    this.restoreCountdown.set(segundos);
    const tick = setInterval(() => {
      segundos--;
      if (segundos <= 0) {
        clearInterval(tick);
        window.location.reload();
      } else {
        this.restoreCountdown.set(segundos);
      }
    }, 1000);
  }

  // ── Helpers de UI ──────────────────────────────────────────────────────────

  describeSchedule(e: BackupScheduleEntry): string {
    const hora = String(e.hora).padStart(2, '0') + ':' + String(e.minuto).padStart(2, '0');
    if (e.frecuencia === 'DIARIO')  return `Diario a las ${hora}`;
    if (e.frecuencia === 'SEMANAL') return `Semanal — ${this.labelDiaSemana(e.diaSemana)} ${hora}`;
    if (e.frecuencia === 'MENSUAL') return `Mensual — Día ${e.diaMes} ${hora}`;
    return hora;
  }

  labelDiaSemana(val?: string | null): string {
    return this.diasSemana.find(d => d.value === val)?.label ?? val ?? '';
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
    return { habilitado: true, frecuencia: 'DIARIO', hora: 2, minuto: 0, diaSemana: 'SUN', diaMes: 1 };
  }

  private restoreHistoryCache(): void {
    const cached = this.readHistoryCache();
    if (cached.length > 0) {
      this.setHistory(cached, false);
      this.isLoading.set(false);
    }
  }

  private readHistoryCache(): BackupHistoryItem[] {
    try {
      const raw = sessionStorage.getItem(this.historyCacheKey);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private writeHistoryCache(list: BackupHistoryItem[]): void {
    try {
      sessionStorage.setItem(this.historyCacheKey, JSON.stringify(list));
    } catch {
      // ignore cache errors
    }
  }

  private setHistory(list: BackupHistoryItem[], writeCache: boolean): void {
    this.history.set([...list]);
    if (writeCache) this.writeHistoryCache(list);
    this.cdr.markForCheck();
  }

  private updateHistory(
    updater: (list: BackupHistoryItem[]) => BackupHistoryItem[],
    writeCache: boolean
  ): void {
    const next = updater(this.history());
    this.setHistory(next, writeCache);
  }

  private mergeHistory(serverList: BackupHistoryItem[]): BackupHistoryItem[] {
    const current = this.history();
    const serverByName = new Map<string, BackupHistoryItem>();
    for (const item of serverList) serverByName.set(item.fileName, item);

    for (const name of Array.from(this.optimisticDeletes)) {
      if (serverByName.has(name)) {
        serverByName.delete(name);
      } else {
        this.optimisticDeletes.delete(name);
      }
    }

    for (const name of Array.from(this.optimisticAdds)) {
      if (serverByName.has(name)) {
        this.optimisticAdds.delete(name);
      } else {
        const local = current.find(h => h.fileName === name);
        if (local) serverByName.set(name, local);
      }
    }

    const merged: BackupHistoryItem[] = [];
    const seen = new Set<string>();

    for (const item of serverList) {
      const resolved = serverByName.get(item.fileName);
      if (resolved && !seen.has(resolved.fileName)) {
        merged.push(resolved);
        seen.add(resolved.fileName);
      }
    }

    for (const name of this.optimisticAdds) {
      const resolved = serverByName.get(name);
      if (resolved && !seen.has(resolved.fileName)) {
        merged.unshift(resolved);
        seen.add(resolved.fileName);
      }
    }

    return merged;
  }
}
