import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InPersonReinforcement } from '../../../models/workAreaManager/work-area-manager-in-person-requests';
import { WamInPersonRequestsService } from '../../../services/workAreaManager/work-area-manager-in-person-requests/wam-in-person-requests.service';
import { AuthService } from '../../../services/auth/auth.service';
import { WorkAreaAssignModalComponent } from './work-area-assign-modal/work-area-assign-modal.component';

declare var bootstrap: any;

@Component({
  selector: 'app-work-area-manager-management-of-in-person-requests',
  standalone: true,
  imports: [CommonModule, WorkAreaAssignModalComponent],
  templateUrl: './work-area-manager-management-of-in-person-requests.component.html',
  styleUrl: './work-area-manager-management-of-in-person-requests.component.css',
})
export class WorkAreaManagerManagementOfInPersonRequestsComponent implements OnInit {
  private inPersonService = inject(WamInPersonRequestsService);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);

  reinforcements: InPersonReinforcement[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  selectedReinforcementId: number | null = null;
  selectedTipoAreaTrabajo: number | null = null;

  ngOnInit(): void {
    this.loadReinforcements();
  }

  private loadReinforcements(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const userId = this.authService.currentUser()?.userId;

    if (!userId) return;

    console.log("id del usuario: " + userId)

    this.inPersonService.getInPersonReinforcements(userId).subscribe({
      next: (data) => {
        this.reinforcements = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'No se pudieron cargar las solicitudes presenciales.';
        this.isLoading = false;
        this.cdr.detectChanges();
        console.error('Error al cargar refuerzos presenciales:', err);
      },
    });
  }

  getSessionBadgeClass(tipo: string): string {
    return tipo === 'Grupal' ? 'bg-primary-subtle text-primary' : 'bg-info-subtle text-info';
  }

  getStateBadgeClass(estado: string): string {
    switch (estado) {
      case 'Programado':
        return 'bg-success-subtle text-success';
      case 'Espera espacio':
        return 'bg-warning-subtle text-warning';
      case 'Cancelado':
        return 'bg-danger-subtle text-danger';
      default:
        return 'bg-secondary-subtle text-secondary';
    }
  }

  openAssignModal(item: InPersonReinforcement): void {
    this.selectedReinforcementId = item.pidrefuerzopresencial;
    this.selectedTipoAreaTrabajo = item.pidtipoareatrabajo;
    this.cdr.detectChanges();

    const modalEl = document.getElementById('assignWorkAreaModal');
    if (modalEl) {
      new bootstrap.Modal(modalEl).show();
    }
  }

  onWorkAreaAssigned(): void {
    this.loadReinforcements();
  }
}
