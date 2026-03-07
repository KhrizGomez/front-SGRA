import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  InPersonReinforcement,
  WorkArea,
  AssignWorkAreaPayload,
} from '../../../models/workAreaManager/work-area-manager-in-person-requests';
import { SpResponse } from '../../../models/administration/SpResponse.model';

@Injectable({
  providedIn: 'root',
})
export class WamInPersonRequestsService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getInPersonReinforcements(userId: number): Observable<InPersonReinforcement[]> {
    let params = new HttpParams();
    params = params.set('userId', userId);
    return this.http.get<InPersonReinforcement[]>(
      `${this.apiUrl}/reinforcement/on-site-reinforcements/list-areas-ofsite`,
      { params },
    );
  }

  getWorkAreas(userId: number, workAreaTypeId: number, programmedId: number): Observable<WorkArea[]> {
    let params = new HttpParams();
    params = params.set('userId', userId);
    params = params.set('workAreaTypeId', workAreaTypeId);
    params = params.set('reinforcementId', programmedId);
    return this.http.get<WorkArea[]>(
      `${this.apiUrl}/reinforcement/work-areas/list-workAreas`,
      { params },
    );
  }

  assignWorkArea(payload: AssignWorkAreaPayload): Observable<SpResponse> {
    return this.http.put<SpResponse>(
      `${this.apiUrl}/reinforcement/work-areas/assign-work-area`,
      payload,
    );
  }
}
