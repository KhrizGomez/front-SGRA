import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GPeriod, GPeriodCUD } from '../../../models/administration/admin-periods/GPeriod.model';
import { SpResponse } from '../../../models/administration/SpResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AdminPeriodsService {

  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getPeriods(filter: string = '', state?: boolean): Observable<GPeriod[]> {
    let params = new HttpParams();
    if (filter) {
      params = params.set('filter', filter);
    }
    if (state !== undefined && state !== null) {
      params = params.set('state', state);
    }
    return this.http.get<GPeriod[]>(`${this.apiUrl}/academic/periods/list-periods`, { params });
  }

  createPeriod(periodData: GPeriodCUD): Observable<SpResponse> {
    return this.http.post<SpResponse>(`${this.apiUrl}/security/periods/create-period`, periodData);
  }

  updatePeriod(periodData: GPeriodCUD): Observable<SpResponse> {
    return this.http.put<SpResponse>(`${this.apiUrl}/security/periods/update-period`, periodData);
  }
}
