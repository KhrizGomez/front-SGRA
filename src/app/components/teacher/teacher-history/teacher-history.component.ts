import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize, timeout } from 'rxjs/operators';
import { TeacherSessionsService } from '../../../services/teacher/teacher-sessions.service';
import { ToastService } from '../../../services/shared/toast.service';
import {
  TeacherHistoryItemDTO,
  SessionParticipantDTO,
  TeacherSessionHistoryItemDTO,
  TeacherSessionHistoryPageDTO, TeacherSessionHistoryDetailDTO,
  HistoryParticipantDTO,
} from '../../../models/teacher/teacher-request.model';

type ActiveModal = 'none' | 'detail' | 'performed';
type SessionLinkUI = { url: string; name?: string; type: 'VIRTUAL' | 'MATERIAL' };

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
    this.sessSvc.getSessionHistory(page, this.historySize)
      .pipe(
        timeout(15_000),
        catchError(err => {
          this.historyError = err?.message || 'Error al cargar el historial';
          return of(null);
        }),
        finalize(() => {
          this.historyLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(data => {
        if (!data) return;
        this.historyItems      = data.items ?? [];
        this.historyTotal      = data.totalCount;
        this.historyTotalPages = data.totalPages;
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
        this.loadResources(item.scheduledId);
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
    this.sessSvc.getActiveSessions()
      .pipe(
        timeout(15_000),                     // ← máx 15 s de espera
        catchError(err => {
          this.toast.show(false, err?.message || 'Error al cargar las sesiones');
          return of([]);                     // emite array vacío y continúa
        }),
        finalize(() => {                     // ← SIEMPRE se ejecuta
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(items => {
        this.rows       = items ?? [];
        this.totalCount = this.rows.length;
        this.loadAllAttendance();
      });
  }

  private loadAllAttendance(): void {
    if (this.rows.length === 0) return;
    const calls = this.rows.map(r =>
      this.sessSvc.getParticipants(r.scheduledId).pipe(
        timeout(10_000),
        catchError(() => of([]))             // ← si falla una, devuelve []
      )
    );
    forkJoin(calls)
      .pipe(catchError(() => of(this.rows.map(() => []))))  // ← fallo total → arrays vacíos
      .subscribe(results => {
        results.forEach((list, i) => {
          const total    = list.length;
          const attended = list.filter((p: SessionParticipantDTO) => p.attended).length;
          this.attendanceMap.set(this.rows[i].scheduledId, { attended, total });
        });
        setTimeout(() => this.cdr.detectChanges());
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
    this.isEditingLink         = false;
    this.isAddingLink          = false;
    this.newLinkUrl            = '';
    this.newLinkName           = '';
    this.loadResources(row.scheduledId);
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

  private currentScheduledId(): number | null {
    return this.selected?.scheduledId ?? this.selectedHistory?.scheduledId ?? null;
  }

  private currentVirtualLink(): string | null {
    return this.selected?.virtualLink ?? this.historyDetail?.virtualLink ?? null;
  }

  private setCurrentVirtualLink(url: string | null): void {
    if (this.selected) this.selected.virtualLink = url;
    if (this.historyDetail) this.historyDetail.virtualLink = url;
  }

  // ── Submissions ─────────────────────────────────────────────────────────────
  submitVirtualLink(): void {
    const id = this.currentScheduledId();
    if (!id) return;
    const prevUrl = this.currentVirtualLink();

    this.busy = true;
    const saveNew = () => this.sessSvc.addSessionLink(id, { url: this.virtualLinkUrl, type: 'VIRTUAL' }).subscribe({
      next: res => {
        this.busy = false;
        this.toast.show(true, `Reunión registrada. ${res.message}`);
        this.setCurrentVirtualLink(this.virtualLinkUrl);
        this.isEditingLink = false;
        this.refreshLinks(id);
      },
      error: err => {
        this.busy = false;
        this.toast.show(false, err?.message || 'Error al guardar reunión');
        this.cdr.detectChanges();
      }
    });

    // Si ya existe un link de reunión distinto, eliminarlo primero para evitar duplicados.
    if (prevUrl && prevUrl !== this.virtualLinkUrl) {
      this.sessSvc.deleteSessionLink(id, prevUrl).subscribe({
        next: () => saveNew(),
        error: () => saveNew() // Si no se pudo borrar, intentamos guardar igualmente.
      });
      return;
    }

    saveNew();
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

  private parseDateOnly(dateStr: string): Date | null {
    const raw = (dateStr || '').slice(0, 10); // soporta YYYY-MM-DD o ISO
    const [y, m, d] = raw.split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  }

  private parseTimeMinutes(timeStr: string): number | null {
    const match = (timeStr || '').match(/^(\d{2}):(\d{2})/);
    if (!match) return null;
    const hh = Number(match[1]);
    const mm = Number(match[2]);
    if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
    return hh * 60 + mm;
  }

  canFinalizeSession(row: TeacherHistoryItemDTO | null): boolean {
    if (!row) return false;
    if (row.statusName !== 'Programado') return false;

    const sessionDate = this.parseDateOnly(row.scheduledDate);
    const startMinutes = this.parseTimeMinutes(row.startTime);
    if (!sessionDate || startMinutes === null) return false;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (today.getTime() > sessionDate.getTime()) return true;
    if (today.getTime() < sessionDate.getTime()) return false;

    // Mismo día: habilitar solo desde la hora de inicio en adelante
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    return nowMinutes >= startMinutes;
  }

  finalizeSessionTooltip(row: TeacherHistoryItemDTO | null): string {
    if (!row) return 'Sesión no disponible';
    if (row.statusName !== 'Programado') {
      return "La sesión debe estar en estado 'Programado' para finalizarla";
    }

    const sessionDate = this.parseDateOnly(row.scheduledDate);
    const startMinutes = this.parseTimeMinutes(row.startTime);
    if (!sessionDate || startMinutes === null) {
      return 'No se pudo validar la fecha/hora de la sesión';
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (today.getTime() < sessionDate.getTime()) {
      return 'Solo puedes finalizar la sesión en la fecha programada';
    }
    if (today.getTime() === sessionDate.getTime()) {
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      if (nowMinutes < startMinutes) {
        return `Se habilita desde las ${row.startTime}`;
      }
    }
    return 'Finalizar sesión';
  }

  // ── Session Resources ─────────────────────────────────────────────────────
  requestResources: string[] = [];
  sessionResources: string[] = [];
  sessionLinks: SessionLinkUI[] = []; // Enlaces extra (material)
  loadingResources = false;
  uploadingResource = false;

  // Nuevo estado para la edición del enlace virtual
  isEditingLink = false;

  private normalizeLinks(rawLinks: any[]): SessionLinkUI[] {
    return (rawLinks || [])
      .map((item: any): SessionLinkUI | null => {
        if (typeof item === 'string') {
          if (item.startsWith('virtual_link:')) {
            const url = item.replace('virtual_link:', '').trim();
            return url ? { url, type: 'VIRTUAL' } : null;
          }
          if (item.startsWith('link:')) {
            const url = item.replace('link:', '').trim();
            return url ? { url, type: 'MATERIAL' } : null;
          }
          if (item.startsWith('http://') || item.startsWith('https://')) {
            return { url: item, type: 'MATERIAL' };
          }
          return null;
        }

        if (item && typeof item === 'object') {
          const url = String(item.url ?? item.linkUrl ?? '').trim();
          if (!url) return null;
          const t = String(item.type ?? '').toUpperCase();
          const isVirtual = t.includes('VIRTUAL') || t === 'VIRTUAL_LINK';
          return {
            url,
            name: item.name ?? item.label,
            type: isVirtual ? 'VIRTUAL' : 'MATERIAL'
          };
        }

        return null;
      })
      .filter((x: SessionLinkUI | null): x is SessionLinkUI => !!x);
  }

  loadResources(scheduledId: number): void {
    this.loadingResources = true;
    this.requestResources = [];
    this.sessionResources = [];
    this.sessionLinks     = [];

    forkJoin({
      req:   this.sessSvc.getRequestResources(scheduledId).pipe(catchError(() => of([]))),
      files: this.sessSvc.getSessionResources(scheduledId).pipe(catchError(() => of([]))),
      links: this.sessSvc.getSessionLinks(scheduledId).pipe(catchError(() => of([])))
    }).subscribe({
      next: res => {
        this.requestResources = res.req;
        this.sessionResources = (res.files || []).filter((f: string) => {
          const v = (f ?? '').toLowerCase();
          return !v.startsWith('link:') && !v.startsWith('virtual_link:');
        });

        const normalized = this.normalizeLinks(res.links || []);
        const virtual = normalized.find(l => l.type === 'VIRTUAL');
        this.sessionLinks = normalized.filter(l => l.type === 'MATERIAL');

        this.setCurrentVirtualLink(virtual?.url ?? null);

        this.loadingResources = false;
        this.cdr.detectChanges();
      }
    });
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadResource(input.files[0]);
      input.value = ''; // clear input
    }
  }

  uploadResource(file: File): void {
    const id = this.selected?.scheduledId ?? this.selectedHistory?.scheduledId;
    if (!id) return;

    this.uploadingResource = true;
    this.sessSvc.uploadSessionResource(id, file).subscribe({
      next: () => {
        this.toast.show(true, 'Recurso subido correctamente');
        this.uploadingResource = false;
        // Refresh session resources
        this.sessSvc.getSessionResources(id).subscribe(res => {
          this.sessionResources = res;
          this.cdr.detectChanges();
        });
      },
      error: err => {
        this.toast.show(false, err?.message || 'Error al subir recurso');
        this.uploadingResource = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ── Resource Links as Files ───────────────────────────────────────────────
  isAddingLink = false;
  newLinkUrl = '';
  newLinkName = '';

  // Doble confirmación para eliminación de recursos (archivos)
  showDeleteResourceModal = false;
  deleteResourceTargetUrl: string | null = null;
  deleteResourceTargetKind: 'resource' | 'link' = 'resource';

  toggleAddLink(): void {
    this.isAddingLink = !this.isAddingLink;
    this.newLinkUrl = '';
    this.newLinkName = '';
  }

  saveLinkAsResource(): void {
    if (!this.newLinkUrl || !this.newLinkName) return;
    const id = this.currentScheduledId();
    if (!id) return;

    this.uploadingResource = true;
    this.sessSvc.addSessionLink(id, { url: this.newLinkUrl, name: this.newLinkName, type: 'MATERIAL' }).subscribe({
      next: res => {
        this.toast.show(true, `Enlace guardado. ${res.message}`);
        this.uploadingResource = false;
        this.newLinkUrl = '';
        this.newLinkName = '';
        this.isAddingLink = false;

        // Recargar recursos (específicamente links)
        this.refreshLinks(id);
      },
      error: err => {
        this.uploadingResource = false;
        this.toast.show(false, err?.message || 'Error al guardar enlace');
        this.cdr.detectChanges();
      }
    });
  }

  // Helper para recargar solo links (se puede llamar tras borrar o agregar)
  private refreshLinks(id: number): void {
    this.sessSvc.getSessionLinks(id).subscribe(allLinks => {
      const normalized = this.normalizeLinks(allLinks || []);
      const virtual = normalized.find(l => l.type === 'VIRTUAL');
      this.setCurrentVirtualLink(virtual?.url ?? null);
      this.sessionLinks = normalized.filter(l => l.type === 'MATERIAL');
      this.cdr.detectChanges();
    });
  }

  deleteLink(url: string): void {
    this.deleteResourceTargetUrl = url;
    this.deleteResourceTargetKind = 'link';
    this.showDeleteResourceModal = true;
  }

  deleteResource(fileUrl: string): void {
    this.deleteResourceTargetUrl = fileUrl;
    this.deleteResourceTargetKind = 'resource';
    this.showDeleteResourceModal = true;
  }

  cancelDeleteResourceModal(): void {
    this.showDeleteResourceModal = false;
    this.deleteResourceTargetUrl = null;
    this.deleteResourceTargetKind = 'resource';
  }

  confirmDeleteResource(): void {
    const targetUrl = this.deleteResourceTargetUrl;
    if (!targetUrl) return;
    const id = this.currentScheduledId();
    if (!id) return;

    this.busy = true;
    if (this.deleteResourceTargetKind === 'link') {
      this.sessSvc.deleteSessionLink(id, targetUrl).subscribe({
        next: () => {
          this.busy = false;
          this.toast.show(true, 'Enlace eliminado');
          this.cancelDeleteResourceModal();
          this.refreshLinks(id);
        },
        error: err => {
          this.busy = false;
          this.toast.show(false, err?.message || 'Error al eliminar enlace');
        }
      });
      return;
    }

    this.sessSvc.deleteSessionResource(id, targetUrl).subscribe({
      next: () => {
        this.busy = false;
        this.toast.show(true, 'Archivo eliminado');
        this.cancelDeleteResourceModal();
        this.loadResources(id);
      },
      error: err => {
        this.busy = false;
        this.toast.show(false, err?.message || 'Error al eliminar archivo');
      }
    });
  }

}
