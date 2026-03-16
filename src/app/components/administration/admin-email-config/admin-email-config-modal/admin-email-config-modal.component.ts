import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminEmailConfigService } from '../../../../services/administration/admin-email-config/admin-email-config.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { ToastService } from '../../../../services/shared/toast.service';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-email-config-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-email-config-modal.component.html',
  styleUrl: './admin-email-config-modal.component.css',
})
export class AdminEmailConfigModalComponent {
  @Output() emailConfigSaved = new EventEmitter<void>();

  emailForm: FormGroup;
  isSubmitting = false;
  isTesting = false;
  isEditing = false;
  currentConfigId: number | null = null;
  showPassword = false;

  private fb = inject(FormBuilder);
  private emailConfigService = inject(AdminEmailConfigService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  constructor() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      appPassword: ['', [Validators.required, Validators.minLength(8)]],
      smtpServer: ['smtp.gmail.com', [Validators.required]],
      smtpPort: ['587', [Validators.required]],
      ssl: [true],
      senderName: ['', [Validators.required, Validators.minLength(2)]],
      status: ['activo'],
    });
  }

  @Input() set configIdToEdit(id: number | null) {
    const passwordControl = this.emailForm.get('appPassword');

    if (id) {
      this.isEditing = true;
      this.currentConfigId = id;

      passwordControl?.clearValidators();
      passwordControl?.setValidators([Validators.minLength(8)]);
      passwordControl?.updateValueAndValidity();

      console.log(this.currentConfigId);

      this.emailConfigService.getEmailConfigById(id).subscribe({
        next: (data) => {
          this.emailForm.patchValue({
            email: data.pcorreoemisor,
            appPassword: data.paplicacionsontrasena,
            smtpServer: data.pservidorsmtp,
            smtpPort: data.ppuertosmtp,
            ssl: data.pssl ?? true,
            senderName: data.pnombreremitente || '',
            status: data.pestadop ? 'activo' : 'inactivo',
          });
        },
        error: () => {
          this.toastService.show(false, 'No se pudo cargar la información del correo.');
        },
      });
    } else {
      this.isEditing = false;
      this.currentConfigId = null;
      this.emailForm.reset({
        ssl: true,
      });

      passwordControl?.setValidators([Validators.required, Validators.minLength(8)]);
      passwordControl?.updateValueAndValidity();
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  testEmailConfig(): void {
    const formValues = this.emailForm.value;

    // Validar que los campos requeridos para el test estén completos
    if (!formValues.smtpServer || !formValues.smtpPort || !formValues.email || !formValues.appPassword) {
      this.toastService.show(false, 'Complete los campos de servidor SMTP, puerto, correo y contraseña para probar la conexión.');
      return;
    }

    this.isTesting = true;

    const testPayload = {
      servidorSmtp: formValues.smtpServer,
      puertoSmtp: Number(formValues.smtpPort),
      usaSSL: formValues.ssl ?? true,
      correoEmisor: formValues.email,
      contrasenaAplicacion: formValues.appPassword,
      nombreRemitente: formValues.senderName || '',
    };

    this.emailConfigService.testSmtpConnection(testPayload).subscribe({
      next: (success) => {
        this.isTesting = false;
        if (success) {
          this.toastService.show(true, 'Configuración de correo válida. Conexión SMTP exitosa.');
        } else {
          this.toastService.show(false, 'Error en la configuración del correo. Verifique los datos ingresados.');
        }
      },
      error: () => {
        this.isTesting = false;
        this.toastService.show(false, 'Error al probar la conexión SMTP. Verifique los datos ingresados.');
      },
    });
  }

  onSubmit(): void {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formValues = this.emailForm.value;
    const currentUser = this.authService.currentUser();

    const payload = {
      pidconfiguracioncorreo: this.isEditing ? (this.currentConfigId ?? undefined) : undefined,
      idusuario: currentUser?.userId ?? 0,
      pcorreoemisor: formValues.email,
      paplicacionsontrasena: formValues.appPassword || undefined,
      pservidorsmtp: formValues.smtpServer,
      ppuertosmtp: Number(formValues.smtpPort),
      pssl: formValues.ssl,
      pnombreremitente: formValues.senderName,
      pestadop: this.isEditing ? formValues.status : undefined,
    };

    const request$ = this.isEditing
      ? this.emailConfigService.updateEmailConfig(payload)
      : this.emailConfigService.createEmailConfig(payload);

    request$.subscribe({
      next: (response) => {
        if (response.success) {
          this.toastService.show(true, response.message);
          const modalElement = document.getElementById('emailConfigModal');
          if (modalElement) {
            bootstrap.Modal.getInstance(modalElement)?.hide();
          }
          this.emailForm.reset({
            smtpServer: 'smtp.gmail.com',
            smtpPort: '587',
            ssl: true,
            status: 'activo',
          });
          this.emailConfigSaved.emit();
        } else {
          this.toastService.show(false, response.message);
        }
        this.isSubmitting = false;
      },
      error: () => {
        this.isSubmitting = false;
        this.toastService.show(false, this.isEditing ? 'Error al actualizar la configuración' : 'Error al crear la configuración');
      },
    });
  }

  get f() {
    return this.emailForm.controls;
  }
}
