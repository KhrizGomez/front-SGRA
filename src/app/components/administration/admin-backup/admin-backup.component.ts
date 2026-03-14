import { ChangeDetectionStrategy, Component, OnInit, inject, signal, computed } from '@angular/core';
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

  // ── Estado general ──────────────────────────────────────────────────────────
  pgDump      = signal<PgDumpValidation | null>(null);
  history     = signal<BackupHistoryItem[]>([]);
  isLoading   = signal(true);
  isRunning   = signal(false);
  downloading      = signal<string | null>(null);
  deleting         = signal<string | null>(null);
  confirmingDelete = signal<string | null>(null);

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
    this.loadValidation();
    this.loadHistory();
    this.loadSchedules();
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
      next:  (data) => { this.history.set(data);  this.isLoading.set(false); },
      error: ()     => { this.isLoading.set(false); }
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

  confirmDelete(fileName: string): void {
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
        this.history.update(list => list.filter(h => h.fileName !== fileName));
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
}
