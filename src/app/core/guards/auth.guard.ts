import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { LoginResponse } from '../../models/auth.model';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.me().pipe(
    map((user: LoginResponse | null) => {
      if (user) {
        // Si el usuario tiene estado 'C' y NO está yendo a change-password, forzar redirección
        if (user.accountState === 'C') {
          const targetPath = route.routeConfig?.path;
          if (targetPath !== 'change-password') {
            router.navigate(['/change-password']);
            return false;
          }
        }
        return true;
      }
      router.navigate(['/login']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};

export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.me().pipe(
    map((user: LoginResponse | null) => {
      if (user) {
        // Si requiere cambio de contraseña, redirigir ahí en lugar del dashboard
        if (user.accountState === 'C') {
          router.navigate(['/change-password']);
          return false;
        }
        // Ya está autenticado, redirigir según rol
        authService.redirectByRole(user);
        return false;
      }
      return true;
    }),
    catchError(() => of(true))
  );
};

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.me().pipe(
      map((user: LoginResponse | null) => {
        if (!user) {
          router.navigate(['/login']);
          return false;
        }

        const userRoles = user.roles.map((r: string) => r.toLowerCase());
        const hasRole = allowedRoles.some((role: string) =>
          userRoles.includes(role.toLowerCase())
        );

        if (hasRole) {
          return true;
        }

        // No tiene el rol, redirigir a su dashboard
        authService.redirectByRole(user);
        return false;
      }),
      catchError(() => {
        router.navigate(['/login']);
        return of(false);
      })
    );
  };
};

