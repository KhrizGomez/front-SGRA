import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css']
})
export class ChangePasswordModalComponent {
  @Output() closed = new EventEmitter<void>();

  changeForm: FormGroup;
  showCurrentPassword = signal(false);
  showNewPassword = signal(false);
  showConfirmPassword = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  isLoading = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.changeForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        this.hasUpperCase,
        this.hasNumber
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }

  private hasUpperCase(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    return /[A-Z]/.test(value) ? null : { noUpperCase: true };
  }

  private hasNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    return /[0-9]/.test(value) ? null : { noNumber: true };
  }

  private passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  toggleCurrentPassword(): void {
    this.showCurrentPassword.update((v: boolean) => !v);
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

    const { currentPassword, newPassword, confirmPassword } = this.changeForm.value;

    this.authService.voluntaryChangePassword({ currentPassword, newPassword, confirmPassword }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('Contraseña actualizada exitosamente.');
        this.changeForm.reset();
        setTimeout(() => {
          this.closeModal();
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

  closeModal(): void {
    this.changeForm.reset();
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.isLoading.set(false);
    this.closed.emit();
  }

  get currentPasswordInvalid(): boolean {
    const ctrl = this.changeForm.get('currentPassword');
    return ctrl ? ctrl.invalid && ctrl.touched : false;
  }

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
    if (ctrl?.hasError('required')) return 'La contraseña es requerida';
    if (ctrl?.hasError('minlength')) return 'Mínimo 8 caracteres';
    if (ctrl?.hasError('noUpperCase')) return 'Debe contener al menos una mayúscula';
    if (ctrl?.hasError('noNumber')) return 'Debe contener al menos un número';
    return '';
  }

  getConfirmPasswordError(): string {
    const ctrl = this.changeForm.get('confirmPassword');
    if (ctrl?.hasError('required')) return 'Confirma tu contraseña';
    if (this.changeForm.hasError('passwordsMismatch')) return 'Las contraseñas no coinciden';
    return '';
  }
}

