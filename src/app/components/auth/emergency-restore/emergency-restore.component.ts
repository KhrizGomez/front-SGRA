import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminBackupService } from '../../../services/administration/admin-backup/admin-backup.service';
import { AuthService } from '../../../services/auth/auth.service';
import { BackupHistoryItem } from '../../../models/administration/admin-backup/backup.model';

@Component({
  selector: 'app-emergency-restore',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './emergency-restore.component.html',
  styleUrl: './emergency-restore.component.css'
})
export class EmergencyRestoreComponent implements OnInit {
  private backupService = inject(AdminBackupService);
  private authService   = inject(AuthService);
  private router        = inject(Router);

  history      = signal<BackupHistoryItem[]>([]);
  isLoading    = signal(true);
  loadError    = signal(false);
  restoring    = signal<string | null>(null);

  // Modal de progreso
  showProgressModal = signal(false);
  progressSteps     = signal<string[]>([]);
  progressCurrent   = signal(0);
  progressDone      = signal(false);
  progressSuccess   = signal(false);
  progressMessage   = signal('');
  private progressTimer: any = null;

  get currentUser() { return this.authService.currentUser(); }

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.isLoading.set(true);
    this.loadError.set(false);
    this.backupService.history().subscribe({
      next:  (data) => { this.history.set(Array.isArray(data) ? data : []); this.isLoading.set(false); },
      error: ()     => { this.loadError.set(true); this.isLoading.set(false); }
    });
  }

  restoreBackup(fileName: string): void {
    if (this.restoring()) return;
    this.restoring.set(fileName);
    this.startProgress([
      'Verificando parámetros de conexión...',
      'Creando base de datos...',
      'Creando esquemas...',
      'Restaurando datos del respaldo...',
      'Asignando permisos...',
      '¡Base de datos recreada exitosamente!'
    ]);
    this.backupService.restorebdNoExistent(fileName).subscribe({
      next: (success) => {
        this.restoring.set(null);
        if (success) {
          this.finishProgress(true, 'Base de datos restaurada correctamente. Puedes iniciar sesión.');
        } else {
          this.finishProgress(false, 'No se pudo restaurar la base de datos.');
        }
      },
      error: () => {
        this.restoring.set(null);
        this.finishProgress(false, 'Error al restaurar la base de datos.');
      }
    });
  }

  closeProgressModal(): void {
    const success = this.progressSuccess();
    this.showProgressModal.set(false);
    if (success) {
      this.router.navigate(['/login']);
    }
  }

  formatSize(bytes: number | null): string {
    if (!bytes) return '—';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  private startProgress(steps: string[]): void {
    this.progressSteps.set(steps);
    this.progressCurrent.set(0);
    this.progressDone.set(false);
    this.progressSuccess.set(false);
    this.progressMessage.set('');
    this.showProgressModal.set(true);
    let idx = 0;
    this.progressTimer = setInterval(() => {
      idx++;
      if (idx < steps.length - 1) { this.progressCurrent.set(idx); }
      else { clearInterval(this.progressTimer); this.progressTimer = null; }
    }, 3000);
  }

  private finishProgress(success: boolean, message: string): void {
    if (this.progressTimer) { clearInterval(this.progressTimer); this.progressTimer = null; }
    this.progressCurrent.set(this.progressSteps().length - 1);
    this.progressSuccess.set(success);
    this.progressMessage.set(message);
    this.progressDone.set(true);
  }
}