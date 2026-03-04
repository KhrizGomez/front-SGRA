import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

type Step = 'email' | 'code' | 'password';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnDestroy {
  currentStep = signal<Step>('email');
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  maskedEmail = signal<string>('');

  // Temporizador de expiración del código (10 minutos = 600 segundos)
  countdownSeconds = signal<number>(0);
  private countdownInterval: ReturnType<typeof setInterval> | null = null;

  emailForm: FormGroup;
  codeForm: FormGroup;
  passwordForm: FormGroup;

  showNewPassword = signal(false);
  showConfirmPassword = signal(false);

  private userEmail = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.codeForm = this.fb.group({
      digit0: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit1: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit2: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit3: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit4: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit5: ['', [Validators.required, Validators.pattern(/^\d$/)]],
    });

    this.passwordForm = this.fb.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        this.hasUpperCase,
        this.hasNumber
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  // ─── Paso 1: Enviar correo ───

  ngOnDestroy(): void {
    this.stopCountdown();
  }

  onSubmitEmail(): void {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    this.clearMessages();
    this.isLoading.set(true);

    this.userEmail = this.emailForm.value.email.trim().toLowerCase();

    this.authService.forgotPassword({ email: this.userEmail }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.maskedEmail.set(this.maskEmail(this.userEmail));
        this.currentStep.set('code');
        this.successMessage.set('Se envió un código de verificación a tu correo.');
        this.startCountdown();
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.error?.error || 'Error al procesar la solicitud.');
      }
    });
  }

  // ─── Paso 2: Verificar código ───

  onSubmitCode(): void {
    if (this.codeForm.invalid) {
      this.codeForm.markAllAsTouched();
      return;
    }

    this.clearMessages();
    this.isLoading.set(true);

    const code = this.getCodeValue();

    this.authService.verifyCode({ email: this.userEmail, code }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.clearMessages();
        this.currentStep.set('password');
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.error?.error || 'Error al verificar el código.');
      }
    });
  }

  // ─── Paso 3: Nueva contraseña ───

  onSubmitPassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.clearMessages();
    this.isLoading.set(true);

    const { newPassword, confirmPassword } = this.passwordForm.value;
    const code = this.getCodeValue();

    this.authService.resetPassword({
      email: this.userEmail,
      code,
      newPassword,
      confirmPassword
    }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('Contraseña actualizada exitosamente. Redirigiendo al login...');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2500);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.error?.error || 'Error al restablecer la contraseña.');
      }
    });
  }

  // ─── Reenviar código ───

  resendCode(): void {
    this.clearMessages();
    this.isLoading.set(true);

    this.authService.forgotPassword({ email: this.userEmail }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('Se reenvió el código de verificación.');
        this.codeForm.reset();
        this.startCountdown();
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.error?.error || 'Error al reenviar el código.');
      }
    });
  }

  // ─── Navegación entre pasos ───

  goBackToEmail(): void {
    this.clearMessages();
    this.stopCountdown();
    this.currentStep.set('email');
  }

  goBackToCode(): void {
    this.clearMessages();
    this.currentStep.set('code');
  }

  goBackToLogin(): void {
    this.router.navigate(['/login']);
  }

  // ─── Input de código: auto-avance entre dígitos ───

  onCodeInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value && /^\d$/.test(value) && index < 5) {
      const nextInput = document.getElementById('digit' + (index + 1));
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  }

  onCodeKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace') {
      const currentControl = this.codeForm.get('digit' + index);
      if (currentControl && !currentControl.value && index > 0) {
        const prevInput = document.getElementById('digit' + (index - 1));
        if (prevInput) {
          (prevInput as HTMLInputElement).focus();
        }
      }
    }
  }

  onCodePaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);

    for (let i = 0; i < digits.length; i++) {
      const control = this.codeForm.get('digit' + i);
      if (control) {
        control.setValue(digits[i]);
      }
    }

    // Enfocar el siguiente input vacío o el último
    const nextEmpty = digits.length < 6 ? digits.length : 5;
    const nextInput = document.getElementById('digit' + nextEmpty);
    if (nextInput) {
      (nextInput as HTMLInputElement).focus();
    }
  }

  // ─── Validadores de contraseña ───

  hasUpperCase(control: AbstractControl): ValidationErrors | null {
    if (control.value && !/[A-Z]/.test(control.value)) {
      return { noUpperCase: true };
    }
    return null;
  }

  hasNumber(control: AbstractControl): ValidationErrors | null {
    if (control.value && !/[0-9]/.test(control.value)) {
      return { noNumber: true };
    }
    return null;
  }

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

  // ─── Helpers ───

  get emailInvalid(): boolean {
    const ctrl = this.emailForm.get('email');
    return ctrl ? ctrl.invalid && ctrl.touched : false;
  }

  getEmailError(): string {
    const ctrl = this.emailForm.get('email');
    if (ctrl?.hasError('required')) return 'El correo es obligatorio';
    if (ctrl?.hasError('email')) return 'Ingresa un correo válido';
    return '';
  }

  get newPasswordInvalid(): boolean {
    const ctrl = this.passwordForm.get('newPassword');
    return ctrl ? ctrl.invalid && ctrl.touched : false;
  }

  get confirmPasswordInvalid(): boolean {
    const ctrl = this.passwordForm.get('confirmPassword');
    return ctrl ? (ctrl.touched && (ctrl.invalid || this.passwordForm.hasError('passwordsMismatch'))) : false;
  }

  get passwordValue(): string {
    return this.passwordForm.get('newPassword')?.value || '';
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
    const ctrl = this.passwordForm.get('newPassword');
    if (ctrl?.hasError('required')) return 'La contraseña es obligatoria';
    if (ctrl?.hasError('minlength')) return 'Mínimo 8 caracteres';
    if (ctrl?.hasError('noUpperCase')) return 'Debe contener al menos una mayúscula';
    if (ctrl?.hasError('noNumber')) return 'Debe contener al menos un número';
    return '';
  }

  getConfirmPasswordError(): string {
    const ctrl = this.passwordForm.get('confirmPassword');
    if (ctrl?.hasError('required')) return 'La confirmación es obligatoria';
    if (this.passwordForm.hasError('passwordsMismatch')) return 'Las contraseñas no coinciden';
    return '';
  }

  // ─── Countdown (temporizador visible de expiración) ───

  get formattedCountdown(): string {
    const s = this.countdownSeconds();
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  get isCodeExpired(): boolean {
    return this.countdownSeconds() <= 0 && this.currentStep() === 'code';
  }

  private startCountdown(): void {
    this.stopCountdown();
    this.countdownSeconds.set(600); // 10 minutos

    this.countdownInterval = setInterval(() => {
      const current = this.countdownSeconds();
      if (current <= 1) {
        this.countdownSeconds.set(0);
        this.stopCountdown();
        this.errorMessage.set('El código ha expirado. Solicita uno nuevo.');
        this.successMessage.set(null);
      } else {
        this.countdownSeconds.set(current - 1);
      }
    }, 1000);
  }

  private stopCountdown(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }

  private getCodeValue(): string {
    return [0, 1, 2, 3, 4, 5].map(i => this.codeForm.get('digit' + i)?.value || '').join('');
  }

  private maskEmail(email: string): string {
    const [user, domain] = email.split('@');
    if (user.length <= 2) return email;
    return user[0] + '***' + user[user.length - 1] + '@' + domain;
  }

  private clearMessages(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }
}








