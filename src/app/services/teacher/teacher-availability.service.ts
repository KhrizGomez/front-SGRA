import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface TeacherAvailabilitySlotDTO {
  availabilityId: number | null;
  dayOfWeek: number;
  dayName: string;
  timeSlotId: number;
  startTime: string;
  endTime: string;
}

export interface SaveAvailabilityPayload {
  periodId: number;
  slots: { dayOfWeek: number; timeSlotId: number }[];
}

export interface ApiActionResponseDTO {
  entity_id?: number;
  status: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class TeacherAvailabilityService {
  private readonly baseUrl = environment.apiUrl;
  private readonly opts = { withCredentials: true };

  constructor(private http: HttpClient) {}

  /** Obtiene los slots de disponibilidad configurados por el docente */
  getAvailability(periodId: number): Observable<TeacherAvailabilitySlotDTO[]> {
    return this.http.get<TeacherAvailabilitySlotDTO[]>(
      `${this.baseUrl}/teacher/availability`,
      { ...this.opts, params: { periodId: String(periodId) } }
    ).pipe(catchError(this.handleError));
  }

  /** Guarda (reemplaza) los slots del docente para un periodo */
  saveAvailability(payload: SaveAvailabilityPayload): Observable<ApiActionResponseDTO> {
    return this.http.post<ApiActionResponseDTO>(
      `${this.baseUrl}/teacher/availability`,
      payload,
      this.opts
    ).pipe(catchError(this.handleError));
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let message = 'Error al procesar disponibilidad';
    if (error.status === 0) message = 'No se pudo conectar con el servidor.';
    else if (error.status === 401) message = 'Sesión expirada. Inicia sesión nuevamente.';
    else if (error.status === 403) message = 'No tienes permisos para esta acción.';
    else if (error.error?.message) message = error.error.message;
    return throwError(() => new Error(message));
  };
}