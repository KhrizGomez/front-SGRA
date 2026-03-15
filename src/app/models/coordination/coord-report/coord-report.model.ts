// ─── Tipos de reporte disponibles ───────────────────────────────────────────
export type ReportTypeKey =
  | 'BY_SUBJECT'
  | 'BY_TEACHER'
  | 'BY_SECTION_AND_GRADE';

export type ChartTypeKey = 'BAR' | 'PIE' | 'DOUGHNUT' | 'LINE';
export type ReportFormat = 'PDF' | 'EXCEL';
export type PeriodType = 'PERIOD' | 'YEAR' | 'WEEKLY' | 'MONTHLY';

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
  periodType?: PeriodType;
  periodValue?: string;
  columns?: string[];
  chartType?: ChartTypeKey;
}

// ─── Parámetros para obtener datos de vista previa ──────────────────────────
export interface ReportPreviewParams {
  type: ReportTypeKey;
  periodType?: PeriodType;
  periodValue?: string;
}

// ─── Respuesta de vista previa (filas genéricas) ────────────────────────────
export type ReportPreviewRow = Record<string, string | number>;

// ─── Logo de institución del usuario autenticado ────────────────────────────
export interface InstitutionLogoDTO {
  institutionId: number;
  logoUrl: string;
  institutionName: string;
}
