export interface GPeriod {
  idperiodo: number;
  periodo: string;
  fechainicio: string;
  fechafin: string;
  estado: boolean;
}

export interface GPeriodCUD {
  periodId?: number;
  period: string;
  startDate: string;
  endDate: string;
  state: boolean;
}
