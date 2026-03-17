import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatbotConfig, ChatMessage, ChatApiRequest } from '../../../models/ai/chatbot.model';
import { AiChatService } from '../../../services/ai/ai-chat.service';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.css',
})
export class AiChatComponent implements OnInit, OnDestroy, AfterViewChecked {

  @Input() config!: ChatbotConfig;
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  isOpen = false;
  isTyping = false;
  inputMessage = '';
  messages: ChatMessage[] = [];
  quickActionsVisible = true;

  private destroy$ = new Subject<void>();
  private shouldScrollToBottom = false;

  constructor(private chatService: AiChatService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.messages.push({
      id: this.generateId(),
      role: 'ai',
      text: this.config.welcomeMessage
        ?? `¡Hola! Soy el asistente del SGRA. Puedo ayudarte a analizar la información de ${this.getModuleLabel()}. ¿En qué te ayudo?`,
      timestamp: new Date(),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) this.shouldScrollToBottom = true;
  }

  sendMessage(): void {
    const text = this.inputMessage.trim();
    if (!text || this.isTyping) return;
    this.submit(text);
  }

  useQuickAction(prompt: string): void {
    this.quickActionsVisible = false;
    this.submit(prompt);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' });
  }

  private submit(text: string): void {
    this.inputMessage = '';
    this.messages.push({ id: this.generateId(), role: 'user', text, timestamp: new Date() });
    this.shouldScrollToBottom = true;
    this.isTyping = true;

    const request: ChatApiRequest = { module: this.config.module, message: text };

    this.chatService.sendMessage(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.isTyping = false;
          this.messages.push({
            id: this.generateId(),
            role: 'ai',
            text: res.success ? res.response : (res.error ?? 'No pude procesar tu consulta.'),
            timestamp: new Date(),
          });
          this.shouldScrollToBottom = true;
          this.cdr.detectChanges();
        },
        error: () => {
          this.isTyping = false;
          this.messages.push({
            id: this.generateId(),
            role: 'ai',
            text: 'Ocurrió un error al conectar con el asistente.',
            timestamp: new Date(),
          });
          this.shouldScrollToBottom = true;
          this.cdr.detectChanges();
        },
      });
  }

  private scrollToBottom(): void {
    try {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch { /* noop */ }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  private getModuleLabel(): string {
    const labels: Record<string, string> = {
      coordinacion: 'Coordinación',
      estudiante:   'Estudiantes',
      docente:      'Docentes',
    };
    return labels[this.config.module] ?? this.config.module;
  }
}
