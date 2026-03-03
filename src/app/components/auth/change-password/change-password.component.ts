import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="change-password-container" style="background-image: url('/assets/images/uteq-campus.png')">
      <div class="change-password-card">
        <div class="change-password-header">
          <img src="assets/UTEQ_logo.ico" alt="UTEQ Logo" class="change-password-logo">
          <h1 class="change-password-title">Cambio de Contraseña</h1>
          <p class="change-password-subtitle">Es necesario que actualices tu contraseña para continuar</p>
        </div>

        <form [formGroup]="changeForm" (ngSubmit)="onSubmit()" class="change-password-form">
          @if (successMessage()) {
            <div class="alert alert-success">
              <svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>{{ successMessage() }}</span>
            </div>
          }

          @if (errorMessage()) {
            <div class="alert alert-danger">
              <svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{{ errorMessage() }}</span>
            </div>
          }

          <div class="password-requirements">
            <p class="requirements-title">La contraseña debe cumplir:</p>
            <ul>
              <li [class.met]="hasMinLength">Mínimo 8 caracteres</li>
              <li [class.met]="hasUpperCaseMet">Al menos una letra mayúscula</li>
              <li [class.met]="hasNumberMet">Al menos un número</li>
            </ul>
          </div>

          <div class="form-group">
            <label for="newPassword" class="form-label">Nueva Contraseña</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                [type]="showNewPassword() ? 'text' : 'password'"
                id="newPassword"
                formControlName="newPassword"
                class="form-control"
                [class.is-invalid]="newPasswordInvalid"
                placeholder="Ingresa tu nueva contraseña"
                autocomplete="new-password">
              <button type="button" class="password-toggle" (click)="toggleNewPassword()" tabindex="-1">
                @if (showNewPassword()) {
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                } @else {
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                }
              </button>
            </div>
            @if (newPasswordInvalid) {
              <div class="invalid-feedback">{{ getNewPasswordError() }}</div>
            }
          </div>

          <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirmar Contraseña</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <input
                [type]="showConfirmPassword() ? 'text' : 'password'"
                id="confirmPassword"
                formControlName="confirmPassword"
                class="form-control"
                [class.is-invalid]="confirmPasswordInvalid"
                placeholder="Confirma tu nueva contraseña"
                autocomplete="new-password">
              <button type="button" class="password-toggle" (click)="toggleConfirmPassword()" tabindex="-1">
                @if (showConfirmPassword()) {
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                } @else {
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                }
              </button>
            </div>
            @if (confirmPasswordInvalid) {
              <div class="invalid-feedback">{{ getConfirmPasswordError() }}</div>
            }
          </div>

          <button type="submit" class="btn-change" [disabled]="isLoading() || successMessage()">
            @if (isLoading()) {
              <span class="spinner"></span>
              <span>Procesando...</span>
            } @else {
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Cambiar contraseña</span>
            }
          </button>
        </form>

        <div class="change-password-back">
          <button class="btn-back" (click)="goBackToLogin()" [disabled]="isLoading()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            <span>Volver al inicio de sesión</span>
          </button>
        </div>

        <div class="change-password-footer">
          <p>© 2026 UTEQ - Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changeForm: FormGroup;
  showNewPassword = signal(false);
  showConfirmPassword = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  isLoading = signal(false);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.changeForm = this.fb.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        this.hasUpperCase,
        this.hasNumber
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  // Validador: al menos una mayúscula
  hasUpperCase(control: AbstractControl): ValidationErrors | null {
    if (control.value && !/[A-Z]/.test(control.value)) {
      return { noUpperCase: true };
    }
    return null;
  }

  // Validador: al menos un número
  hasNumber(control: AbstractControl): ValidationErrors | null {
    if (control.value && !/[0-9]/.test(control.value)) {
      return { noNumber: true };
    }
    return null;
  }

  // Validador de grupo: contraseñas coinciden
  passwordsMatch(group: AbstractControl): ValidationErrors | null {
    const newPass = group.get('newPassword')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    if (newPass && confirmPass && newPass !== confirmPass) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  toggleNewPassword(): void {
    this.showNewPassword.update((v: boolean) => !v);
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.update((v: boolean) => !v);
  }

  onSubmit(): void {
    if (this.changeForm.invalid) {
      this.changeForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.isLoading.set(true);

    const { newPassword, confirmPassword } = this.changeForm.value;

    this.authService.changePassword({ newPassword, confirmPassword }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('Contraseña actualizada exitosamente. Redirigiendo al login...');
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading.set(false);
        if (error.error?.error) {
          this.errorMessage.set(error.error.error);
        } else {
          this.errorMessage.set('Error al conectar con el servidor');
        }
      }
    });
  }

  goBackToLogin(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }

  // Helpers para validación
  get newPasswordInvalid(): boolean {
    const ctrl = this.changeForm.get('newPassword');
    return ctrl ? ctrl.invalid && ctrl.touched : false;
  }

  get confirmPasswordInvalid(): boolean {
    const ctrl = this.changeForm.get('confirmPassword');
    return ctrl ? (ctrl.touched && (ctrl.invalid || this.changeForm.hasError('passwordsMismatch'))) : false;
  }

  get passwordValue(): string {
    return this.changeForm.get('newPassword')?.value || '';
  }

  get hasMinLength(): boolean {
    return this.passwordValue.length >= 8;
  }

  get hasUpperCaseMet(): boolean {
    return /[A-Z]/.test(this.passwordValue);
  }

  get hasNumberMet(): boolean {
    return /[0-9]/.test(this.passwordValue);
  }

  getNewPasswordError(): string {
    const ctrl = this.changeForm.get('newPassword');
    if (ctrl?.hasError('required')) return 'La contraseña es obligatoria';
    if (ctrl?.hasError('minlength')) return 'Mínimo 8 caracteres';
    if (ctrl?.hasError('noUpperCase')) return 'Debe contener al menos una mayúscula';
    if (ctrl?.hasError('noNumber')) return 'Debe contener al menos un número';
    return '';
  }

  getConfirmPasswordError(): string {
    const ctrl = this.changeForm.get('confirmPassword');
    if (ctrl?.hasError('required')) return 'La confirmación es obligatoria';
    if (this.changeForm.hasError('passwordsMismatch')) return 'Las contraseñas no coinciden';
    return '';
  }
}

