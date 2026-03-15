import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAudit } from '../../../../models/administration/admin-audit/data-audit.model';

@Component({
  selector: 'app-admin-data-audit-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-data-audit-table.component.html',
  styleUrl: './admin-data-audit-table.component.css',
})
export class AdminDataAuditTableComponent {
  @Input() records: DataAudit[] = [];
  @Input() isLoading = true;

  expandedRow: number | null = null;

  toggleDetails(index: number): void {
    this.expandedRow = this.expandedRow === index ? null : index;
  }

  formatJson(data: Record<string, unknown> | null): string {
    if (!data) return '—';
    return JSON.stringify(data, null, 2);
  }

  getKeys(data: Record<string, unknown> | null): string[] {
    return data ? Object.keys(data) : [];
  }
}
