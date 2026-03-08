import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleOccupancy } from '../../../../models/workAreaManager/work-area-manager-schedule';

interface CalendarDay {
  label: string;
  date: Date;
  dateStr: string;
}

interface TimeSlot {
  time: string;
}

@Component({
  selector: 'app-wam-schedule-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wam-schedule-table.component.html',
  styleUrl: './wam-schedule-table.component.css',
})
export class WamScheduleTableComponent {
  @Input() occupancies: ScheduleOccupancy[] = [];
  @Input() days: CalendarDay[] = [];
  @Input() timeSlots: TimeSlot[] = [];
  @Input() isLoading = true;

  getOccupanciesForSlot(dayStr: string, time: string): ScheduleOccupancy[] {
    const slotHour = parseInt(time.split(':')[0], 10);
    return this.occupancies.filter(o => {
      if (o.pfecha !== dayStr) return false;
      const startH = parseInt(o.phorainicio.split(':')[0], 10);
      const endH = parseInt(o.phorafin.split(':')[0], 10);
      return slotHour >= startH && slotHour < endH;
    });
  }

  isFirstSlotOfOccupancy(dayStr: string, time: string, occ: ScheduleOccupancy): boolean {
    const slotHour = parseInt(time.split(':')[0], 10);
    const startH = parseInt(occ.phorainicio.split(':')[0], 10);
    return slotHour === startH && occ.pfecha === dayStr;
  }

  getOccupancySpan(occ: ScheduleOccupancy): number {
    const startH = parseInt(occ.phorainicio.split(':')[0], 10);
    const endH = parseInt(occ.phorafin.split(':')[0], 10);
    return endH - startH;
  }

  formatDisplayDate(date: Date): string {
    return date.toLocaleDateString('es-EC', { day: '2-digit', month: 'short' });
  }

  isToday(dateStr: string): boolean {
    const now = new Date();
    const y = now.getFullYear();
    const m = (now.getMonth() + 1).toString().padStart(2, '0');
    const d = now.getDate().toString().padStart(2, '0');
    return dateStr === `${y}-${m}-${d}`;
  }
}
