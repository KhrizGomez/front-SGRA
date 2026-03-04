import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditAccess } from '../../../../models/administration/admin-audit/audit-access.model';

@Component({
  selector: 'app-admin-audit-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-audit-table.component.html',
  styleUrl: './admin-audit-table.component.css',
})
export class AdminAuditTableComponent {
  @Input() records: AuditAccess[] = [];
  @Input() isLoading = true;
}
