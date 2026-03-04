import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import {
  ChartTypeKey,
  ReportColumn,
  ReportConfig,
  ReportFormat,
  ReportPreviewRow,
  ReportTypeKey,
} from '../../../models/coordination/coord-report/coord-report.model';
import {
  CoordReportService,
  REPORT_CONFIGS,
} from '../../../services/coordination/coord-report/coord-report.service';
import { CoordDashboardService } from '../../../services/coordination/coord-dashboard/coord-dashboard.service';

Chart.register(...registerables);

@Component({
  selector: 'app-coord-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coord-reports.component.html',
  styleUrls: ['./coord-reports.component.css'],
})
export class CoordReportsComponent implements OnDestroy {
  @ViewChild('chartCanvas') chartCanvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly reportService = inject(CoordReportService);
  private readonly dashboardService = inject(CoordDashboardService);
  private chartInstance: Chart | null = null;

  // ── Estado de configuración ──────────────────────────────────────────
  readonly configs: ReportConfig[] = REPORT_CONFIGS;

  selectedTypeKey = signal<ReportTypeKey>('BY_SUBJECT');
  selectedChartType = signal<ChartTypeKey>('BAR');
  showChart = signal(true);
  showTable = signal(true);
  dateFrom = signal('');
  dateTo = signal('');
  downloadFormat = signal<ReportFormat>('PDF');
  isDownloading = signal(false);
  downloadError = signal('');

  // ── Estado de datos del servidor ─────────────────────────────
  serverRows = signal<ReportPreviewRow[]>([]);
  isLoadingPreview = signal(false);
  previewError = signal('');

  // ── Columnas seleccionadas (mapa key → seleccionado) ──────────────────────
  columnSelection = signal<Record<string, boolean>>({});

  // ── Configuración activa derivada ────────────────────────────────────────
  readonly activeConfig = computed<ReportConfig>(
    () => this.configs.find(c => c.key === this.selectedTypeKey())!
  );

  readonly visibleColumns = computed<ReportColumn[]>(() => {
    const sel = this.columnSelection();
    return this.activeConfig().columns.filter(c => sel[c.key] !== false);
  });

  // Usa datos reales si hay; si no, cae en mock local de la config
  readonly previewRows = computed<ReportPreviewRow[]>(() =>
    this.serverRows().length ? this.serverRows() : this.activeConfig().previewRows
  );

  readonly selectedColumnKeys = computed<string[]>(() =>
    this.visibleColumns().map(c => c.key)
  );

  // ── Constructor ───────────────────────────────────────────────────────────
  constructor() {
    // Inicializar selección de columnas cuando cambia el tipo de reporte
    effect(() => {
      const config = this.activeConfig();
      const initial: Record<string, boolean> = {};
      config.columns.forEach(col => (initial[col.key] = col.defaultSelected));
      this.columnSelection.set(initial);

      // Resetear tipo de gráfico si no está disponible
      if (!config.allowedCharts.includes(this.selectedChartType())) {
        this.selectedChartType.set(config.allowedCharts[0]);
      }

      // Cargar datos reales del servidor
      this.loadPreview();

      // Re-renderizar gráfico tras cambio de tipo (diferido para que el DOM esté listo)
      setTimeout(() => this.renderChart(), 60);
    });
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }
  // ── Carga de datos del servidor ────────────────────────────────
  loadPreview(): void {
    // BY_SUBJECT: usa GET /api/coordination/dashboard que ya funciona
    if (this.selectedTypeKey() === 'BY_SUBJECT') {
      this.isLoadingPreview.set(true);
      this.previewError.set('');
      this.dashboardService.getDashboard().subscribe({
        next: data => {
          if (data?.solicitudesPorMateria?.length) {
            this.serverRows.set(
              data.solicitudesPorMateria.map(m => ({
                asignatura:   m.asignatura,
                totalMateria: m.totalMateria,
                pendientes:   m.pendientes,
                gestionadas:  m.gestionadas,
              }))
            );
          } else {
            this.serverRows.set([]);
          }
          this.isLoadingPreview.set(false);
          setTimeout(() => this.renderChart(), 60);
        },
        error: () => {
          this.serverRows.set([]);
          this.isLoadingPreview.set(false);
          setTimeout(() => this.renderChart(), 60);
        },
      });
    } else {
      // Otros tipos: sin endpoint aún, usa datos de muestra
      this.serverRows.set([]);
      this.isLoadingPreview.set(false);
      this.previewError.set('');
      setTimeout(() => this.renderChart(), 60);
    }
  }
  // ── Selección de tipo de reporte ─────────────────────────────────────────
  selectType(key: ReportTypeKey): void {
    this.selectedTypeKey.set(key);
  }

  // ── Control de columnas ──────────────────────────────────────────────────
  toggleColumn(key: string, checked: boolean): void {
    this.columnSelection.update(prev => ({ ...prev, [key]: checked }));
    setTimeout(() => this.renderChart(), 30);
  }

