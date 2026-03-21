import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  BackupHistoryItem,
  BackupLocalConfig,
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

  /** Descarga el contenido del backup a través del backend (evita CORS con Azure). */
  downloadBlob(fileName: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/admin/backup/stream/${encodeURIComponent(fileName)}`, {
      responseType: 'blob'
    });
  }

  deleteBackup(fileName: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/backup/history/${encodeURIComponent(fileName)}`);
  }

  restore(fileName: string): Observable<BackupResult> {
    return this.http.post<BackupResult>(`${this.apiUrl}/admin/backup/restore/${encodeURIComponent(fileName)}`, {});
  }

  restoreToNewDatabase(fileName: string): Observable<BackupResult> {
    return this.http.post<BackupResult>(`${this.apiUrl}/admin/backup/restore-new-db/${encodeURIComponent(fileName)}`, {});
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

  getLocalConfig(): Observable<BackupLocalConfig | null> {
    return this.http.get<BackupLocalConfig>(`${this.apiUrl}/admin/backup/local-config`);
  }

  saveLocalConfig(ruta: string): Observable<BackupLocalConfig> {
    return this.http.post<BackupLocalConfig>(`${this.apiUrl}/admin/backup/local-config`, { ruta });
  }

  browsePath(path?: string): Observable<{ currentPath: string; parentPath: string | null; directories: string[] }> {
    const params = path ? `?path=${encodeURIComponent(path)}` : '';
    return this.http.get<{ currentPath: string; parentPath: string | null; directories: string[] }>(
      `${this.apiUrl}/admin/backup/browse${params}`
    );
  }

  restorebdNoExistent(fileName: string): Observable<boolean>{
    const params = new HttpParams().set('fileName', fileName);
    return this.http.post<boolean>(`${this.apiUrl}/admin/backup/restorebd-no-existent`, null, { params });
  }

  checkDatabase(): Observable<{ available: boolean }> {
    return this.http.get<{ available: boolean }>(`${this.apiUrl}/admin/backup/db-check`);
  }
}
