import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TeacherSessionsService } from '../../../services/teacher/teacher-sessions.service';
import { ToastService } from '../../../services/shared/toast.service';
import {
  TeacherHistoryItemDTO,
  SessionParticipantDTO,
  TeacherSessionHistoryItemDTO,
  TeacherSessionHistoryPageDTO,
  TeacherSessionHistoryDetailDTO,
  HistoryParticipantDTO,
} from '../../../models/teacher/teacher-request.model';

type ActiveModal = 'none' | 'detail' | 'performed';

@Component({
  selector: 'app-teacher-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'teacher-history.component.html',
  styleUrl: 'teacher-history.component.css'
})
export class TeacherHistoryComponent implements OnInit {
  private sessSvc = inject(TeacherSessionsService);
  private cdr     = inject(ChangeDetectorRef);
  private toast   = inject(ToastService);

  loading   = false;
  busy = false;

  colClass = 'col-12 col-md-4';

  // ── Tabs ─────────────────────────────────────────────────────────────────
  activeTab: 'active' | 'history' = 'active';

  // ── Active Sessions ───────────────────────────────────────────────────────
  rows: TeacherHistoryItemDTO[] = [];
  totalCount = 0;

  // Modal state
  activeModal: ActiveModal = 'none';
  selected: TeacherHistoryItemDTO | null = null;

  // Virtual Link form
  virtualLinkUrl = '';

  // Attendance side panel
  showAttendance       = false;
  participants: SessionParticipantDTO[] = [];
  loadingParticipants  = false;
  participantsError: string | null = null;

  // Attendance stats cache: scheduledId → { attended, total }
  attendanceMap = new Map<number, { attended: number; total: number }>();

  // Performed form
  performedObservation = '';
  performedDuration    = '';
  perfDurationPresets: string[] = [];

  // ── Session History ───────────────────────────────────────────────────────
  historyItems: TeacherSessionHistoryItemDTO[] = [];
  historyLoading  = false;
  historyError: string | null = null;
  historyPage     = 1;
  historySize     = 10;
  historyTotal    = 0;
  historyTotalPages = 1;

  // Modal detalle historial
  selectedHistory: TeacherSessionHistoryItemDTO | null = null;
  showHistoryModal = false;
  historyDetail: TeacherSessionHistoryDetailDTO | null = null;
  historyDetailLoading = false;
  historyDetailError: string | null = null;

  // mantener compatibilidad con el template que usa historyParticipants
  get historyParticipants(): HistoryParticipantDTO[] {
    return this.historyDetail?.attendance ?? [];
  }
  get historyParticipantsLoading(): boolean { return this.historyDetailLoading; }
  get historyParticipantsError(): string | null { return this.historyDetailError; }

  // ── Filtros sesiones activas ──────────────────────────────────────────────
  activeFilterStatus: string | null   = null;   // null = Todos
  activeFilterModality: string | null = null;   // null = Todas

  // ── Filtros historial ─────────────────────────────────────────────────────
  histFilterModality:    string | null = null;
  histFilterSessionType: string | null = null;

  get filteredRows(): TeacherHistoryItemDTO[] {
    return this.rows.filter(r => {
      const okStatus   = !this.activeFilterStatus   || r.statusName   === this.activeFilterStatus;
      const okModality = !this.activeFilterModality || r.modality     === this.activeFilterModality;
      return okStatus && okModality;
    });
  }

  get filteredHistoryItems(): TeacherSessionHistoryItemDTO[] {
    return this.historyItems.filter(h => {
      const okModality    = !this.histFilterModality    || h.modality    === this.histFilterModality;
      const okSessionType = !this.histFilterSessionType || h.sessionType === this.histFilterSessionType;
      return okModality && okSessionType;
    });
  }

  ngOnInit(): void { this.load(); }

  switchTab(tab: 'active' | 'history'): void {
    this.activeTab = tab;
    if (tab === 'history' && this.historyItems.length === 0 && !this.historyLoading) {
      this.loadHistory();
    }
  }

