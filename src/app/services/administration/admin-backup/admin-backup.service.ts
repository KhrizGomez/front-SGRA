import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BackupHistoryItem, BackupResult, PgDumpValidation } from '../../../models/administration/admin-backup/backup.model';

@Injectable({ providedIn: 'root' })
export class AdminBackupService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  validate(): Observable<PgDumpValidation> {
    return this.http.get<PgDumpValidation>(`${this.apiUrl}/admin/backup/validate`);
  }

  trigger(): Observable<BackupResult> {
    return this.http.post<BackupResult>(`${this.apiUrl}/admin/backup/trigger`, {});
  }

  history(): Observable<BackupHistoryItem[]> {
    return this.http.get<BackupHistoryItem[]>(`${this.apiUrl}/admin/backup/history`);
  }

  getDownloadUrl(fileName: string): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(`${this.apiUrl}/admin/backup/download/${encodeURIComponent(fileName)}`);
  }
}
