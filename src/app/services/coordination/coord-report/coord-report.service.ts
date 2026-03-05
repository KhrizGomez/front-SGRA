import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
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
    if (params.period)   queryParams['period']   = params.period;
    if (params.dateFrom) queryParams['dateFrom'] = params.dateFrom;
    if (params.dateTo)   queryParams['dateTo']   = params.dateTo;
    return this.http.get<ReportPreviewRow[]>(`${this.baseUrl}/preview`, { params: queryParams });
  }

  /**
   * Descarga un reporte del backend como Blob binario.
   */
  downloadReport(params: ReportParams): Observable<Blob> {
    const { type, format, dateFrom, dateTo, columns } = params;
    const queryParams: Record<string, string> = { type, format };
    if (dateFrom) queryParams['dateFrom'] = dateFrom;
    if (dateTo)   queryParams['dateTo']   = dateTo;
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
    key: 'BY_PARALLEL',
    label: 'Por Paralelo',
    description: 'Distribución de solicitudes por paralelo (A, B, C…).',
    icon: 'bi-diagram-3-fill',
    color: C.purple,
    allowedCharts: ['BAR', 'PIE'],
    hasGenderBreakdown: false,
    columns: [
      { key: 'paralelo',    label: 'Paralelo',         defaultSelected: true },
      { key: 'materia',     label: 'Materia',          defaultSelected: true },
      { key: 'solicitudes', label: 'Solicitudes',      defaultSelected: true },
      { key: 'asistencia',  label: 'Asistencia (%)',   defaultSelected: true },
      { key: 'inasistencia',label: 'Inasistencia (%)', defaultSelected: true },
    ],
    previewRows: [
      { paralelo: 'A', materia: 'Matemáticas', solicitudes: 18, asistencia: '88%', inasistencia: '12%' },
      { paralelo: 'B', materia: 'Matemáticas', solicitudes: 15, asistencia: '85%', inasistencia: '15%' },
      { paralelo: 'C', materia: 'Matemáticas', solicitudes: 12, asistencia: '90%', inasistencia: '10%' },
      { paralelo: 'A', materia: 'Física',      solicitudes: 14, asistencia: '92%', inasistencia: '8%'  },
      { paralelo: 'B', materia: 'Física',      solicitudes: 18, asistencia: '87%', inasistencia: '13%' },
    ],
    chartLabels: ['Paralelo A', 'Paralelo B', 'Paralelo C', 'Paralelo D'],
    chartDatasets: [
      { label: 'Solicitudes', data: [44, 38, 30, 22], color: C.purple },
    ],
  },
  {
    key: 'BY_GRADE',
    label: 'Por Curso',
    description: 'Solicitudes de refuerzo por nivel (1ro a 10mo semestre).',
    icon: 'bi-layers-fill',
    color: C.orange,
    allowedCharts: ['BAR', 'LINE', 'PIE'],
    hasGenderBreakdown: false,
    columns: [
      { key: 'curso',        label: 'Curso',             defaultSelected: true },
      { key: 'solicitudes',  label: 'Total Solicitudes', defaultSelected: true },
      { key: 'asistencia',   label: 'Asistencia (%)',    defaultSelected: true },
      { key: 'inasistencia', label: 'Inasistencia (%)',  defaultSelected: true },
    ],
    previewRows: [
      { curso: '1ro Semestre',  solicitudes: 120, asistencia: '86%', inasistencia: '14%' },
      { curso: '2do Semestre',  solicitudes: 95,  asistencia: '89%', inasistencia: '11%' },
      { curso: '3ro Semestre',  solicitudes: 88,  asistencia: '91%', inasistencia: '9%'  },
      { curso: '4to Semestre',  solicitudes: 74,  asistencia: '93%', inasistencia: '7%'  },
      { curso: '5to Semestre',  solicitudes: 80,  asistencia: '92%', inasistencia: '8%'  },
      { curso: '6to Semestre',  solicitudes: 68,  asistencia: '90%', inasistencia: '10%' },
      { curso: '7mo Semestre',  solicitudes: 55,  asistencia: '94%', inasistencia: '6%'  },
      { curso: '8vo Semestre',  solicitudes: 48,  asistencia: '95%', inasistencia: '5%'  },
      { curso: '9no Semestre',  solicitudes: 40,  asistencia: '96%', inasistencia: '4%'  },
      { curso: '10mo Semestre', solicitudes: 32,  asistencia: '97%', inasistencia: '3%'  },
    ],
    chartLabels: ['1ro', '2do', '3ro', '4to', '5to', '6to', '7mo', '8vo', '9no', '10mo'],
    chartDatasets: [
      { label: 'Total Solicitudes', data: [120, 95, 88, 74, 80, 68, 55, 48, 40, 32], color: C.orange },
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
