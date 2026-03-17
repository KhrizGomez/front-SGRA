import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ChatApiRequest, ChatApiResponse } from '../../models/ai/chatbot.model';

@Injectable({ providedIn: 'root' })
export class AiChatService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendMessage(request: ChatApiRequest): Observable<ChatApiResponse> {
    return this.http.post<ChatApiResponse>(`${this.apiUrl}/ai/chat`, request, {
      withCredentials: true
    }).pipe(
      catchError(() => of({
        response: 'No se pudo conectar con el asistente. Intenta nuevamente.',
        module: request.module,
        success: false
      }))
    );
  }
}
