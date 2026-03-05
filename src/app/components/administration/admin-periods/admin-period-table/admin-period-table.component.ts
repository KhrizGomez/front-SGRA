import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GPeriod } from '../../../../models/administration/admin-periods/GPeriod.model';

@Component({
  selector: 'app-admin-period-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-period-table.component.html',
  styleUrl: './admin-period-table.component.css',
})
export class AdminPeriodTableComponent {
  @Input() periods: GPeriod[] = [];
  @Input() isLoading: boolean = true;
  @Output() editPeriod = new EventEmitter<GPeriod>();

  onEditClick(period: GPeriod) {
    this.editPeriod.emit(period);
  }
}
