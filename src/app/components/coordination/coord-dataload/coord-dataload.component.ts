import { Component, ViewChild, ElementRef, ChangeDetectorRef, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UploadResult, AIValidationResult } from '../../../models/coordination/coord-dataload';
import { CoordDataloadService } from '../../../services/coordination/coord-dataload/coord-dataload.service';

// 1. Definimos un tipo estricto para las 3 opciones de carga
export type UploadType = 'students' | 'registrations' | 'teachers';

@Component({
  selector: 'app-coord-dataload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coord-dataload.component.html',
  styleUrl: './coord-dataload.component.css',
})
export class CoordDataloadComponent implements OnDestroy {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private destroy$ = new Subject<void>();

  // Estado del dropdown
  dropdownOpen = false;

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click')
  closeDropdown(): void {
    this.dropdownOpen = false;
  }

  // Opción seleccionada para el dropdown
  selectedOption: { id: UploadType; label: string; icon: string } = {
    id: 'students',
    label: 'Estudiantes',
    icon: 'bi bi-mortarboard',
  };

  // Estado de carga
  isLoading = false;

  // Método para cambiar la opción en el dropdown
  selectOption(option: any) {
    this.selectedOption = option;
    this.selectedUploadType = option.id;
    this.dropdownOpen = false;
    this.clearFile();
  }

