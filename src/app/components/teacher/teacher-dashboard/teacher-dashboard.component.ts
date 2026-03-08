import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../../services/auth/auth.service';
import { TeacherRequestsService } from '../../../services/teacher/teacher-requests.service';
import { TeacherSessionsService } from '../../../services/teacher/teacher-sessions.service';
import { TeacherHistoryItemDTO } from '../../../models/teacher/teacher-request.model';

// Chart.js
import { Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
Chart.register(...registerables);

const STATUS_ID = { PENDING: 1, ACCEPTED: 2, REJECTED: 3, CANCELLED: 4 } as const;
const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
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
  allSessions:   TeacherHistoryItemDTO[] = [];

  readonly today = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  })();

  // ── Semana actual (para gráfico de barras) ─────────────────────
  weekDays: { label: string; date: string; sessions: TeacherHistoryItemDTO[] }[] = [];
  weekLabel = '';

  // ── Gráfico dona — estados solicitudes ────────────────────────
  donutData: ChartData<'doughnut'> = {
    labels: ['Pendientes', 'Aceptadas', 'Rechazadas', 'Canceladas'],
    datasets: [{ data: [0, 0, 0, 0], backgroundColor: ['#F57C00','#1B7505','#C62828','#757575'], borderWidth: 2 }]
  };
  donutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', labels: { boxWidth: 12, padding: 12, font: { size: 11 } } },
      tooltip: { enabled: true }
    },
    cutout: '68%'
  };

  // ── Gráfico barras — sesiones por modalidad / día ─────────────
  barData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { label: 'Virtual',    data: [], backgroundColor: '#90CAF9', borderRadius: 4 },
      { label: 'Presencial', data: [], backgroundColor: '#A5D6A7', borderRadius: 4 }
    ]
  };
  barOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 12, font: { size: 11 } } } },
    scales: {
      x: { stacked: true, grid: { display: false } },
      y: { stacked: true, ticks: { stepSize: 1 }, beginAtZero: true }
    }
  };

  readonly quickLinks = [
    { label: 'Mis Solicitudes', icon: 'bi-inbox-fill',        route: '/teacher/requests', accent: '#1B7505' },
    { label: 'Aula Virtual',    icon: 'bi-camera-video-fill', route: '/teacher/history',  accent: '#1565C0' }
  ];

  ngOnInit(): void { this.buildWeek(); this.load(); }

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

      this.allSessions   = sessions;
      this.todaySessions = sessions.filter(s => (s.scheduledDate ?? '').split('T')[0] === this.today);

      // Asignar sesiones a días de la semana
      this.weekDays.forEach(wd => {
        wd.sessions = sessions.filter(s => (s.scheduledDate ?? '').split('T')[0] === wd.date);
      });

      // Gráfico dona
      const cancelled = items.filter(r => r.statusId === STATUS_ID.CANCELLED).length;
      this.donutData = {
        ...this.donutData,
        datasets: [{ ...this.donutData.datasets[0], data: [this.pendingCount, this.acceptedCount, this.rejectedCount, cancelled] }]
      };

      // Gráfico barras (sesiones activas por día semana)
      const virtuals    = this.weekDays.map(wd => wd.sessions.filter(s => s.modality === 'Virtual').length);
      const presencials = this.weekDays.map(wd => wd.sessions.filter(s => s.modality !== 'Virtual').length);
      this.barData = {
        labels: this.weekDays.map(wd => wd.label),
        datasets: [
          { label: 'Virtual',    data: virtuals,    backgroundColor: '#90CAF9', borderRadius: 4 },
          { label: 'Presencial', data: presencials, backgroundColor: '#A5D6A7', borderRadius: 4 }
        ]
      };

      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  private buildWeek(): void {
    const now  = new Date();
    const dow  = now.getDay(); // 0=Dom
    const mon  = new Date(now); mon.setDate(now.getDate() - ((dow + 6) % 7)); // lunes
    this.weekDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(mon); d.setDate(mon.getDate() + i);
      const yyyy = d.getFullYear();
      const mm   = String(d.getMonth()+1).padStart(2,'0');
      const dd   = String(d.getDate()).padStart(2,'0');
      return { label: `${DAYS[d.getDay()]} ${dd}/${mm}`, date: `${yyyy}-${mm}-${dd}`, sessions: [] };
    });
    const start = this.weekDays[0].label.split(' ')[1];
    const end   = this.weekDays[6].label.split(' ')[1];
    this.weekLabel = `Semana ${start} – ${end}`;
  }


  navigateTo(route: string): void { this.router.navigate([route]); }

  timeRange(s: TeacherHistoryItemDTO): string { return `${s.startTime} – ${s.endTime}`; }
}

