import { Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { ChangePasswordModalComponent } from '../../shared/change-password-modal/change-password-modal.component';
import { AiChatComponent } from '../../shared/ai-chat/ai-chat.component';
import { ChatbotConfig } from '../../../models/ai/chatbot.model';
import { RoleSwitcherComponent } from '../../shared/role-switcher/role-switcher.component';

@Component({
  selector: 'app-teacher-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ChangePasswordModalComponent, AiChatComponent, RoleSwitcherComponent],
  templateUrl: './teacher-layout.component.html',
  styleUrl: './teacher-layout.component.css',
})
export class TeacherLayoutComponent implements OnInit {
  private authService = inject(AuthService);

  isSidebarCollapsed = signal(false);
  isMobile = signal(false);
  showDropdown = false;
  showChangePasswordModal = false;
  userName = signal('Docente');

  readonly chatConfig: ChatbotConfig = {
    module: 'docente',
    title: 'Asistente SGRA',
    welcomeMessage: '¡Hola! Soy tu asistente del SGRA. Puedo ayudarte con tus solicitudes asignadas, sesiones de refuerzo y estadísticas de tus estudiantes. ¿En qué te ayudo?',
    quickActions: [
      { label: '¿Tengo sesiones hoy?',        prompt: '¿Tengo sesiones de refuerzo programadas para hoy?',                                    icon: 'bi-calendar-check'  },
      { label: 'Solicitudes pendientes',       prompt: '¿Cuántas solicitudes de refuerzo tengo pendientes de gestionar?',                        icon: 'bi-inbox-fill'      },
      { label: '¿Cómo está la asistencia?',   prompt: '¿Cuál es la tasa de asistencia en mis sesiones este período?',                           icon: 'bi-person-check'    },
      { label: 'Mis sesiones próximas',        prompt: '¿Qué sesiones de refuerzo tengo programadas para los próximos 7 días?',                  icon: 'bi-calendar-week'   },
    ],
  };

  userInitials = computed(() => {
    const parts = this.userName().trim().split(' ');
    const first = parts[0]?.[0] ?? 'D';
    const second = parts[1]?.[0] ?? '';
    return (first + second).toUpperCase();
  });

  readonly isOverlayOpen = computed(
    () => this.isMobile() && !this.isSidebarCollapsed()
  );

  ngOnInit(): void {
    this.checkMobile();
    const user = this.authService.currentUser();
    if (user) {
      const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
      this.userName.set(fullName || user.username || 'Docente');
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkMobile();
  }

  private checkMobile(): void {
    const mobile = window.innerWidth < 992;
    this.isMobile.set(mobile);
    if (mobile) {
      this.isSidebarCollapsed.set(true);
    }
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed.update(v => !v);
  }

  closeOverlay(): void {
    if (this.isMobile()) {
      this.isSidebarCollapsed.set(true);
    }
  }

  onNavClick(): void {
    if (this.isMobile()) {
      this.isSidebarCollapsed.set(true);
    }
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