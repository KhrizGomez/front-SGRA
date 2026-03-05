import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of, map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse, ChangePasswordRequest, ChangePasswordResponse, ForgotPasswordRequest, VerifyCodeRequest, ResetPasswordRequest, GenericResponse, VoluntaryChangePasswordRequest } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  // Signal para el usuario actual
  currentUser = signal<LoginResponse | null>(null);
  isLoading = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    this.isLoading.set(true);
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials, {
      withCredentials: true
    }).pipe(
      tap((user: LoginResponse) => {
        this.currentUser.set(user);
        this.isLoading.set(false);
      }),
      catchError((error: unknown) => {
        this.isLoading.set(false);
        throw error;
      })
    );
  }

  me(): Observable<LoginResponse | null> {
    return this.http.get<LoginResponse>(`${this.apiUrl}/auth/me`, {
      withCredentials: true
    }).pipe(
      tap((user: LoginResponse) => this.currentUser.set(user)),
      catchError(() => {
        this.currentUser.set(null);
        return of(null);
      })
    );
  }

  logout(): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.currentUser.set(null);
        this.router.navigate(['/login']);
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.me().pipe(
      map((user: LoginResponse | null) => user !== null)
    );
  }

  /**
   * Redirige al dashboard según el rol del usuario.
   * Prioridad: admin > coordinator > teacher > student
   */
  redirectByRole(user: LoginResponse): void {
    // Si requiere cambio de contraseña, redirigir primero ahí
    if (user.accountState === 'C') {
      this.router.navigate(['/change-password']);
      return;
    }

    const roles = user.roles.map((r: string) => r.toLowerCase());

    if (roles.includes('admin') || roles.includes('administrador')) {
      this.router.navigate(['/admin']);
    } else if (roles.includes('coordinator') || roles.includes('coordinador')) {
      this.router.navigate(['/coordinator']);
    } else if (roles.includes('teacher') || roles.includes('docente')) {
      this.router.navigate(['/teacher']);
    } else if (roles.includes('student') || roles.includes('estudiante')) {
      this.router.navigate(['/student']);
    } else if (roles.includes('workareamanagement') || roles.includes('gestor de espacios fisicos')) {
      this.router.navigate(['/workAreaManagement']);
    } else {
      // Fallback: si no tiene rol reconocido
      this.router.navigate(['/login']);
    }
  }

  /**
   * Cambia la contraseña en el primer acceso (estado='C').
   * El backend invalida la sesión al éxito, forzando nuevo login.
   */
  changePassword(request: ChangePasswordRequest): Observable<ChangePasswordResponse> {
    return this.http.post<ChangePasswordResponse>(`${this.apiUrl}/auth/change-password`, request, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.currentUser.set(null);
      })
    );
  }

  /**
   * Cambio voluntario de contraseña para usuarios activos (estado='A').
   * No invalida la sesión al éxito.
   */
  voluntaryChangePassword(request: VoluntaryChangePasswordRequest): Observable<ChangePasswordResponse> {
    return this.http.post<ChangePasswordResponse>(`${this.apiUrl}/auth/voluntary-change-password`, request, {
      withCredentials: true
    });
  }

  hasRole(role: string): boolean {
    const user = this.currentUser();
    if (!user) return false;
    return user.roles.some((r: string) => r.toLowerCase() === role.toLowerCase());
  }

  // ─── Recuperación de contraseña ───

  /**
   * Paso 1: Solicita el envío de un código de recuperación al correo.
   */
  forgotPassword(request: ForgotPasswordRequest): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${this.apiUrl}/auth/forgot-password`, request, {
      withCredentials: true
    });
  }

  /**
   * Paso 2: Verifica el código de 6 dígitos recibido por correo.
   */
  verifyCode(request: VerifyCodeRequest): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${this.apiUrl}/auth/verify-code`, request, {
      withCredentials: true
    });
  }

  /**
   * Paso 3: Restablece la contraseña con el código verificado.
   */
  resetPassword(request: ResetPasswordRequest): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${this.apiUrl}/auth/reset-password`, request, {
      withCredentials: true
    });
  }
}

