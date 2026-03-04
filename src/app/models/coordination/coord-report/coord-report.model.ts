// ─── Tipos de reporte disponibles ───────────────────────────────────────────
export type ReportTypeKey =
  | 'BY_SUBJECT'
  | 'BY_TEACHER'
  | 'BY_PARALLEL'
  | 'BY_GRADE'
  | 'BY_STUDENT_REQUESTS';

export type ChartTypeKey = 'BAR' | 'PIE' | 'DOUGHNUT' | 'LINE';
export type ReportFormat = 'PDF' | 'EXCEL';

// ─── Columna seleccionable ───────────────────────────────────────────────────
export interface ReportColumn {
  key: string;
  label: string;
  defaultSelected: boolean;
}

// ─── Configuración estática de cada tipo de reporte ─────────────────────────
export interface ReportConfig {
  key: ReportTypeKey;
  label: string;
  description: string;
  icon: string;
  color: string;
  columns: ReportColumn[];
  previewRows: Record<string, string | number>[];
  chartLabels: string[];
  chartDatasets: ChartDatasetDef[];
  allowedCharts: ChartTypeKey[];
  hasGenderBreakdown: boolean;
}

export interface ChartDatasetDef {
  label: string;
  data: number[];
  color: string;
}

// ─── Parámetros enviados al backend ─────────────────────────────────────────
export interface ReportParams {
  type: ReportTypeKey;
  format: ReportFormat;
  dateFrom?: string;
  dateTo?: string;
  columns?: string[];
  chartType?: ChartTypeKey;
}

// ─── Parámetros para obtener datos de vista previa ──────────────────────────
export interface ReportPreviewParams {
  type: ReportTypeKey;
  period?: string;
  dateFrom?: string;
  dateTo?: string;
}

// ─── Respuesta de vista previa (filas genéricas) ────────────────────────────
export type ReportPreviewRow = Record<string, string | number>;
