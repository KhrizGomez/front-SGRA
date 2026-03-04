import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherSessionsService } from '../../../services/teacher/teacher-sessions.service';
import {
  TeacherHistoryItemDTO,
  AttendanceEntryDTO,
} from '../../../models/teacher/teacher-request.model';

type ActiveModal = 'none' | 'detail' | 'performed';

@Component({
  selector: 'app-teacher-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-history.component.html',
  styleUrl: './teacher-history.component.css'
})
export class TeacherHistoryComponent implements OnInit {
  private sessSvc = inject(TeacherSessionsService);
  private cdr     = inject(ChangeDetectorRef);

  loading   = false;
  errorMsg: string | null = null;
  successMsg: string | null = null;
  busy = false;

  colClass = 'col-12 col-md-4';

  rows: TeacherHistoryItemDTO[] = [];
  totalCount = 0;

  // Modal state
  activeModal: ActiveModal = 'none';
  selected: TeacherHistoryItemDTO | null = null;

  // Virtual Link form
  virtualLinkUrl = '';

  // Attendance form
  attendancePerformedId: number | null = null;
  attendanceList: AttendanceEntryDTO[] = [{ participantId: 0, attended: true }];

  // Performed form
  performedObservation = '';
  performedDuration    = '';
  performedFiles: File[] = [];

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading  = true;
    this.errorMsg = null;
    this.sessSvc.getActiveSessions().subscribe({
      next: items => {
        this.rows       = items ?? [];
        this.totalCount = this.rows.length;
        this.loading    = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorMsg = err?.message || 'Error al cargar las sesiones';
        this.loading  = false;
        this.cdr.detectChanges();
      }
    });
  }

  goTo(p: number): void { this.load(); }

  countByModality(modality: string): number {
    return this.rows.filter(r => r.modality === modality).length;
  }

  // ── Modal openers ───────────────────────────────────────────────────────────
  openDetail(row: TeacherHistoryItemDTO): void {
    this.selected              = row;
    this.errorMsg              = null;
    this.virtualLinkUrl        = row.virtualLink ?? '';
    this.attendancePerformedId = null;
    this.attendanceList        = [{ participantId: 0, attended: true }];
    this.activeModal           = 'detail';
  }

  openPerformed(row: TeacherHistoryItemDTO): void {
    this.selected             = row;
    this.errorMsg             = null;
    this.performedObservation = '';
    this.performedDuration    = '';
    this.performedFiles       = [];
    this.activeModal          = 'performed';
  }

  closeModal(): void {
    this.activeModal = 'none';
    this.selected    = null;
    this.errorMsg    = null;
    this.busy        = false;
  }

  // ── Attendance helpers ──────────────────────────────────────────────────────
  addAttendanceRow(): void    { this.attendanceList.push({ participantId: 0, attended: true }); }
  removeAttendanceRow(i: number): void { this.attendanceList.splice(i, 1); }

  // ── File selection ──────────────────────────────────────────────────────────
  onFilesSelected(ev: Event): void {
    const inp = ev.target as HTMLInputElement;
    this.performedFiles = inp.files ? Array.from(inp.files) : [];
  }

  // ── Submissions ─────────────────────────────────────────────────────────────
  submitVirtualLink(): void {
    if (!this.selected) return;
    this.busy = true;
    this.sessSvc.setVirtualLink(this.selected.scheduledId, { url: this.virtualLinkUrl }).subscribe({
      next: res => { this.busy = false; this.showSuccess(`Enlace virtual registrado. ${res.message}`); this.closeModal(); },
      error: err => { this.busy = false; this.errorMsg = err?.message; this.cdr.detectChanges(); }
    });
  }

  submitAttendance(): void {
    if (!this.selected || !this.attendancePerformedId) return;
    this.busy = true;
    this.sessSvc.registerAttendance(this.selected.scheduledId, {
      performedId: this.attendancePerformedId,
      attendances: this.attendanceList,
    }).subscribe({
      next: res => { this.busy = false; this.showSuccess(`Asistencia registrada. ${res.message}`); this.closeModal(); },
      error: err => { this.busy = false; this.errorMsg = err?.message; this.cdr.detectChanges(); }
    });
  }

  submitPerformed(): void {
    if (!this.selected) return;
    this.busy = true;
    this.sessSvc.registerPerformed(
      this.selected.scheduledId,
      this.performedObservation,
      this.performedDuration,
      this.performedFiles
    ).subscribe({
      next: res => { this.busy = false; this.showSuccess(`Resultado registrado. ${res.message}`); this.closeModal(); this.load(); },
      error: err => { this.busy = false; this.errorMsg = err?.message; this.cdr.detectChanges(); }
    });
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────
  isValidUrl(url: string): boolean {
    try { return new URL(url).protocol.startsWith('https'); } catch { return false; }
  }

  modalityBadge(modality: string): string {
    return modality === 'Virtual' ? 'sess-badge--virtual' : 'sess-badge--presencial';
  }

  statusBadge(statusName: string): string {
    const map: Record<string, string> = {
      'Finalizada':     'bg-primary',
      'Cancelada':      'bg-danger',
      'Aceptada':       'bg-success',
      'Rechazada':      'bg-danger',
      'Pendiente':      'bg-warning text-dark',
      'Espera espacio': 'bg-warning text-dark',
    };
    return map[statusName] ?? 'bg-secondary';
  }

  sessionTypeBadge(sessionType: string): string {
    return sessionType === 'Grupal' ? 'sess-badge--grupal' : 'sess-badge--individual';
  }

  private showSuccess(msg: string): void {
    this.successMsg = msg;
    this.cdr.detectChanges();
    setTimeout(() => { this.successMsg = null; this.cdr.detectChanges(); }, 6000);
  }
}
