import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  untracked,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

import {
  ChartTypeKey,
  PeriodType,
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
import { AdminPeriodsService } from '../../../services/administration/admin-periods/admin-periods.service';
import { GPeriod } from '../../../models/administration/admin-periods/GPeriod.model';

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
  private readonly periodsService = inject(AdminPeriodsService);
  private chartInstance: Chart | null = null;

  // ── Estado de configuración ──────────────────────────────────────────
  readonly configs: ReportConfig[] = REPORT_CONFIGS;

  selectedTypeKey = signal<ReportTypeKey>('BY_SUBJECT');
  selectedChartType = signal<ChartTypeKey>('BAR');
  showChart = signal(true);
  showTable = signal(true);
  periodType = signal<PeriodType>('PERIOD');
  periodValue = signal('');
  downloadFormat = signal<ReportFormat>('PDF');
  isDownloading = signal(false);
  downloadError = signal('');

  // ── Estado de datos del servidor ─────────────────────────────
  serverRows = signal<ReportPreviewRow[]>([]);
  isLoadingPreview = signal(false);
  previewError = signal('');
  hasLoadedPreview = signal(false);

  // ── Columnas seleccionadas (mapa key → seleccionado) ──────────────────────
  columnSelection = signal<Record<string, boolean>>({});
  // ── Períodos disponibles desde el backend ────────────────────────
  availablePeriods = signal<GPeriod[]>([]);
  isLoadingPeriods = signal(false);

  readonly availableYears = computed<number[]>(() => {
    const years = new Set<number>();
    this.availablePeriods().forEach(p => {
      if (p.fechainicio) years.add(new Date(p.fechainicio).getFullYear());
      if (p.fechafin)    years.add(new Date(p.fechafin).getFullYear());
    });
    return Array.from(years).sort((a, b) => b - a);
  });

  readonly periodDateRange = computed<{ min: string; max: string }>(() => {
    const periods = this.availablePeriods();
    if (!periods.length) return { min: '', max: '' };
    const allDates = [
      ...periods.map(p => p.fechainicio),
      ...periods.map(p => p.fechafin),
    ].filter(Boolean);
    return {
      min: allDates.reduce((a, b) => a < b ? a : b).substring(0, 10),
      max: allDates.reduce((a, b) => a > b ? a : b).substring(0, 10),
    };
  });
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

    // Cargar períodos disponibles una vez al iniciar
    this.loadAvailablePeriods();
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  // ── Carga de períodos disponibles ────────────────────────────
  loadAvailablePeriods(): void {
    this.isLoadingPeriods.set(true);
    this.periodsService.getPeriods().subscribe({
      next: periods => {
        this.availablePeriods.set(periods ?? []);
        this.isLoadingPeriods.set(false);
      },
      error: () => {
        this.availablePeriods.set([]);
        this.isLoadingPeriods.set(false);
      },
    });
  }

  // ── Carga de datos del servidor ────────────────────────────────
  loadPreview(): void {
    this.isLoadingPreview.set(true);
    this.previewError.set('');

    this.hasLoadedPreview.set(false);
    this.reportService.getReportPreview({
      type: this.selectedTypeKey(),
      periodType: this.periodType() || undefined,
      periodValue: this.periodValue() || undefined,
    }).subscribe({
      next: rows => {
        this.serverRows.set(Array.isArray(rows) && rows.length ? rows : []);
        this.isLoadingPreview.set(false);
        this.hasLoadedPreview.set(true);
        setTimeout(() => this.renderChart(), 60);
      },
      error: (err) => {
        const status = err?.status;
        const msg = err?.error?.message || err?.message || '';
        this.previewError.set(
          status === 404
            ? 'El endpoint de reportes no está disponible (404).'
            : status === 403
            ? 'Sin permisos para consultar este reporte.'
            : `Error al cargar datos${ msg ? ': ' + msg : ' (' + status + ')' }.`
        );
        this.serverRows.set([]);
        this.isLoadingPreview.set(false);
        this.hasLoadedPreview.set(true);
        setTimeout(() => this.renderChart(), 60);
      },
    });
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

    // Colores multi-barra para BY_SUBJECT en barras, y siempre para PIE
    const useMultiColor = chartType === 'PIE' || (chartType === 'BAR' && config.key === 'BY_SUBJECT');

    const datasets = [{
      label: config.columns.find(c => c.key === valueKey)?.label ?? config.label,
      data: values,
      backgroundColor: useMultiColor
        ? labels.map((_, i) => PALETTE[i % PALETTE.length])
        : color + 'BB',
      borderColor: useMultiColor
        ? labels.map((_, i) => PALETTE[i % PALETTE.length])
        : color,
      borderWidth: 2,
      fill: chartType === 'LINE',
      tension: 0.35,
    }];

    // Plugin inline para mostrar porcentajes dentro del gráfico de pastel
    const piePercentPlugin = {
      id: 'piePercentLabels',
      afterDatasetsDraw(chart: any) {
        if (chart.config.type !== 'pie') return;
        const { ctx } = chart;
        chart.data.datasets.forEach((ds: any, di: number) => {
          const meta = chart.getDatasetMeta(di);
          const total = (ds.data as number[]).reduce((a: number, b: number) => a + b, 0);
          meta.data.forEach((arc: any, i: number) => {
            const val = (ds.data as number[])[i];
            const pct = total > 0 ? Math.round(val / total * 100) : 0;
            if (pct < 4) return;
            const pos = arc.tooltipPosition();
            ctx.save();
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 13px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(0,0,0,0.45)';
            ctx.shadowBlur = 4;
            ctx.fillText(`${pct}%`, pos.x, pos.y);
            ctx.restore();
          });
        });
      },
    };

    const cfg: ChartConfiguration = {
      type: chartType === 'BAR' ? 'bar' : chartType === 'LINE' ? 'line' : 'pie',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: chartType === 'PIE' ? 'right' : 'top',
            labels: chartType === 'PIE' ? { boxWidth: 14, padding: 14 } : undefined,
          },
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

    this.chartInstance = new Chart(canvas, { ...cfg, plugins: chartType === 'PIE' ? [piePercentPlugin] : [] } as any);
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
    this.isDownloading.set(true);
    this.downloadFormat.set('PDF');
    this.downloadError.set('');
    this.reportService
      .downloadReport({
        type: this.selectedTypeKey(),
        format: 'PDF',
        periodType: this.periodType() || undefined,
        periodValue: this.periodValue() || undefined,
        columns: this.selectedColumnKeys(),
      })
      .subscribe({
        next: blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `reporte-${this.selectedTypeKey().toLowerCase()}.pdf`;
          a.click();
          URL.revokeObjectURL(url);
          this.isDownloading.set(false);
        },
        error: () => {
          this.isDownloading.set(false);
          this.downloadError.set('No se pudo generar el PDF. Intente de nuevo.');
        },
      });
  }

  exportExcel(): void {
    this.isDownloading.set(true);
    this.downloadFormat.set('EXCEL');
    this.downloadError.set('');
    this.reportService
      .downloadReport({
        type: this.selectedTypeKey(),
        format: 'EXCEL',
        periodType: this.periodType() || undefined,
        periodValue: this.periodValue() || undefined,
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
