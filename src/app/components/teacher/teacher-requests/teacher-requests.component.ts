import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeacherRequestsService } from '../../../services/teacher/teacher-requests.service';
import { TeacherSessionsService } from '../../../services/teacher/teacher-sessions.service';
import {
  TeacherRequestItemDTO,
  AcceptRescheduleBodyDTO,
  AttendanceEntryDTO,
  WorkAreaTypeDTO,
  ModalityDTO,
} from '../../../models/teacher/teacher-request.model';

type ModalMode = 'none' | 'detail' | 'accept' | 'reject' | 'reschedule' | 'cancel' | 'virtualLink' | 'attendance' | 'performed';

const STATUS_ID = { PENDING: 1, ACCEPTED: 2, REJECTED: 3, CANCELLED: 4, COMPLETED: 5 } as const;

const STATUS_META: Record<number, { badge: string }> = {
  1: { badge: 'bg-warning text-dark' },
  2: { badge: 'bg-success'           },
  3: { badge: 'bg-danger'            },
  4: { badge: 'bg-secondary'         },
  5: { badge: 'bg-primary'           },
};

@Component({
  selector: 'app-teacher-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-requests.component.html',
  styleUrl: './teacher-requests.component.css'
})
export class TeacherRequestsComponent implements OnInit {
  private reqSvc  = inject(TeacherRequestsService);
  private sessSvc = inject(TeacherSessionsService);
  private cdr     = inject(ChangeDetectorRef);

  loading  = false;
  busy     = false;
  errorMsg: string | null  = null;
  successMsg: string | null = null;

  rows: TeacherRequestItemDTO[] = [];
  totalCount = 0;
  page       = 1;
  size       = 10;
  totalPages = 1;

  filters: { statusId: number | null } = { statusId: null };

  summaryChips = [
    { label: 'Pendientes', value: 0, icon: 'bi-clock-history', color: '#ed6c02', bg: '#fff3e0' },
    { label: 'Aceptadas',  value: 0, icon: 'bi-check-circle',  color: '#1B7505', bg: '#e8f5e9' },
    { label: 'Rechazadas', value: 0, icon: 'bi-x-circle',      color: '#d32f2f', bg: '#ffebee' },
  ];

  // Modal
  activeModal: ModalMode = 'none';
  selected: TeacherRequestItemDTO | null = null;

  // Accept/Reschedule form
  scheduleForm: AcceptRescheduleBodyDTO = { scheduledDate: '', startTime: '', endTime: '', modalityId: 1, estimatedDuration: '', reason: '', workAreaTypeId: null };
  todayStr = new Date().toISOString().split('T')[0];

  // Custom 24h time pickers
  timeMinutes: string[] = ['00', '15', '30', '45'];
  startHour: number | null = null; startMin = '00'; startMinNum: number | null = null;
  endHour:   number | null = null; endMin   = '00'; endMinNum:   number | null = null;

  // Duration presets
  durationPresets: string[] = [];

  // Work area types catalog
  workAreaTypes: WorkAreaTypeDTO[] = [];
  loadingWorkAreaTypes = false;
  workAreaTypesError = false;

  // Modalities catalog
  modalities: ModalityDTO[] = [];

  /** ID de la modalidad presencial (obtenido dinámicamente desde el catálogo) */
  get presencialId(): number | null {
    return this.modalities.find(m =>
      m.modality.toLowerCase().includes('presencial')
    )?.idModality ?? null;
  }

  onStartTimeSelect(): void {
    const min = this.startMinNum !== null ? this.startMinNum : 0;
    this.startMin = String(min).padStart(2, '0');
    this.scheduleForm.startTime = this.startHour !== null
      ? `${String(this.startHour).padStart(2,'0')}:${this.startMin}` : '';
    this.onTimeChange();
  }

  onEndTimeSelect(): void {
    const min = this.endMinNum !== null ? this.endMinNum : 0;
    this.endMin = String(min).padStart(2, '0');
    this.scheduleForm.endTime = this.endHour !== null
      ? `${String(this.endHour).padStart(2,'0')}:${this.endMin}` : '';
    this.onTimeChange();
  }

  onTimeChange(): void {
    const start = this.scheduleForm.startTime;
    const end   = this.scheduleForm.endTime;
    this.durationPresets = [];
    this.scheduleForm.estimatedDuration = '';
    const timeRe = /^([01]\d|2[0-3]):[0-5]\d$/;
    if (!timeRe.test(start) || !timeRe.test(end)) return;
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    const totalMin = (eh * 60 + em) - (sh * 60 + sm);
    if (totalMin <= 0) return;
    for (let m = 30; m <= totalMin; m += 30) {
      const h = Math.floor(m / 60);
      const min = m % 60;
      this.durationPresets.push(`${String(h).padStart(2,'0')}:${String(min).padStart(2,'0')}`);
    }
    if (this.durationPresets.length) {
      this.scheduleForm.estimatedDuration = this.durationPresets[this.durationPresets.length - 1];
    }
  }

