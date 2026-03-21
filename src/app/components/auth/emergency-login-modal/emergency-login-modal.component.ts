import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth/auth.service';
import { EmergencyModalService } from '../../../core/services/emergency-modal.service';

@Component({
  selector: 'app-emergency-login-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './emergency-login-modal.component.html',
  styleUrl: './emergency-login-modal.component.css'
})
export class EmergencyLoginModalComponent {
  private authService     = inject(AuthService);
  private router          = inject(Router);
  private emergencyModal  = inject(EmergencyModalService);

  password     = '';
  showPassword = signal(false);
  isLoading    = signal(false);
  errorMessage = signal<string | null>(null);

  togglePassword(): void { this.showPassword.update(v => !v); }

  onSubmit(): void {
    if (!this.password || this.isLoading()) return;
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.emergencyLogin(this.password).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.emergencyModal.hideAll();
        this.router.navigate(['/emergency']);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.error || 'Contraseña de emergencia incorrecta.');
      }
    });
  }
}