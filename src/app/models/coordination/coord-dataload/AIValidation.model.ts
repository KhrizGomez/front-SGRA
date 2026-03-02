/**
 * Modelos para la validación IA de archivos Excel
 * Coordinación - RF26 - Carga de Información Base
 */

/**
 * Severidad de un problema detectado
 */
export type AIValidationSeverity = 'ERROR' | 'WARNING' | 'INFO';

/**
 * Representa un problema individual detectado por la validación
 */
export interface AIValidationIssue {
  /** Número de fila en el Excel (1-based) */
  row: number;
  /** Nombre del campo/columna afectada */
  field: string;
  /** Severidad del problema */
  severity: AIValidationSeverity;
  /** Descripción detallada del problema */
  message: string;
  /** Sugerencia de corrección (opcional) */
  suggestion?: string;
  /** Origen de la validación: "AI" o "FALLBACK" */
  source: string;
}

/**
 * Resultado completo de la validación IA
 */
export interface AIValidationResult {
  /** Lista de problemas detectados */
  issues: AIValidationIssue[];
  /** Indica si la validación fue realizada por IA (true) o por fallback Java (false) */
  aiValidated: boolean;
  /** Acción recomendada: "PROCEED", "REVIEW", "REJECT" */
  recommendedAction: 'PROCEED' | 'REVIEW' | 'REJECT';
  /** Resumen general de la validación */
  summary: string;
  /** Tiempo en milisegundos que tomó la validación */
  validationTimeMs?: number;
}

/**
 * Request para validación IA (usado internamente)
 */
export interface AIValidationRequest {
  loadType: string;
  rows: Record<string, unknown>[];
  businessRules?: string[];
  expectedColumns?: string[];
}

