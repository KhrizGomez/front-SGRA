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
    allowedCharts: ['BAR', 'PIE', 'DOUGHNUT'],
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
    allowedCharts: ['BAR', 'PIE', 'DOUGHNUT'],
    hasGenderBreakdown: false,
    columns: [
      { key: 'docente',      label: 'Docente',                defaultSelected: true  },
      { key: 'materia',      label: 'Materia',                defaultSelected: true  },
      { key: 'sesiones',     label: 'Sesiones Dictadas',      defaultSelected: true  },
      { key: 'estudiantes',  label: 'Estudiantes Atendidos',  defaultSelected: true  },
      { key: 'calificacion', label: 'Calificación Prom.',     defaultSelected: false },
    ],
    previewRows: [
      { docente: 'Dr. López',    materia: 'Matemáticas', sesiones: 22, estudiantes: 45, calificacion: '4.2' },
      { docente: 'Mg. García',   materia: 'Física',      sesiones: 18, estudiantes: 32, calificacion: '3.9' },
      { docente: 'Lcda. Torres', materia: 'Química',     sesiones: 15, estudiantes: 28, calificacion: '4.0' },
      { docente: 'Dr. Ruiz',     materia: 'Lengua',      sesiones: 12, estudiantes: 20, calificacion: '4.5' },
      { docente: 'Prof. Vega',   materia: 'Historia',    sesiones: 10, estudiantes: 15, calificacion: '4.1' },
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
    allowedCharts: ['BAR', 'PIE', 'DOUGHNUT'],
    hasGenderBreakdown: false,
    columns: [
      { key: 'paralelo',    label: 'Paralelo',        defaultSelected: true  },
      { key: 'materia',     label: 'Materia',         defaultSelected: true  },
      { key: 'solicitudes', label: 'Solicitudes',     defaultSelected: true  },
      { key: 'asistencia',  label: 'Asistencia (%)',  defaultSelected: true  },
      { key: 'reprobacion', label: 'Reprobación (%)', defaultSelected: false },
    ],
    previewRows: [
      { paralelo: 'A', materia: 'Matemáticas', solicitudes: 18, asistencia: '88%', reprobacion: '10%' },
      { paralelo: 'B', materia: 'Matemáticas', solicitudes: 15, asistencia: '85%', reprobacion: '14%' },
      { paralelo: 'C', materia: 'Matemáticas', solicitudes: 12, asistencia: '90%', reprobacion: '8%'  },
      { paralelo: 'A', materia: 'Física',      solicitudes: 14, asistencia: '92%', reprobacion: '6%'  },
      { paralelo: 'B', materia: 'Física',      solicitudes: 18, asistencia: '87%', reprobacion: '11%' },
    ],
    chartLabels: ['Paralelo A', 'Paralelo B', 'Paralelo C', 'Paralelo D'],
    chartDatasets: [
      { label: 'Solicitudes', data: [44, 38, 30, 22], color: C.purple },
    ],
  },
  {
    key: 'BY_GRADE',
    label: 'Por Curso',
    description: 'Solicitudes de refuerzo por nivel (Primero, Segundo, …).',
    icon: 'bi-layers-fill',
    color: C.orange,
    allowedCharts: ['BAR', 'LINE', 'PIE'],
    hasGenderBreakdown: false,
    columns: [
      { key: 'curso',       label: 'Curso',              defaultSelected: true  },
      { key: 'solicitudes', label: 'Total Solicitudes',  defaultSelected: true  },
      { key: 'asistencia',  label: 'Asistencia (%)',     defaultSelected: true  },
      { key: 'reprobacion', label: 'Reprobación (%)',    defaultSelected: true  },
      { key: 'aprobados',   label: 'Aprobados (%)',      defaultSelected: false },
    ],
    previewRows: [
      { curso: 'Primero', solicitudes: 120, asistencia: '86%', reprobacion: '12%', aprobados: '88%' },
      { curso: 'Segundo', solicitudes: 95,  asistencia: '89%', reprobacion: '9%',  aprobados: '91%' },
      { curso: 'Tercero', solicitudes: 88,  asistencia: '91%', reprobacion: '8%',  aprobados: '92%' },
      { curso: 'Cuarto',  solicitudes: 74,  asistencia: '93%', reprobacion: '6%',  aprobados: '94%' },
      { curso: 'Quinto',  solicitudes: 80,  asistencia: '92%', reprobacion: '7%',  aprobados: '93%' },
    ],
    chartLabels: ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto'],
    chartDatasets: [
      { label: 'Solicitudes', data: [120, 95, 88, 74, 80], color: C.orange },
    ],
  },
  {
    key: 'BY_STUDENT_REQUESTS',
    label: 'Por Estudiantes',
    description: 'Top estudiantes que más solicitan matrícula en refuerzo, separados por género.',
    icon: 'bi-people-fill',
    color: C.teal,
    allowedCharts: ['BAR', 'PIE'],
    hasGenderBreakdown: true,
    columns: [
      { key: 'estudiante',  label: 'Estudiante',         defaultSelected: true  },
      { key: 'genero',      label: 'Género',             defaultSelected: true  },
      { key: 'solicitudes', label: 'Total Solicitudes',  defaultSelected: true  },
      { key: 'materias',    label: 'Materias Distintas', defaultSelected: true  },
      { key: 'asistencia',  label: 'Asistencia (%)',     defaultSelected: false },
    ],
    previewRows: [
      { estudiante: 'Juan Pérez',     genero: 'Masculino', solicitudes: 12, materias: 4, asistencia: '92%' },
      { estudiante: 'Ana García',     genero: 'Femenino',  solicitudes: 11, materias: 3, asistencia: '95%' },
      { estudiante: 'Carlos López',   genero: 'Masculino', solicitudes: 9,  materias: 2, asistencia: '88%' },
      { estudiante: 'María Torres',   genero: 'Femenino',  solicitudes: 8,  materias: 3, asistencia: '90%' },
      { estudiante: 'Luis Rodríguez', genero: 'Masculino', solicitudes: 7,  materias: 2, asistencia: '85%' },
      { estudiante: 'Sofía Mendoza',  genero: 'Femenino',  solicitudes: 7,  materias: 3, asistencia: '93%' },
    ],
    chartLabels: ['Juan P.', 'Ana G.', 'Carlos L.', 'María T.', 'Luis R.', 'Sofía M.'],
    chartDatasets: [
      { label: 'Masculino', data: [12,  0, 9, 0, 7, 0], color: C.male   },
      { label: 'Femenino',  data: [ 0, 11, 0, 8, 0, 7], color: C.female },
    ],
  },
];
