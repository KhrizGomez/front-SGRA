import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { CoordDashboardService } from '../../../services/coordination/coord-dashboard/coord-dashboard.service';
import { CoordReportService, REPORT_CONFIGS } from '../../../services/coordination/coord-report/coord-report.service';
import { CoordinationDashboard } from '../../../models/coordination/coord-dashboard';
import { ReportConfig, ReportPreviewRow, ReportTypeKey, ChartTypeKey } from '../../../models/coordination/coord-report/coord-report.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

Chart.register(...registerables);

type ReportPeriod = 'mes' | 'trimestre' | 'semestre' | 'anio';

@Component({
  selector: 'app-coord-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './coord-dashboard.component.html',
  styleUrl: './coord-dashboard.component.css',
})
export class CoordDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('barChartCanvas') barChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('donutChartCanvas') donutChartRef!: ElementRef<HTMLCanvasElement>;

  dashboard: CoordinationDashboard | null = null;
  isLoading = true;

  // ── Report modal state ──
  readonly reportConfigs: ReportConfig[] = REPORT_CONFIGS;
  activeReportTypeKey: ReportTypeKey = 'BY_SUBJECT';
  selectedColumns = new Set<string>();
  selectedPeriod: ReportPeriod = 'semestre';
  selectedChartType: ChartTypeKey = 'BAR';
  isExporting = false;
  isExportingExcel = false;

  // ── Vista previa con datos reales ──
  previewRows: ReportPreviewRow[] = [];
  isLoadingPreview = false;
  previewError = '';

  private viewInitialized = false;


  readonly periodLabels: Record<ReportPeriod, string> = {
    mes: 'Último mes',
    trimestre: 'Trimestre',
    semestre: 'Semestre',
    anio: 'Año completo',
  };

  get activeReportConfig(): ReportConfig {
    return this.reportConfigs.find(c => c.key === this.activeReportTypeKey)!;
  }

  get selectedCount(): number {
    return this.selectedColumns.size;
  }

  get currentPeriodLabel(): string {
    return this.periodLabels[this.selectedPeriod];
  }

  get reportDate(): string {
    const now = new Date();
    return `${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()}`;
  }

  constructor(
    private dashboardService: CoordDashboardService,
    private reportService: CoordReportService,
    private cdr: ChangeDetectorRef,
  ) { this.selectReportType('BY_SUBJECT'); }

  ngOnInit(): void {
    this.loadDashboard();
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    if (this.dashboard) {
      this.initCharts();
    }
  }

  // ── Report modal methods ──

  selectReportType(key: ReportTypeKey): void {
    this.activeReportTypeKey = key;
    this.selectedColumns = new Set(
      this.reportConfigs.find(c => c.key === key)!.columns
        .filter(col => col.defaultSelected)
        .map(col => col.key)
    );
    this.selectedChartType = this.activeReportConfig.allowedCharts[0];
    this.loadPreview();
  }

  selectPeriod(period: ReportPeriod): void {
    this.selectedPeriod = period;
    this.loadPreview();
  }

  private loadPreview(): void {
    this.isLoadingPreview = false;
    this.previewError = '';
    // BY_SUBJECT: usa los datos reales ya cargados en this.dashboard
    if (this.activeReportTypeKey === 'BY_SUBJECT' &&
        this.dashboard?.solicitudesPorMateria?.length) {
      this.previewRows = this.dashboard.solicitudesPorMateria.map(m => ({
        asignatura:   m.asignatura,
        totalMateria: m.totalMateria,
        pendientes:   m.pendientes,
        gestionadas:  m.gestionadas,
      }));
    } else {
      // Para los demás tipos (BY_TEACHER, BY_PARALLEL, BY_GRADE, BY_STUDENT_REQUESTS)
      // aún no hay endpoint: se usan datos de muestra
      this.previewRows = this.activeReportConfig.previewRows;
    }
  }

  toggleColumn(key: string): void {
    if (this.selectedColumns.has(key)) {
      this.selectedColumns.delete(key);
    } else {
      this.selectedColumns.add(key);
    }
  }

  setChartType(type: ChartTypeKey): void {
    this.selectedChartType = type;
  }

  isChartAllowed(type: ChartTypeKey): boolean {
    return this.activeReportConfig.allowedCharts.includes(type);
  }

  getMaxVal(): number {
    // Usa datos reales si están disponibles, sino el mock
    const source = this.previewRows.length ? this.previewRows : this.activeReportConfig.previewRows;
    const cfg = this.activeReportConfig;
    const numericKey = cfg.columns.find(c => typeof source[0]?.[c.key] === 'number')?.key
      ?? cfg.columns[1]?.key;
    const values = source.map(r => Number(r[numericKey] ?? 0)).filter(v => !isNaN(v));
    return Math.max(...values, 1);
  }

  getChartLabels(): string[] {
    const source = this.previewRows.length ? this.previewRows : this.activeReportConfig.previewRows;
    const cfg = this.activeReportConfig;
    const labelKey = cfg.columns[0]?.key;
    return source.slice(0, 8).map(r => String(r[labelKey] ?? '').slice(0, 8));
  }

  getChartValues(): number[] {
    const source = this.previewRows.length ? this.previewRows : this.activeReportConfig.previewRows;
    const cfg = this.activeReportConfig;
    const numericKey = cfg.columns.find(c => typeof Number(source[0]?.[c.key]) === 'number' && !isNaN(Number(source[0]?.[c.key])) && cfg.columns.indexOf(c) > 0)?.key
      ?? cfg.columns[1]?.key;
    return source.slice(0, 8).map(r => Number(r[numericKey] ?? 0));
  }

  getChartBars(): { label: string; val: number; pct: string }[] {
    const labels = this.getChartLabels();
    const values = this.getChartValues();
    const max = Math.max(...values, 1);
    return labels.map((label, i) => ({
      label,
      val: values[i] ?? 0,
      pct: ((values[i] ?? 0) / max * 100).toFixed(1) + '%',
    }));
  }

  getPieGradient(): string {
    const datasets = this.activeReportConfig.chartDatasets;
    const labels = this.activeReportConfig.chartLabels;
    if (datasets.length === 1) {
      const total = datasets[0].data.reduce((a, b) => a + b, 0);
      const colors = ['#1B7505','#0d6efd','#7c3aed','#f97316','#0891b2','#e11d48'];
      let deg = 0;
      const stops: string[] = [];
      datasets[0].data.forEach((val, i) => {
        const pct = (val / total) * 100;
        stops.push(`${colors[i % colors.length]} ${deg}% ${deg + pct}%`);
        deg += pct;
      });
      return `conic-gradient(${stops.join(', ')})`;
    }
    return `conic-gradient(#3b82f6 0% 50%, #ec4899 50% 100%)`;
  }

  // ── Export Excel (desde el backend) ──

  exportExcel(): void {
    if (this.isExportingExcel) return;
    this.isExportingExcel = true;

    this.reportService.downloadReport({
      type: this.activeReportTypeKey,
      format: 'EXCEL',
      columns: Array.from(this.selectedColumns),
    }).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte-coordinacion-${this.selectedPeriod}.xlsx`;
        a.click();
        URL.revokeObjectURL(url);
        this.isExportingExcel = false;
      },
      error: () => {
        this.isExportingExcel = false;
      },
    });
  }

  // ── Export PDF ──

  exportPDF(): void {
    if (this.isExporting || this.selectedColumns.size === 0) return;
    this.isExporting = true;

    const cfg = this.activeReportConfig;
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(18);
    doc.setTextColor(27, 117, 5);
    doc.text(`Reporte – ${cfg.label}`, 14, y);
    y += 8;

    doc.setFontSize(10);
    doc.setTextColor(108, 117, 125);
    doc.text(`Periodo: ${this.currentPeriodLabel}  |  Generado el ${this.reportDate}`, 14, y);
    y += 10;

    doc.setDrawColor(27, 117, 5);
    doc.setLineWidth(0.5);
    doc.line(14, y, 196, y);
    y += 10;

    const visibleCols = cfg.columns.filter(c => this.selectedColumns.has(c.key));
    const headers = visibleCols.map(c => c.label);
    // Usa datos reales si están disponibles, sino cae en el mock de la config
    const dataSource = this.previewRows.length ? this.previewRows : cfg.previewRows;
    const rows = dataSource.map(row => visibleCols.map(c => String(row[c.key] ?? '')));

    autoTable(doc, {
      startY: y,
      head: [headers],
      body: rows,
      theme: 'grid',
      headStyles: { fillColor: [27, 117, 5], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 4 },
      alternateRowStyles: { fillColor: [245, 250, 245] },
    });

    if (cfg.hasGenderBreakdown) {
      const finalY = (doc as any).lastAutoTable.finalY + 8;
      doc.setFontSize(9);
      doc.setTextColor(108, 117, 125);
      doc.text('* El reporte incluye desglose por género (Masculino / Femenino).', 14, finalY);
    }

    doc.save(`reporte-${cfg.key.toLowerCase()}-${this.selectedPeriod}.pdf`);
    this.isExporting = false;
  }

  // ── Private helpers ──



  private loadDashboard(): void {
    this.dashboardService.getDashboard().subscribe(data => {
      this.dashboard = data;
      this.isLoading = false;
      // Refrescar preview con datos reales ahora que el dashboard está cargado
      this.loadPreview();
      this.cdr.detectChanges();
      if (this.viewInitialized) {
        this.initCharts();
      }
    });
  }

  private initCharts(): void {
    if (!this.dashboard) return;
    this.initBarChart();
    this.initDonutChart();
  }

  private initBarChart(): void {
    const ctx = this.barChartRef?.nativeElement.getContext('2d');
    if (!ctx || !this.dashboard) return;

    const rawLabels  = this.dashboard.solicitudesPorMateria.map(s => s.asignatura);
    const shortLabels = rawLabels.map(l => this.shortenLabel(l));
    const gestionadas = this.dashboard.solicitudesPorMateria.map(s => s.gestionadas);
    const pendientes  = this.dashboard.solicitudesPorMateria.map(s => s.pendientes);

    // Paleta: 1 color distinto por materia
    const PALETTE = [
      '#1B7505', '#0d6efd', '#7c3aed', '#f97316', '#0891b2',
      '#e11d48', '#16a34a', '#ca8a04', '#0e7490', '#7e22ce',
    ];
    const barColors   = rawLabels.map((_, i) => PALETTE[i % PALETTE.length]);
    const barColorsLight = barColors.map(c => c + '55'); // versión translúcida para Pendientes

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: shortLabels,
        datasets: [
          {
            label: 'Gestionadas',
            data: gestionadas,
            backgroundColor: barColors,
            borderColor: barColors,
            borderWidth: 0,
            borderRadius: 5,
            borderSkipped: false,
          },
          {
            label: 'Pendientes',
            data: pendientes,
            backgroundColor: barColorsLight,
            borderColor: barColors,
            borderWidth: 1.5,
            borderRadius: 5,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { font: { size: 12 }, usePointStyle: true, pointStyleWidth: 10 },
          },
          tooltip: {
            mode: 'index',
            callbacks: {
              // Muestra el nombre completo en el tooltip
              title: (items) => rawLabels[items[0]?.dataIndex] ?? '',
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
            ticks: {
              font: { size: 11, weight: 'bold' },
              color: '#495057',
              maxRotation: 0,
              autoSkip: false,
            },
          },
          y: {
            stacked: true,
            grid: { color: '#f0f0f0' },
            ticks: { stepSize: 5 },
          },
        },
      },
    });
  }

  /**
   * Abrevia un nombre de materia largo a sus iniciales mayúsculas.
   * Si el nombre tiene 16 chars o menos, lo retorna tal cual.
   */
  private shortenLabel(name: string): string {
    if (name.length <= 15) return name;
    const stopWords = new Set(['de', 'del', 'y', 'e', 'la', 'el', 'en', 'a',
                               'los', 'las', 'con', 'por', 'un', 'una', 'al']);
    const words = name.trim().split(/\s+/);
    const initials = words
      .filter(w => !stopWords.has(w.toLowerCase()))
      .map(w => w[0].toUpperCase());
    return initials.join('');
  }

  private initDonutChart(): void {
    const ctx = this.donutChartRef?.nativeElement.getContext('2d');
    if (!ctx || !this.dashboard) return;

    const labels = this.dashboard.modalidades.map(m => m.modalidad);
    const data = this.dashboard.modalidades.map(m => Number(m.total));
    const colors = ['#198754', '#3b82f6', '#f59e0b', '#e74c3c'];

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors.slice(0, labels.length),
            borderWidth: 0,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { size: 12 },
              usePointStyle: true,
              pointStyleWidth: 10,
              padding: 16,
            },
          },
        },
      },
    });
  }
}
