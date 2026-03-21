import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './components/shared/toast/toast.component';
import { EmergencyLoginModalComponent } from './components/auth/emergency-login-modal/emergency-login-modal.component';
import { ServiceUnavailableComponent } from './components/auth/service-unavailable/service-unavailable.component';
import { EmergencyModalService } from './core/services/emergency-modal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, EmergencyLoginModalComponent, ServiceUnavailableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend');
  protected readonly emergencyModal = inject(EmergencyModalService);
}