import { Component, OnInit, inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AuditAccess } from '../../../models/administration/admin-audit/audit-access.model';
import { DataAudit } from '../../../models/administration/admin-audit/data-audit.model';
import { AdminAuditService } from '../../../services/administration/admin-audit/admin-audit.service';
import { AdminAuditTableComponent } from './admin-audit-table/admin-audit-table.component';
import { AdminDataAuditTableComponent } from './admin-data-audit-table/admin-data-audit-table.component';
import { ToastService } from '../../../services/shared/toast.service';

@Component({
  selector: 'app-admin-audit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminAuditTableComponent, AdminDataAuditTableComponent],
  templateUrl: './admin-audit.component.html',
  styleUrl: './admin-audit.component.css',
})
export class AdminAuditComponent implements OnInit {
  @ViewChild(AdminAuditTableComponent) auditTable!: AdminAuditTableComponent;

  auditRecords: AuditAccess[] = [];
  filteredRecords: AuditAccess[] = [];
  isLoading = true;
  searchControl = new FormControl('');
  statusFilterControl = new FormControl('');
  currentPage = 1;
  pageSize = 10;

  dataAuditRecords: DataAudit[] = [];
  filteredDataRecords: DataAudit[] = [];
  isLoadingData = true;
  searchDataControl = new FormControl('');
  dateFilterControl = new FormControl('');
  actionFilterDataControl = new FormControl('');
  currentDataPage = 1;
  dataPageSize = 10;

  private auditService = inject(AdminAuditService);
  private cdr = inject(ChangeDetectorRef);
  private toastService = inject(ToastService);

  get totalPages(): number {
    return Math.ceil(this.filteredRecords.length / this.pageSize) || 1;
  }

  get paginatedRecords(): AuditAccess[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredRecords.slice(start, start + this.pageSize);
  }

  get pages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 2;
    const range: number[] = [];

    for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
      range.push(i);
    }
    return range;
  }

  get totalDataPages(): number {
    return Math.ceil(this.filteredDataRecords.length / this.dataPageSize) || 1;
  }

  get paginatedDataRecords(): DataAudit[] {
    const start = (this.currentDataPage - 1) * this.dataPageSize;
    return this.filteredDataRecords.slice(start, start + this.dataPageSize);
  }

  get dataPages(): number[] {
    const total = this.totalDataPages;
    const current = this.currentDataPage;
    const delta = 2;
    const range: number[] = [];

    for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
      range.push(i);
    }
    return range;
  }

  ngOnInit(): void {
    this.loadAuditRecords();
    this.loadDataAuditRecords();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.applyFilters());

    this.searchDataControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.applyDataFilters());


    this.dateFilterControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => this.loadDataAuditRecords());

    this.actionFilterDataControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => this.applyDataFilters());

    this.statusFilterControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => this.applyFilters());
  }

  loadAuditRecords(): void {
    this.isLoading = true;
    this.auditService.getAuditAccessList().subscribe({
      next: (data) => {
        this.auditRecords = data;
        this.applyFilters();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando registros de auditoría', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  applyFilters(): void {
    const search = (this.searchControl.value || '').toLowerCase().trim();
    const status = this.statusFilterControl.value || '';

    this.filteredRecords = this.auditRecords.filter((record) => {
      const matchesSearch =
        !search ||
        record.ausuario?.toLowerCase().includes(search) ||
        record.adireccionip?.toLowerCase().includes(search) ||
        record.anavegador?.toLowerCase().includes(search) ||
        record.aaccion?.toLowerCase().includes(search) ||
        record.aso?.toLowerCase().includes(search);

      const matchesStatus =
        !status || record.aaccion === status;

      return matchesSearch && matchesStatus;
    });

    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  handleForceLogout(event: { aidauditoriaacceso: number; ausuario: string }): void {
    this.auditService.forceLogout(event.aidauditoriaacceso).subscribe({
      next: () => {
        this.toastService.show(true, `Sesión de "${event.ausuario}" cerrada correctamente.`);
        this.auditTable?.clearForcingState();
        this.loadAuditRecords();
      },
      error: (err) => {
        console.error('Error al forzar cierre de sesión', err);
        this.toastService.show(false, `No se pudo cerrar la sesión de "${event.ausuario}".`);
        this.auditTable?.clearForcingState();
      },
    });
  }

  loadDataAuditRecords(): void {
    this.isLoadingData = true;
    const date = this.dateFilterControl.value || undefined;
    this.auditService.getDataAuditList(date).subscribe({
      next: (data) => {
        this.dataAuditRecords = data;
        this.applyDataFilters();
        this.isLoadingData = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando registros de auditoría de datos', err);
        this.isLoadingData = false;
        this.cdr.detectChanges();
      },
    });
  }

  applyDataFilters(): void {
    const search = (this.searchDataControl.value || '').toLowerCase().trim();
    const action = (this.actionFilterDataControl.value || '').toUpperCase();

    this.filteredDataRecords = this.dataAuditRecords.filter((record) => {
      const matchesSearch =
        !search ||
        record.ausuario?.toLowerCase().includes(search) ||
        record.aaccion?.toLowerCase().includes(search) ||
        record.atablaafectada?.toLowerCase().includes(search);

      const matchesAction =
        !action || record.aaccion?.toUpperCase() === action;

      return matchesSearch && matchesAction;
    });

    this.currentDataPage = 1;
  }

  goToDataPage(page: number): void {
    if (page >= 1 && page <= this.totalDataPages) {
      this.currentDataPage = page;
    }
  }
}

