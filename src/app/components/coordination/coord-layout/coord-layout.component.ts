import { Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { ChangePasswordModalComponent } from '../../shared/change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-coord-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, ChangePasswordModalComponent],
  templateUrl: './coord-layout.component.html',
  styleUrls: ['./coord-layout.component.css']
})
export class CoordLayoutComponent implements OnInit {
  private authService = inject(AuthService);

  isSidebarCollapsed = signal(false);
  isMobile = signal(false);
  showChangePasswordModal = false;
  showDropdown = false;
  userName = signal('Coordinador');
  userRoleLabel = signal('Coordinador');

  userInitials = computed(() => {
    const parts = this.userName().trim().split(' ');
    const first = parts[0]?.[0] ?? 'C';
    const second = parts[1]?.[0] ?? '';
    return (first + second).toUpperCase();
  });

  // true cuando el sidebar actúa como overlay (< 992 px) y está abierto
  readonly isOverlayOpen = computed(
    () => this.isMobile() && !this.isSidebarCollapsed()
  );

  navItems = [
    { path: '/coordinator/dashboard', label: 'Dashboard',           icon: 'bi-speedometer2'          },
    { path: '/coordinator/dataload',  label: 'Carga de Información', icon: 'bi-cloud-arrow-up'         },
    { path: '/coordinator/reports',   label: 'Reportes',             icon: 'bi-file-earmark-bar-graph' },
  ];

  ngOnInit(): void {
    this.checkMobile();
    const user = this.authService.currentUser();
    if (user) {
      const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
      this.userName.set(fullName || user.username || 'Coordinador');
      this.userRoleLabel.set('Coordinador');
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
      // en móvil el sidebar empieza cerrado
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

  // Cierra el sidebar al navegar en móvil
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
