import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBackupService } from '../../../services/administration/admin-backup/admin-backup.service';
import { ToastService } from '../../../services/shared/toast.service';
import { BackupHistoryItem, PgDumpValidation } from '../../../models/administration/admin-backup/backup.model';

@Component({
  selector: 'app-admin-backup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-backup.component.html',
  styleUrl: './admin-backup.component.css',
})
export class AdminBackupComponent implements OnInit {
  private backupService = inject(AdminBackupService);
  private toastService  = inject(ToastService);

  pgDump       = signal<PgDumpValidation | null>(null);
  history      = signal<BackupHistoryItem[]>([]);
  isLoading    = signal(true);
  isRunning    = signal(false);
  downloading  = signal<string | null>(null);   // fileName descargando

  totalCount  = computed(() => this.history().length);
  lastDate    = computed(() => this.history().length > 0 ? this.history()[0].createdAt : '—');
  totalSize   = computed(() => this.formatSize(
    this.history().reduce((acc, h) => acc + (h.fileSizeBytes ?? 0), 0)
  ));

  ngOnInit(): void {
    this.loadValidation();
    this.loadHistory();
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

  downloadBackup(fileName: string): void {
    if (this.downloading() === fileName) return;
    this.downloading.set(fileName);

    this.backupService.getDownloadUrl(fileName).subscribe({
      next: (res) => {
        this.downloading.set(null);
        window.open(res.url, '_blank');
      },
      error: () => {
        this.downloading.set(null);
        this.toastService.show(false, 'No se pudo generar el enlace de descarga.');
      }
    });
  }

  formatSize(bytes: number | null): string {
    if (bytes === null || bytes === undefined) return '—';
    if (bytes < 1024)        return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
}
