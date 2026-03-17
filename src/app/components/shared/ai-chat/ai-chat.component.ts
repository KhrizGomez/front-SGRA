import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatbotConfig, ChatMessage, ChatApiRequest, AISuggestion } from '../../../models/ai/chatbot.model';
import { AiChatService } from '../../../services/ai/ai-chat.service';
import { StudentAISuggestionService } from '../../../services/student/student-ai-suggestion.service';

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

  isOpen         = false;
  isTyping       = false;
  inputMessage   = '';
  messages: ChatMessage[] = [];
  quickActionsVisible = true;
  isSuggestionMode    = false;

  /** Id del mensaje que se está leyendo actualmente */
  speakingMsgId: string | null = null;

  /** true mientras el micrófono está escuchando */
  isListening = false;

  private destroy$    = new Subject<void>();
  private shouldScrollToBottom = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private recognition: any = null;

  private chatService       = inject(AiChatService);
  private cdr               = inject(ChangeDetectorRef);
  private router            = inject(Router);
  private suggestionService = inject(StudentAISuggestionService);

  // ──────────────────────────────────────────────
  //  Lifecycle
  // ──────────────────────────────────────────────

  ngOnInit(): void {
    this.messages.push({
      id: this.generateId(),
      role: 'ai',
      text: this.config.welcomeMessage
        ?? `¡Hola! Soy el asistente del SGRA. ¿En qué te ayudo?`,
      timestamp: new Date(),
    });
  }

  ngOnDestroy(): void {
    this.stopSpeech();
    this.stopListening();
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  // ──────────────────────────────────────────────
  //  Chat actions
  // ──────────────────────────────────────────────

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) this.shouldScrollToBottom = true;
  }

  sendMessage(): void {
    const text = this.inputMessage.trim();
    if (!text || this.isTyping) return;
    this.submit(text);
  }

  useQuickAction(prompt: string, action?: string): void {
    this.quickActionsVisible = false;
    if (action === 'suggest') {
      this.startSuggestionFlow();
      return;
    }
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

  // ──────────────────────────────────────────────
  //  Voz — Text to Speech (TTS)
  // ──────────────────────────────────────────────

  speak(msg: ChatMessage): void {
    if (!window.speechSynthesis) return;

    if (this.speakingMsgId === msg.id) {
      this.stopSpeech();
      return;
    }
    this.stopSpeech();

    const text = msg.type === 'suggestion' && msg.suggestionData
      ? `Tipo de sesión: ${msg.suggestionData.tipoSesion}. Motivo: ${msg.suggestionData.motivoSugerido}. ${msg.suggestionData.razonamiento}`
      : msg.text;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang  = 'es-EC';
    utterance.rate  = 0.95;
    utterance.pitch = 1.15;

    const fire = () => {
      utterance.voice = this.pickFemaleVoice();
      utterance.onend   = () => { this.speakingMsgId = null; this.cdr.detectChanges(); };
      utterance.onerror = () => { this.speakingMsgId = null; this.cdr.detectChanges(); };
      this.speakingMsgId = msg.id;
      window.speechSynthesis.speak(utterance);
      this.cdr.detectChanges();
    };

    // Chrome carga las voces de forma asíncrona — esperar si aún no están listas
    if (window.speechSynthesis.getVoices().length > 0) {
      fire();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        fire();
      };
    }
  }

  stopSpeech(): void {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    this.speakingMsgId = null;
  }

  /** Elige la mejor voz femenina en español disponible en Chrome. */
  private pickFemaleVoice(): SpeechSynthesisVoice {
    const voices = window.speechSynthesis.getVoices();
    const es     = voices.filter(v => v.lang.startsWith('es'));

    // En Chrome, "Google español de Estados Unidos" (es-US) es la más natural y femenina
    const priority = [
      (v: SpeechSynthesisVoice) => v.name === 'Google español de Estados Unidos',
      (v: SpeechSynthesisVoice) => v.name === 'Google español',
      (v: SpeechSynthesisVoice) => /google/i.test(v.name) && v.lang.startsWith('es'),
      (v: SpeechSynthesisVoice) => /helena|sabina|mónica|monica|paulina|laura|camila|conchita/i.test(v.name),
      (v: SpeechSynthesisVoice) => v.lang.startsWith('es'),
    ];

    for (const test of priority) {
      const found = es.find(test);
      if (found) return found;
    }
    return voices[0];
  }

  // ──────────────────────────────────────────────
  //  Micrófono — Speech to Text (STT)
  // ──────────────────────────────────────────────

  toggleListening(): void {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }

  get hasSpeechRecognition(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    return !!(w['SpeechRecognition'] || w['webkitSpeechRecognition']);
  }

  private startListening(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;

    this.recognition = new SR();
    this.recognition.lang            = 'es-EC';
    this.recognition.continuous      = false;
    this.recognition.interimResults  = false;

    this.recognition.onstart = () => {
      this.isListening = true;
      this.cdr.detectChanges();
    };

    this.recognition.onresult = (event: any) => {
      const transcript: string = event.results[0][0].transcript;
      this.isListening  = false;
      this.inputMessage = transcript;
      this.cdr.detectChanges();
      // Enviar automáticamente tras reconocer
      setTimeout(() => this.sendMessage(), 100);
    };

    this.recognition.onerror = () => {
      this.isListening = false;
      this.cdr.detectChanges();
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.cdr.detectChanges();
    };

    this.recognition.start();
  }

  private stopListening(): void {
    this.recognition?.stop();
    this.isListening = false;
  }

  // ──────────────────────────────────────────────
  //  Sugerencia IA
  // ──────────────────────────────────────────────

  useSuggestion(suggestion: AISuggestion): void {
    this.suggestionService.setSuggestion(suggestion);
    this.router.navigate(['/student/new-request']);
    this.isOpen = false;
  }

  private startSuggestionFlow(): void {
    this.isSuggestionMode = true;
    this.messages.push({
      id: this.generateId(),
      role: 'ai',
      text: '¡Claro! Cuéntame: ¿en qué materia tienes dificultades y qué temas específicos no están quedando claros? Con eso te ayudo a armar la mejor solicitud.',
      timestamp: new Date(),
    });
    this.shouldScrollToBottom = true;
    this.cdr.detectChanges();
  }

  // ──────────────────────────────────────────────
  //  Submit / request handlers
  // ──────────────────────────────────────────────

  private submit(text: string): void {
    this.stopSpeech();
    this.stopListening();
    this.inputMessage        = '';
    this.quickActionsVisible = false;
    this.messages.push({ id: this.generateId(), role: 'user', text, timestamp: new Date() });
    this.shouldScrollToBottom = true;
    this.isTyping = true;

    if (this.isSuggestionMode) {
      this.isSuggestionMode = false;
      this.runSuggestRequest(text);
      return;
    }

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
          this.quickActionsVisible  = true;
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
          this.quickActionsVisible  = true;
          this.shouldScrollToBottom = true;
          this.cdr.detectChanges();
        },
      });
  }

  private runSuggestRequest(description: string): void {
    this.chatService.suggestRequest(description)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.isTyping = false;
          if (!res.success) {
            this.messages.push({
              id: this.generateId(),
              role: 'ai',
              text: res.error ?? 'No pude generar una sugerencia. Intenta de nuevo.',
              timestamp: new Date(),
            });
          } else {
            this.messages.push({
              id: this.generateId(),
              role: 'ai',
              text: 'Basándome en lo que me contaste, aquí está mi recomendación:',
              timestamp: new Date(),
            });
            this.messages.push({
              id: this.generateId(),
              role: 'ai',
              type: 'suggestion',
              text: '',
              timestamp: new Date(),
              suggestionData: {
                tipoSesion:    res.tipoSesion,
                motivoSugerido: res.motivoSugerido,
                evidencias:    res.evidencias ?? [],
                razonamiento:  res.razonamiento,
              },
            });
          }
          this.quickActionsVisible  = true;
          this.shouldScrollToBottom = true;
          this.cdr.detectChanges();
        },
        error: () => {
          this.isTyping = false;
          this.messages.push({
            id: this.generateId(),
            role: 'ai',
            text: 'Ocurrió un error al generar la sugerencia.',
            timestamp: new Date(),
          });
          this.quickActionsVisible  = true;
          this.shouldScrollToBottom = true;
          this.cdr.detectChanges();
        },
      });
  }

  // ──────────────────────────────────────────────
  //  Helpers
  // ──────────────────────────────────────────────

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
