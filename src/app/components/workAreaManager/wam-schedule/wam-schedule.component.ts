import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WamScheduleService } from '../../../services/workAreaManager/work-area-manager-schedule/wam-schedule.service';
import { ScheduleOccupancy, WorkAreaOption } from '../../../models/workAreaManager/work-area-manager-schedule';
import { WamScheduleTableComponent } from './wam-schedule-table/wam-schedule-table.component';

interface CalendarDay {
  label: string;
  date: Date;
  dateStr: string;
}

interface TimeSlot {
  time: string;
}

@Component({
  selector: 'app-wam-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, WamScheduleTableComponent],
  templateUrl: './wam-schedule.component.html',
  styleUrl: './wam-schedule.component.css',
})
export class WamScheduleComponent implements OnInit {
  private scheduleService = inject(WamScheduleService);
  private cdr = inject(ChangeDetectorRef);

  workAreas: WorkAreaOption[] = [];
  occupancies: ScheduleOccupancy[] = [];
  isLoading = true;

  selectedWorkAreaId: number | null = null;
  currentWeekStart: Date = this.getMonday(new Date());

  days: CalendarDay[] = [];
  timeSlots: TimeSlot[] = [];

  private readonly DAY_LABELS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  ngOnInit(): void {
    this.buildTimeSlots();
    this.buildWeekDays();
    this.loadWorkAreas();
    this.loadOccupancies();
  }

  private getMonday(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private buildTimeSlots(): void {
    this.timeSlots = [];
    for (let h = 7; h <= 18; h++) {
      this.timeSlots.push({ time: `${h.toString().padStart(2, '0')}:00` });
    }
  }

  private buildWeekDays(): void {
    this.days = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(this.currentWeekStart);
      date.setDate(date.getDate() + i);
      this.days.push({
        label: this.DAY_LABELS[i],
        date,
        dateStr: this.formatDate(date),
      });
    }
  }

  private formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  get weekRangeLabel(): string {
    const start = this.days[0]?.date;
    const end = this.days[this.days.length - 1]?.date;
    if (!start || !end) return '';
    const opts: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return `${start.toLocaleDateString('es-EC', opts)} — ${end.toLocaleDateString('es-EC', opts)}`;
  }

  private loadWorkAreas(): void {
    this.scheduleService.getWorkAreaOptions().subscribe({
      next: (data) => {
        this.workAreas = data;
        this.cdr.detectChanges();
      },
    });
  }

  loadOccupancies(): void {
    this.isLoading = true;
    this.scheduleService.getOccupancies().subscribe({
      next: (data) => {
        this.occupancies = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.occupancies = [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  previousWeek(): void {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.currentWeekStart = new Date(this.currentWeekStart);
    this.buildWeekDays();
    this.loadOccupancies();
  }

  nextWeek(): void {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.currentWeekStart = new Date(this.currentWeekStart);
    this.buildWeekDays();
    this.loadOccupancies();
  }

  goToToday(): void {
    this.currentWeekStart = this.getMonday(new Date());
    this.buildWeekDays();
    this.loadOccupancies();
  }

  onWorkAreaChange(): void {
    this.loadOccupancies();
  }
}
