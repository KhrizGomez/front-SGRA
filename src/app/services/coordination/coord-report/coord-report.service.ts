import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  PeriodType,
  ReportConfig,
  ReportParams,
  ReportPreviewParams,
  ReportPreviewRow,
} from '../../../models/coordination/coord-report/coord-report.model';

// Re-export legacy types for backwards compatibility
export type ReportType = 'COORDINATION_DASHBOARD' | 'ATTENDANCE_DETAIL' | 'REQUESTS_DETAIL';
export type ReportFormat = 'EXCEL' | 'PDF';

@Injectable({ providedIn: 'root' })
export class CoordReportService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/reports`;

  /**
   * Obtiene los datos reales de preview para la tabla y el gráfico.
   * GET /api/reports/preview?type=...&period=...
   */
  getReportPreview(params: ReportPreviewParams): Observable<ReportPreviewRow[]> {
    const queryParams: Record<string, string> = { type: params.type };
    // El backend espera un único parámetro ?period=<valor>
    if (params.periodValue) {
      queryParams['period'] = params.periodValue;
    }
    return this.http.get<ReportPreviewRow[] | { data: ReportPreviewRow[] } | null>(
      `${this.baseUrl}/preview`, { params: queryParams }
    ).pipe(
      map(res => {
        if (!res) return [];
        if (Array.isArray(res)) return res;
        // Soporte para respuesta envuelta: { data: [...] }
        if (Array.isArray((res as any).data)) return (res as any).data as ReportPreviewRow[];
        return [];
      })
    );
  }

  /**
   * Descarga un reporte del backend como Blob binario.
   */
  downloadReport(params: ReportParams): Observable<Blob> {
    const { type, format, periodValue, columns } = params;
    const queryParams: Record<string, string> = { type, format };
    // El backend espera un único parámetro ?period=<valor>
    if (periodValue) queryParams['period'] = periodValue;
    if (columns?.length) queryParams['columns'] = columns.join(',');
    return this.http.get(`${this.baseUrl}/download`, { params: queryParams, responseType: 'blob' });
  }

  /**
   * Configuración estática de cada tipo de reporte (columnas, etiquetas, íconos).
   * Los previewRows son de respaldo para cuando el backend no responde.
   */
  getReportConfigs(): ReportConfig[] {
    return REPORT_CONFIGS;
  }
}

// ─── Paleta de colores ────────────────────────────────────────────────────────
const C = {
  green:  '#1B7505',
  blue:   '#0d6efd',
  purple: '#7c3aed',
  orange: '#f97316',
  teal:   '#0891b2',
  female: '#ec4899',
  male:   '#3b82f6',
};

// ─── Configuraciones estáticas con datos mock para la vista previa ────────────
export const REPORT_CONFIGS: ReportConfig[] = [
  {
    key: 'BY_SUBJECT',
    label: 'Por Materia',
    description: 'Solicitudes de refuerzo agrupadas por asignatura.',
    icon: 'bi-journal-bookmark-fill',
    color: C.green,
    allowedCharts: ['BAR', 'PIE'],
    hasGenderBreakdown: false,
    columns: [
      { key: 'asignatura',   label: 'Materia',             defaultSelected: true  },
      { key: 'totalMateria', label: 'Total Solicitudes',   defaultSelected: true  },
      { key: 'pendientes',   label: 'Pendientes',          defaultSelected: true  },
      { key: 'gestionadas',  label: 'Gestionadas',         defaultSelected: true  },
    ],
    previewRows: [
      { asignatura: 'Matemáticas', totalMateria: 45, pendientes: 5,  gestionadas: 40 },
      { asignatura: 'Física',      totalMateria: 32, pendientes: 3,  gestionadas: 29 },
      { asignatura: 'Química',     totalMateria: 28, pendientes: 8,  gestionadas: 20 },
      { asignatura: 'Lengua',      totalMateria: 20, pendientes: 2,  gestionadas: 18 },
      { asignatura: 'Historia',    totalMateria: 15, pendientes: 1,  gestionadas: 14 },
    ],
    chartLabels: ['Matemáticas', 'Física', 'Química', 'Lengua', 'Historia'],
    chartDatasets: [
      { label: 'Total Solicitudes', data: [45, 32, 28, 20, 15], color: C.green },
    ],
  },
  {
    key: 'BY_TEACHER',
    label: 'Por Docente',
    description: 'Carga de sesiones de refuerzo por cada docente.',
    icon: 'bi-person-workspace',
    color: C.blue,
    allowedCharts: ['BAR', 'PIE'],
    hasGenderBreakdown: false,
    columns: [
      { key: 'docente',     label: 'Docente',               defaultSelected: true },
      { key: 'materia',     label: 'Materia',               defaultSelected: true },
      { key: 'sesiones',    label: 'Sesiones Dictadas',     defaultSelected: true },
      { key: 'estudiantes', label: 'Estudiantes Atendidos', defaultSelected: true },
    ],
    previewRows: [
      { docente: 'Dr. López',    materia: 'Matemáticas', sesiones: 22, estudiantes: 45 },
      { docente: 'Mg. García',   materia: 'Física',      sesiones: 18, estudiantes: 32 },
      { docente: 'Lcda. Torres', materia: 'Química',     sesiones: 15, estudiantes: 28 },
      { docente: 'Dr. Ruiz',     materia: 'Lengua',      sesiones: 12, estudiantes: 20 },
      { docente: 'Prof. Vega',   materia: 'Historia',    sesiones: 10, estudiantes: 15 },
    ],
    chartLabels: ['Dr. López', 'Mg. García', 'Lcda. Torres', 'Dr. Ruiz', 'Prof. Vega'],
    chartDatasets: [
      { label: 'Sesiones Dictadas', data: [22, 18, 15, 12, 10], color: C.blue },
    ],
  },
  {
    key: 'BY_SECTION_AND_GRADE',
    label: 'Por Paralelo y Curso',
    description: 'Distribución de solicitudes por paralelo y nivel (semestre).',
    icon: 'bi-diagram-3-fill',
    color: C.purple,
    allowedCharts: ['BAR', 'LINE', 'PIE'],
    hasGenderBreakdown: false,
    columns: [
      { key: 'paralelo',     label: 'Paralelo',         defaultSelected: true },
      { key: 'curso',        label: 'Curso',             defaultSelected: true },
      { key: 'solicitudes',  label: 'Total Solicitudes', defaultSelected: true },
      { key: 'asistencia',   label: 'Asistencia (%)',    defaultSelected: true },
      { key: 'inasistencia', label: 'Inasistencia (%)',  defaultSelected: true },
    ],
    previewRows: [
      { paralelo: 'A', curso: '1ro Semestre',  solicitudes: 18, asistencia: '88%', inasistencia: '12%' },
      { paralelo: 'B', curso: '1ro Semestre',  solicitudes: 15, asistencia: '85%', inasistencia: '15%' },
      { paralelo: 'A', curso: '2do Semestre',  solicitudes: 22, asistencia: '90%', inasistencia: '10%' },
      { paralelo: 'C', curso: '3ro Semestre',  solicitudes: 14, asistencia: '92%', inasistencia: '8%'  },
      { paralelo: 'B', curso: '4to Semestre',  solicitudes: 20, asistencia: '87%', inasistencia: '13%' },
      { paralelo: 'A', curso: '5to Semestre',  solicitudes: 16, asistencia: '91%', inasistencia: '9%'  },
    ],
    chartLabels: ['A-1ro', 'B-1ro', 'A-2do', 'C-3ro', 'B-4to', 'A-5to'],
    chartDatasets: [
      { label: 'Solicitudes', data: [18, 15, 22, 14, 20, 16], color: C.purple },
    ],
  },
  // ── COMENTADO: reporte Por Estudiantes (no requerido por ahora) ──────────
  // {
  //   key: 'BY_STUDENT_REQUESTS',
  //   label: 'Por Estudiantes',
  //   description: 'Solicitudes de refuerzo por estudiante con la materia en que más pide apoyo.',
  //   icon: 'bi-people-fill',
  //   color: C.teal,
  //   allowedCharts: ['BAR', 'PIE'],
  //   hasGenderBreakdown: false,
  //   columns: [
  //     { key: 'estudiante',       label: 'Estudiante',               defaultSelected: true },
  //     { key: 'solicitudes',      label: 'Total Solicitudes',        defaultSelected: true },
  //     { key: 'materia_refuerzo', label: 'Materia con más refuerzo', defaultSelected: true },
  //     { key: 'asistencia',       label: 'Asistencia (%)',           defaultSelected: true },
  //   ],
  //   previewRows: [],
  //   chartLabels: [],
  //   chartDatasets: [],
  // },
];