  // ── Control de gráfico ───────────────────────────────────────────────────
  setChartType(type: ChartTypeKey): void {
    this.selectedChartType.set(type);
    setTimeout(() => this.renderChart(), 30);
  }

  onShowChartChange(value: boolean): void {
    this.showChart.set(value);
    if (value) setTimeout(() => this.renderChart(), 80);
    else this.destroyChart();
  }

  // ── Renderizado del gráfico ──────────────────────────────────────────────
  renderChart(): void {
    if (!this.showChart()) return;
    const canvas = this.chartCanvasRef?.nativeElement;
    if (!canvas) return;

    this.destroyChart();

    const config = this.activeConfig();
    const chartType = this.selectedChartType();
    const rows = this.previewRows();  // usa datos reales o mock según disponibilidad

    // Extraer etiquetas y valores de las filas de datos
    const labelKey = config.columns[0]?.key;
    const valueKey = config.columns.find((c, i) => i > 0 && rows.some(r => !isNaN(Number(r[c.key]))))?.key
      ?? config.columns[1]?.key;
    const labels = rows.slice(0, 10).map(r => String(r[labelKey] ?? '').slice(0, 12));
    const values = rows.slice(0, 10).map(r => Number(r[valueKey] ?? 0));
    const color = config.color;

    const datasets = [{
      label: config.columns.find(c => c.key === valueKey)?.label ?? config.label,
      data: values,
      backgroundColor: chartType === 'PIE' || chartType === 'DOUGHNUT'
        ? labels.map((_, i) => PALETTE[i % PALETTE.length])
        : color + 'BB',
      borderColor: color,
      borderWidth: 2,
      fill: chartType === 'LINE',
      tension: 0.35,
    }];

    const cfg: ChartConfiguration = {
      type: chartType === 'BAR' ? 'bar' : chartType === 'LINE' ? 'line' : chartType === 'PIE' ? 'pie' : 'doughnut',
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          title: {
            display: true,
            text: `Vista previa – ${config.label}`,
            font: { size: 14, weight: 'bold' },
          },
        },
        scales: chartType === 'BAR' || chartType === 'LINE'
          ? { y: { beginAtZero: true } }
          : undefined,
      },
    };

    this.chartInstance = new Chart(canvas, cfg);
  }

  private destroyChart(): void {
    this.chartInstance?.destroy();
    this.chartInstance = null;
  }

  // ── Descarga ─────────────────────────────────────────────────────────────
  downloadReport(): void {
    if (this.downloadFormat() === 'PDF') {
      this.exportPDF();
    } else {
      this.exportExcel();
    }
  }

  exportPDF(): void {
    if (this.isDownloading()) return;
    this.isDownloading.set(true);
    this.downloadFormat.set('PDF');
    this.downloadError.set('');

    const cfg = this.activeConfig();
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(18);
    doc.setTextColor(27, 117, 5);
    doc.text(`Reporte – ${cfg.label}`, 14, y);
    y += 8;

    doc.setFontSize(10);
    doc.setTextColor(108, 117, 125);
    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2,'0')}/${String(today.getMonth()+1).padStart(2,'0')}/${today.getFullYear()}`;
    doc.text(`Generado el ${dateStr}`, 14, y);
    y += 10;

    doc.setDrawColor(27, 117, 5);
    doc.setLineWidth(0.5);
    doc.line(14, y, 196, y);
    y += 10;

    const cols = this.visibleColumns();
    const headers = cols.map(c => c.label);
    const rows = this.previewRows().map(row => cols.map(c => String(row[c.key] ?? '')));

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

    doc.save(`reporte-${cfg.key.toLowerCase()}.pdf`);
    this.isDownloading.set(false);
  }

  exportExcel(): void {
    this.isDownloading.set(true);
    this.downloadFormat.set('EXCEL');
    this.downloadError.set('');
    this.reportService
      .downloadReport({
        type: this.selectedTypeKey(),
        format: 'EXCEL',
        dateFrom: this.dateFrom() || undefined,
        dateTo: this.dateTo() || undefined,
        columns: this.selectedColumnKeys(),
      })
      .subscribe({
        next: blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `reporte-${this.selectedTypeKey().toLowerCase()}.xlsx`;
          a.click();
          URL.revokeObjectURL(url);
          this.isDownloading.set(false);
        },
        error: () => {
          this.isDownloading.set(false);
          this.downloadError.set('El servidor no tiene disponible la descarga en Excel por el momento.');
        },
      });
  }

  // ── Helpers para el template ─────────────────────────────────────────────
  trackByKey(_: number, item: ReportColumn): string {
    return item.key;
  }

  trackByConfig(_: number, item: ReportConfig): string {
    return item.key;
  }

  isChartAllowed(type: ChartTypeKey): boolean {
    return this.activeConfig().allowedCharts.includes(type);
  }
}

// Paleta para gráficos de pie/doughnut con dataset único
const PALETTE = [
  '#1B7505', '#0d6efd', '#7c3aed', '#f97316', '#0891b2',
  '#e11d48', '#84cc16', '#f59e0b', '#06b6d4', '#8b5cf6',
];
