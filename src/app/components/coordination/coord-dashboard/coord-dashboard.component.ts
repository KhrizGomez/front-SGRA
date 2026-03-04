import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { CoordDashboardService } from '../../../services/coordination/coord-dashboard/coord-dashboard.service';
import { CoordReportService } from '../../../services/coordination/coord-report/coord-report.service';
import { CoordinationDashboard } from '../../../models/coordination/coord-dashboard';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

Chart.register(...registerables);

type ReportPeriod = 'mes' | 'trimestre' | 'semestre' | 'anio';
type ReportMetric = 'asistencia' | 'solicitudes' | 'inasistencia';
type ReportChart = 'materia' | 'modalidad';

@Component({
  selector: 'app-coord-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coord-dashboard.component.html',
  styleUrl: './coord-dashboard.component.css',
})
export class CoordDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('barChartCanvas') barChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('donutChartCanvas') donutChartRef!: ElementRef<HTMLCanvasElement>;

  dashboard: CoordinationDashboard | null = null;
  isLoading = true;

  // ── Report modal state ──
  selectedPeriod: ReportPeriod = 'semestre';
  selectedMetrics = new Set<ReportMetric>(['asistencia', 'solicitudes', 'inasistencia']);
  selectedCharts = new Set<ReportChart>(['materia', 'modalidad']);
  isExporting = false;
  isExportingExcel = false;

  private viewInitialized = false;

  readonly periodLabels: Record<ReportPeriod, string> = {
    mes: 'Último mes',
    trimestre: 'Trimestre',
    semestre: 'Semestre',
    anio: 'Año completo',
  };

  constructor(
    private dashboardService: CoordDashboardService,
    private reportService: CoordReportService,
    private cdr: ChangeDetectorRef,
  ) {}

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

  selectPeriod(period: ReportPeriod): void {
    this.selectedPeriod = period;
  }

  toggleMetric(metric: ReportMetric): void {
    if (this.selectedMetrics.has(metric)) {
      this.selectedMetrics.delete(metric);
    } else {
      this.selectedMetrics.add(metric);
    }
  }

  toggleChart(chart: ReportChart): void {
    if (this.selectedCharts.has(chart)) {
      this.selectedCharts.delete(chart);
    } else {
      this.selectedCharts.add(chart);
    }
  }

  get selectedCount(): number {
    return this.selectedMetrics.size + this.selectedCharts.size;
  }

  get currentPeriodLabel(): string {
    return this.periodLabels[this.selectedPeriod];
  }

  get reportDate(): string {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  // ── Export Excel (desde el backend) ──

  exportExcel(): void {
    if (this.isExportingExcel) return;
    this.isExportingExcel = true;

    this.reportService.downloadReport('COORDINATION_DASHBOARD', 'EXCEL').subscribe({
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
    if (!this.dashboard || this.isExporting) return;
    this.isExporting = true;

    const doc = new jsPDF();
    let y = 20;

    // Title
    doc.setFontSize(18);
    doc.setTextColor(27, 117, 5);
    doc.text('Reporte de Coordinación', 14, y);
    y += 8;

    doc.setFontSize(10);
    doc.setTextColor(108, 117, 125);
    doc.text(`Periodo: ${this.currentPeriodLabel}  |  Generado el ${this.reportDate}`, 14, y);
    y += 10;

    // Separator line
    doc.setDrawColor(27, 117, 5);
    doc.setLineWidth(0.5);
    doc.line(14, y, 196, y);
    y += 10;

    // KPI metrics
    if (this.selectedMetrics.size > 0) {
      doc.setFontSize(13);
      doc.setTextColor(33, 37, 41);
      doc.text('Métricas Clave', 14, y);
      y += 8;

      const metricsBody: string[][] = [];

      if (this.selectedMetrics.has('asistencia')) {
        metricsBody.push([
          'Porcentaje de Asistencia',
          `${this.dashboard.asistencia.porcentajeAsistencia.toFixed(1)}%`,
        ]);
      }
      if (this.selectedMetrics.has('solicitudes')) {
        metricsBody.push([
          'Total de Solicitudes',
          `${this.dashboard.kpis.totalSolicitudes}`,
        ]);
        metricsBody.push([
          'Gestionadas',
          `${this.dashboard.kpis.gestionadas}`,
        ]);
        metricsBody.push([
          'Pendientes',
          `${this.dashboard.kpis.pendientes}`,
        ]);
      }
      if (this.selectedMetrics.has('inasistencia')) {
        metricsBody.push([
          'Tasa de Inasistencia',
          `${this.dashboard.asistencia.tasaInasistencia.toFixed(1)}%`,
        ]);
      }

      autoTable(doc, {
        startY: y,
        head: [['Indicador', 'Valor']],
        body: metricsBody,
        theme: 'grid',
        headStyles: { fillColor: [27, 117, 5], textColor: 255, fontStyle: 'bold' },
        styles: { fontSize: 10, cellPadding: 4 },
        alternateRowStyles: { fillColor: [245, 250, 245] },
      });

      y = (doc as any).lastAutoTable.finalY + 12;
    }

    // Solicitudes por materia
    if (this.selectedCharts.has('materia') && this.dashboard.solicitudesPorMateria.length > 0) {
      if (y > 240) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(13);
      doc.setTextColor(33, 37, 41);
      doc.text('Solicitudes por Materia', 14, y);
      y += 8;

      const materiaBody = this.dashboard.solicitudesPorMateria.map(s => [
        s.asignatura,
        `${s.totalMateria}`,
        `${s.gestionadas}`,
        `${s.pendientes}`,
      ]);

      autoTable(doc, {
        startY: y,
        head: [['Asignatura', 'Total', 'Gestionadas', 'Pendientes']],
        body: materiaBody,
        theme: 'grid',
        headStyles: { fillColor: [27, 117, 5], textColor: 255, fontStyle: 'bold' },
        styles: { fontSize: 10, cellPadding: 4 },
        alternateRowStyles: { fillColor: [245, 250, 245] },
      });

      y = (doc as any).lastAutoTable.finalY + 12;
    }

    // Modalidades
    if (this.selectedCharts.has('modalidad') && this.dashboard.modalidades.length > 0) {
      if (y > 240) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(13);
      doc.setTextColor(33, 37, 41);
      doc.text('Distribución por Modalidad', 14, y);
      y += 8;

      const totalMod = this.dashboard.modalidades.reduce((sum, m) => sum + Number(m.total), 0);
      const modalBody = this.dashboard.modalidades.map(m => {
        const pct = totalMod > 0 ? ((Number(m.total) / totalMod) * 100).toFixed(1) : '0';
        return [m.modalidad, `${m.total}`, `${pct}%`];
      });

      autoTable(doc, {
        startY: y,
        head: [['Modalidad', 'Total', 'Porcentaje']],
        body: modalBody,
        theme: 'grid',
        headStyles: { fillColor: [27, 117, 5], textColor: 255, fontStyle: 'bold' },
        styles: { fontSize: 10, cellPadding: 4 },
        alternateRowStyles: { fillColor: [245, 250, 245] },
      });
    }

    doc.save(`reporte-coordinacion-${this.selectedPeriod}.pdf`);
    this.isExporting = false;
  }

  // ── Private helpers ──



  private loadDashboard(): void {
    this.dashboardService.getDashboard().subscribe(data => {
      this.dashboard = data;
      this.isLoading = false;
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

    const labels = this.dashboard.solicitudesPorMateria.map(s => s.asignatura);
    const gestionadas = this.dashboard.solicitudesPorMateria.map(s => s.gestionadas);
    const pendientes = this.dashboard.solicitudesPorMateria.map(s => s.pendientes);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Gestionadas',
            data: gestionadas,
            backgroundColor: '#198754',
            borderRadius: 4,
            borderSkipped: false,
          },
          {
            label: 'Pendientes',
            data: pendientes,
            backgroundColor: '#f59e0b',
            borderRadius: 4,
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
          tooltip: { mode: 'index' },
        },
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: { stacked: true, grid: { color: '#f0f0f0' }, ticks: { stepSize: 10 } },
        },
      },
    });
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
