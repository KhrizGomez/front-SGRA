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
  @Output() forceLogoutRequest = new EventEmitter<{ asesion: string; ausuario: string }>();

  forcingLogout: string | null = null;

  onForceLogout(asesion: string, ausuario: string): void {
    if (!asesion) return;
    this.forcingLogout = asesion;
    this.forceLogoutRequest.emit({ asesion, ausuario });
  }

  clearForcingState(): void {
    this.forcingLogout = null;
  }
}
