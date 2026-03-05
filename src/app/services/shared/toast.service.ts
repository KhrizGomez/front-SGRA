import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  success: boolean;
  removing?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _nextId = 0;
  private readonly _maxVisible = 5;

  readonly toasts = signal<Toast[]>([]);

  show(success: boolean, message: string, durationMs = 6000): void {
    const id = ++this._nextId;
    const toast: Toast = { id, message, success };

    this.toasts.update(list => {
      const updated = [...list, toast];
      // Keep only the latest N toasts
      return updated.length > this._maxVisible
        ? updated.slice(updated.length - this._maxVisible)
        : updated;
    });

    // Start removal animation before actual removal
    setTimeout(() => {
      this.toasts.update(list =>
        list.map(t => t.id === id ? { ...t, removing: true } : t)
      );
    }, durationMs - 400);

    // Remove the toast
    setTimeout(() => this.dismiss(id), durationMs);
  }

  dismiss(id: number): void {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}

