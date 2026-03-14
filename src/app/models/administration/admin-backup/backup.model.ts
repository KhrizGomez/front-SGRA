export interface BackupResult {
  success: boolean;
  message: string;
  fileName: string | null;
  blobUrl: string | null;
  fileSizeBytes: number | null;
  executedBy: string | null;
  executedAt: string | null;
}

export interface BackupHistoryItem {
  fileName: string;
  blobUrl: string;
  fileSizeBytes: number;
  createdAt: string;
}

export interface PgDumpValidation {
  available: boolean;
  version: string;
}

export interface BackupScheduleEntry {
  id?: number;
  habilitado: boolean;
  frecuencia: 'DIARIO' | 'SEMANAL' | 'MENSUAL';
  diaSemana?: string | null;
  diaMes?: number | null;
  hora: number;
  minuto: number;
  fechaUltimaEjecucion?: string | null;
  resultadoUltimaEjecucion?: string | null;
}
