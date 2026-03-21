import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { EmergencyModalService } from '../services/emergency-modal.service';
import { AuthService } from '../../services/auth/auth.service';

const EXCLUDED_PATHS = [
  '/api/auth/login',
  '/api/auth/logout',
  '/api/emergency',
  '/api/admin/backup/db-check'
];

const ADMIN_ROLES = ['admin', 'administrador'];

// Evita verificaciones concurrentes
let dbCheckPending = false;

export const dbUnavailableInterceptor: HttpInterceptorFn = (req, next) => {
  const router         = inject(Router);
  const emergencyModal = inject(EmergencyModalService);
  const authService    = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isExcluded         = EXCLUDED_PATHS.some(p => req.url.includes(p));
      const isLoginOrEmergency = router.url.startsWith('/login') || router.url.startsWith('/emergency');

      if ((error.status === 503 || error.status === 500) && !isExcluded && !isLoginOrEmergency && !dbCheckPending && !emergencyModal.isAnyVisible()) {
        dbCheckPending = true;

        // Usamos fetch nativo para evitar circular dependency con HttpClient
        fetch('/api/admin/backup/db-check', { credentials: 'include' })
          .then(res => res.json())
          .then((data: { available: boolean }) => {
            dbCheckPending = false;
            if (!data.available) {
              const user  = authService.currentUser();
              const roles = user?.roles?.map(r => r.toLowerCase()) ?? [];
              const isAdmin = ADMIN_ROLES.some(r => roles.includes(r));

              if (isAdmin) {
                emergencyModal.showEmergency();
              } else {
                emergencyModal.showMaintenance();
              }
            }
          })
          .catch(() => {
            dbCheckPending = false;
            // Si db-check falla (backend caído): diferenciamos igual por rol
            const user  = authService.currentUser();
            const roles = user?.roles?.map(r => r.toLowerCase()) ?? [];
            const isAdmin = ADMIN_ROLES.some(r => roles.includes(r));

            if (isAdmin) {
              emergencyModal.showEmergency();
            } else {
              emergencyModal.showMaintenance();
            }
          });
      }

      return throwError(() => error);
    })
  );
};