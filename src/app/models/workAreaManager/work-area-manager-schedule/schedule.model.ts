export interface ScheduleOccupancy {
  pidocupacion: number;
  pareatrabajo: string;
  pnumeroarea: string;
  pdiasemana: string;
  pfecha: string;
  phorainicio: string;
  phorafin: string;
  pdocente: string;
  pmateria: string;
  ptiposesion: string;
}

export interface ScheduleFilter {
  workAreaId?: number;
  weekStartDate?: string;
}

export interface WorkAreaOption {
  pidareatrabajo: number;
  pareatrabajo: string;
  pnumeroarea: string;
}
