export interface DataAudit {
  ausuario: string;
  afechaacceso: string;
  afechacierre: string | null;
  aaccion: string;
  atablaafectada: string;
  aidregistro: number;
  afechahoraaccion: string;
  adatosnuevos: Record<string, unknown> | null;
  adatosantiguos: Record<string, unknown> | null;
}
