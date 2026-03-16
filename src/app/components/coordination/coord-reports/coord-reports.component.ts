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
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import {
  ChartTypeKey,
  InstitutionLogoDTO,
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
  readonly today = new Date();

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

  // ── Logo de la institución del usuario ──────────────────────
  institutionLogo = signal<InstitutionLogoDTO | null>(null);
  private logoImageBase64 = signal<string | null>(null);

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

    // Cargar logo de la institución del usuario
    this.loadInstitutionLogo();
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  // ── Carga del logo institucional ─────────────────────────────
  private loadInstitutionLogo(): void {
    this.reportService.getInstitutionLogo().subscribe({
      next: logo => {
        console.log('[Logo] DTO recibido:', logo);
        this.institutionLogo.set(logo);
        if (logo?.logoUrl) {
          // Si el backend ya devuelve base64 directamente, usarlo sin fetch
          if (logo.logoUrl.startsWith('data:')) {
            console.log('[Logo] URL ya es base64, usando directamente');
            this.logoImageBase64.set(logo.logoUrl);
            return;
          }
          // Normalizar URL absoluta → ruta relativa para que pase por el proxy
          let url = logo.logoUrl;
          try {
            const parsed = new URL(url);
            url = parsed.pathname + parsed.search;
            console.log('[Logo] URL absoluta normalizada a:', url);
          } catch {
            // Ya es relativa, dejamos como está
          }
          console.log('[Logo] Cargando imagen desde:', url);
          this.preloadLogoAsBase64(url);
        } else {
          console.warn('[Logo] logoUrl vacío o nulo en el DTO');
        }
      },
      error: (err) => {
        console.error('[Logo] Error al obtener DTO del logo:', err?.status, err?.message);
        this.institutionLogo.set(null);
      },
    });
  }

  private preloadLogoAsBase64(url: string): void {
    this.reportService.getInstitutionLogoBase64(url).subscribe({
      next: base64 => {
        console.log('[Logo] base64 obtenido:', base64 ? 'OK (' + base64.length + ' chars)' : 'null');
        this.logoImageBase64.set(base64);
      },
      error: (err) => console.error('[Logo] Error al cargar imagen:', err),
    });
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

    const type = this.selectedTypeKey();
    const pType = this.periodType();
    const pValue = this.periodValue();

    // Para tipos YEAR, MONTHLY o WEEKLY: resolver a períodos académicos reales
    if (pType !== 'PERIOD' && pValue) {
      const matchingPeriods = this.findPeriodsForDateFilter(pType, pValue);

      if (matchingPeriods.length === 0) {
        this.serverRows.set([]);
        this.isLoadingPreview.set(false);
        this.hasLoadedPreview.set(true);
        setTimeout(() => this.renderChart(), 60);
        return;
      }

      forkJoin(
        matchingPeriods.map(p =>
          this.reportService.getReportPreview({ type, periodValue: p.periodo }).pipe(
            catchError(() => of([] as ReportPreviewRow[]))
          )
        )
      ).subscribe({
        next: results => {
          const merged = this.mergePreviewRows(results.flat());
          this.serverRows.set(merged.length ? merged : []);
          this.isLoadingPreview.set(false);
          this.hasLoadedPreview.set(true);
          setTimeout(() => this.renderChart(), 60);
        },
        error: () => {
          this.previewError.set('Error al cargar datos con el filtro seleccionado.');
          this.serverRows.set([]);
          this.isLoadingPreview.set(false);
          this.hasLoadedPreview.set(true);
          setTimeout(() => this.renderChart(), 60);
        },
      });
      return;
    }

    // PERIOD o sin valor: consultar directamente
    this.reportService.getReportPreview({
      type,
      periodValue: pValue || undefined,
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

  /**
   * Encuentra los períodos académicos que se solapan con el filtro de fecha dado.
   */
  private findPeriodsForDateFilter(pType: PeriodType, pValue: string): GPeriod[] {
    const periods = this.availablePeriods();

    if (pType === 'YEAR') {
      const year = Number(pValue);
      return periods.filter(p => {
        const sy = p.fechainicio ? new Date(p.fechainicio).getFullYear() : null;
        const ey = p.fechafin ? new Date(p.fechafin).getFullYear() : null;
        return sy === year || ey === year;
      });
    }

    if (pType === 'MONTHLY') {
      // pValue es como "2026-03"
      const [yStr, mStr] = pValue.split('-');
      const rangeStart = new Date(Number(yStr), Number(mStr) - 1, 1);
      const rangeEnd = new Date(Number(yStr), Number(mStr), 0); // último día del mes
      return periods.filter(p => {
        const pStart = new Date(p.fechainicio);
        const pEnd = new Date(p.fechafin);
        return pStart <= rangeEnd && pEnd >= rangeStart;
      });
    }

    if (pType === 'WEEKLY') {
      // pValue es como "2026-W11"
      const match = pValue.match(/(\d{4})-W(\d{1,2})/);
      if (!match) return periods;
      const yr = Number(match[1]);
      const wk = Number(match[2]);
      // Lunes de la semana ISO
      const jan4 = new Date(yr, 0, 4);
      const weekStart = new Date(jan4.getTime() - ((jan4.getDay() || 7) - 1) * 86400000 + (wk - 1) * 7 * 86400000);
      const weekEnd = new Date(weekStart.getTime() + 6 * 86400000);
      return periods.filter(p => {
        const pStart = new Date(p.fechainicio);
        const pEnd = new Date(p.fechafin);
        return pStart <= weekEnd && pEnd >= weekStart;
      });
    }

    return periods;
  }

  /**
   * Fusiona filas de preview agrupando por la primera columna y sumando las numéricas.
   */
  private mergePreviewRows(rows: ReportPreviewRow[]): ReportPreviewRow[] {
    if (!rows.length) return [];
    const config = this.activeConfig();
    const groupKey = config.columns[0]?.key;
    if (!groupKey) return rows;

    const map = new Map<string, ReportPreviewRow>();
    for (const row of rows) {
      const key = String(row[groupKey] ?? '');
      const existing = map.get(key);
      if (existing) {
        for (const col of config.columns) {
          if (col.key === groupKey) continue;
          const val = Number(row[col.key]);
          if (!isNaN(val)) {
            existing[col.key] = (Number(existing[col.key]) || 0) + val;
          }
        }
      } else {
        map.set(key, { ...row });
      }
    }
    return Array.from(map.values());
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

    try {
      const config   = this.activeConfig();
      const rows     = this.previewRows();
      const cols     = this.visibleColumns();

      const doc      = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const pageW    = doc.internal.pageSize.getWidth();   // 297 mm
      const pageH    = doc.internal.pageSize.getHeight();  // 210 mm
      const margin   = 15;

      const green:     [number, number, number] = [27, 117, 5];
      const darkGray:  [number, number, number] = [40, 40, 40];
      const medGray:   [number, number, number] = [100, 100, 100];
      const lightGray: [number, number, number] = [210, 210, 210];
      const white:     [number, number, number] = [255, 255, 255];
      const headerBg:  [number, number, number] = [245, 251, 244];

      // ── Banda de fondo del encabezado ─────────────────────────────────────
      doc.setFillColor(...headerBg);
      doc.rect(0, 0, pageW, 42, 'F');

      // ── Logo institucional ────────────────────────────────────────────────
      const logoBase64      = this.logoImageBase64();
      const institutionName = this.institutionLogo()?.institutionName ?? '';
      let textX = margin;

      if (logoBase64) {
        doc.addImage(logoBase64, 'PNG', margin, 7, 24, 24);
        textX = margin + 28;
      }

      // ── Nombre de la institución ──────────────────────────────────────────
      if (institutionName) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(15);
        doc.setTextColor(...green);
        doc.text(institutionName.toUpperCase(), textX, 17);
      }

      // ── Subtítulo: tipo de reporte ────────────────────────────────────────
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...darkGray);
      doc.text(`Reporte: ${config.label}`, textX, institutionName ? 24 : 17);

      // ── Período (derecha) ─────────────────────────────────────────────────
      const periodLabel = this.periodValue()
        ? `Período: ${this.periodValue()}`
        : 'Período: Todos';
      doc.setFontSize(8.5);
      doc.setTextColor(...medGray);
      doc.text(periodLabel, pageW - margin, 16, { align: 'right' });
      doc.text(
        `Generado: ${new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
        pageW - margin, 23, { align: 'right' }
      );

      // ── Línea separadora verde ────────────────────────────────────────────
      doc.setDrawColor(...green);
      doc.setLineWidth(0.7);
      doc.line(margin, 42, pageW - margin, 42);

      let cursorY = 48;

      // ── Gráfico ───────────────────────────────────────────────────────────
      if (this.showChart() && this.chartInstance && this.chartCanvasRef?.nativeElement) {
        const canvas  = this.chartCanvasRef.nativeElement;
        const imgData = canvas.toDataURL('image/png');
        const maxW    = pageW - margin * 2;
        const chartW  = Math.min(maxW * 0.62, 155);
        const chartH  = Math.min((canvas.height / canvas.width) * chartW, pageH * 0.44);
        const imgX    = margin + (maxW - chartW) / 2;
        doc.addImage(imgData, 'PNG', imgX, cursorY, chartW, chartH);
        cursorY += chartH + 7;
      }

      // ── Tabla ─────────────────────────────────────────────────────────────
      if (this.showTable() && rows.length) {
        autoTable(doc, {
          startY: cursorY,
          head: [cols.map(c => c.label)],
          body: rows.map(row => cols.map(c => String(row[c.key] ?? ''))),
          styles: {
            fontSize: 8.5,
            cellPadding: { top: 3, bottom: 3, left: 4, right: 4 },
            lineColor: lightGray,
            lineWidth: 0.1,
          },
          headStyles: {
            fillColor: green,
            textColor: white,
            fontStyle: 'bold',
            halign: 'center',
            fontSize: 8.5,
          },
          alternateRowStyles: { fillColor: [240, 250, 240] },
          columnStyles: { 0: { fontStyle: 'bold', textColor: darkGray } },
          margin: { left: margin, right: margin },
          tableLineColor: lightGray,
          tableLineWidth: 0.15,
          didDrawPage: (data) => {
            // ── Pie de página ───────────────────────────────────────────────
            const totalPages = (doc as any).internal.getNumberOfPages();
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7.5);
            doc.setTextColor(...medGray);
            doc.setDrawColor(...lightGray);
            doc.setLineWidth(0.3);
            doc.line(margin, pageH - 9, pageW - margin, pageH - 9);
            doc.text('SGRA · Sistema de Gestión de Refuerzos Académicos', margin, pageH - 5);
            doc.text(
              `Página ${data.pageNumber} de ${totalPages}`,
              pageW - margin, pageH - 5, { align: 'right' }
            );
          },
        });
      } else {
        // Pie de página cuando no hay tabla
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(...medGray);
        doc.setDrawColor(...lightGray);
        doc.setLineWidth(0.3);
        doc.line(margin, pageH - 9, pageW - margin, pageH - 9);
        doc.text('SGRA · Sistema de Gestión de Refuerzos Académicos', margin, pageH - 5);
        doc.text(
          `Página 1 de 1`,
          pageW - margin, pageH - 5, { align: 'right' }
        );
      }

      const safeName = config.label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
      doc.save(`reporte-${safeName}.pdf`);
      this.isDownloading.set(false);
    } catch {
      this.isDownloading.set(false);
      this.downloadError.set('No se pudo generar el PDF. Intente de nuevo.');
    }
  }

  async exportExcel(): Promise<void> {
    this.isDownloading.set(true);
    this.downloadFormat.set('EXCEL');
    this.downloadError.set('');

    try {
      const ExcelJS  = await import('exceljs');
      const config   = this.activeConfig();
      const rows     = this.previewRows();
      const cols     = this.visibleColumns();

      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'SGRA';
      workbook.created = new Date();

      const sheet = workbook.addWorksheet(config.label, {
        pageSetup: {
          orientation: 'landscape',
          fitToPage: true,
          fitToWidth: 1,
          paperSize: 9,  // A4
        },
      });

      // ── Constantes de color (ARGB) ────────────────────────────────────────
      const C_BG_HEADER = 'FFF5FBF4';   // verde muy pálido — fondo encabezado
      const C_GREEN     = 'FF1B7505';   // verde principal
      const C_DARK      = 'FF282828';   // gris oscuro texto
      const C_MED       = 'FF646464';   // gris medio texto secundario
      const C_LGRAY     = 'FFD2D2D2';   // gris claro bordes
      const C_WHITE     = 'FFFFFFFF';
      const C_ALT       = 'FFF8FCF8';   // verde muy pálido filas alternas

      const colCount  = Math.max(cols.length, 1);
      const lastColL  = this.excelColLetter(colCount);

      // ── Ancho de columnas ─────────────────────────────────────────────────
      // Columna A reservada para el logo: ~70 px → 10 unidades (1u ≈ 7 px)
      // las filas 1+2 suman 30+24 = 54 pts ≈ 72 px, así queda casi cuadrada
      sheet.getColumn(1).width = 10;
      cols.forEach((col, i) => {
        if (i === 0) return; // col A ya fijada
        sheet.getColumn(i + 1).width = Math.max(col.label.length + 8, 16);
      });
      // Primera columna de datos también con ancho suficiente
      if (colCount >= 1) {
        sheet.getColumn(2).width = Math.max((cols[0]?.label.length ?? 4) + 8, 16);
      }

      // ── Helper: aplica fondo verde pálido a toda una fila ────────────────
      const fillHeaderRow = (r: number) => {
        for (let c = 1; c <= colCount; c++) {
          sheet.getCell(r, c).fill = {
            type: 'pattern', pattern: 'solid', fgColor: { argb: C_BG_HEADER },
          };
        }
      };

      // ── Helper: fusiona sólo si start ≠ end ──────────────────────────────
      const safeMerge = (addr: string) => {
        const [a, b] = addr.split(':');
        if (a !== b) sheet.mergeCells(addr);
      };

      // ── Columnas de texto dentro del encabezado ───────────────────────────
      // Col A (1) → reservada para el logo / relleno
      // Cols B…(last-1) → institución / subtítulo (izquierda)
      // Col last        → fecha / período (derecha)
      const textStartL = this.excelColLetter(2);                             // B
      const textEndL   = colCount >= 3 ? this.excelColLetter(colCount - 1)  // penúltima
                                       : lastColL;

      // ── Fila 1: nombre institución  +  fecha ─────────────────────────────
      fillHeaderRow(1);
      sheet.getRow(1).height = 30;

      if (colCount >= 3) {
        safeMerge(`${textStartL}1:${textEndL}1`);
      }
      const instName = this.institutionLogo()?.institutionName ?? '';
      const instCell = sheet.getCell(`${textStartL}1`);
      instCell.value     = instName ? instName.toUpperCase() : 'NOMBRE DE LA INSTITUCIÓN';
      instCell.font      = { bold: true, size: 13, color: { argb: C_GREEN } };
      instCell.alignment = { horizontal: 'left', vertical: 'middle' };

      if (colCount >= 2) {
        const dateCell     = sheet.getCell(1, colCount);
        dateCell.value     = new Date().toLocaleDateString('es-ES', {
          day: '2-digit', month: '2-digit', year: 'numeric',
        });
        dateCell.font      = { bold: true, size: 10, color: { argb: C_DARK } };
        dateCell.alignment = { horizontal: 'right', vertical: 'middle' };
      }

      // ── Fila 2: tipo de reporte  +  período ──────────────────────────────
      fillHeaderRow(2);
      sheet.getRow(2).height = 24;

      if (colCount >= 3) {
        safeMerge(`${textStartL}2:${textEndL}2`);
      }
      const subCell     = sheet.getCell(`${textStartL}2`);
      subCell.value     = `Reporte: ${config.label}`;
      subCell.font      = { size: 10, color: { argb: C_DARK } };
      subCell.alignment = { horizontal: 'left', vertical: 'middle' };

      if (colCount >= 2) {
        const perCell     = sheet.getCell(2, colCount);
        perCell.value     = this.periodValue() ? `Período: ${this.periodValue()}` : 'Período: Todos';
        perCell.font      = { size: 9, italic: true, color: { argb: C_MED } };
        perCell.alignment = { horizontal: 'right', vertical: 'middle' };
      }

      // ── Fila 3: franja separadora verde (como la línea del PDF) ──────────
      sheet.getRow(3).height = 4;
      for (let c = 1; c <= colCount; c++) {
        sheet.getCell(3, c).fill = {
          type: 'pattern', pattern: 'solid', fgColor: { argb: C_GREEN },
        };
      }

      // ── Fila 4: espacio vacío después del header ──────────────────────────
      sheet.getRow(4).height = 8;

      // ── Logo institucional: llena A1:A2 con proporciones correctas ────────
      const logoBase64Excel = this.logoImageBase64();
      if (logoBase64Excel) {
        const base64Data  = logoBase64Excel.split(',')[1];
        const logoImageId = workbook.addImage({ base64: base64Data, extension: 'png' });
        sheet.addImage(logoImageId, {
          tl: { col: 0, row: 0 },
          br: { col: 1, row: 2 },
          editAs: 'twoCell',
        } as any);
      }

      let nextRow = 5;

      // ── Gráfico ──────────────────────────────────────────────────────────
      if (this.showChart() && this.chartInstance && this.chartCanvasRef?.nativeElement) {
        const canvas      = this.chartCanvasRef.nativeElement;
        const dataUrl     = canvas.toDataURL('image/png');
        const base64      = dataUrl.split(',')[1];
        const imageId     = workbook.addImage({ base64, extension: 'png' });
        const imgW        = 560;
        const imgH        = Math.round((canvas.height / canvas.width) * imgW);
        const rowsNeeded  = Math.ceil(imgH / 20) + 1;

        sheet.addImage(imageId, {
          tl: { col: 0, row: nextRow - 1 },
          ext: { width: imgW, height: imgH },
        });
        nextRow += rowsNeeded;
      }

      // ── Espacio entre gráfico y tabla ─────────────────────────────────────
      if (this.showChart() && this.showTable() && rows.length) {
        sheet.getRow(nextRow).height = 8;
        nextRow++;
      }

      // ── Cabecera de tabla ─────────────────────────────────────────────────
      if (this.showTable() && rows.length) {
        const headerRow   = sheet.getRow(nextRow);
        headerRow.height  = 20;
        cols.forEach((col, i) => {
          const cell     = headerRow.getCell(i + 1);
          cell.value     = col.label;
          cell.font      = { bold: true, color: { argb: C_WHITE }, size: 9 };
          cell.fill      = { type: 'pattern', pattern: 'solid', fgColor: { argb: C_GREEN } };
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
          cell.border    = {
            top:    { style: 'thin',   color: { argb: C_LGRAY } },
            bottom: { style: 'medium', color: { argb: 'FF0D5A03' } },
            left:   { style: 'thin',   color: { argb: C_LGRAY } },
            right:  { style: 'thin',   color: { argb: C_LGRAY } },
          };
        });
        nextRow++;

        // ── Filas de datos ────────────────────────────────────────────────
        rows.forEach((row, idx) => {
          const dataRow    = sheet.getRow(nextRow);
          dataRow.height   = 16;
          const isEvenRow  = idx % 2 === 1;
          cols.forEach((col, i) => {
            const cell     = dataRow.getCell(i + 1);
            cell.value     = row[col.key] ?? '';
            cell.font      = {
              bold: i === 0,
              size: 9,
              color: { argb: C_DARK },
            };
            cell.alignment = { horizontal: i === 0 ? 'left' : 'center', vertical: 'middle' };
            if (isEvenRow) {
              cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C_ALT } };
            }
            cell.border = {
              bottom: { style: 'hair', color: { argb: C_LGRAY } },
              left:   { style: 'thin', color: { argb: C_LGRAY } },
              right:  { style: 'thin', color: { argb: C_LGRAY } },
            };
          });
          nextRow++;
        });

        // ── Fila de totales / cierre de tabla (borde inferior) ────────────
        for (let c = 1; c <= colCount; c++) {
          sheet.getCell(nextRow - 1, c).border = {
            ...sheet.getCell(nextRow - 1, c).border,
            bottom: { style: 'thin', color: { argb: C_LGRAY } },
          };
        }
      }

      // ── Fila de pie de hoja ───────────────────────────────────────────────
      nextRow += 1;
      for (let c = 1; c <= colCount; c++) {
        sheet.getCell(nextRow, c).border = {
          top: { style: 'thin', color: { argb: C_LGRAY } },
        };
      }
      safeMerge(`A${nextRow}:${lastColL}${nextRow}`);
      const footerCell     = sheet.getCell(`A${nextRow}`);
      footerCell.value     = 'SGRA · Sistema de Gestión de Refuerzos Académicos';
      footerCell.font      = { size: 8, italic: true, color: { argb: C_MED } };
      footerCell.alignment = { horizontal: 'center' };
      sheet.getRow(nextRow).height = 14;

      // ── Footer de impresión (cabecera/pie de página al imprimir) ──────────
      sheet.headerFooter = {
        oddFooter: `&LSGRA · Sistema de Gestión de Refuerzos Académicos&RPágina &P de &N`,
      };

      // ── Guardar ───────────────────────────────────────────────────────────
      const buffer   = await workbook.xlsx.writeBuffer();
      const blob     = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url      = URL.createObjectURL(blob);
      const a        = document.createElement('a');
      a.href         = url;
      const safeName = config.label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
      a.download     = `reporte-${safeName}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
      this.isDownloading.set(false);
    } catch {
      this.isDownloading.set(false);
      this.downloadError.set('No se pudo generar el Excel. Intente de nuevo.');
    }
  }

  /** Convierte número de columna (1-based) a letra(s) de Excel: 1→A, 27→AA, etc. */
  private excelColLetter(n: number): string {
    let result = '';
    while (n > 0) {
      n--;
      result = String.fromCharCode(65 + (n % 26)) + result;
      n      = Math.floor(n / 26);
    }
    return result;
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
