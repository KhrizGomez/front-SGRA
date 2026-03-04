import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type ReportType = 'COORDINATION_DASHBOARD' | 'ATTENDANCE_DETAIL' | 'REQUESTS_DETAIL';
export type ReportFormat = 'EXCEL' | 'PDF';

@Injectable({ providedIn: 'root' })
export class CoordReportService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/reports/download`;

  /**
   * Descarga un reporte del backend como Blob binario.
   * El componente consumer es responsable de crear la URL y disparar la descarga.
   */
  downloadReport(type: ReportType, format: ReportFormat): Observable<Blob> {
    return this.http.get(this.apiUrl, {
      params: { type, format },
      responseType: 'blob',
    });
  }
}
