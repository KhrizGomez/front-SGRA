import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

interface RoleItem {
  label: string;
  icon: string;
  route: string;
}

/** Mapa canónico: todos los alias de cada rol apuntan a la misma entrada. */
const ROLE_CATALOG: { aliases: string[]; label: string; icon: string; route: string }[] = [
  { aliases: ['admin', 'administrador'],                           label: 'Administrador',      icon: 'bi-shield-check',     route: '/admin'               },
  { aliases: ['coordinator', 'coordinador'],                       label: 'Coordinador',         icon: 'bi-clipboard-data',   route: '/coordinator'         },
  { aliases: ['teacher', 'docente'],                               label: 'Docente',             icon: 'bi-person-workspace', route: '/teacher'             },
  { aliases: ['student', 'estudiante'],                            label: 'Estudiante',          icon: 'bi-mortarboard',      route: '/student'             },
  { aliases: ['workareamanagement', 'gestor de espacios fisicos'], label: 'Gestor de Espacios',  icon: 'bi-building',         route: '/workAreaManagement'  },
];

@Component({
  selector: 'app-role-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-switcher.component.html',
  styleUrl: './role-switcher.component.css',
})
export class RoleSwitcherComponent implements OnInit {
  /** Ruta raíz del módulo activo, p.ej. "/student" o "/coordinator" */
  @Input() activeRoute = '';

  roles: RoleItem[] = [];

  private authService = inject(AuthService);
  private router      = inject(Router);

  ngOnInit(): void {
    const userRoles = (this.authService.currentUser()?.roles ?? []).map(r => r.toLowerCase());

    // Deduplicar: si el usuario tiene 'docente' y 'teacher' solo aparece una vez
    const seen = new Set<string>();
    for (const entry of ROLE_CATALOG) {
      if (entry.aliases.some(a => userRoles.includes(a)) && !seen.has(entry.route)) {
        seen.add(entry.route);
        this.roles.push({ label: entry.label, icon: entry.icon, route: entry.route });
      }
    }
  }

  isActive(route: string): boolean {
    return this.activeRoute === route;
  }

  switchTo(route: string): void {
    if (!this.isActive(route)) {
      this.router.navigate([route]);
    }
  }
}