import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ScheduleOccupancy, WorkAreaOption } from '../../../models/workAreaManager/work-area-manager-schedule';

@Injectable({
  providedIn: 'root',
})
export class WamScheduleService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getWorkAreaOptions(): Observable<WorkAreaOption[]> {
    return this.getOccupancies().pipe(
      map(occupancies => {
        const seen = new Map<string, WorkAreaOption>();
        for (const o of occupancies) {
          const key = `${o.pareatrabajo}-${o.pnumeroarea}`;
          if (!seen.has(key)) {
            seen.set(key, {
              pidareatrabajo: seen.size + 1,
              pareatrabajo: o.pareatrabajo,
              pnumeroarea: o.pnumeroarea,
            });
          }
        }
        return Array.from(seen.values());
      })
    );
  }

  getOccupancies(filterText: string = ''): Observable<ScheduleOccupancy[]> {
    let params = new HttpParams();
    if (filterText) {
      params = params.set('filterText', filterText);
    }
    return this.http.get<ScheduleOccupancy[]>(
      `${this.apiUrl}/reinforcement/work-area-management/schedule/occupancies`,
      { params }
    );
  }
}
