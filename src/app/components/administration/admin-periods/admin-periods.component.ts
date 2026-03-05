import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GPeriod } from '../../../models/administration/admin-periods/GPeriod.model';
import { AdminPeriodsService } from '../../../services/administration/admin-periods/admin-periods.service';
import { AdminPeriodTableComponent } from './admin-period-table/admin-period-table.component';
import { AdminPeriodCreateModalComponent } from './admin-period-create-modal/admin-period-create-modal.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, combineLatest, startWith } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-periods',
  standalone: true,
  imports: [
    CommonModule,
    AdminPeriodTableComponent,
    AdminPeriodCreateModalComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './admin-periods.component.html',
  styleUrl: './admin-periods.component.css',
})
export class AdminPeriodsComponent implements OnInit {
  periods: GPeriod[] = [];
  isLoading: boolean = true;
  selectedPeriodToEdit: GPeriod | null = null;

  searchControl = new FormControl('');
  statusControl = new FormControl('');

  private cdr = inject(ChangeDetectorRef);
  private periodService = inject(AdminPeriodsService);

  ngOnInit(): void {
    combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged(),
      ),
      this.statusControl.valueChanges.pipe(startWith('')),
    ]).subscribe(([filterValue, statusValue]) => {
      let stateParam: boolean | undefined = undefined;
      if (statusValue === 'true') stateParam = true;
      if (statusValue === 'false') stateParam = false;

      this.loadPeriods(filterValue || '', stateParam);
    });
  }

  loadPeriods(filter: string = '', state?: boolean): void {
    this.isLoading = true;
    this.periodService.getPeriods(filter, state).subscribe({
      next: (data) => {
        this.periods = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error', err);
        this.isLoading = false;
      },
    });
  }

  openModal(): void {
    const modalElement = document.getElementById('createPeriodModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  prepareCreate() {
    this.selectedPeriodToEdit = null;
    this.openModal();
  }

  prepareEdit(period: GPeriod) {
    this.selectedPeriodToEdit = { ...period };
    this.openModal();
  }
}
