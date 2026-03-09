import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuditAccess } from '../../../models/administration/admin-audit/audit-access.model';

@Injectable({
  providedIn: 'root',
})
export class AdminAuditService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAuditAccessList(filter?: string): Observable<AuditAccess[]> {
    let params = new HttpParams();

    if (filter) {
      params = params.set('filter', filter);
    }

    return this.http.get<AuditAccess[]>(`${this.apiUrl}/security/audit/list-access-audit`, { params });
  }

  forceLogout(sessionId: string): Observable<{ message?: string; error?: string }> {
    const params = new HttpParams().set('sessionId', sessionId);
    return this.http.delete<{ message?: string; error?: string }>(
      `${this.apiUrl}/security/audit/force-logout`,
      { params }
    );
  }
}
