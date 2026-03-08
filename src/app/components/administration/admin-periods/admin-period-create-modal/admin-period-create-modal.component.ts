import { Component, EventEmitter, Output, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminPeriodsService } from '../../../../services/administration/admin-periods/admin-periods.service';
import { ToastService } from '../../../../services/shared/toast.service';
import { GPeriod } from '../../../../models/administration/admin-periods/GPeriod.model';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-period-create-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-period-create-modal.component.html',
  styleUrl: './admin-period-create-modal.component.css',
})
export class AdminPeriodCreateModalComponent {
  @Output() periodSaved = new EventEmitter<void>();

  periodForm: FormGroup;
  isSubmitting: boolean = false;
  isEditing: boolean = false;
  currentPeriodId: number | null = null;

  private fb = inject(FormBuilder);
  private periodService = inject(AdminPeriodsService);
  private toastService = inject(ToastService);

  constructor() {
    this.periodForm = this.fb.group({
      period: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['activo', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.periodForm.invalid) {
      this.periodForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formValues = this.periodForm.value;

    const requestPayload = {
      periodId: this.isEditing ? (this.currentPeriodId ?? undefined) : undefined,
      period: formValues.period,
      startDate: formValues.startDate,
      endDate: formValues.endDate,
      state: formValues.status === 'activo',
    };

    console.log(requestPayload);

    const request$ = this.isEditing
      ? this.periodService.updatePeriod(requestPayload)
      : this.periodService.createPeriod(requestPayload);

    request$.subscribe({
      next: (response) => {
        if (response.success) {
          this.toastService.show(true, response.message);

          const modalElement = document.getElementById('createPeriodModal');
          if (modalElement) {
            bootstrap.Modal.getInstance(modalElement)?.hide();
          }
          this.periodForm.reset({ status: 'activo' });
          this.periodSaved.emit();
        } else {
          this.toastService.show(false, response.message);
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error en periodo:', error);
        this.isSubmitting = false;
        this.toastService.show(false, this.isEditing ? 'Error al actualizar el periodo' : 'Error al crear el periodo');
      },
    });
  }

  @Input() set periodToEdit(period: GPeriod | null) {
    if (period) {
      this.isEditing = true;
      this.currentPeriodId = period.idperiodo;

      const startDate = period.fechainicio ? new Date(period.fechainicio).toISOString().split('T')[0] : '';
      const endDate = period.fechafin ? new Date(period.fechafin).toISOString().split('T')[0] : '';

      this.periodForm.patchValue({
        period: period.periodo,
        startDate: startDate,
        endDate: endDate,
        status: period.estado ? 'activo' : 'inactivo',
      });
    } else {
      this.isEditing = false;
      this.currentPeriodId = null;
      this.periodForm.reset({ status: 'activo' });
    }
  }

  get f() {
    return this.periodForm.controls;
  }
}
