import { Component, AfterViewInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TeacherAvailabilityService, TeacherAvailabilitySlotDTO } from '../../../services/teacher/teacher-availability.service';
import { ToastService } from '../../../services/shared/toast.service';

interface PeriodOption { idperiodo: number; periodo: string; estado: boolean; }
interface TimeSlotOption { timeSlotId: number; startTime: string; endTime: string; }

interface DaySlot {
  dayOfWeek: number;
  dayName: string;
  timeSlotId: number | null;
}

@Component({
  selector: 'app-teacher-availability',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-availability.component.html',
  styleUrl: './teacher-availability.component.css'
})
export class TeacherAvailabilityComponent implements AfterViewInit {
  private svc = inject(TeacherAvailabilityService);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private toast = inject(ToastService);

  readonly DAYS = [
    { value: 1, label: 'Lunes' },
    { value: 2, label: 'Martes' },
    { value: 3, label: 'Miércoles' },
    { value: 4, label: 'Jueves' },
    { value: 5, label: 'Viernes' },
    { value: 6, label: 'Sábado' },
  ];

  // Catálogos
  periods: PeriodOption[] = [];
  timeSlots: TimeSlotOption[] = [];

  // Selección
  selectedPeriodId: number | null = null;

  // Disponibilidad configurada
  savedSlots: TeacherAvailabilitySlotDTO[] = [];

  // Slots en edición: mapa dayOfWeek → conjunto de timeSlotIds seleccionados
  editSlots: Map<number, Set<number>> = new Map();

  loading = true;
  loadingSlots = false;
  saving = false;

  // Nueva franja horaria
  showNewSlotForm = false;
  newSlotStart = '';
  newSlotEnd = '';
  savingNewSlot = false;

  ngAfterViewInit(): void {
    Promise.resolve().then(() => this.loadCatalogs());
  }