  // Método principal para subir datos (con validación IA integrada)
  uploadData() {
    if (!this.selectedFile) {
      this.showPrerequisiteAlert('Por favor, selecciona un archivo primero.');
      return;
    }

    // Si ya pasó la validación IA, proceder directamente con la subida
    if (this.aiValidationPassed) {
      this.proceedWithUpload();
      return;
    }

    // Si no ha sido validado, primero validar con IA
    this.isValidating = true;
    this.aiValidationResult = null;
    this.cdr.detectChanges();

    const loadType = this.selectedUploadType;

    this.dataloadService.validateExcelWithAI(this.selectedFile, loadType)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: AIValidationResult) => {
          this.aiValidationResult = result;
          this.isValidating = false;

          if (result.recommendedAction === 'PROCEED') {
            // Sin errores, proceder automáticamente con la subida
            this.aiValidationPassed = true;
            this.cdr.detectChanges();
            this.proceedWithUpload();
          } else if (result.recommendedAction === 'REVIEW') {
            // Hay advertencias, mostrar modal y dejar que el usuario decida
            this.showValidationModal = true;
            this.cdr.detectChanges();
          } else {
            // Errores críticos, no permitir subir
            this.showValidationModal = true;
            this.cdr.detectChanges();
          }
        },
        error: (error: unknown) => {
          console.error('Error en validación IA:', error);
          this.isValidating = false;
          // Si falla la validación IA, permitir continuar con advertencia
          this.aiValidationResult = {
            issues: [],
            aiValidated: false,
            recommendedAction: 'REVIEW',
            summary: 'No se pudo conectar con el servicio de validación. ¿Desea continuar de todas formas?'
          };
          this.showValidationModal = true;
          this.cdr.detectChanges();
        }
      });
  }

  // Método privado que ejecuta la subida real después de validación
  private proceedWithUpload(): void {
    if (!this.selectedFile) return;

    this.isLoading = true;
    let uploadObservable;

    switch (this.selectedOption.id) {
      case 'students':
        uploadObservable = this.dataloadService.uploadStudentsFile(this.selectedFile);
        break;
      case 'registrations':
        uploadObservable = this.dataloadService.uploadRegistrations(this.selectedFile);
        break;
      case 'teachers':
        uploadObservable = this.dataloadService.uploadTeachersFile(this.selectedFile);
        break;
      default:
        this.isLoading = false;
        return;
    }

    uploadObservable.pipe(takeUntil(this.destroy$)).subscribe({
      next: (response: string[]) => {
        this.processUploadReport(response, this.selectedOption.label);
        this.isLoading = false;
        this.selectedFile = null;
        this.resetValidationState();
        if (this.fileInput) {
          this.fileInput.nativeElement.value = '';
        }
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error en la carga:', err);
        this.uploadResults = [
          {
            tipo: this.selectedOption.label as any,
            status: 'error' as const,
            message: 'Hubo un error al procesar el archivo. Intente nuevamente o contacte al administrador.',
            timestamp: new Date(),
          },
        ];
        this.updateCounters();
        this.currentPage = 1;
        this.filterResults();
        this.isLoading = false;
        this.selectedFile = null;
        this.resetValidationState();
        if (this.fileInput) {
          this.fileInput.nativeElement.value = '';
        }
        this.cdr.detectChanges();
      },
    });
  }

  constructor(
    private dataloadService: CoordDataloadService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ===== NUEVO SISTEMA UNIFICADO =====

  // 2. Lista de opciones para generar el menú desplegable en el HTML dinámicamente
  uploadOptions: { id: UploadType; label: string; icon: string }[] = [
    { id: 'students',     label: 'Estudiantes',           icon: 'bi bi-mortarboard'   },
    { id: 'registrations', label: 'Matrículas',           icon: 'bi bi-journal-check' },
    { id: 'teachers',     label: 'Docentes',              icon: 'bi bi-person-badge'  },
  ];

  selectedUploadType: UploadType = 'students';
  selectedFile: File | null = null;
  isDragging = false;
  isUploading = false;
  uploadProgress = 0;
  uploadSuccess = false;

  // ===== RESULTADOS DE CARGA =====
  uploadResults: UploadResult[] = [];
  searchTerm = '';
  paginatedResults: UploadResult[] = [];
  currentPage = 1;
  pageSize = 10;
  currentFilterStatus: 'all' | 'success' | 'error' = 'all';
  filteredResults: UploadResult[] = [];
  Math = Math;
  uploadedItems = 0;
  errorCount = 0;
  successCount = 0;

  // ===== VALIDACIÓN IA =====
  isValidating = false;
  aiValidationResult: AIValidationResult | null = null;
  aiValidationPassed = false;
  skipValidation = false;
  showValidationModal = false;

  // ===== MÉTODOS UNIFICADOS =====

  // Obtiene el label en español de la opción seleccionada (ej. "Periodos Académicos")
  get selectedUploadLabel(): string {
    return this.uploadOptions.find((o) => o.id === this.selectedUploadType)?.label || 'Estudiantes';
  }

  selectUploadType(type: UploadType | any): void {
    // Si pasas el objeto completo desde el HTML, extraemos el ID
    this.selectedUploadType = typeof type === 'string' ? type : type.id;
    this.clearFile();
    this.resetValidationState();
  }

  openFileSelect(): void {
    this.fileInput.nativeElement.click();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(): void {
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (this.isValidFile(file)) {
        this.selectedFile = file;
        this.uploadSuccess = false;
      } else {
        this.showError('Por favor, selecciona un archivo válido (Excel o CSV). Máximo 10 MB.');
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (this.isValidFile(file)) {
        this.selectedFile = file;
        this.uploadSuccess = false;
        // Resetear validación al seleccionar nuevo archivo
        this.resetValidationState();
        // No subir automáticamente, solo asignar el archivo
      } else {
        this.showError('Por favor, selecciona un archivo válido (Excel o CSV). Máximo 10 MB.');
        input.value = '';
      }
    }
  }

  clearFile(event?: Event): void {
    if (event) event.stopPropagation();
    this.selectedFile = null;
    this.uploadProgress = 0;
    this.uploadSuccess = false;
    if (this.fileInput) this.fileInput.nativeElement.value = '';
    // Resetear estado de validación IA
    this.resetValidationState();
    // No limpiar el reporte ni los contadores
    // El reporte y los contadores solo se limpian al cambiar de tipo o subir un nuevo archivo
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      this.showError('Por favor, selecciona un archivo primero.');
      return;
    }
    this.isUploading = true;
    this.uploadProgress = 0;
    let uploadObservable;
    switch (this.selectedUploadType) {
      case 'students':
        uploadObservable = this.dataloadService.uploadStudentsFile(this.selectedFile);
        break;
      case 'registrations':
        uploadObservable = this.dataloadService.uploadRegistrations(this.selectedFile);
        break;
      case 'teachers':
        uploadObservable = this.dataloadService.uploadTeachersFile(this.selectedFile);
        break;
      default:
        this.isUploading = false;
        return;
    }
    uploadObservable.pipe(takeUntil(this.destroy$)).subscribe({
      next: (response: string[]) => {
        this.processUploadReport(response, this.selectedUploadLabel);
        this.isUploading = false;
        this.uploadSuccess = true;
        this.uploadProgress = 100;
        this.selectedFile = null;
        if (this.fileInput) {
          this.fileInput.nativeElement.value = '';
        }
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error en la carga:', error);
        this.uploadResults = [
          {
            tipo: this.selectedUploadLabel as any,
            status: 'error',
            message: `Hubo un error al procesar el archivo de ${this.selectedUploadLabel}. Intente nuevamente o contacte al administrador.`,
            timestamp: new Date(),
          },
        ];
        this.updateCounters();
        this.filterResults();
        this.isUploading = false;
        this.uploadSuccess = false;
        this.uploadProgress = 0;
        this.selectedFile = null;
        if (this.fileInput) {
          this.fileInput.nativeElement.value = '';
        }
        this.cdr.detectChanges();
      },
    });
  }

  private processUploadReport(reporte: string[], tipo: string): void {
    this.uploadResults = [];

    // Keywords para detectar mensajes de error/advertencia del backend
    // Los mensajes técnicos ya no llegan aquí, solo mensajes amigables
    const errorKeywords = [
      'no se pudo',
      'no se encontró',
      'contacte al administrador',
      'ya existe',
      'verifique',
      'problema',
      'advertencia',
    ];

    reporte.forEach((mensaje: string) => {
      const texto = mensaje.toLowerCase();
      const isError = errorKeywords.some((keyword) => texto.includes(keyword));

      // Si el mensaje contiene ✓ es un éxito aunque tenga "verifique" u otra keyword
      const isSuccess = texto.includes('✓') || texto.includes('registrado correctamente')
        || texto.includes('actualizado') || texto.includes('credenciales de acceso')
        || texto.startsWith('resumen:');

      const result: UploadResult = {
        tipo: tipo as any,
        status: (isError && !isSuccess) ? 'error' : 'success',
        message: mensaje,
        timestamp: new Date(),
      };
      this.uploadResults.push(result);
    });

    this.updateCounters();
    this.currentPage = 1;
    this.filterResults();
    this.cdr.detectChanges();
  }

  // ===== FILTROS Y PAGINACIÓN (Se mantienen igual) =====

  private updateCounters(): void {
    this.uploadedItems = this.uploadResults.length;
    this.errorCount = this.uploadResults.filter((r) => r.status === 'error').length;
    this.successCount = this.uploadResults.filter((r) => r.status === 'success').length;
  }

  filterResults(): void {
    let filtered = [...this.uploadResults];
    if (this.currentFilterStatus !== 'all') {
      filtered = filtered.filter((r) => r.status === this.currentFilterStatus);
    }
    if (this.searchTerm.trim()) {
      filtered = filtered.filter((r) =>
        r.message.toLowerCase().includes(this.searchTerm.toLowerCase()),
      );
    }
    this.filteredResults = filtered;
    this.paginatedResults = this.getPaginatedResults(filtered);
  }

  private getPaginatedResults(items: UploadResult[]): UploadResult[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return items.slice(start, end);
  }

  nextPage(event: Event): void {
    event.preventDefault();
    if (this.hasNextPage()) {
      this.currentPage++;
      this.filterResults();
    }
  }

  previousPage(event: Event): void {
    event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterResults();
    }
  }

  hasNextPage(): boolean {
    return this.currentPage * this.pageSize < this.filteredResults.length;
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredResults.length / this.pageSize) || 1;
  }

  filterByStatus(status: 'all' | 'success' | 'error'): void {
    this.currentFilterStatus = status;
    this.currentPage = 1;
    this.filterResults();
  }

  // ===== VALIDACIONES =====
  private isValidFile(file: File): boolean {
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
    ];
    const validExtensions = ['.xlsx', '.xls', '.csv'];
    const maxSize = 10 * 1024 * 1024; // 10 MB
    const fileName = file.name.toLowerCase();
    const hasValidExtension = validExtensions.some((ext) => fileName.endsWith(ext));
    return (validTypes.includes(file.type) || hasValidExtension) && file.size <= maxSize;
  }

  private showError(message: string): void {
    alert(message);
  }

  private showSuccess(message: string): void {
    alert(message);
  }

  // ===== MODAL DE ALERTA DE PRERREQUISITO =====
  showPrerequisiteModal = false;
  prerequisiteMessage = '';

  showPrerequisiteAlert(message: string) {
    this.prerequisiteMessage = message;
    this.showPrerequisiteModal = true;
  }

  closePrerequisiteModal() {
    this.showPrerequisiteModal = false;
  }

  // ===== MÉTODOS DE VALIDACIÓN IA =====

  /**
   * Valida el archivo Excel con IA antes de subirlo
   */
  validateWithAI(): void {
    if (!this.selectedFile) {
      this.showError('Por favor, selecciona un archivo primero.');
      return;
    }

    this.isValidating = true;
    this.aiValidationResult = null;
    this.aiValidationPassed = false;
    this.skipValidation = false;

    // Mapear tipo de upload a loadType para el backend
    const loadType = this.selectedUploadType;

    this.dataloadService.validateExcelWithAI(this.selectedFile, loadType)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: AIValidationResult) => {
          this.aiValidationResult = result;
          this.aiValidationPassed = result.recommendedAction === 'PROCEED';
          this.isValidating = false;
          this.cdr.detectChanges();

          // Si hay issues, mostrar el modal de detalles automáticamente
          if (result.issues && result.issues.length > 0) {
            this.showValidationModal = true;
          }
        },
        error: (error: unknown) => {
          console.error('Error en validación IA:', error);
          this.isValidating = false;
          this.aiValidationResult = {
            issues: [],
            aiValidated: false,
            recommendedAction: 'REVIEW',
            summary: 'No se pudo completar la validación. Puede continuar bajo su responsabilidad.'
          };
          this.cdr.detectChanges();
        }
      });
  }

  /**
   * Muestra el modal con los detalles de la validación
   */
  showValidationDetails(): void {
    this.showValidationModal = true;
  }

  /**
   * Cierra el modal de validación
   */
  closeValidationModal(): void {
    this.showValidationModal = false;
  }

  /**
   * Procede con la carga después de revisar la validación
   */
  proceedAfterValidation(): void {
    this.closeValidationModal();
    this.aiValidationPassed = true;
    this.skipValidation = true;
    // Proceder con la subida
    this.proceedWithUpload();
  }

  /**
   * Cuenta los issues por severidad
   */
  getIssueCount(severity: string): number {
    if (!this.aiValidationResult?.issues) return 0;
    return this.aiValidationResult.issues.filter(i => i.severity === severity).length;
  }

  /**
   * Resetea el estado de validación cuando se cambia de archivo
   */
  private resetValidationState(): void {
    this.aiValidationResult = null;
    this.aiValidationPassed = false;
    this.skipValidation = false;
    this.showValidationModal = false;
  }

}