  durationLabel(value: string): string {
    const [h, m] = value.split(':').map(Number);
    if (h === 0) return `${m} min`;
    if (m === 0) return `${h} h`;
    return `${h}h ${m}min`;
  }

  // Reject/Cancel
  reasonText = '';

  // Virtual link
  virtualLinkUrl = '';

  // Attendance
  attendancePerformedId: number | null = null;
  attendanceList: AttendanceEntryDTO[] = [{ participantId: 0, attended: true }];

  // Performed
  performedObservation = '';
  performedDuration    = '';
  performedFiles: File[] = [];

  ngOnInit(): void {
    this.load();
    this.loadModalities();
  }

  private loadModalities(): void {
    this.reqSvc.getModalities().subscribe({
      next: list => { this.modalities = list; this.cdr.detectChanges(); },
      error: () => { /* si falla, el usuario puede seleccionar manualmente */ }
    });
  }

  load(): void {
    this.loading  = true;
    this.errorMsg = null;
    this.reqSvc.getRequests({ statusId: this.filters.statusId, page: this.page, size: this.size }).subscribe({
      next: d => {
        this.rows       = d.items ?? [];
        this.totalCount = d.totalCount;
        this.totalPages = d.totalPages ?? Math.max(1, Math.ceil(d.totalCount / this.size));
        this.page       = d.page;
        this.updateChips();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorMsg = err?.message || 'Error al cargar solicitudes';
        this.loading  = false;
        this.cdr.detectChanges();
      }
    });
  }

  clearFilters(): void { this.filters = { statusId: null }; this.page = 1; this.load(); }
  goTo(p: number):     void { this.page = p; this.load(); }

  private updateChips(): void {
    if (this.filters.statusId === null) {
      const m = new Map<number, number>();
      this.rows.forEach(r => m.set(r.statusId, (m.get(r.statusId) ?? 0) + 1));
      this.summaryChips[0].value = m.get(STATUS_ID.PENDING)   ?? 0;
      this.summaryChips[1].value = m.get(STATUS_ID.ACCEPTED)  ?? 0;
      this.summaryChips[2].value = m.get(STATUS_ID.REJECTED)  ?? 0;
    }
  }

  openDetail(r: TeacherRequestItemDTO):      void { this.selected = r; this.activeModal = 'detail'; }
  openReject(r: TeacherRequestItemDTO):      void { this.selected = r; this.reasonText = ''; this.activeModal = 'reject'; }
  openCancel(r: TeacherRequestItemDTO):      void { this.selected = r; this.reasonText = ''; this.activeModal = 'cancel'; }
  openVirtualLink(r: TeacherRequestItemDTO): void { this.selected = r; this.virtualLinkUrl = ''; this.activeModal = 'virtualLink'; }

  openAccept(r: TeacherRequestItemDTO): void {
    this.selected = r;
    const defaultModality = this.modalities[0]?.idModality ?? 1;
    this.scheduleForm = { scheduledDate: '', startTime: '', endTime: '', modalityId: defaultModality, estimatedDuration: '', reason: '', workAreaTypeId: null };
    this.durationPresets = [];
    this.startHour = null; this.startMin = '00'; this.startMinNum = null;
    this.endHour = null;   this.endMin   = '00'; this.endMinNum   = null;
    this.activeModal = 'accept';
  }

  openReschedule(r: TeacherRequestItemDTO): void {
    this.selected = r;
    const defaultModality = this.modalities[0]?.idModality ?? 1;
    this.scheduleForm = { scheduledDate: '', startTime: '', endTime: '', modalityId: defaultModality, estimatedDuration: '', reason: '', workAreaTypeId: null };
    this.durationPresets = [];
    this.startHour = null; this.startMin = '00'; this.startMinNum = null;
    this.endHour = null;   this.endMin   = '00'; this.endMinNum   = null;
    this.activeModal = 'reschedule';
  }

  openAttendance(r: TeacherRequestItemDTO): void {
    this.selected = r;
    this.attendancePerformedId = null;
    this.attendanceList = Array.from({ length: r.participantCount || 1 }, () => ({ participantId: 0, attended: true }));
    this.activeModal = 'attendance';
  }

  openPerformed(r: TeacherRequestItemDTO): void {
    this.selected = r;
    this.performedObservation = '';
    this.performedDuration    = '';
    this.performedFiles       = [];
    this.activeModal = 'performed';
  }

  closeModal(): void { this.activeModal = 'none'; this.selected = null; }

  onModalityChange(): void {
    if (this.scheduleForm.modalityId !== this.presencialId) {
      this.scheduleForm.workAreaTypeId = null;
    } else {
      this.loadWorkAreaTypes();
    }
  }

  retryWorkAreaTypes(): void {
    this.workAreaTypes = [];
    this.workAreaTypesError = false;
    this.loadWorkAreaTypes();
  }

