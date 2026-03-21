import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginResponse } from '../../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword       = signal(false);
  errorMessage       = signal<string | null>(null);
  isLoading          = signal(false);

  // ── Modo de emergencia ────────────────────────────────────────────────────
  showEmergencyPanel = signal(false);
  emergencyPassword  = '';
  emergencyLoading   = signal(false);
  emergencyError     = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  togglePassword(): void {
    this.showPassword.update((v: boolean) => !v);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    this.isLoading.set(true);

    const { username, password } = this.loginForm.value;

    this.authService.login({ username, password }).subscribe({
      next: (user: LoginResponse) => {
        this.isLoading.set(false);
        // Si el estado es 'C', redirigir a cambio de contraseña
        if (user.accountState === 'C') {
          this.router.navigate(['/change-password']);
          return;
        }
        this.authService.redirectByRole(user);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading.set(false);
        if (error.status === 503) {
          this.showEmergencyPanel.set(true);
          this.errorMessage.set('La base de datos no está disponible. Si eres administrador usa el acceso de emergencia.');
        } else if (error.error?.error) {
          this.errorMessage.set(error.error.error);
        } else {
          this.errorMessage.set('Error al conectar con el servidor');
        }
      }
    });
  }

  onEmergencySubmit(): void {
    if (!this.emergencyPassword || this.emergencyLoading()) return;
    this.emergencyLoading.set(true);
    this.emergencyError.set(null);
    this.authService.emergencyLogin(this.emergencyPassword).subscribe({
      next: () => {
        this.emergencyLoading.set(false);
        this.router.navigate(['/emergency']);
      },
      error: (err: HttpErrorResponse) => {
        this.emergencyLoading.set(false);
        this.emergencyError.set(err.error?.error || 'Contraseña de emergencia incorrecta.');
      }
    });
  }

  // Helpers para validación
  get usernameInvalid(): boolean {
    const ctrl = this.loginForm.get('username');
    return ctrl ? ctrl.invalid && ctrl.touched : false;
  }

  get passwordInvalid(): boolean {
    const ctrl = this.loginForm.get('password');
    return ctrl ? ctrl.invalid && ctrl.touched : false;
  }

  getUsernameError(): string {
    const ctrl = this.loginForm.get('username');
    if (ctrl?.hasError('required')) return 'El usuario es obligatorio';
    if (ctrl?.hasError('minlength')) return 'Mínimo 3 caracteres';
    return '';
  }

  getPasswordError(): string {
    const ctrl = this.loginForm.get('password');
    if (ctrl?.hasError('required')) return 'La contraseña es obligatoria';
    if (ctrl?.hasError('minlength')) return 'Mínimo 5 caracteres';
    return '';
  }
}

