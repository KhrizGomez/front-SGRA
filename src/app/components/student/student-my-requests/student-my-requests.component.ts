import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, AfterViewInit, inject, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  StudentMyRequestsService,
  StudentMyRequestsPageDTO,
  MyRequestRowDTO,
  StudentRequestResourcesDTO
} from '../../../services/student/student-my-requests.service';
import { StudentNewRequestService } from '../../../services/student/student-new-request.service';
import { StudentInvitationsService } from '../../../services/student/student-invitations.service';
import { InvitationItem, InvitationHistoryItem } from '../../../models/student/invitation.model';
import { ToastService } from '../../../services/shared/toast.service';

type Option = { value: number | null; label: string };
type TabType = 'requests' | 'invitations';

@Component({
  selector: 'app-student-my-requests',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './student-my-requests.component.html',
  styleUrl: './student-my-requests.component.css'
})
export class StudentMyRequestsComponent implements AfterViewInit {
  private svc = inject(StudentMyRequestsService);
  private catalogSvc = inject(StudentNewRequestService);
  private invitationsSvc = inject(StudentInvitationsService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private toast = inject(ToastService);

  activeTab: TabType = 'requests';
  loading = false;

  rows: MyRequestRowDTO[] = [];
  totalCount = 0;

  page = 1;
  size = 10;
  totalPages = 1;

  // filtros reales del controller
  filters: {
    periodId?: number | null;
    statusId?: number | null;
    sessionTypeId?: number | null;
    subjectId?: number | null;
    search?: string;
  } = {
    periodId: null,
    statusId: null,
    sessionTypeId: null,
    subjectId: null,
    search: ''
  };

  // 1 Pendiente, 2 Aceptada, 3 Rechazada, 4 Cancelada, 5 Completada
  statusOptions: Option[] = [
    { value: null, label: 'Todos' },
    { value: 1, label: 'Pendiente' },
    { value: 2, label: 'Aceptada' },
    { value: 3, label: 'Rechazada' },
    { value: 4, label: 'Cancelada' },
    { value: 5, label: 'Completada' },
  ];

  sessionTypeOptions: Option[] = [
    { value: null, label: 'Todos' },
    { value: 1, label: 'Individual' },
    { value: 2, label: 'Grupal' },
  ];

  subjectOptions: Option[] = [
    { value: null, label: 'Todas' },
  ];

  // Chips alineados a la BD
  summaryChips: { label: string; value: number }[] = [
    { label: 'Pendientes', value: 0 },
    { label: 'Aceptadas', value: 0 },
    { label: 'Canceladas', value: 0 },
    { label: 'Completadas', value: 0 },
  ];

  ngAfterViewInit(): void {
    // Use microtask to ensure view is fully rendered before loading data
    Promise.resolve().then(() => {
      const tab = this.route.snapshot.queryParamMap.get('tab');
      if (tab === 'invitations') {
        this.activeTab = 'invitations';
      }
      this.loadSubjects();
      this.load();
      this.loadSummary();
      this.loadInvitations();
      this.loadInvitationHistory();
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.dropdown');
    if (!dropdown) {
      this.closeDropdown();
    }
  }

  switchTab(tab: TabType): void {
    this.activeTab = tab;
    if (tab === 'invitations') {
      this.loadInvitations();
      this.loadInvitationHistory();
    }
  }

  applyFilters(): void {
    this.page = 1;
    this.load();
    this.loadSummary();
  }

  clearFilters(): void {
    this.filters = { periodId: null, statusId: null, sessionTypeId: null, subjectId: null, search: '' };
    this.applyFilters();
  }

  goTo(p: number): void {
    this.page = p;
    this.load();
  }

  loadSubjects(): void {
    this.catalogSvc.getSubjects().subscribe({
      next: (subjects) => {
        this.subjectOptions = [
          { value: null, label: 'Todas' },
          ...subjects.map(s => ({ value: s.subjectId, label: s.subjectName }))
        ];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar asignaturas:', err);
      }
    });
  }

  load(): void {
    this.loading = true;

    this.svc.getMyRequests({
      periodId: this.filters.periodId ?? undefined,
      statusId: this.filters.statusId ?? undefined,
      sessionTypeId: this.filters.sessionTypeId ?? undefined,
      subjectId: this.filters.subjectId ?? undefined,
      search: (this.filters.search ?? '').trim() || undefined,
      page: this.page,
      size: this.size,
    }).subscribe({
      next: (res: StudentMyRequestsPageDTO) => {
        this.rows = res.items ?? [];
        this.totalCount = res.totalCount ?? 0;
        this.page = res.page ?? this.page;
        this.size = res.size ?? this.size;
        this.totalPages = Math.max(1, Math.ceil(this.totalCount / this.size));
        this.loading = false;

        // evita que “se pinte” solo al tocar hamburguesa
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.toast.show(false, err?.message || 'Error al cargar solicitudes');
        this.rows = [];
        this.totalCount = 0;
        this.totalPages = 1;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadSummary(): void {
    this.svc.getMyRequestsSummary(this.filters.periodId ?? undefined).subscribe({
      next: (data) => {
        const map = new Map<number, number>();
        for (const s of data ?? []) map.set(Number(s.statusId), Number(s.total ?? 0));

        this.summaryChips = [
          { label: 'Pendientes',  value: map.get(1) ?? 0 },
          { label: 'Aceptadas',   value: map.get(2) ?? 0 },
          { label: 'Canceladas',  value: map.get(4) ?? 0 },
          { label: 'Completadas', value: map.get(5) ?? 0 },
        ];

        this.cdr.detectChanges();
      },
      error: () => {
        // silencio, no bloquea UI
      }
    });
  }

  // Modal states
  showDetailModal = false;
  showCancelModal = false;
  selectedRequest: MyRequestRowDTO | null = null;
  resourcesDetail: StudentRequestResourcesDTO | null = null;
  loadingResources = false;
  cancelling = false;
  activeDropdown: number | null = null;

  toggleDropdown(requestId: number): void {
    this.activeDropdown = this.activeDropdown === requestId ? null : requestId;
  }

  closeDropdown(): void {
    this.activeDropdown = null;
  }

  viewDetail(row: MyRequestRowDTO): void {
    this.selectedRequest = row;
    this.showDetailModal = true;
    this.loadRequestResources(row.requestId);
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
    this.selectedRequest = null;
    this.resourcesDetail = null;
    this.loadingResources = false;
  }

  loadRequestResources(requestId: number): void {
    this.loadingResources = true;
    this.resourcesDetail = null;

    this.svc.getRequestResources(requestId).subscribe({
      next: (data) => {
        this.resourcesDetail = data;
        this.loadingResources = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loadingResources = false;
        this.toast.show(false, err?.message || 'No se pudieron cargar los recursos');
        this.cdr.detectChanges();
      }
    });
  }

  hasResources(): boolean {
    if (!this.resourcesDetail) return false;
    return this.resourcesDetail.studentFiles.length > 0
      || this.resourcesDetail.teacherResources.length > 0
      || !!this.resourcesDetail.virtualLink;
  }

  extractFileName(url: string): string {
    try {
      const cleaned = url.split('?')[0];
      const parts = cleaned.split('/');
      return decodeURIComponent(parts[parts.length - 1] || url);
    } catch {
      return url;
    }
  }

  confirmCancel(row: MyRequestRowDTO): void {
    this.selectedRequest = row;
    this.showCancelModal = true;
  }

  closeCancelModal(): void {
    this.showCancelModal = false;
    this.selectedRequest = null;
  }

  canCancel(status: string): boolean {
    const s = this.norm(status);
    return s.includes('pend');
  }

  doCancelRequest(): void {
    if (!this.selectedRequest) return;

    this.cancelling = true;

    this.svc.cancelRequest(this.selectedRequest.requestId).subscribe({
      next: (response) => {
        this.cancelling = false;
        this.closeCancelModal();
        this.toast.show(true, response.message || 'Solicitud cancelada exitosamente');
        this.load();
        this.loadSummary();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.cancelling = false;
        this.closeCancelModal();
        this.toast.show(false, err?.message || 'Error al cancelar la solicitud');
        this.cdr.detectChanges();
      }
    });
  }

  formatDate(dt: string): string {
    const d = new Date(dt);
    return isNaN(d.getTime()) ? dt : d.toLocaleDateString();
  }

  formatTime(dt: string): string {
    const d = new Date(dt);
    return isNaN(d.getTime()) ? '' : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // badges por estado (tu BD real)
  private norm(s: string): string { return (s || '').toLowerCase(); }

  isPending(status: string): boolean { return this.norm(status).includes('pend'); }
  isAccepted(status: string): boolean { return this.norm(status).includes('acept'); }
  isRejected(status: string): boolean { return this.norm(status).includes('rech'); }
  isCancelled(status: string): boolean { return this.norm(status).includes('cancel'); }
  isFinished(status: string): boolean { const s = this.norm(status); return s.includes('complet') || s.includes('final'); }

  // ==================== INVITACIONES GRUPALES ====================
  invitations: InvitationItem[] = [];
  invitationHistory: InvitationHistoryItem[] = [];
  loadingInvitations = false;
  loadingHistory = false;
  respondingInvId: number | null = null;
  respondingAccept = false;

  loadInvitations(): void {
    this.loadingInvitations = true;
    this.invitationsSvc.getMyInvitations().subscribe({
      next: (data) => {
        this.invitations = data ?? [];
        this.loadingInvitations = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.invitations = [];
        this.loadingInvitations = false;
        this.toast.show(false, err?.message || 'Error al cargar invitaciones');
        this.cdr.detectChanges();
      }
    });
  }

  loadInvitationHistory(): void {
    this.loadingHistory = true;
    this.invitationsSvc.getInvitationHistory().subscribe({
      next: (data) => {
        this.invitationHistory = data ?? [];
        this.loadingHistory = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('[Historial] Error:', err);
        this.invitationHistory = [];
        this.loadingHistory = false;
        this.cdr.detectChanges();
      }
    });
  }

  respondInvitation(participantId: number, accept: boolean): void {
    this.respondingInvId = participantId;
    this.respondingAccept = accept;

    this.invitationsSvc.respondInvitation(participantId, accept).subscribe({
      next: (response) => {
        this.respondingInvId = null;
        this.toast.show(true, response.message || (accept ? 'Invitación aceptada' : 'Invitación rechazada'));
        this.loadInvitations();
        this.loadInvitationHistory();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.respondingInvId = null;
        this.toast.show(false, err?.message || 'Error al responder la invitación');
        this.cdr.detectChanges();
      }
    });
  }
}
