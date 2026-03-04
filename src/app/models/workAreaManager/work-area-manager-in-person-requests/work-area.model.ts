export interface WorkArea {
  pidareatrabajo: number;
  pnumeroarea: string;
  pdisponibilidad: string;
  pcapacidad: number;
  pplanta: number;
  pareatrabajo: string;
}

export interface AssignWorkAreaPayload {
  pidrefuerzopresencial: number;
  pidareatrabajo: number;
}