  loadHistory(page = 1): void {
    this.historyLoading = true;
    this.historyError   = null;
    this.historyPage    = page;
    this.sessSvc.getSessionHistory(page, this.historySize).subscribe({
      next: (data: TeacherSessionHistoryPageDTO) => {
        this.historyItems      = data.items ?? [];
        this.historyTotal      = data.totalCount;
        this.historyTotalPages = data.totalPages;
        this.historyLoading    = false;
        this.cdr.detectChanges();
      },
      error: (err: Error) => {
        this.historyError   = err?.message || 'Error al cargar el historial';
        this.historyLoading = false;
        this.cdr.detectChanges();
      }
    });
  }


  historyAttendancePctColor(pct: number): string {
    if (pct >= 75) return '#1B7505';
    if (pct >= 50) return '#ed6c02';
    return '#d32f2f';
  }

  openHistoryDetail(item: TeacherSessionHistoryItemDTO): void {
    this.selectedHistory   = item;
    this.showHistoryModal  = true;
    this.historyDetail     = null;
    this.historyDetailError   = null;
    this.historyDetailLoading = true;
    this.sessSvc.getHistoryDetail(item.scheduledId).subscribe({
      next: detail => {
        this.historyDetail        = detail;
        this.historyDetailLoading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.historyDetailError   = err?.message || 'Error al cargar el detalle';
        this.historyDetailLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  closeHistoryModal(): void {
    this.showHistoryModal     = false;
    this.selectedHistory      = null;
    this.historyDetail        = null;
    this.historyDetailError   = null;
  }

  load(): void {
    this.loading = true;
    this.sessSvc.getActiveSessions().subscribe({
      next: items => {
        this.rows       = items ?? [];
        this.totalCount = this.rows.length;
        this.loading    = false;
        this.cdr.detectChanges();
        this.loadAllAttendance();
      },
      error: err => {
        this.toast.show(false, err?.message || 'Error al cargar las sesiones');
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private loadAllAttendance(): void {
    if (this.rows.length === 0) return;
    const calls = this.rows.map(r =>
      this.sessSvc.getParticipants(r.scheduledId).pipe(catchError(() => of([])))
    );
    forkJoin(calls).subscribe(results => {
      results.forEach((list, i) => {
        const total    = list.length;
        const attended = list.filter(p => p.attended).length;
        this.attendanceMap.set(this.rows[i].scheduledId, { attended, total });
      });
      this.cdr.detectChanges();
    });
  }

  attendancePct(scheduledId: number): number | null {
    const s = this.attendanceMap.get(scheduledId);
    if (!s || s.total === 0) return null;
    return Math.round((s.attended / s.total) * 100);
  }

  pctColor(pct: number): string {
    if (pct >= 75) return '#1B7505';
    if (pct >= 50) return '#ed6c02';
    return '#d32f2f';
  }

  private onPerfTimeChange(start: string, end: string): void {
    this.perfDurationPresets = [];
    this.performedDuration   = '';
    const re = /^([01]\d|2[0-3]):[0-5]\d$/;
    if (!re.test(start) || !re.test(end)) return;
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    const total = (eh * 60 + em) - (sh * 60 + sm);
    if (total <= 0) return;
    for (let min = 30; min <= total; min += 30) {
      const hh = Math.floor(min / 60), mm = min % 60;
      this.perfDurationPresets.push(`${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}`);
    }
    if (this.perfDurationPresets.length)
      this.performedDuration = this.perfDurationPresets[this.perfDurationPresets.length - 1];
  }
  durationLabel(value: string): string {
    const [h, m] = value.split(':').map(Number);
    if (h === 0) return `${m} min`;
    if (m === 0) return `${h} h`;
    return `${h}h ${m}min`;
  }

  countByModality(modality: string): number {
    return this.rows.filter(r => r.modality === modality).length;
  }

  countHistoryByModality(modality: string): number {
    return this.historyItems.filter((h: { modality: string }) => h.modality === modality).length;
  }

  // ── Modal openers ───────────────────────────────────────────────────────────
  openDetail(row: TeacherHistoryItemDTO): void {
    this.selected              = row;
    this.virtualLinkUrl        = row.virtualLink ?? '';
    this.showAttendance        = false;
    this.participants          = [];
    this.participantsError     = null;
    this.activeModal           = 'detail';
  }

  openPerformed(row: TeacherHistoryItemDTO): void {
    this.selected             = row;
    this.performedObservation = '';
    this.performedDuration    = '';
    this.onPerfTimeChange(row.startTime, row.endTime);
    this.activeModal          = 'performed';
  }

  closeModal(): void {
    this.activeModal       = 'none';
    this.selected          = null;
    this.busy              = false;
    this.showAttendance    = false;
    this.participants      = [];
    this.participantsError = null;
  }

  // ── Attendance side panel ───────────────────────────────────────────────────
  openAttendance(): void {
    if (!this.selected) return;
    this.showAttendance    = true;
    this.loadingParticipants = true;
    this.participantsError = null;
    this.sessSvc.getParticipants(this.selected.scheduledId).subscribe({
      next: list => {
        this.participants = list;
        // refresh cache with latest data from server
        const attended = list.filter(p => p.attended).length;
        this.attendanceMap.set(this.selected!.scheduledId, { attended, total: list.length });
        this.loadingParticipants = false;
        this.cdr.detectChanges();
      },
      error: err  => { this.participantsError = err?.message || 'Error al cargar participantes'; this.loadingParticipants = false; this.cdr.detectChanges(); }
    });
  }

  closeAttendance(): void {
    this.showAttendance    = false;
    this.participants      = [];
    this.participantsError = null;
  }

  saveAttendanceList(): void {
    if (!this.selected) return;
    this.busy = true;
    const body = this.participants.map(p => ({ participantId: p.participantId, attended: p.attended }));
    this.sessSvc.saveParticipants(this.selected.scheduledId, body).subscribe({
      next: res => {
        const attended = this.participants.filter(p => p.attended).length;
        this.attendanceMap.set(this.selected!.scheduledId, { attended, total: this.participants.length });
        this.busy = false;
        this.toast.show(true, `Asistencia guardada. ${res.message}`);
        this.closeAttendance();
        this.cdr.detectChanges();
      },
      error: err => { this.busy = false; this.participantsError = err?.message; this.cdr.detectChanges(); }
    });
  }

  // ── File selection ──────────────────────────────────────────────────────────

  // ── Submissions ─────────────────────────────────────────────────────────────
  submitVirtualLink(): void {
    if (!this.selected) return;
    this.busy = true;
    this.sessSvc.setVirtualLink(this.selected.scheduledId, { url: this.virtualLinkUrl }).subscribe({
      next: res => { this.busy = false; this.toast.show(true, `Enlace virtual registrado. ${res.message}`); this.closeModal(); },
      error: err => { this.busy = false; this.toast.show(false, err?.message || 'Error al registrar enlace'); this.cdr.detectChanges(); }
    });
  }

  submitPerformed(): void {
    if (!this.selected) return;
    this.busy = true;
    this.sessSvc.registerPerformed(
      this.selected.scheduledId,
      this.performedObservation,
      this.performedDuration,
      []
    ).subscribe({
      next: res => { this.busy = false; this.toast.show(true, `Resultado registrado. ${res.message}`); this.closeModal(); this.load(); },
      error: err => { this.busy = false; this.toast.show(false, err?.message || 'Error al registrar resultado'); this.cdr.detectChanges(); }
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
      'Programado':     'bg-success',
      'Reprogramado':   'bg-info text-dark',
    };
    return map[statusName] ?? 'bg-secondary';
  }

  sessionTypeBadge(sessionType: string): string {
    return sessionType === 'Grupal' ? 'sess-badge--grupal' : 'sess-badge--individual';
  }

}