  loadCatalogs(): void {
    this.loading = true;
    const base = environment.apiUrl;
    Promise.all([
      this.http.get<PeriodOption[]>(`${base}/academic/periods/list-periods`, { withCredentials: true }).toPromise(),
      this.http.get<TimeSlotOption[]>(`${base}/academic/time-slots`, { withCredentials: true }).toPromise()
    ]).then(([periods, timeSlots]) => {
      this.periods = (periods || []).filter(p => p.estado);
      this.timeSlots = timeSlots || [];

      // Seleccionar el periodo activo por defecto
      const active = this.periods[this.periods.length - 1];
      if (active) {
        this.selectedPeriodId = active.idperiodo;
        this.loadAvailability();
      }

      this.loading = false;
      this.cdr.detectChanges();
    }).catch(err => {
      this.toast.show(false, err?.message || 'Error al cargar catálogos');
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  onPeriodChange(): void {
    if (this.selectedPeriodId) {
      this.loadAvailability();
    }
  }

  loadAvailability(): void {
    if (!this.selectedPeriodId) return;
    this.loadingSlots = true;
    this.cdr.detectChanges();

    this.svc.getAvailability(this.selectedPeriodId).subscribe({
      next: (slots) => {
        this.savedSlots = slots;
        this.initEditSlots(slots);
        this.loadingSlots = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.toast.show(false, err?.message || 'Error al cargar disponibilidad');
        this.loadingSlots = false;
        this.cdr.detectChanges();
      }
    });
  }

  private initEditSlots(slots: TeacherAvailabilitySlotDTO[]): void {
    this.editSlots = new Map();
    for (const day of this.DAYS) {
      this.editSlots.set(day.value, new Set());
    }
    for (const slot of slots) {
      const set = this.editSlots.get(slot.dayOfWeek);
      if (set) set.add(slot.timeSlotId);
    }
  }

  isSelected(dayOfWeek: number, timeSlotId: number): boolean {
    return this.editSlots.get(dayOfWeek)?.has(timeSlotId) ?? false;
  }

  toggleSlot(dayOfWeek: number, timeSlotId: number): void {
    const set = this.editSlots.get(dayOfWeek);
    if (!set) return;
    if (set.has(timeSlotId)) {
      set.delete(timeSlotId);
    } else {
      set.add(timeSlotId);
    }
    this.cdr.detectChanges();
  }

  countSelected(): number {
    let total = 0;
    this.editSlots.forEach(set => { total += set.size; });
    return total;
  }

  countForDay(dayOfWeek: number): number {
    return this.editSlots.get(dayOfWeek)?.size ?? 0;
  }

  clearAll(): void {
    this.editSlots.forEach(set => set.clear());
    this.cdr.detectChanges();
  }

  saveAvailability(): void {
    if (!this.selectedPeriodId) {
      this.toast.show(false, 'Selecciona un periodo primero');
      return;
    }

    const slots: { dayOfWeek: number; timeSlotId: number }[] = [];
    this.editSlots.forEach((timeSlotIds, dayOfWeek) => {
      timeSlotIds.forEach(timeSlotId => {
        slots.push({ dayOfWeek, timeSlotId });
      });
    });

    this.saving = true;
    this.svc.saveAvailability({ periodId: this.selectedPeriodId, slots }).subscribe({
      next: (response) => {
        this.saving = false;
        if (response.status === 'ERROR') {
          this.toast.show(false, response.message);
        } else {
          this.toast.show(true, response.message || 'Disponibilidad guardada correctamente');
          this.loadAvailability();
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.saving = false;
        this.toast.show(false, err?.message || 'Error al guardar disponibilidad');
        this.cdr.detectChanges();
      }
    });
  }

  formatTime(time: string): string {
    if (!time) return '';
    return time.substring(0, 5);
  }

  toggleNewSlotForm(): void {
    this.showNewSlotForm = !this.showNewSlotForm;
    if (!this.showNewSlotForm) {
      this.newSlotStart = '';
      this.newSlotEnd = '';
    }
    this.cdr.detectChanges();
  }

  addTimeSlot(): void {
    if (!this.newSlotStart || !this.newSlotEnd) {
      this.toast.show(false, 'Ingresa hora de inicio y fin');
      return;
    }
    if (this.newSlotStart >= this.newSlotEnd) {
      this.toast.show(false, 'La hora de inicio debe ser menor a la hora de fin');
      return;
    }

    // Verificar que no exista ya esa franja
    const exists = this.timeSlots.some(
      s => this.formatTime(s.startTime) === this.newSlotStart
        && this.formatTime(s.endTime) === this.newSlotEnd
    );
    if (exists) {
      this.toast.show(false, 'Ya existe una franja con ese horario');
      return;
    }

    this.savingNewSlot = true;
    const base = environment.apiUrl;
    this.http.post<TimeSlotOption>(
      `${base}/academic/time-slots`,
      { startTime: `${this.newSlotStart}:00`, endTime: `${this.newSlotEnd}:00`, state: true },
      { withCredentials: true }
    ).subscribe({
      next: (created) => {
        this.savingNewSlot = false;
        // Recargar lista completa de franjas
        this.http.get<TimeSlotOption[]>(`${base}/academic/time-slots`, { withCredentials: true })
          .subscribe(slots => {
            this.timeSlots = slots || [];
            // Inicializar el nuevo slot en el mapa de edición
            for (const day of this.DAYS) {
              if (!this.editSlots.has(day.value)) {
                this.editSlots.set(day.value, new Set());
              }
            }
            this.showNewSlotForm = false;
            this.newSlotStart = '';
            this.newSlotEnd = '';
            this.toast.show(true, `Franja ${this.formatTime(created.startTime)} - ${this.formatTime(created.endTime)} creada`);
            this.cdr.detectChanges();
          });
      },
      error: (err) => {
        this.savingNewSlot = false;
        const msg = err?.error?.message || err?.message || 'Error al crear la franja';
        this.toast.show(false, msg);
        this.cdr.detectChanges();
      }
    });
  }
}