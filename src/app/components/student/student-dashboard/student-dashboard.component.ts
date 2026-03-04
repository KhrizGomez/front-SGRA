import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { StudentDashboardService, StudentDashboardData } from '../../../services/student/student-dashboard.service';

interface DashboardCard {
  key: keyof StudentDashboardData;
  title: string;
  subtitle: string;
  icon: string;
  colorClass: string;
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements AfterViewInit {
  private dashboardService = inject(StudentDashboardService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  errorMessage: string | null = null;

  dashboardData: StudentDashboardData = { pending: 0, accepted: 0, upcoming: 0, completed: 0, cancelled: 0, groupInvitations: 0 };

  cards: DashboardCard[] = [
    { key: 'pending',          title: 'Pendientes',          subtitle: 'Esperando aprobación',        icon: 'bi-hourglass',      colorClass: 'bg-pending' },
    { key: 'accepted',         title: 'Aceptadas',           subtitle: 'Solicitudes aprobadas',       icon: 'bi-check2',         colorClass: 'bg-accepted' },
    { key: 'upcoming',         title: 'Próximas',            subtitle: 'Sesiones programadas',        icon: 'bi-calendar-event', colorClass: 'bg-upcoming' },
    { key: 'completed',        title: 'Realizadas',          subtitle: 'Sesiones completadas',        icon: 'bi-flag',           colorClass: 'bg-finished' },
    { key: 'cancelled',        title: 'Canceladas',          subtitle: 'Solicitudes canceladas',      icon: 'bi-x-circle',       colorClass: 'bg-cancelled' },
    { key: 'groupInvitations', title: 'Tutorías Grupales',   subtitle: 'Invitaciones pendientes',     icon: 'bi-people-fill',    colorClass: 'bg-invitation' },
  ];

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.loadDashboard();
    });
  }

  loadDashboard(): void {
    this.errorMessage = null;

    this.dashboardService.getDashboard().subscribe({
      next: (data) => {
        this.dashboardData = data ?? { pending: 0, accepted: 0, upcoming: 0, completed: 0, cancelled: 0, groupInvitations: 0 };
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err?.message || 'Error al cargar los datos';
        this.dashboardData = { pending: 0, accepted: 0, upcoming: 0, completed: 0, cancelled: 0, groupInvitations: 0 };
        this.cdr.detectChanges();
      }
    });
  }

  navigateTo(path: string): void {
    const [route, queryString] = path.split('?');
    if (queryString) {
      const params: Record<string, string> = {};
      queryString.split('&').forEach(param => {
        const [key, value] = param.split('=');
        params[key] = value;
      });
      this.router.navigate([route], { queryParams: params });
    } else {
      this.router.navigate([path]);
    }
  }
}

