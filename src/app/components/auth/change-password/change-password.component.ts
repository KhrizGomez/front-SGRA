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
  templateUrl: './change-password.component.html',
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

