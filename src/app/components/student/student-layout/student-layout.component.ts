import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { ChangePasswordModalComponent } from '../../shared/change-password-modal/change-password-modal.component';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AiChatComponent } from '../../shared/ai-chat/ai-chat.component';
import { ChatbotConfig } from '../../../models/ai/chatbot.model';
import { RoleSwitcherComponent } from '../../shared/role-switcher/role-switcher.component';

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ChangePasswordModalComponent, ToastComponent, AiChatComponent, RoleSwitcherComponent],
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.css']
})
export class StudentLayoutComponent implements OnInit {
  private authService = inject(AuthService);

  isSidebarCollapsed = signal(false);
  showChangePasswordModal = false;
  showDropdown = false;
  userName = signal('Estudiante');
  userRoleLabel = signal('Estudiante');

  userInitials = computed(() => {
    const parts = this.userName().trim().split(' ');
    const first = parts[0]?.[0] ?? 'E';
    const second = parts[1]?.[0] ?? '';
    return (first + second).toUpperCase();
  });

  readonly chatConfig: ChatbotConfig = {
    module: 'estudiante',
    title: 'Asistente SGRA',
    welcomeMessage: '¡Hola! Soy tu asistente del SGRA. Puedo ayudarte con tus solicitudes de refuerzo, explicarte estados y responder dudas sobre el proceso. ¿En qué te ayudo?',
    quickActions: [
      { label: '¿Cómo va mi solicitud?',      prompt: '¿Cuál es el estado de mis solicitudes activas?',                              icon: 'bi-clipboard-check'   },
      { label: '¿Tengo sesiones próximas?',   prompt: '¿Tengo sesiones de refuerzo programadas para los próximos días?',             icon: 'bi-calendar-event'    },
      { label: 'Ayúdame a crear solicitud',   prompt: '',                                                                             icon: 'bi-stars',  action: 'suggest' },
      { label: '¿Qué documentos adjuntar?',   prompt: '¿Qué tipo de evidencias o documentos debo adjuntar a mi solicitud?',          icon: 'bi-paperclip'         },
    ],
  };

  navItems = [
    { path: '/student/dashboard', label: 'Dashboard', icon: 'bi-grid' },
    { path: '/student/my-requests', label: 'Mis Solicitudes', icon: 'bi-card-list' },
    { path: '/student/new-request', label: 'Nueva Solicitud', icon: 'bi-plus-square' },
    { path: '/student/history', label: 'Historial', icon: 'bi-clock-history' },
    { path: '/student/preferences', label: 'Preferencias', icon: 'bi-gear' }
  ];

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (user) {
      const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
      this.userName.set(fullName || user.username || 'Estudiante');
      this.userRoleLabel.set('Estudiante');
    }
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed.update(v => !v);
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown(): void {
    this.showDropdown = false;
  }

  openChangePasswordModal(): void {
    this.showDropdown = false;
    this.showChangePasswordModal = true;
  }

  closeChangePasswordModal(): void {
    this.showChangePasswordModal = false;
  }

  logout(): void {
    this.authService.logout().subscribe();
  }
}
