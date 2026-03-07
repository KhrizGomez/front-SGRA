import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../../services/auth/auth.service';
import { TeacherRequestsService } from '../../../services/teacher/teacher-requests.service';
import { TeacherSessionsService } from '../../../services/teacher/teacher-sessions.service';
import { TeacherHistoryItemDTO } from '../../../models/teacher/teacher-request.model';

const STATUS_ID = { PENDING: 1, ACCEPTED: 2, REJECTED: 3 } as const;

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css',
})
export class TeacherDashboardComponent implements OnInit {
  public authService = inject(AuthService);
  private router     = inject(Router);
  private reqSvc     = inject(TeacherRequestsService);
  private sessSvc    = inject(TeacherSessionsService);
  private cdr        = inject(ChangeDetectorRef);

  loading = true;

  // Stat counters
  pendingCount  = 0;
  acceptedCount = 0;
  rejectedCount = 0;
  activeCount   = 0;

  // Today's sessions
  todaySessions: TeacherHistoryItemDTO[] = [];
  readonly today = (() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  })();

  readonly quickLinks = [
    { label: 'Mis Solicitudes', icon: 'bi-inbox-fill',        route: '/teacher/requests', accent: '#1B7505' },
    { label: 'Aula Virtual',    icon: 'bi-camera-video-fill', route: '/teacher/history',  accent: '#1565C0' }
  ];

  ngOnInit(): void { this.load(); }

  private load(): void {
    this.loading = true;
    forkJoin({
      requests: this.reqSvc.getRequests({ page: 1, size: 200 }).pipe(catchError(() => of({ items: [], totalCount: 0, page: 1, size: 200, totalPages: 0 }))),
      sessions: this.sessSvc.getActiveSessions().pipe(catchError(() => of([])))
    }).subscribe(({ requests, sessions }) => {
      const items = requests.items ?? [];
      this.pendingCount  = items.filter(r => r.statusId === STATUS_ID.PENDING).length;
      this.acceptedCount = items.filter(r => r.statusId === STATUS_ID.ACCEPTED).length;
      this.rejectedCount = items.filter(r => r.statusId === STATUS_ID.REJECTED).length;
      this.activeCount   = sessions.length;
      this.todaySessions = sessions.filter(s => (s.scheduledDate ?? '').split('T')[0] === this.today);
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  navigateTo(route: string): void { this.router.navigate([route]); }

  timeRange(s: TeacherHistoryItemDTO): string {
    return `${s.startTime} – ${s.endTime}`;
  }
}

