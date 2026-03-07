import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkArea } from '../../../../models/workAreaManager/work-area-manager-in-person-requests';
import { WamInPersonRequestsService } from '../../../../services/workAreaManager/work-area-manager-in-person-requests/wam-in-person-requests.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { ToastService } from '../../../../services/shared/toast.service';

declare var bootstrap: any;

@Component({
  selector: 'app-work-area-assign-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './work-area-assign-modal.component.html',
  styleUrl: './work-area-assign-modal.component.css',
})
export class WorkAreaAssignModalComponent {
  @Output() workAreaAssigned = new EventEmitter<void>();

  private inPersonService = inject(WamInPersonRequestsService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private toastService = inject(ToastService);

  workAreas: WorkArea[] = [];
  filteredWorkAreas: WorkArea[] = [];
  isLoading = false;
  isAssigning = false;
  errorMessage: string | null = null;
  searchText = '';

  selectedWorkAreaId: number | null = null;
  currentReinforcementId: number | null = null;
  currentTipoAreaTrabajo: number | null = null;

  @Input() set reinforcementId(id: number | null) {
    this.currentReinforcementId = id;
  }

  @Input() set tipoAreaTrabajo(id: number | null) {
    this.currentTipoAreaTrabajo = id;
    if (this.currentReinforcementId && id) {
      this.selectedWorkAreaId = null;
      this.searchText = '';
      this.loadWorkAreas();
    }
  }

  private loadWorkAreas(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const userId = this.authService.currentUser()?.userId;
    if (!userId || !this.currentTipoAreaTrabajo || !this.currentReinforcementId) return;

    console.log(userId, this.currentTipoAreaTrabajo, this.currentReinforcementId);

    this.inPersonService.getWorkAreas(userId, this.currentTipoAreaTrabajo, this.currentReinforcementId).subscribe({
      next: (data) => {
        this.workAreas = data;
        this.filteredWorkAreas = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar las áreas de trabajo.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  filterWorkAreas(): void {
    const term = this.searchText.toLowerCase().trim();
    if (!term) {
      this.filteredWorkAreas = this.workAreas;
    } else {
      this.filteredWorkAreas = this.workAreas.filter(
        (wa) =>
          wa.pareatrabajo.toLowerCase().includes(term) ||
          wa.pnumeroarea.toLowerCase().includes(term)
      );
    }
  }

  selectWorkArea(id: number): void {
    this.selectedWorkAreaId = this.selectedWorkAreaId === id ? null : id;
  }

  assignWorkArea(): void {
    if (!this.currentReinforcementId || !this.selectedWorkAreaId) return;

    this.isAssigning = true;

    console.log("Solicitud presencial: " + this.currentReinforcementId,"Area de trabjo seleccionada: " +this.selectedWorkAreaId)

    this.inPersonService
      .assignWorkArea({
        pidrefuerzopresencial: this.currentReinforcementId,
        pidareatrabajo: this.selectedWorkAreaId,
      })
      .subscribe({
        next: (response) => {
          this.isAssigning = false;
          if (response.success) {
            this.toastService.show(true, response.message);
            const modalEl = document.getElementById('assignWorkAreaModal');
            if (modalEl) {
              bootstrap.Modal.getInstance(modalEl)?.hide();
            }
            this.workAreaAssigned.emit();
          } else {
            this.toastService.show(false, response.message);
          }
          this.cdr.detectChanges();
        },
        error: () => {
          this.isAssigning = false;
          this.toastService.show(false, 'Error al asignar el área de trabajo.');
          this.cdr.detectChanges();
        },
      });
  }
}
