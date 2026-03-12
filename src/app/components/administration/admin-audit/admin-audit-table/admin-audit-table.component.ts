import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() forceLogoutRequest = new EventEmitter<{ aidauditoriaacceso: number; ausuario: string }>();

  forcingLogout: number | null = null;

  onForceLogout(aidauditoriaacceso: number, ausuario: string): void {
    if (!aidauditoriaacceso) return;
    this.forcingLogout = aidauditoriaacceso;
    this.forceLogoutRequest.emit({ aidauditoriaacceso, ausuario });
  }

  clearForcingState(): void {
    this.forcingLogout = null;
  }
}
