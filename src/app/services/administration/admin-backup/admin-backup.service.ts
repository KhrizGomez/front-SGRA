import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  BackupHistoryItem,
  BackupResult,
  BackupScheduleEntry,
  PgDumpValidation
} from '../../../models/administration/admin-backup/backup.model';

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

  deleteBackup(fileName: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/backup/history/${encodeURIComponent(fileName)}`);
  }

  // Programaciones automáticas
  listSchedules(): Observable<BackupScheduleEntry[]> {
    return this.http.get<BackupScheduleEntry[]>(`${this.apiUrl}/admin/backup/schedules`);
  }

  createSchedule(entry: BackupScheduleEntry): Observable<BackupScheduleEntry> {
    return this.http.post<BackupScheduleEntry>(`${this.apiUrl}/admin/backup/schedules`, entry);
  }

  updateSchedule(id: number, entry: BackupScheduleEntry): Observable<BackupScheduleEntry> {
    return this.http.put<BackupScheduleEntry>(`${this.apiUrl}/admin/backup/schedules/${id}`, entry);
  }

  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/backup/schedules/${id}`);
  }
}
