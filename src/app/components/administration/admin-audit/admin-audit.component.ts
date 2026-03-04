import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AuditAccess } from '../../../models/administration/admin-audit/audit-access.model';
import { AdminAuditService } from '../../../services/administration/admin-audit/admin-audit.service';
import { AdminAuditTableComponent } from './admin-audit-table/admin-audit-table.component';

@Component({
  selector: 'app-admin-audit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminAuditTableComponent],
  templateUrl: './admin-audit.component.html',
  styleUrl: './admin-audit.component.css',
})
export class AdminAuditComponent implements OnInit {
  auditRecords: AuditAccess[] = [];
  filteredRecords: AuditAccess[] = [];
  isLoading = true;

  searchControl = new FormControl('');

  private auditService = inject(AdminAuditService);
  private cdr = inject(ChangeDetectorRef);

  currentPage = 1;
  pageSize = 10;

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

  ngOnInit(): void {
    this.loadAuditRecords();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
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

    this.filteredRecords = this.auditRecords.filter((record) => {
      return (
        !search ||
        record.ausuario?.toLowerCase().includes(search) ||
        record.adireccionip?.toLowerCase().includes(search) ||
        record.anavegador?.toLowerCase().includes(search) ||
        record.aaccion?.toLowerCase().includes(search)
      );
    });

    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
