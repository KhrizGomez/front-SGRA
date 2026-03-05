import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, combineLatest, startWith } from 'rxjs';
import { GEmailConfig } from '../../../models/administration/admin-email-config/GEmailConfig.model';
import { AdminEmailConfigService } from '../../../services/administration/admin-email-config/admin-email-config.service';
import { AdminEmailConfigTableComponent } from './admin-email-config-table/admin-email-config-table.component';
import { AdminEmailConfigModalComponent } from './admin-email-config-modal/admin-email-config-modal.component';
import { GPeriod } from '../../../models/administration/admin-periods/GPeriod.model';
import { AdminPeriodsService } from '../../../services/administration/admin-periods/admin-periods.service';
import { AdminPeriodTableComponent } from '../admin-periods/admin-period-table/admin-period-table.component';
import { AdminPeriodCreateModalComponent } from '../admin-periods/admin-period-create-modal/admin-period-create-modal.component';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-email-config',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminEmailConfigTableComponent,
    AdminEmailConfigModalComponent,
    AdminPeriodTableComponent,
    AdminPeriodCreateModalComponent,
  ],
  templateUrl: './admin-email-config.component.html',
  styleUrl: './admin-email-config.component.css',
})
export class AdminEmailConfigComponent implements OnInit {
  // --- Correo ---
  emailConfigs: GEmailConfig[] = [];
  isLoadingEmail = true;
  selectedConfigId: number | null = null;

  searchControl = new FormControl('');
  statusControl = new FormControl('');

  // --- Periodos ---
  periods: GPeriod[] = [];
  isLoadingPeriods = true;
  selectedPeriodToEdit: GPeriod | null = null;

  searchPeriodControl = new FormControl('');
  statusPeriodControl = new FormControl('');

  private cdr = inject(ChangeDetectorRef);
  private emailConfigService = inject(AdminEmailConfigService);
  private periodService = inject(AdminPeriodsService);

  ngOnInit(): void {
    // Filtros de correo
    combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged()
      ),
      this.statusControl.valueChanges.pipe(startWith('')),
    ]).subscribe(([filterValue, statusValue]) => {
      let stateParam: boolean | undefined = undefined;
      if (statusValue === 'true') stateParam = true;
      if (statusValue === 'false') stateParam = false;

      this.loadEmailConfigs(filterValue || '', stateParam);
    });

    // Filtros de periodos
    combineLatest([
      this.searchPeriodControl.valueChanges.pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged()
      ),
      this.statusPeriodControl.valueChanges.pipe(startWith('')),
    ]).subscribe(([filterValue, statusValue]) => {
      let stateParam: boolean | undefined = undefined;
      if (statusValue === 'true') stateParam = true;
      if (statusValue === 'false') stateParam = false;

      this.loadPeriods(filterValue || '', stateParam);
    });
  }

  // --- Correo methods ---
  loadEmailConfigs(filter = '', state?: boolean): void {
    this.isLoadingEmail = true;
    this.emailConfigService.getEmailConfigs(filter, state).subscribe({
      next: (data) => {
        this.emailConfigs = data;
        this.isLoadingEmail = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando configuraciones de correo', err);
        this.isLoadingEmail = false;
      },
    });
  }

  openEmailModal(): void {
    const modalElement = document.getElementById('emailConfigModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  prepareCreate(): void {
    this.selectedConfigId = null;
    this.openEmailModal();
  }

  prepareEdit(config: GEmailConfig): void {
    this.selectedConfigId = config.pidconfiguracioncorreo;
    this.openEmailModal();
  }

  // --- Periodos methods ---
  loadPeriods(filter = '', state?: boolean): void {
    this.isLoadingPeriods = true;
    this.periodService.getPeriods(filter, state).subscribe({
      next: (data) => {
        this.periods = data;
        this.isLoadingPeriods = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando periodos', err);
        this.isLoadingPeriods = false;
      },
    });
  }

  openPeriodModal(): void {
    const modalElement = document.getElementById('createPeriodModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  prepareCreatePeriod(): void {
    this.selectedPeriodToEdit = null;
    this.openPeriodModal();
  }

  prepareEditPeriod(period: GPeriod): void {
    this.selectedPeriodToEdit = { ...period };
    this.openPeriodModal();
  }
}
