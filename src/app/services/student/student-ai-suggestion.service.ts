import { Injectable, signal } from '@angular/core';
import { AISuggestion } from '../../models/ai/chatbot.model';

@Injectable({ providedIn: 'root' })
export class StudentAISuggestionService {
  private _suggestion = signal<AISuggestion | null>(null);

  setSuggestion(s: AISuggestion): void {
    this._suggestion.set(s);
  }

  getSuggestion(): AISuggestion | null {
    return this._suggestion();
  }

  clearSuggestion(): void {
    this._suggestion.set(null);
  }
}