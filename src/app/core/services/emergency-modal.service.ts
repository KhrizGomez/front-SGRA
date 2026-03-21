import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmergencyModalService {
  /** Solo para admin: formulario de contraseña de emergencia */
  readonly visible = signal(false);
  /** Para todos los demás roles: pantalla de fuera de servicio */
  readonly maintenanceVisible = signal(false);

  showEmergency():    void { this.visible.set(true); }
  showMaintenance():  void { this.maintenanceVisible.set(true); }
  hideAll():          void { this.visible.set(false); this.maintenanceVisible.set(false); }

  isAnyVisible(): boolean { return this.visible() || this.maintenanceVisible(); }
}