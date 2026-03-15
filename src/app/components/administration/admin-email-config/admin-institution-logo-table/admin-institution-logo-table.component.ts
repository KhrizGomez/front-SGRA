import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { InstitutionLogo } from '../../../../models/administration/admin-email-config/InstitutionLogo.model';
import { AdminEmailConfigService } from '../../../../services/administration/admin-email-config/admin-email-config.service';
import { ToastService } from '../../../../services/shared/toast.service';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-institution-logo-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-institution-logo-table.component.html',
  styleUrl: './admin-institution-logo-table.component.css',
})
export class AdminInstitutionLogoTableComponent implements OnInit {
  institutions: InstitutionLogo[] = [];
  filteredInstitutions: InstitutionLogo[] = [];
  isLoading = true;

  searchControl = new FormControl('');
  statusControl = new FormControl('');

  selectedInstitution: InstitutionLogo | null = null;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isSubmitting = false;

  private configService = inject(AdminEmailConfigService);
  private cdr = inject(ChangeDetectorRef);
  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.loadInstitutions();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.applyFilters());

    this.statusControl.valueChanges
      .subscribe(() => this.applyFilters());
  }

  loadInstitutions(): void {
    this.isLoading = true;
    this.configService.getInstitutionLogos().subscribe({
      next: (data) => {
        this.institutions = data;
        this.applyFilters();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando logos de instituciones', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  applyFilters(): void {
    const search = (this.searchControl.value || '').toLowerCase().trim();
    const statusFilter = this.statusControl.value;

    this.filteredInstitutions = this.institutions.filter((inst) => {
      const matchSearch = !search || inst.inombreinstitucion?.toLowerCase().includes(search);

      let matchStatus = true;
      if (statusFilter === 'true') matchStatus = inst.iestado === true;
      if (statusFilter === 'false') matchStatus = inst.iestado === false;

      return matchSearch && matchStatus;
    });
  }

  openLogoModal(inst: InstitutionLogo): void {
    this.selectedInstitution = inst;
    this.selectedFile = null;
    this.previewUrl = inst.iurllogo || null;
    const modalElement = document.getElementById('assignLogoModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.previewUrl = URL.createObjectURL(this.selectedFile);
    }
  }

  submitLogo(): void {
    if (!this.selectedInstitution || !this.selectedFile) return;

    this.isSubmitting = true;
    const hasLogo = !!this.selectedInstitution.iurllogo;
    const request$ = hasLogo
      ? this.configService.updateLogoInstitution(this.selectedInstitution.iidinstitucion, this.selectedFile)
      : this.configService.assignLogoInstitution(this.selectedInstitution.iidinstitucion, this.selectedFile);
    request$.subscribe({
      next: (response) => {
        if (response.success) {
          this.toastService.show(true, response.message);
          const modalElement = document.getElementById('assignLogoModal');
          if (modalElement) {
            bootstrap.Modal.getInstance(modalElement)?.hide();
          }
          this.loadInstitutions();
        } else {
          this.toastService.show(false, response.message);
        }
        this.isSubmitting = false;
      },
      error: () => {
        this.toastService.show(false, 'Error al asignar el logo.');
        this.isSubmitting = false;
      },
    });
  }
}
