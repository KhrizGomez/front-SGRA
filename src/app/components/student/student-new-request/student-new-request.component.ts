import { Component, AfterViewInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentNewRequestService } from '../../../services/student/student-new-request.service';
import {
  SubjectItem,
  SessionTypeItem,
  StudentSubjectTeacher,
  ClassmateItem,
  TeacherAvailabilitySlot
} from '../../../models/student/catalog.model';
import { CreateRequestPayload } from '../../../models/student/request.model';
import { ToastService } from '../../../services/shared/toast.service';
import { StudentAISuggestionService } from '../../../services/student/student-ai-suggestion.service';

@Component({
  selector: 'app-student-new-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-new-request.component.html',
  styleUrl: './student-new-request.component.css'
})
export class StudentNewRequestComponent implements AfterViewInit {
  private svc = inject(StudentNewRequestService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private toast = inject(ToastService);
  private aiSuggestion = inject(StudentAISuggestionService);

  // Catálogos
  subjects: SubjectItem[] = [];
  sessionTypes: SessionTypeItem[] = [];

  // Docente (auto-cargado por paralelo)
  teacherInfo: StudentSubjectTeacher | null = null;
  loadingTeacher = false;

  // Disponibilidad del docente
  teacherAvailability: TeacherAvailabilitySlot[] = [];
  loadingAvailability = false;
  activePeriodId: number | null = null;
  selectedAvailabilityKey: string | null = null;  // "dayOfWeek_timeSlotId"

  // Compañeros (sesión grupal)
  classmates: ClassmateItem[] = [];
  selectedClassmates: ClassmateItem[] = [];
  selectedClassmateIds: Set<number> = new Set();
  tempSelectedIds: Set<number> = new Set();
  showClassmatesModal = false;
  loadingClassmates = false;
  classmateSearch = '';

  // Archivos
  selectedFiles: File[] = [];

  // Estados de carga
  loadingCatalogs = false;
  submitting = false;


  // Modelo del formulario (simplificado)
  form: {
    subjectId: number | null;
    sessionTypeId: number | null;
    reason: string;
  } = {
    subjectId: null,
    sessionTypeId: null,
    reason: ''
  };

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.loadCatalogs();
    });
  }

  // ==================== CARGA DE CATÁLOGOS ====================

  loadCatalogs(): void {
    this.loadingCatalogs = true;

    Promise.all([
      this.svc.getSubjects().toPromise(),
      this.svc.getSessionTypes().toPromise(),
      this.svc.getActivePeriod().toPromise().catch(() => null)
    ]).then(([subjects, sessionTypes, activePeriod]) => {
      this.subjects = subjects || [];
      this.sessionTypes = sessionTypes || [];
      if (activePeriod?.periodId) {
        this.activePeriodId = activePeriod.periodId;
      }
      this.loadingCatalogs = false;
      this.applyAISuggestionIfPresent();
      this.cdr.detectChanges();
    }).catch(err => {
      this.toast.show(false, err?.message || 'Error al cargar los catálogos');
      this.loadingCatalogs = false;
      this.cdr.detectChanges();
    });
  }

  // ==================== SUGERENCIA IA ====================

  private applyAISuggestionIfPresent(): void {
    const suggestion = this.aiSuggestion.getSuggestion();
    if (!suggestion) return;

    // Match session type by name (individual/grupal)
    const matched = this.sessionTypes.find(
      st => st.sessionTypeName.toLowerCase().includes(suggestion.tipoSesion.toLowerCase())
    );
    if (matched) {
      this.form.sessionTypeId = matched.sessionTypeId;
    }

    if (suggestion.motivoSugerido) {
      this.form.reason = suggestion.motivoSugerido;
    }

    this.aiSuggestion.clearSuggestion();
    this.toast.show(true, 'Sugerencia de IA aplicada. Selecciona la asignatura para continuar.');
  }

  // ==================== CAMBIO DE ASIGNATURA ====================

  onSubjectChange(): void {
    // Resetear docente, compañeros y disponibilidad
    this.teacherInfo = null;
    this.teacherAvailability = [];
    this.selectedAvailabilityKey = null;
    this.classmates = [];
    this.selectedClassmates = [];
    this.selectedClassmateIds.clear();

    if (!this.form.subjectId) {
      this.cdr.detectChanges();
      return;
    }

    // Cargar el docente del paralelo del estudiante para esta asignatura
    this.loadingTeacher = true;
    this.cdr.detectChanges();

    this.svc.getTeacherBySubject(this.form.subjectId).subscribe({
      next: (data: any) => {
        this.loadingTeacher = false;
        // Si el backend retorna { found: false, message: "..." } significa que no hay docente
        if (data && data.found === false) {
          this.teacherInfo = null;
        } else if (data && data.teacherId) {
          this.teacherInfo = data as StudentSubjectTeacher;
          this.loadTeacherAvailability();
        } else {
          this.teacherInfo = null;
        }
        this.cdr.detectChanges();

        // Si ya está en sesión grupal, abrir modal de compañeros
        if (this.isGroupSession()) {
          this.openClassmatesModal();
        }
      },
      error: (err) => {
        this.loadingTeacher = false;
        this.teacherInfo = null;
        this.toast.show(false, err?.message || 'Error al cargar el docente');
        this.cdr.detectChanges();
      }
    });
  }

  // ==================== DISPONIBILIDAD DEL DOCENTE ====================

  loadTeacherAvailability(): void {
    if (!this.form.subjectId || !this.activePeriodId) return;
    this.loadingAvailability = true;
    this.cdr.detectChanges();

    this.svc.getTeacherAvailability(this.form.subjectId, this.activePeriodId).subscribe({
      next: (slots) => {
        this.teacherAvailability = slots || [];
        this.loadingAvailability = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.teacherAvailability = [];
        this.loadingAvailability = false;
        this.cdr.detectChanges();
      }
    });
  }

  availabilityKey(slot: TeacherAvailabilitySlot): string {
    return `${slot.dayOfWeek}_${slot.timeSlotId}`;
  }

  selectAvailability(slot: TeacherAvailabilitySlot): void {
    const key = this.availabilityKey(slot);
    this.selectedAvailabilityKey = this.selectedAvailabilityKey === key ? null : key;
    this.cdr.detectChanges();
  }

  selectedSlot(): TeacherAvailabilitySlot | null {
    if (!this.selectedAvailabilityKey) return null;
    return this.teacherAvailability.find(s => this.availabilityKey(s) === this.selectedAvailabilityKey) ?? null;
  }

  formatTime(time: string): string {
    if (!time) return '';
    return time.substring(0, 5);
  }

  availabilityByDay(): { dayOfWeek: number; dayName: string; slots: TeacherAvailabilitySlot[] }[] {
    const map = new Map<number, { dayOfWeek: number; dayName: string; slots: TeacherAvailabilitySlot[] }>();
    for (const slot of this.teacherAvailability) {
      if (!map.has(slot.dayOfWeek)) {
        map.set(slot.dayOfWeek, { dayOfWeek: slot.dayOfWeek, dayName: slot.dayName, slots: [] });
      }
      map.get(slot.dayOfWeek)!.slots.push(slot);
    }
    return Array.from(map.values()).sort((a, b) => a.dayOfWeek - b.dayOfWeek);
  }

  // ==================== SESIÓN GRUPAL / COMPAÑEROS ====================

  isGroupSession(): boolean {
    return this.form.sessionTypeId === 2;
  }

  onSessionTypeChange(): void {
    if (this.isGroupSession() && this.form.subjectId) {
      this.openClassmatesModal();
    } else if (!this.isGroupSession()) {
      this.selectedClassmates = [];
      this.selectedClassmateIds.clear();
    }
  }

  openClassmatesModal(): void {
    if (!this.form.subjectId) {
      this.toast.show(false, 'Selecciona una asignatura primero para ver los compañeros');
      return;
    }

    this.showClassmatesModal = true;
    this.classmateSearch = '';
    this.tempSelectedIds = new Set(this.selectedClassmateIds);

    this.loadingClassmates = true;
    this.cdr.detectChanges();

    this.svc.getClassmatesBySubject(this.form.subjectId).subscribe({
      next: (data) => {
        this.classmates = data || [];
        this.loadingClassmates = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.toast.show(false, err?.message || 'Error al cargar compañeros');
        this.loadingClassmates = false;
        this.cdr.detectChanges();
      }
    });
  }

  closeClassmatesModal(): void {
    this.showClassmatesModal = false;
    this.classmateSearch = '';
  }

  filteredClassmates(): ClassmateItem[] {
    if (!this.classmateSearch.trim()) {
      return this.classmates;
    }
    const search = this.classmateSearch.toLowerCase().trim();
    return this.classmates.filter(c =>
      c.fullName.toLowerCase().includes(search) ||
      c.email.toLowerCase().includes(search)
    );
  }

  toggleClassmate(studentId: number): void {
    if (this.tempSelectedIds.has(studentId)) {
      this.tempSelectedIds.delete(studentId);
    } else {
      this.tempSelectedIds.add(studentId);
    }
  }

  selectAllClassmates(): void {
    for (const c of this.filteredClassmates()) {
      this.tempSelectedIds.add(c.studentId);
    }
    this.cdr.detectChanges();
  }

  deselectAllClassmates(): void {
    this.tempSelectedIds.clear();
    this.cdr.detectChanges();
  }

  confirmClassmatesSelection(): void {
    this.selectedClassmateIds = new Set(this.tempSelectedIds);
    this.selectedClassmates = this.classmates.filter(c => this.selectedClassmateIds.has(c.studentId));
    this.showClassmatesModal = false;
    this.classmateSearch = '';
    this.cdr.detectChanges();
  }

  getSelectedNames(): string {
    return this.selectedClassmates.map(c => c.fullName.split(' ')[0]).join(', ');
  }

  // ==================== ARCHIVOS ====================

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);

      // Validar tamaño (max 10MB por archivo)
      const maxSize = 10 * 1024 * 1024; // 10MB
      for (const file of newFiles) {
        if (file.size > maxSize) {
          this.toast.show(false, `El archivo "${file.name}" excede el tamaño máximo de 10MB`);
          return;
        }
      }

      this.selectedFiles = [...this.selectedFiles, ...newFiles];
      this.cdr.detectChanges();
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.cdr.detectChanges();
  }

  clearFiles(): void {
    this.selectedFiles = [];
    this.cdr.detectChanges();
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  // ==================== ENVIAR SOLICITUD ====================

  onSubmit(): void {
    if (!this.isFormValid()) {
      this.toast.show(false, 'Por favor completa todos los campos obligatorios');
      return;
    }

    this.submitting = true;

    const preferred = this.selectedSlot();
    const payload: CreateRequestPayload = {
      subjectId: this.form.subjectId!,
      sessionTypeId: this.form.sessionTypeId!,
      reason: this.form.reason.trim(),
      participantIds: this.isGroupSession() ? Array.from(this.selectedClassmateIds) : undefined,
      preferredDayOfWeek: preferred?.dayOfWeek ?? null,
      preferredTimeSlotId: preferred?.timeSlotId ?? null
    };

    this.svc.createRequest(payload, this.selectedFiles).subscribe({
      next: (response) => {
        this.submitting = false;
        this.toast.show(true, `Solicitud #${response.requestId} creada exitosamente`);
        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/student/my-requests']);
        }, 1500);
      },
      error: (err) => {
        this.toast.show(false, err?.message || 'Error al crear la solicitud');
        this.submitting = false;
        this.cdr.detectChanges();
      }
    });
  }

  isFormValid(): boolean {
    const baseValid = !!(
      this.form.subjectId &&
      this.form.sessionTypeId &&
      this.teacherInfo &&                    // Debe haber docente asignado
      this.form.reason?.trim().length >= 10
    );

    // Si es sesión grupal, debe tener al menos 1 compañero seleccionado
    if (this.isGroupSession()) {
      return baseValid && this.selectedClassmateIds.size >= 1;
    }

    return baseValid;
  }

  goBack(): void {
    this.router.navigate(['/student/my-requests']);
  }
}
