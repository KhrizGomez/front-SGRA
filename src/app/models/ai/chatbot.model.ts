export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
  type?: 'text' | 'suggestion';
  suggestionData?: AISuggestion;
}

export interface QuickAction {
  label: string;
  prompt: string;
  icon?: string;
  action?: 'suggest';
}

export interface ChatbotConfig {
  module: string;
  title: string;
  quickActions: QuickAction[];
  welcomeMessage?: string;
}

export interface ChatApiRequest {
  module: string;
  message: string;
}

export interface ChatApiResponse {
  response: string;
  module: string;
  success: boolean;
  error?: string;
}

export interface AISuggestion {
  tipoSesion: string;
  motivoSugerido: string;
  evidencias: string[];
  razonamiento: string;
}

export interface AISuggestApiResponse {
  tipoSesion: string;
  motivoSugerido: string;
  evidencias: string[];
  razonamiento: string;
  success: boolean;
  error?: string;
}