  private loadWorkAreaTypes(): void {
    if (this.workAreaTypes.length > 0) return; // already loaded
    this.loadingWorkAreaTypes = true;
    this.workAreaTypesError = false;
    this.reqSvc.getWorkAreaTypes().subscribe({
      next: types => {
        this.workAreaTypes = types;
        this.loadingWorkAreaTypes = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingWorkAreaTypes = false;
        this.workAreaTypesError = true;
        this.cdr.detectChanges();
      }
    });
  }

  scheduleFormValid(): boolean {
    const f = this.scheduleForm;
    const base = !!f.scheduledDate && !!f.startTime && !!f.endTime && f.modalityId > 0 && !!f.estimatedDuration.trim();
    const pres = this.scheduleForm.modalityId !== this.presencialId || (!!f.workAreaTypeId && f.workAreaTypeId > 0);
    return base && pres;
  }

  isValidUrl(url: string): boolean {
    try { return new URL(url).protocol.startsWith('https'); } catch { return false; }
  }

  addAttendanceRow():        void { this.attendanceList.push({ participantId: 0, attended: true }); }
  removeAttendanceRow(i: number): void { this.attendanceList.splice(i, 1); }

  onFilesSelected(ev: Event): void {
    const inp = ev.target as HTMLInputElement;
    this.performedFiles = inp.files ? Array.from(inp.files) : [];
  }

  // Submit: Accept/Reschedule (RF10, RF11)
  submitSchedule(): void {
    if (!this.selected) return;
    this.busy = true;
    const id   = this.selected.requestId;
    const body: AcceptRescheduleBodyDTO = { ...this.scheduleForm };
    const obs  = this.activeModal === 'accept'
      ? this.reqSvc.acceptRequest(id, body)
      : this.reqSvc.rescheduleRequest(id, body);
    const label = this.activeModal === 'accept' ? 'aceptada y programada' : 'reprogramada';
    obs.subscribe({
      next: res => { this.busy = false; this.showSuccess(`Solicitud #${id} ${label}. ${res.message}`); this.closeModal(); this.load(); },
      error: err => { this.busy = false; this.errorMsg = err?.message; this.cdr.detectChanges(); }
    });
  }

  // Submit: Reject (RF10)
  submitReject(): void {
    if (!this.selected) return;
    this.busy = true;
    this.reqSvc.rejectRequest(this.selected.requestId, { reason: this.reasonText || undefined }).subscribe({
      next: res => { this.busy = false; this.showSuccess(`Solicitud rechazada. ${res.message}`); this.closeModal(); this.load(); },
      error: err => { this.busy = false; this.errorMsg = err?.message; this.cdr.detectChanges(); }
    });
  }

  // Submit: Cancel (RF15)
  submitCancel(): void {
    if (!this.selected) return;
    this.busy = true;
    this.reqSvc.cancelRequest(this.selected.requestId, { reason: this.reasonText || undefined }).subscribe({
      next: res => { this.busy = false; this.showSuccess(`Sesión cancelada. ${res.message}`); this.closeModal(); this.load(); },
      error: err => { this.busy = false; this.errorMsg = err?.message; this.cdr.detectChanges(); }
    });
  }

  // Submit: Virtual link (RF13)
  submitVirtualLink(): void {
    if (!this.selected) return;
    this.busy = true;
    this.sessSvc.setVirtualLink(this.selected.requestId, { url: this.virtualLinkUrl }).subscribe({
      next: res => { this.busy = false; this.showSuccess(`Enlace virtual registrado. ${res.message}`); this.closeModal(); },
      error: err => { this.busy = false; this.errorMsg = err?.message; this.cdr.detectChanges(); }
    });
  }

  // Submit: Attendance (RF16)
  submitAttendance(): void {
    if (!this.selected || !this.attendancePerformedId) return;
    this.busy = true;
    this.sessSvc.registerAttendance(this.selected.requestId, {
      performedId: this.attendancePerformedId,
      attendances: this.attendanceList,
    }).subscribe({
      next: res => { this.busy = false; this.showSuccess(`Asistencia registrada. ${res.message}`); this.closeModal(); },
      error: err => { this.busy = false; this.errorMsg = err?.message; this.cdr.detectChanges(); }
    });
  }

  // Submit: Performed (RF17)
  submitPerformed(): void {
    if (!this.selected) return;
    this.busy = true;
    this.sessSvc.registerPerformed(this.selected.requestId, this.performedObservation, this.performedDuration, this.performedFiles).subscribe({
      next: res => { this.busy = false; this.showSuccess(`Resultado registrado. ${res.message}`); this.closeModal(); this.load(); },
      error: err => { this.busy = false; this.errorMsg = err?.message; this.cdr.detectChanges(); }
    });
  }

  statusBadge(statusId: number): string { return STATUS_META[statusId]?.badge ?? 'bg-secondary'; }

  private showSuccess(msg: string): void {
    this.successMsg = msg;
    this.cdr.detectChanges();
    setTimeout(() => { this.successMsg = null; this.cdr.detectChanges(); }, 6000);
  }
}
