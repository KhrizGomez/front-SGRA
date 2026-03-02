import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-RREETWSH.js";
import {
  HttpClient
} from "./chunk-K6SHIZGP.js";
import {
  ChangeDetectorRef,
  CommonModule,
  Component,
  Injectable,
  NgForOf,
  NgIf,
  ViewChild,
  catchError,
  environment,
  of,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-OENL2SFL.js";

// src/app/services/coordination/coord-dataload/coord-dataload.service.ts
var CoordDataloadService = class _CoordDataloadService {
  http;
  uploadRegistrations(selectedFile) {
    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);
    return this.http.post(`${this.apiUrl}/academic/coordinations/upload-registrations`, formData, { withCredentials: true }).pipe(catchError((error) => {
      console.error("Error al cargar matr\xEDculas:", error);
      const errorMessage = typeof error.error === "string" ? error.error : error.message || "Error al procesar el archivo de matr\xEDculas";
      return of([`ERROR: ${errorMessage}`]);
    }));
  }
  constructor(http) {
    this.http = http;
  }
  apiUrl = environment.apiUrl;
  // ============================================
  // MÉTODOS PARA ESTUDIANTES
  // ============================================
  /**
   * Carga un archivo Excel de estudiantes al servidor
   * @param file Archivo Excel a cargar
   * @returns Observable con el reporte de la carga (string[])
   */
  uploadStudentsFile(file) {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post(`${this.apiUrl}/academic/coordinations/upload-students`, formData, {
      withCredentials: true
    }).pipe(catchError((error) => {
      console.error("Error al cargar estudiantes:", error);
      if (error.status === 422 && Array.isArray(error.error)) {
        return of(error.error);
      }
      const raw = typeof error.error === "string" && error.error.trim() ? error.error : error.message || "Error al procesar el archivo de estudiantes";
      return of([`ERROR: ${raw}`]);
    }));
  }
  /**
   * Carga un archivo Excel de docentes al servidor
   * @param file Archivo Excel a cargar
   * @returns Observable con el reporte de la carga (string[])
   */
  uploadTeachersFile(file) {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post(`${this.apiUrl}/academic/coordinations/upload-teachers`, formData, {
      withCredentials: true
    }).pipe(catchError((error) => {
      console.error("Error al cargar docentes:", error);
      const errorMessage = typeof error.error === "string" ? error.error : "Error al procesar el archivo";
      return of([errorMessage]);
    }));
  }
  /**
   * Obtiene la lista de estudiantes cargados
   */
  getStudents() {
    return this.http.get(`${this.apiUrl}/academic/coordinations/students`, {
      withCredentials: true
    }).pipe(catchError(() => of([])));
  }
  /**
   * Obtiene un estudiante por su código
   */
  getStudentByCodigo(codigo) {
    return this.http.get(`${this.apiUrl}/academic/coordinations/students/${codigo}`, {
      withCredentials: true
    }).pipe(catchError(() => of(null)));
  }
  /**
   * Obtiene la lista de docentes cargados
   */
  getTeachers() {
    return this.http.get(`${this.apiUrl}/academic/coordinations/teachers`, {
      withCredentials: true
    }).pipe(catchError(() => of([])));
  }
  /**
   * Obtiene un docente por su código
   */
  getTeacherByCodigo(codigo) {
    return this.http.get(`${this.apiUrl}/academic/coordinations/teachers/${codigo}`, {
      withCredentials: true
    }).pipe(catchError(() => of(null)));
  }
  // ============================================
  // MÉTODOS DE CONSULTA
  // ============================================
  /**
   * Obtiene la lista de matrículas cargadas
   */
  getRegistrations() {
    return this.http.get(`${this.apiUrl}/academic/coordinations/registrations`, {
      withCredentials: true
    }).pipe(catchError(() => of([])));
  }
  // ============================================
  // MÉTODOS GENERALES
  // ============================================
  /**
   * Obtiene estadísticas de las cargas realizadas
   */
  getUploadStats() {
    return this.http.get(`${this.apiUrl}/stats`, {
      withCredentials: true
    }).pipe(catchError(() => of({
      totalArchivos: 0,
      totalRegistros: 0,
      exitosos: 0,
      errores: 0
    })));
  }
  /**
   * Obtiene el historial de resultados de carga
   */
  getUploadHistory() {
    return this.http.get(`${this.apiUrl}/history`, {
      withCredentials: true
    }).pipe(catchError(() => of([])));
  }
  /**
   * Valida el formato de un archivo antes de cargarlo
   */
  validateFile(file) {
    const maxSize = 10 * 1024 * 1024;
    const allowedExtensions = [".xls", ".xlsx"];
    if (file.size > maxSize) {
      return { valid: false, message: "El archivo excede el tama\xF1o m\xE1ximo de 10 MB." };
    }
    const extension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      return { valid: false, message: "Formato no v\xE1lido. Use archivos .xls o .xlsx" };
    }
    return { valid: true, message: "Archivo v\xE1lido" };
  }
  // ============================================
  // VALIDACIÓN IA DE ARCHIVOS EXCEL
  // ============================================
  /**
   * Valida un archivo Excel usando IA antes de subirlo
   * Analiza campos, formatos, duplicados, idioma, etc.
   * @param file Archivo Excel a validar
   * @param loadType Tipo de carga: 'students', 'teachers', 'registrations'
   * @returns Observable con el resultado de la validación IA
   */
  validateExcelWithAI(file, loadType) {
    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("loadType", loadType);
    return this.http.post(`${this.apiUrl}/academic/coordinations/validate-excel`, formData, { withCredentials: true }).pipe(catchError((error) => {
      console.error("Error al validar archivo con IA:", error);
      return of({
        issues: [],
        aiValidated: false,
        recommendedAction: "REVIEW",
        summary: "No se pudo conectar con el servicio de validaci\xF3n. Puede continuar bajo su responsabilidad.",
        validationTimeMs: 0
      });
    }));
  }
  static \u0275fac = function CoordDataloadService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CoordDataloadService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CoordDataloadService, factory: _CoordDataloadService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CoordDataloadService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/components/coordination/coord-dataload/coord-dataload.component.ts
var _c0 = ["fileInput"];
function CoordDataloadComponent_li_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "a", 27);
    \u0275\u0275listener("click", function CoordDataloadComponent_li_20_Template_a_click_1_listener() {
      const option_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.selectOption(option_r3));
    });
    \u0275\u0275element(2, "i");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const option_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275classMap(option_r3.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r3.label, " ");
  }
}
function CoordDataloadComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275element(1, "i", 29);
    \u0275\u0275elementStart(2, "p", 30);
    \u0275\u0275text(3, "Arrastra el archivo aqu\xED");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 10);
    \u0275\u0275text(5, "o ");
    \u0275\u0275elementStart(6, "a", 31);
    \u0275\u0275text(7, "haz clic para seleccionar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "small", 32);
    \u0275\u0275text(9, "Formatos: .xls, .xlsx \u2022 M\xE1x. 10 MB");
    \u0275\u0275elementEnd()();
  }
}
function CoordDataloadComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275listener("click", function CoordDataloadComponent_div_24_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(1, "i", 34);
    \u0275\u0275elementStart(2, "p", 30);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 35);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 36);
    \u0275\u0275listener("click", function CoordDataloadComponent_div_24_Template_button_click_6_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      ctx_r3.clearFile($event);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(7, "i", 37);
    \u0275\u0275text(8, " Quitar ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.selectedFile.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (ctx_r3.selectedFile.size / 1024 / 1024).toFixed(2), " MB");
  }
}
function CoordDataloadComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39)(2, "span", 40);
    \u0275\u0275text(3, "Validando...");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Validando archivo con IA...");
    \u0275\u0275elementEnd()();
  }
}
function CoordDataloadComponent_div_29_div_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275text(1, "IA");
    \u0275\u0275elementEnd();
  }
}
function CoordDataloadComponent_div_29_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275element(1, "i", 44);
    \u0275\u0275elementStart(2, "div")(3, "strong");
    \u0275\u0275text(4, "\u2705 Validaci\xF3n exitosa.");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275template(6, CoordDataloadComponent_div_29_div_1_span_6_Template, 2, 0, "span", 45);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r3.aiValidationResult.summary, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.aiValidationResult.aiValidated);
  }
}
function CoordDataloadComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275template(1, CoordDataloadComponent_div_29_div_1_Template, 7, 2, "div", 42);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.aiValidationResult.recommendedAction === "PROCEED");
  }
}
function CoordDataloadComponent_div_30_div_33_tr_11_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275element(1, "i", 79);
    \u0275\u0275text(2, "\xC9xito ");
    \u0275\u0275elementEnd();
  }
}
function CoordDataloadComponent_div_30_div_33_tr_11_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275element(1, "i", 80);
    \u0275\u0275text(2, "Error ");
    \u0275\u0275elementEnd();
  }
}
function CoordDataloadComponent_div_30_div_33_tr_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 75);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275template(4, CoordDataloadComponent_div_30_div_33_tr_11_span_4_Template, 3, 0, "span", 76)(5, CoordDataloadComponent_div_30_div_33_tr_11_span_5_Template, 3, 0, "span", 77);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 78);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const result_r7 = ctx.$implicit;
    const i_r8 = ctx.index;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((ctx_r3.currentPage - 1) * ctx_r3.pageSize + i_r8 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", result_r7.status === "success");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", result_r7.status === "error");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(result_r7.message);
  }
}
function CoordDataloadComponent_div_30_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69)(1, "table", 70)(2, "thead", 71)(3, "tr")(4, "th", 72);
    \u0275\u0275text(5, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 73);
    \u0275\u0275text(7, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 74);
    \u0275\u0275text(9, "Mensaje del Sistema");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "tbody");
    \u0275\u0275template(11, CoordDataloadComponent_div_30_div_33_tr_11_Template, 8, 4, "tr", 14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngForOf", ctx_r3.paginatedResults);
  }
}
function CoordDataloadComponent_div_30_ng_template_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81);
    \u0275\u0275element(1, "i", 82);
    \u0275\u0275elementStart(2, "p", 83);
    \u0275\u0275text(3, "Sin resultados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 84);
    \u0275\u0275text(5, "No hay registros que coincidan con tu b\xFAsqueda.");
    \u0275\u0275elementEnd()();
  }
}
function CoordDataloadComponent_div_30_div_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 85)(1, "small", 86);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "nav", 87)(4, "ul", 88)(5, "li", 89)(6, "button", 90);
    \u0275\u0275listener("click", function CoordDataloadComponent_div_30_div_36_Template_button_click_6_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.previousPage($event));
    });
    \u0275\u0275element(7, "i", 91);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "li", 92)(9, "span", 93);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "li", 89)(12, "button", 94);
    \u0275\u0275listener("click", function CoordDataloadComponent_div_30_div_36_Template_button_click_12_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.nextPage($event));
    });
    \u0275\u0275element(13, "i", 95);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" Mostrando ", (ctx_r3.currentPage - 1) * ctx_r3.pageSize + 1, " a ", ctx_r3.Math.min(ctx_r3.currentPage * ctx_r3.pageSize, ctx_r3.filteredResults.length), " de ", ctx_r3.filteredResults.length, " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("disabled", ctx_r3.currentPage === 1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.currentPage === 1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r3.currentPage, " / ", ctx_r3.getTotalPages());
    \u0275\u0275advance();
    \u0275\u0275classProp("disabled", !ctx_r3.hasNextPage());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r3.hasNextPage());
  }
}
function CoordDataloadComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "div", 48)(2, "div", 49)(3, "div")(4, "h5", 8);
    \u0275\u0275element(5, "i", 50);
    \u0275\u0275text(6, " Reporte de Carga ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 51)(8, "span", 52);
    \u0275\u0275element(9, "i", 53);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 54);
    \u0275\u0275element(12, "i", 55);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 56);
    \u0275\u0275element(15, "i", 57);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "button", 58);
    \u0275\u0275element(18, "i", 59);
    \u0275\u0275text(19, " Exportar ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 15)(21, "div", 60)(22, "div", 61)(23, "input", 62);
    \u0275\u0275twoWayListener("ngModelChange", function CoordDataloadComponent_div_30_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.searchTerm, $event) || (ctx_r3.searchTerm = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function CoordDataloadComponent_div_30_Template_input_input_23_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.filterResults());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 63);
    \u0275\u0275element(25, "i", 64);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 65)(27, "button", 66);
    \u0275\u0275listener("click", function CoordDataloadComponent_div_30_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.filterByStatus("all"));
    });
    \u0275\u0275text(28, " Todos ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "button", 66);
    \u0275\u0275listener("click", function CoordDataloadComponent_div_30_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.filterByStatus("success"));
    });
    \u0275\u0275text(30, " Exitosos ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "button", 66);
    \u0275\u0275listener("click", function CoordDataloadComponent_div_30_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.filterByStatus("error"));
    });
    \u0275\u0275text(32, " Errores ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(33, CoordDataloadComponent_div_30_div_33_Template, 12, 1, "div", 67)(34, CoordDataloadComponent_div_30_ng_template_34_Template, 6, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(36, CoordDataloadComponent_div_30_div_36_Template, 14, 11, "div", 68);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const noResults_r10 = \u0275\u0275reference(35);
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("", ctx_r3.successCount, " exitosos ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r3.errorCount, " errores ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r3.uploadedItems, " filas ");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.searchTerm);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("btn-success", ctx_r3.currentFilterStatus === "all")("btn-outline-secondary", ctx_r3.currentFilterStatus !== "all");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("btn-success", ctx_r3.currentFilterStatus === "success")("btn-outline-secondary", ctx_r3.currentFilterStatus !== "success");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("btn-success", ctx_r3.currentFilterStatus === "error")("btn-outline-secondary", ctx_r3.currentFilterStatus !== "error");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r3.paginatedResults.length > 0)("ngIfElse", noResults_r10);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r3.uploadResults.length > ctx_r3.pageSize);
  }
}
function CoordDataloadComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 96)(1, "div", 97)(2, "div", 98)(3, "div", 99)(4, "div", 100);
    \u0275\u0275element(5, "i", 101);
    \u0275\u0275text(6, " Atenci\xF3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 102);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 103);
    \u0275\u0275listener("click", function CoordDataloadComponent_div_33_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closePrerequisiteModal());
    });
    \u0275\u0275text(10, "Aceptar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r3.prerequisiteMessage);
  }
}
function CoordDataloadComponent_div_34_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 123);
    \u0275\u0275text(1, "Validado por IA");
    \u0275\u0275elementEnd();
  }
}
function CoordDataloadComponent_div_34_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 124);
    \u0275\u0275text(1, "Validaci\xF3n Local");
    \u0275\u0275elementEnd();
  }
}
function CoordDataloadComponent_div_34_small_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 86);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Tiempo de validaci\xF3n: ", ctx_r3.aiValidationResult.validationTimeMs, "ms ");
  }
}
function CoordDataloadComponent_div_34_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 125)(1, "span", 126);
    \u0275\u0275element(2, "i", 127);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 128);
    \u0275\u0275element(5, "i", 129);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 130);
    \u0275\u0275element(8, "i", 131);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r3.getIssueCount("ERROR"), " Errores ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r3.getIssueCount("WARNING"), " Advertencias ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r3.getIssueCount("INFO"), " Sugerencias ");
  }
}
function CoordDataloadComponent_div_34_div_18_div_5_p_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 150);
    \u0275\u0275element(1, "i", 151);
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3, "Sugerencia:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const issue_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", issue_r13.suggestion, " ");
  }
}
function CoordDataloadComponent_div_34_div_18_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 137)(1, "h2", 138)(2, "button", 139)(3, "span", 140);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 141);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 142);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 143);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 144)(12, "div", 145)(13, "p", 146)(14, "strong");
    \u0275\u0275text(15, "Problema:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, CoordDataloadComponent_div_34_div_18_div_5_p_17_Template, 5, 1, "p", 147);
    \u0275\u0275elementStart(18, "p", 148);
    \u0275\u0275element(19, "i", 149);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const issue_r13 = ctx.$implicit;
    const i_r14 = ctx.index;
    \u0275\u0275classProp("border-start", true)("border-danger", issue_r13.severity === "ERROR")("border-warning", issue_r13.severity === "WARNING")("border-info", issue_r13.severity === "INFO");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("data-bs-toggle", "collapse")("data-bs-target", "#issue" + i_r14);
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-danger", issue_r13.severity === "ERROR")("bg-warning", issue_r13.severity === "WARNING")("bg-info", issue_r13.severity === "INFO");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", issue_r13.severity, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Fila ", issue_r13.row);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(issue_r13.field);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(issue_r13.message);
    \u0275\u0275advance();
    \u0275\u0275property("id", "issue" + i_r14);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", issue_r13.message);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", issue_r13.suggestion);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Ubicaci\xF3n: Fila ", issue_r13.row, ', Campo "', issue_r13.field, '" ');
  }
}
function CoordDataloadComponent_div_34_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 132)(1, "h6", 133);
    \u0275\u0275element(2, "i", 134);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 135);
    \u0275\u0275template(5, CoordDataloadComponent_div_34_div_18_div_5_Template, 21, 25, "div", 136);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Problemas Detectados (", ctx_r3.aiValidationResult.issues.length, ") ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r3.aiValidationResult.issues);
  }
}
function CoordDataloadComponent_div_34_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 152);
    \u0275\u0275element(1, "i", 153);
    \u0275\u0275elementStart(2, "h5", 154);
    \u0275\u0275text(3, "\xA1Todo en orden!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 86);
    \u0275\u0275text(5, "No se detectaron problemas en el archivo. Puede proceder con la carga.");
    \u0275\u0275elementEnd()();
  }
}
function CoordDataloadComponent_div_34_button_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 155);
    \u0275\u0275listener("click", function CoordDataloadComponent_div_34_button_23_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.proceedAfterValidation());
    });
    \u0275\u0275element(1, "i", 156);
    \u0275\u0275text(2, "Proceder con la carga ");
    \u0275\u0275elementEnd();
  }
}
function CoordDataloadComponent_div_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 104)(1, "div", 105)(2, "div", 106)(3, "div", 107)(4, "h5", 108);
    \u0275\u0275element(5, "i", 109);
    \u0275\u0275text(6, " Resultado de Validaci\xF3n ");
    \u0275\u0275template(7, CoordDataloadComponent_div_34_span_7_Template, 2, 0, "span", 110)(8, CoordDataloadComponent_div_34_span_8_Template, 2, 0, "span", 111);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 112);
    \u0275\u0275listener("click", function CoordDataloadComponent_div_34_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeValidationModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 113)(11, "div", 114)(12, "p", 115)(13, "strong");
    \u0275\u0275text(14, "Resumen:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, CoordDataloadComponent_div_34_small_16_Template, 2, 1, "small", 116);
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, CoordDataloadComponent_div_34_div_17_Template, 10, 3, "div", 117)(18, CoordDataloadComponent_div_34_div_18_Template, 6, 2, "div", 118)(19, CoordDataloadComponent_div_34_div_19_Template, 6, 0, "div", 119);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 120)(21, "button", 121);
    \u0275\u0275listener("click", function CoordDataloadComponent_div_34_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeValidationModal());
    });
    \u0275\u0275text(22, "Cerrar");
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, CoordDataloadComponent_div_34_button_23_Template, 3, 0, "button", 122);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275classProp("bg-success", ctx_r3.aiValidationResult.recommendedAction === "PROCEED")("bg-warning", ctx_r3.aiValidationResult.recommendedAction === "REVIEW")("bg-danger", ctx_r3.aiValidationResult.recommendedAction === "REJECT")("text-white", ctx_r3.aiValidationResult.recommendedAction !== "REVIEW");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bi-check-circle-fill", ctx_r3.aiValidationResult.recommendedAction === "PROCEED")("bi-exclamation-triangle-fill", ctx_r3.aiValidationResult.recommendedAction === "REVIEW")("bi-x-circle-fill", ctx_r3.aiValidationResult.recommendedAction === "REJECT");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r3.aiValidationResult.aiValidated);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r3.aiValidationResult.aiValidated);
    \u0275\u0275advance();
    \u0275\u0275classProp("btn-close-white", ctx_r3.aiValidationResult.recommendedAction !== "REVIEW");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("alert-success", ctx_r3.aiValidationResult.recommendedAction === "PROCEED")("alert-warning", ctx_r3.aiValidationResult.recommendedAction === "REVIEW")("alert-danger", ctx_r3.aiValidationResult.recommendedAction === "REJECT");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r3.aiValidationResult.summary);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.aiValidationResult.validationTimeMs);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.aiValidationResult.issues && ctx_r3.aiValidationResult.issues.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.aiValidationResult.issues && ctx_r3.aiValidationResult.issues.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r3.aiValidationResult.issues || ctx_r3.aiValidationResult.issues.length === 0);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r3.aiValidationResult.recommendedAction !== "REJECT");
  }
}
var CoordDataloadComponent = class _CoordDataloadComponent {
  dataloadService;
  cdr;
  fileInput;
  // Opción seleccionada para el dropdown
  selectedOption = {
    id: "students",
    label: "Estudiantes",
    icon: "bi bi-mortarboard"
  };
  // Estado de carga
  isLoading = false;
  // Método para cambiar la opción en el dropdown
  selectOption(option) {
    this.selectedOption = option;
    this.selectedUploadType = option.id;
    this.clearFile();
  }
  // Método principal para subir datos (con validación IA integrada)
  uploadData() {
    if (!this.selectedFile) {
      this.showPrerequisiteAlert("Por favor, selecciona un archivo primero.");
      return;
    }
    if (this.aiValidationPassed) {
      this.proceedWithUpload();
      return;
    }
    this.isValidating = true;
    this.aiValidationResult = null;
    this.cdr.detectChanges();
    const loadType = this.selectedUploadType;
    this.dataloadService.validateExcelWithAI(this.selectedFile, loadType).subscribe({
      next: (result) => {
        this.aiValidationResult = result;
        this.isValidating = false;
        if (result.recommendedAction === "PROCEED") {
          this.aiValidationPassed = true;
          this.cdr.detectChanges();
          this.proceedWithUpload();
        } else if (result.recommendedAction === "REVIEW") {
          this.showValidationModal = true;
          this.cdr.detectChanges();
        } else {
          this.showValidationModal = true;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error("Error en validaci\xF3n IA:", error);
        this.isValidating = false;
        this.aiValidationResult = {
          issues: [],
          aiValidated: false,
          recommendedAction: "REVIEW",
          summary: "No se pudo conectar con el servicio de validaci\xF3n. \xBFDesea continuar de todas formas?"
        };
        this.showValidationModal = true;
        this.cdr.detectChanges();
      }
    });
  }
  // Método privado que ejecuta la subida real después de validación
  proceedWithUpload() {
    if (!this.selectedFile)
      return;
    this.isLoading = true;
    let uploadObservable;
    switch (this.selectedOption.id) {
      case "students":
        uploadObservable = this.dataloadService.uploadStudentsFile(this.selectedFile);
        break;
      case "registrations":
        uploadObservable = this.dataloadService.uploadRegistrations(this.selectedFile);
        break;
      case "teachers":
        uploadObservable = this.dataloadService.uploadTeachersFile(this.selectedFile);
        break;
      default:
        this.isLoading = false;
        return;
    }
    uploadObservable.subscribe({
      next: (response) => {
        this.uploadResults = response.map((msg) => ({
          tipo: this.selectedOption.label,
          status: msg.toLowerCase().includes("error") ? "error" : "success",
          message: msg,
          timestamp: /* @__PURE__ */ new Date()
        }));
        this.updateCounters();
        this.currentPage = 1;
        this.filterResults();
        this.isLoading = false;
        this.selectedFile = null;
        this.resetValidationState();
        if (this.fileInput) {
          this.fileInput.nativeElement.value = "";
        }
        this.cdr.detectChanges();
      },
      error: () => {
        alert("Hubo un error al procesar el archivo.");
        this.isLoading = false;
      }
    });
  }
  constructor(dataloadService, cdr) {
    this.dataloadService = dataloadService;
    this.cdr = cdr;
  }
  // ===== NUEVO SISTEMA UNIFICADO =====
  // 2. Lista de opciones para generar el menú desplegable en el HTML dinámicamente
  uploadOptions = [
    { id: "students", label: "Estudiantes", icon: "bi bi-mortarboard" },
    { id: "registrations", label: "Matr\xEDculas", icon: "bi bi-journal-check" },
    { id: "teachers", label: "Docentes", icon: "bi bi-person-badge" }
  ];
  selectedUploadType = "students";
  selectedFile = null;
  isDragging = false;
  isUploading = false;
  uploadProgress = 0;
  uploadSuccess = false;
  // ===== RESULTADOS DE CARGA =====
  uploadResults = [];
  searchTerm = "";
  paginatedResults = [];
  currentPage = 1;
  pageSize = 10;
  currentFilterStatus = "all";
  filteredResults = [];
  Math = Math;
  uploadedItems = 0;
  errorCount = 0;
  successCount = 0;
  // ===== VALIDACIÓN IA =====
  isValidating = false;
  aiValidationResult = null;
  aiValidationPassed = false;
  skipValidation = false;
  showValidationModal = false;
  // ===== MÉTODOS UNIFICADOS =====
  // Obtiene el label en español de la opción seleccionada (ej. "Periodos Académicos")
  get selectedUploadLabel() {
    return this.uploadOptions.find((o) => o.id === this.selectedUploadType)?.label || "Estudiantes";
  }
  selectUploadType(type) {
    this.selectedUploadType = typeof type === "string" ? type : type.id;
    this.clearFile();
    this.resetValidationState();
  }
  openFileSelect() {
    this.fileInput.nativeElement.click();
  }
  onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }
  onDragLeave() {
    this.isDragging = false;
  }
  onDrop(event) {
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
        this.showError("Por favor, selecciona un archivo v\xE1lido (Excel o CSV). M\xE1ximo 10 MB.");
      }
    }
  }
  onFileSelected(event) {
    const input = event.target;
    const files = input.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (this.isValidFile(file)) {
        this.selectedFile = file;
        this.uploadSuccess = false;
        this.resetValidationState();
      } else {
        this.showError("Por favor, selecciona un archivo v\xE1lido (Excel o CSV). M\xE1ximo 10 MB.");
        input.value = "";
      }
    }
  }
  clearFile(event) {
    if (event)
      event.stopPropagation();
    this.selectedFile = null;
    this.uploadProgress = 0;
    this.uploadSuccess = false;
    if (this.fileInput)
      this.fileInput.nativeElement.value = "";
    this.resetValidationState();
  }
  uploadFile() {
    if (!this.selectedFile) {
      this.showError("Por favor, selecciona un archivo primero.");
      return;
    }
    this.isUploading = true;
    this.uploadProgress = 0;
    let uploadObservable;
    switch (this.selectedUploadType) {
      case "students":
        uploadObservable = this.dataloadService.uploadStudentsFile(this.selectedFile);
        break;
      case "registrations":
        uploadObservable = this.dataloadService.uploadRegistrations(this.selectedFile);
        break;
      case "teachers":
        uploadObservable = this.dataloadService.uploadTeachersFile(this.selectedFile);
        break;
      default:
        this.isUploading = false;
        return;
    }
    uploadObservable.subscribe({
      next: (response) => {
        this.processUploadReport(response, this.selectedUploadLabel);
        this.isUploading = false;
        this.uploadSuccess = true;
        this.uploadProgress = 100;
        this.selectedFile = null;
        if (this.fileInput) {
          this.fileInput.nativeElement.value = "";
        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.uploadResults = [
          {
            tipo: this.selectedUploadLabel,
            status: "error",
            message: error.message || `Error al cargar el archivo de ${this.selectedUploadLabel}.`,
            timestamp: /* @__PURE__ */ new Date()
          }
        ];
        this.updateCounters();
        this.filterResults();
        this.isUploading = false;
        this.uploadSuccess = false;
        this.uploadProgress = 0;
        this.selectedFile = null;
        if (this.fileInput) {
          this.fileInput.nativeElement.value = "";
        }
        this.cdr.detectChanges();
      }
    });
  }
  processUploadReport(reporte, tipo) {
    this.uploadResults = [];
    const errorKeywords = [
      "error",
      "fall\xF3",
      "fallo",
      "failure",
      "exception",
      "500",
      "invalid",
      "not found",
      "no encontrado",
      "incorrecto",
      "incorrect",
      "missing",
      "faltante",
      "null",
      "nulo",
      "parse",
      "parsing",
      "format",
      "formato",
      "denied",
      "denegado",
      "unauthorized",
      "no autorizado",
      "forbidden",
      "prohibido",
      "timeout",
      "tiempo",
      "expired",
      "expirado",
      "duplicate",
      "duplicado",
      "conflict",
      "conflicto"
    ];
    reporte.forEach((mensaje) => {
      const texto = mensaje.toLowerCase();
      const isError = errorKeywords.some((keyword) => texto.includes(keyword));
      const result = {
        tipo,
        status: isError ? "error" : "success",
        message: mensaje,
        timestamp: /* @__PURE__ */ new Date()
      };
      this.uploadResults.push(result);
    });
    this.updateCounters();
    this.currentPage = 1;
    this.filterResults();
    this.cdr.detectChanges();
  }
  // ===== FILTROS Y PAGINACIÓN (Se mantienen igual) =====
  updateCounters() {
    this.uploadedItems = this.uploadResults.length;
    this.errorCount = this.uploadResults.filter((r) => r.status === "error").length;
    this.successCount = this.uploadResults.filter((r) => r.status === "success").length;
  }
  filterResults() {
    let filtered = [...this.uploadResults];
    if (this.currentFilterStatus !== "all") {
      filtered = filtered.filter((r) => r.status === this.currentFilterStatus);
    }
    if (this.searchTerm.trim()) {
      filtered = filtered.filter((r) => r.message.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
    this.filteredResults = filtered;
    this.paginatedResults = this.getPaginatedResults(filtered);
  }
  getPaginatedResults(items) {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return items.slice(start, end);
  }
  nextPage(event) {
    event.preventDefault();
    if (this.hasNextPage()) {
      this.currentPage++;
      this.filterResults();
    }
  }
  previousPage(event) {
    event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterResults();
    }
  }
  hasNextPage() {
    return this.currentPage * this.pageSize < this.filteredResults.length;
  }
  getTotalPages() {
    return Math.ceil(this.filteredResults.length / this.pageSize) || 1;
  }
  filterByStatus(status) {
    this.currentFilterStatus = status;
    this.currentPage = 1;
    this.filterResults();
  }
  // ===== VALIDACIONES =====
  isValidFile(file) {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "text/csv"
    ];
    const validExtensions = [".xlsx", ".xls", ".csv"];
    const maxSize = 10 * 1024 * 1024;
    const fileName = file.name.toLowerCase();
    const hasValidExtension = validExtensions.some((ext) => fileName.endsWith(ext));
    return (validTypes.includes(file.type) || hasValidExtension) && file.size <= maxSize;
  }
  showError(message) {
    alert(message);
  }
  showSuccess(message) {
    alert(message);
  }
  // ===== MODAL DE ALERTA DE PRERREQUISITO =====
  showPrerequisiteModal = false;
  prerequisiteMessage = "";
  showPrerequisiteAlert(message) {
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
  validateWithAI() {
    if (!this.selectedFile) {
      this.showError("Por favor, selecciona un archivo primero.");
      return;
    }
    this.isValidating = true;
    this.aiValidationResult = null;
    this.aiValidationPassed = false;
    this.skipValidation = false;
    const loadType = this.selectedUploadType;
    this.dataloadService.validateExcelWithAI(this.selectedFile, loadType).subscribe({
      next: (result) => {
        this.aiValidationResult = result;
        this.aiValidationPassed = result.recommendedAction === "PROCEED";
        this.isValidating = false;
        this.cdr.detectChanges();
        if (result.issues && result.issues.length > 0) {
          this.showValidationModal = true;
        }
      },
      error: (error) => {
        console.error("Error en validaci\xF3n IA:", error);
        this.isValidating = false;
        this.aiValidationResult = {
          issues: [],
          aiValidated: false,
          recommendedAction: "REVIEW",
          summary: "No se pudo completar la validaci\xF3n. Puede continuar bajo su responsabilidad."
        };
        this.cdr.detectChanges();
      }
    });
  }
  /**
   * Muestra el modal con los detalles de la validación
   */
  showValidationDetails() {
    this.showValidationModal = true;
  }
  /**
   * Cierra el modal de validación
   */
  closeValidationModal() {
    this.showValidationModal = false;
  }
  /**
   * Procede con la carga después de revisar la validación
   */
  proceedAfterValidation() {
    this.closeValidationModal();
    this.aiValidationPassed = true;
    this.skipValidation = true;
    this.proceedWithUpload();
  }
  /**
   * Cuenta los issues por severidad
   */
  getIssueCount(severity) {
    if (!this.aiValidationResult?.issues)
      return 0;
    return this.aiValidationResult.issues.filter((i) => i.severity === severity).length;
  }
  /**
   * Resetea el estado de validación cuando se cambia de archivo
   */
  resetValidationState() {
    this.aiValidationResult = null;
    this.aiValidationPassed = false;
    this.skipValidation = false;
    this.showValidationModal = false;
  }
  static \u0275fac = function CoordDataloadComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CoordDataloadComponent)(\u0275\u0275directiveInject(CoordDataloadService), \u0275\u0275directiveInject(ChangeDetectorRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CoordDataloadComponent, selectors: [["app-coord-dataload"]], viewQuery: function CoordDataloadComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.fileInput = _t.first);
    }
  }, decls: 35, vars: 16, consts: [["fileInput", ""], ["noResults", ""], [1, "container-fluid", "p-0"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], [1, "fw-bold", "text-dark", "mb-1"], [1, "text-muted", "mb-0"], [1, "card", "border-0", "rounded-4", "shadow-sm", "mb-4"], [1, "card-header", "bg-white", "border-bottom-0", "pt-4", "pb-2", "px-4", "d-flex", "justify-content-between", "align-items-center", "flex-wrap", "gap-3"], [1, "fw-bold", "text-dark", "d-flex", "align-items-center", "gap-2", "mb-1"], [1, "bi", "bi-cloud-arrow-up", "text-muted"], [1, "text-muted", "small", "mb-0"], [1, "dropdown"], ["type", "button", "data-bs-toggle", "dropdown", "aria-expanded", "false", 1, "btn", "btn-success", "dropdown-toggle", "d-flex", "align-items-center", "gap-2"], [1, "dropdown-menu", "shadow"], [4, "ngFor", "ngForOf"], [1, "card-body", "px-4", "pb-4"], [1, "dropzone-container", 3, "click", "drop", "dragover", "dragleave"], ["class", "dropzone-content text-center", 4, "ngIf"], ["class", "dropzone-content text-center", 3, "click", 4, "ngIf"], [1, "btn", "btn-success", "w-100", "mt-3", 3, "click", "disabled"], [1, "bi", "bi-cloud-arrow-up", "me-2"], ["class", "alert alert-info d-flex align-items-center mt-3 mb-0", "role", "alert", 4, "ngIf"], ["class", "mt-3", 4, "ngIf"], ["class", "card border-0 rounded-4 shadow-sm ", 4, "ngIf"], ["type", "file", "accept", ".xlsx,.xls,.csv", 2, "display", "none", 3, "change"], ["class", "modal fade show d-block", "tabindex", "-1", "style", "background: rgba(0,0,0,0.15); position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 1050; display: flex; align-items: center; justify-content: center;", 4, "ngIf"], ["class", "modal fade show d-block", "tabindex", "-1", "style", "background: rgba(0,0,0,0.5); position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 1050;", 4, "ngIf"], ["href", "javascript:void(0)", 1, "dropdown-item", "d-flex", "align-items-center", "gap-2", 3, "click"], [1, "dropzone-content", "text-center"], [1, "bi", "bi-file-earmark-spreadsheet", "text-muted"], [1, "text-dark", "fw-semibold", "mb-1"], ["href", "javascript:void(0)", 1, "text-success", "fw-medium"], [1, "text-muted", "d-block", "mt-2"], [1, "dropzone-content", "text-center", 3, "click"], [1, "bi", "bi-file-earmark-check", "text-success"], [1, "text-muted", "d-block", "mb-2"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-danger", "rounded-pill", "px-3", 3, "click"], [1, "bi", "bi-trash", "me-1"], ["role", "alert", 1, "alert", "alert-info", "d-flex", "align-items-center", "mt-3", "mb-0"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "text-info", "me-2"], [1, "visually-hidden"], [1, "mt-3"], ["class", "alert alert-success d-flex align-items-center mb-0", "role", "alert", 4, "ngIf"], ["role", "alert", 1, "alert", "alert-success", "d-flex", "align-items-center", "mb-0"], [1, "bi", "bi-check-circle-fill", "me-2"], ["class", "badge bg-primary ms-2", 4, "ngIf"], [1, "badge", "bg-primary", "ms-2"], [1, "card", "border-0", "rounded-4", "shadow-sm"], [1, "card-header", "bg-white", "border-bottom", "pt-4", "pb-3", "px-4"], [1, "d-flex", "justify-content-between", "align-items-center", "flex-wrap", "gap-3"], [1, "bi", "bi-clipboard-data", "text-muted"], [1, "d-flex", "gap-2", "mt-2"], [1, "badge", "bg-success-subtle", "text-success", "rounded-pill", "px-3"], [1, "bi", "bi-check-circle", "me-1"], [1, "badge", "bg-danger-subtle", "text-danger", "rounded-pill", "px-3"], [1, "bi", "bi-exclamation-circle", "me-1"], [1, "badge", "bg-secondary-subtle", "text-secondary", "rounded-pill", "px-3"], [1, "bi", "bi-list-ol", "me-1"], [1, "btn", "btn-outline-secondary", "rounded-pill", "px-4", "fw-medium", "d-flex", "align-items-center", "gap-2"], [1, "bi", "bi-download"], [1, "d-flex", "gap-3", "mb-4", "align-items-center", "flex-wrap"], [1, "input-group", 2, "max-width", "300px"], ["type", "text", "placeholder", "Buscar en resultados...", 1, "form-control", "bg-light", "border-0", "shadow-none", 3, "ngModelChange", "input", "ngModel"], [1, "input-group-text", "bg-light", "border-0", "text-muted"], [1, "bi", "bi-search"], ["role", "group", 1, "btn-group"], ["type", "button", 1, "btn", "btn-sm", 3, "click"], ["class", "table-responsive", 4, "ngIf", "ngIfElse"], ["class", "d-flex justify-content-between align-items-center mt-4 pt-3 border-top", 4, "ngIf"], [1, "table-responsive"], [1, "table", "table-hover", "align-middle", "mb-0"], [1, "bg-transparent", "text-secondary", "small", "text-uppercase"], ["scope", "col", 1, "py-3", "border-bottom", "border-2", "text-center", 2, "width", "60px"], ["scope", "col", 1, "py-3", "border-bottom", "border-2", 2, "width", "120px"], ["scope", "col", 1, "py-3", "border-bottom", "border-2"], [1, "text-center", "text-muted", "fw-medium"], ["class", "badge bg-success-subtle text-success rounded-pill px-3", 4, "ngIf"], ["class", "badge bg-danger-subtle text-danger rounded-pill px-3", 4, "ngIf"], [1, "text-dark"], [1, "bi", "bi-check-circle-fill", "me-1"], [1, "bi", "bi-exclamation-circle-fill", "me-1"], [1, "text-center", "py-5"], [1, "bi", "bi-inbox", "text-muted", 2, "font-size", "3rem"], [1, "text-muted", "mt-3", "mb-1"], [1, "text-muted", "small"], [1, "d-flex", "justify-content-between", "align-items-center", "mt-4", "pt-3", "border-top"], [1, "text-muted"], ["aria-label", "Paginaci\xF3n de resultados"], [1, "pagination", "pagination-sm", "mb-0"], [1, "page-item"], [1, "page-link", "rounded-start-pill", 3, "click", "disabled"], [1, "bi", "bi-chevron-left"], [1, "page-item", "disabled"], [1, "page-link"], [1, "page-link", "rounded-end-pill", 3, "click", "disabled"], [1, "bi", "bi-chevron-right"], ["tabindex", "-1", 1, "modal", "fade", "show", "d-block", 2, "background", "rgba(0,0,0,0.15)", "position", "fixed", "top", "0", "left", "0", "width", "100vw", "height", "100vh", "z-index", "1050", "display", "flex", "align-items", "center", "justify-content", "center"], [1, "modal-dialog", "modal-dialog-centered", 2, "margin", "0 auto"], [1, "modal-content", "border-2", 2, "border-color", "#198754", "background", "#fff", "min-width", "350px", "max-width", "90vw"], [1, "modal-body", "text-center", "py-4"], [1, "fw-bold", "text-success", "mb-2"], [1, "bi", "bi-exclamation-circle", "me-2"], [1, "text-dark", "mb-3", 2, "font-size", "1.1rem"], [1, "btn", "btn-success", "px-4", "py-2", "rounded-pill", "fw-bold", 3, "click"], ["tabindex", "-1", 1, "modal", "fade", "show", "d-block", 2, "background", "rgba(0,0,0,0.5)", "position", "fixed", "top", "0", "left", "0", "width", "100vw", "height", "100vh", "z-index", "1050"], [1, "modal-dialog", "modal-dialog-centered", "modal-lg", "modal-dialog-scrollable"], [1, "modal-content", "border-0", "shadow"], [1, "modal-header"], [1, "modal-title", "d-flex", "align-items-center", "gap-2"], [1, "bi"], ["class", "badge bg-light text-primary small", 4, "ngIf"], ["class", "badge bg-light text-secondary small", 4, "ngIf"], ["type", "button", 1, "btn-close", 3, "click"], [1, "modal-body"], [1, "alert"], [1, "mb-1"], ["class", "text-muted", 4, "ngIf"], ["class", "d-flex gap-3 mb-4", 4, "ngIf"], ["class", "issues-list", 4, "ngIf"], ["class", "text-center py-4", 4, "ngIf"], [1, "modal-footer", "bg-light"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", "class", "btn btn-success", 3, "click", 4, "ngIf"], [1, "badge", "bg-light", "text-primary", "small"], [1, "badge", "bg-light", "text-secondary", "small"], [1, "d-flex", "gap-3", "mb-4"], [1, "badge", "bg-danger-subtle", "text-danger", "rounded-pill", "px-3", "py-2"], [1, "bi", "bi-x-circle", "me-1"], [1, "badge", "bg-warning-subtle", "text-warning", "rounded-pill", "px-3", "py-2"], [1, "bi", "bi-exclamation-triangle", "me-1"], [1, "badge", "bg-info-subtle", "text-info", "rounded-pill", "px-3", "py-2"], [1, "bi", "bi-info-circle", "me-1"], [1, "issues-list"], [1, "fw-bold", "text-muted", "mb-3"], [1, "bi", "bi-list-check", "me-2"], ["id", "issuesAccordion", 1, "accordion"], ["class", "accordion-item border-0 mb-2 rounded overflow-hidden", "style", "border-left-width: 4px !important;", 3, "border-start", "border-danger", "border-warning", "border-info", 4, "ngFor", "ngForOf"], [1, "accordion-item", "border-0", "mb-2", "rounded", "overflow-hidden", 2, "border-left-width", "4px !important"], [1, "accordion-header"], ["type", "button", 1, "accordion-button", "collapsed", "py-2", "bg-light"], [1, "badge", "me-2"], [1, "badge", "bg-secondary", "me-2"], [1, "badge", "bg-light", "text-dark", "me-2"], [1, "text-truncate", "small"], ["data-bs-parent", "#issuesAccordion", 1, "accordion-collapse", "collapse", 3, "id"], [1, "accordion-body", "small", "bg-white"], [1, "mb-2"], ["class", "mb-1 text-success", 4, "ngIf"], [1, "mb-0", "text-muted", "small"], [1, "bi", "bi-geo-alt", "me-1"], [1, "mb-1", "text-success"], [1, "bi", "bi-lightbulb", "me-1"], [1, "text-center", "py-4"], [1, "bi", "bi-check-circle", "text-success", 2, "font-size", "4rem"], [1, "text-success", "mt-3"], ["type", "button", 1, "btn", "btn-success", 3, "click"], [1, "bi", "bi-cloud-arrow-up", "me-1"]], template: function CoordDataloadComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div")(3, "h2", 4);
      \u0275\u0275text(4, "Carga de Informaci\xF3n Base");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 5);
      \u0275\u0275text(6, "Importa datos de estudiantes, matr\xEDculas y docentes desde archivos Excel");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "div", 6)(8, "div", 7)(9, "div")(10, "h5", 8);
      \u0275\u0275element(11, "i", 9);
      \u0275\u0275text(12, " Subir Archivo ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "p", 10);
      \u0275\u0275text(14, "Selecciona el tipo de datos y arrastra o selecciona tu archivo Excel.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 11)(16, "button", 12);
      \u0275\u0275element(17, "i");
      \u0275\u0275text(18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "ul", 13);
      \u0275\u0275template(20, CoordDataloadComponent_li_20_Template, 4, 3, "li", 14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(21, "div", 15)(22, "div", 16);
      \u0275\u0275listener("click", function CoordDataloadComponent_Template_div_click_22_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openFileSelect());
      })("drop", function CoordDataloadComponent_Template_div_drop_22_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDrop($event));
      })("dragover", function CoordDataloadComponent_Template_div_dragover_22_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDragOver($event));
      })("dragleave", function CoordDataloadComponent_Template_div_dragleave_22_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDragLeave());
      });
      \u0275\u0275template(23, CoordDataloadComponent_div_23_Template, 10, 0, "div", 17)(24, CoordDataloadComponent_div_24_Template, 9, 2, "div", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "button", 19);
      \u0275\u0275listener("click", function CoordDataloadComponent_Template_button_click_25_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.uploadData());
      });
      \u0275\u0275element(26, "i", 20);
      \u0275\u0275text(27, " Subir datos ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(28, CoordDataloadComponent_div_28_Template, 6, 0, "div", 21)(29, CoordDataloadComponent_div_29_Template, 2, 1, "div", 22);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(30, CoordDataloadComponent_div_30_Template, 37, 19, "div", 23);
      \u0275\u0275elementStart(31, "input", 24, 0);
      \u0275\u0275listener("change", function CoordDataloadComponent_Template_input_change_31_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFileSelected($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(33, CoordDataloadComponent_div_33_Template, 11, 1, "div", 25)(34, CoordDataloadComponent_div_34_Template, 24, 30, "div", 26);
    }
    if (rf & 2) {
      \u0275\u0275advance(17);
      \u0275\u0275classMap(ctx.selectedOption.icon);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.selectedOption.label, " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.uploadOptions);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("dragover", ctx.isDragging)("has-file", ctx.selectedFile);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.selectedFile);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.selectedFile);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoading || !ctx.selectedFile);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.isValidating);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.aiValidationResult && !ctx.isLoading && !ctx.isValidating);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.uploadResults.length > 0);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.showPrerequisiteModal);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showValidationModal && ctx.aiValidationResult);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\n\\feff.dropzone-container[_ngcontent-%COMP%] {\n  border: 2px dashed #dee2e6;\n  border-radius: 12px;\n  padding: 48px 24px;\n  text-align: center;\n  background-color: #f8f9fa;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  min-height: 180px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.dropzone-container[_ngcontent-%COMP%]:hover {\n  border-color: #1B7505;\n  background-color: #f1f8f4;\n}\n.dropzone-container.dragover[_ngcontent-%COMP%] {\n  border-color: #1B7505;\n  background-color: rgba(25, 135, 84, 0.05);\n  border-style: solid;\n}\n.dropzone-container.has-file[_ngcontent-%COMP%] {\n  border-color: #1B7505;\n  background-color: #f1f8f4;\n  border-style: solid;\n}\n.dropzone-content[_ngcontent-%COMP%]    > i[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  display: block;\n  margin-bottom: 12px;\n}\n.dropzone-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.dropzone-content[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.dropdown-menu[_ngcontent-%COMP%] {\n  min-width: 180px;\n}\n.dropdown-item.active[_ngcontent-%COMP%] {\n  background-color: #1B7505;\n  color: white;\n}\n.dropdown-item[_ngcontent-%COMP%]:hover:not(.active) {\n  background-color: #f8f9fa;\n}\n.table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 600;\n  letter-spacing: 0.03em;\n}\n.page-link[_ngcontent-%COMP%] {\n  border: none;\n  color: #6c757d;\n}\n.page-link[_ngcontent-%COMP%]:hover {\n  background-color: #e9ecef;\n  color: #495057;\n}\n.page-item.disabled[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  background-color: transparent;\n  color: #adb5bd;\n}\n@media (max-width: 768px) {\n  .dropzone-container[_ngcontent-%COMP%] {\n    padding: 32px 16px;\n    min-height: 150px;\n  }\n  .dropzone-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 2.5rem;\n  }\n}\n.btn-outline-primary[_ngcontent-%COMP%] {\n  border-color: #0d6efd;\n  color: #0d6efd;\n}\n.btn-outline-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #0d6efd;\n  color: white;\n}\n.btn-outline-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.alert[_ngcontent-%COMP%] {\n  border-radius: 8px;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background-color: #d1e7dd;\n  border-color: #badbcc;\n}\n.alert-warning[_ngcontent-%COMP%] {\n  background-color: #fff3cd;\n  border-color: #ffecb5;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background-color: #f8d7da;\n  border-color: #f5c2c7;\n}\n.issues-list[_ngcontent-%COMP%]   .accordion-item[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n}\n.issues-list[_ngcontent-%COMP%]   .accordion-button[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  padding: 0.75rem 1rem;\n}\n.issues-list[_ngcontent-%COMP%]   .accordion-button[_ngcontent-%COMP%]:not(.collapsed) {\n  background-color: #e9ecef;\n  box-shadow: none;\n}\n.issues-list[_ngcontent-%COMP%]   .accordion-button[_ngcontent-%COMP%]::after {\n  width: 1rem;\n  height: 1rem;\n  background-size: 1rem;\n}\n.issues-list[_ngcontent-%COMP%]   .accordion-body[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  padding: 1rem;\n  border-top: 1px solid #dee2e6;\n}\n.badge.bg-danger[_ngcontent-%COMP%] {\n  background-color: #dc3545 !important;\n}\n.badge.bg-warning[_ngcontent-%COMP%] {\n  background-color: #ffc107 !important;\n  color: #212529 !important;\n}\n.badge.bg-info[_ngcontent-%COMP%] {\n  background-color: #0dcaf0 !important;\n  color: #212529 !important;\n}\n.form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n/*# sourceMappingURL=coord-dataload.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CoordDataloadComponent, [{
    type: Component,
    args: [{ selector: "app-coord-dataload", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="container-fluid p-0">\r
  <!-- Header Principal -->\r
  <div class="d-flex justify-content-between align-items-center mb-4">\r
    <div>\r
      <h2 class="fw-bold text-dark mb-1">Carga de Informaci\xF3n Base</h2>\r
      <p class="text-muted mb-0">Importa datos de estudiantes, matr\xEDculas y docentes desde archivos Excel</p>\r
    </div>\r
  </div>\r
\r
  <!-- Card de Carga Unificada -->\r
  <div class="card border-0 rounded-4 shadow-sm mb-4">\r
    <div class="card-header bg-white border-bottom-0 pt-4 pb-2 px-4 d-flex justify-content-between align-items-center flex-wrap gap-3">\r
      <div>\r
        <h5 class="fw-bold text-dark d-flex align-items-center gap-2 mb-1">\r
          <i class="bi bi-cloud-arrow-up text-muted"></i> Subir Archivo\r
        </h5>\r
        <p class="text-muted small mb-0">Selecciona el tipo de datos y arrastra o selecciona tu archivo Excel.</p>\r
      </div>\r
      <div class="dropdown">\r
        <button class="btn btn-success dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">\r
          <i [class]="selectedOption.icon"></i>\r
          {{ selectedOption.label }}\r
        </button>\r
\r
        <ul class="dropdown-menu shadow">\r
          <li *ngFor="let option of uploadOptions">\r
            <a class="dropdown-item d-flex align-items-center gap-2" href="javascript:void(0)" (click)="selectOption(option)">\r
              <i [class]="option.icon"></i>\r
              {{ option.label }}\r
            </a>\r
          </li>\r
        </ul>\r
      </div>\r
    </div>\r
\r
    <div class="card-body px-4 pb-4">\r
      <!-- Dropzone -->\r
      <div class="dropzone-container"\r
           [class.dragover]="isDragging"\r
           [class.has-file]="selectedFile"\r
           (click)="openFileSelect()"\r
           (drop)="onDrop($event)"\r
           (dragover)="onDragOver($event)"\r
           (dragleave)="onDragLeave()">\r
\r
        <!-- Estado Vac\xEDo -->\r
        <div *ngIf="!selectedFile" class="dropzone-content text-center">\r
          <i class="bi bi-file-earmark-spreadsheet text-muted"></i>\r
          <p class="text-dark fw-semibold mb-1">Arrastra el archivo aqu\xED</p>\r
          <p class="text-muted small mb-0">o <a href="javascript:void(0)" class="text-success fw-medium">haz clic para seleccionar</a></p>\r
          <small class="text-muted d-block mt-2">Formatos: .xls, .xlsx \u2022 M\xE1x. 10 MB</small>\r
        </div>\r
\r
        <!-- Estado con Archivo -->\r
        <div *ngIf="selectedFile" class="dropzone-content text-center" (click)="$event.stopPropagation()">\r
          <i class="bi bi-file-earmark-check text-success"></i>\r
          <p class="text-dark fw-semibold mb-1">{{ selectedFile.name }}</p>\r
          <small class="text-muted d-block mb-2">{{ (selectedFile.size / 1024 / 1024).toFixed(2) }} MB</small>\r
          <button type="button" class="btn btn-sm btn-outline-danger rounded-pill px-3" (click)="clearFile($event); $event.stopPropagation()">\r
            <i class="bi bi-trash me-1"></i> Quitar\r
          </button>\r
        </div>\r
      </div>\r
\r
      <!-- Bot\xF3n de Subida (valida con IA autom\xE1ticamente antes de subir) -->\r
      <button class="btn btn-success w-100 mt-3"\r
              (click)="uploadData()"\r
              [disabled]="isLoading || !selectedFile">\r
        <i class="bi bi-cloud-arrow-up me-2"></i>\r
        Subir datos\r
      </button>\r
\r
      <!-- Indicador de validaci\xF3n en progreso -->\r
      <div *ngIf="isValidating" class="alert alert-info d-flex align-items-center mt-3 mb-0" role="alert">\r
        <div class="spinner-border spinner-border-sm text-info me-2" role="status">\r
          <span class="visually-hidden">Validando...</span>\r
        </div>\r
        <span>Validando archivo con IA...</span>\r
      </div>\r
\r
      <!-- Mensaje de estado de validaci\xF3n (solo se muestra si hay resultado y no est\xE1 cargando) -->\r
      <div *ngIf="aiValidationResult && !isLoading && !isValidating" class="mt-3">\r
        <div *ngIf="aiValidationResult.recommendedAction === 'PROCEED'"\r
             class="alert alert-success d-flex align-items-center mb-0" role="alert">\r
          <i class="bi bi-check-circle-fill me-2"></i>\r
          <div>\r
            <strong>\u2705 Validaci\xF3n exitosa.</strong> {{ aiValidationResult.summary }}\r
            <span *ngIf="aiValidationResult.aiValidated" class="badge bg-primary ms-2">IA</span>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Reporte de Carga -->\r
  <div class="card border-0 rounded-4 shadow-sm " *ngIf="uploadResults.length > 0">\r
    <div class="card-header bg-white border-bottom pt-4 pb-3 px-4">\r
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">\r
        <div>\r
          <h5 class="fw-bold text-dark d-flex align-items-center gap-2 mb-1">\r
            <i class="bi bi-clipboard-data text-muted"></i> Reporte de Carga\r
          </h5>\r
          <div class="d-flex gap-2 mt-2">\r
            <span class="badge bg-success-subtle text-success rounded-pill px-3">\r
              <i class="bi bi-check-circle me-1"></i>{{ successCount }} exitosos\r
            </span>\r
            <span class="badge bg-danger-subtle text-danger rounded-pill px-3">\r
              <i class="bi bi-exclamation-circle me-1"></i>{{ errorCount }} errores\r
            </span>\r
            <span class="badge bg-secondary-subtle text-secondary rounded-pill px-3">\r
              <i class="bi bi-list-ol me-1"></i>{{ uploadedItems }} filas\r
            </span>\r
          </div>\r
        </div>\r
        <button class="btn btn-outline-secondary rounded-pill px-4 fw-medium d-flex align-items-center gap-2">\r
          <i class="bi bi-download"></i> Exportar\r
        </button>\r
      </div>\r
    </div>\r
\r
    <div class="card-body px-4 pb-4">\r
      <!-- Filtros -->\r
      <div class="d-flex gap-3 mb-4 align-items-center flex-wrap">\r
        <div class="input-group" style="max-width: 300px;">\r
          <input type="text"\r
                 class="form-control bg-light border-0 shadow-none"\r
                 placeholder="Buscar en resultados..."\r
                 [(ngModel)]="searchTerm"\r
                 (input)="filterResults()">\r
          <span class="input-group-text bg-light border-0 text-muted">\r
            <i class="bi bi-search"></i>\r
          </span>\r
        </div>\r
\r
        <div class="btn-group" role="group">\r
          <button type="button"\r
                  class="btn btn-sm"\r
                  [class.btn-success]="currentFilterStatus === 'all'"\r
                  [class.btn-outline-secondary]="currentFilterStatus !== 'all'"\r
                  (click)="filterByStatus('all')">\r
            Todos\r
          </button>\r
          <button type="button"\r
                  class="btn btn-sm"\r
                  [class.btn-success]="currentFilterStatus === 'success'"\r
                  [class.btn-outline-secondary]="currentFilterStatus !== 'success'"\r
                  (click)="filterByStatus('success')">\r
            Exitosos\r
          </button>\r
          <button type="button"\r
                  class="btn btn-sm"\r
                  [class.btn-success]="currentFilterStatus === 'error'"\r
                  [class.btn-outline-secondary]="currentFilterStatus !== 'error'"\r
                  (click)="filterByStatus('error')">\r
            Errores\r
          </button>\r
        </div>\r
      </div>\r
\r
      <!-- Tabla de Resultados -->\r
      <div *ngIf="paginatedResults.length > 0; else noResults" class="table-responsive">\r
        <table class="table table-hover align-middle mb-0">\r
          <thead class="bg-transparent text-secondary small text-uppercase">\r
            <tr>\r
              <th scope="col" class="py-3 border-bottom border-2 text-center" style="width: 60px;">#</th>\r
              <th scope="col" class="py-3 border-bottom border-2" style="width: 120px;">Estado</th>\r
              <th scope="col" class="py-3 border-bottom border-2">Mensaje del Sistema</th>\r
            </tr>\r
          </thead>\r
          <tbody>\r
            <tr *ngFor="let result of paginatedResults; let i = index">\r
              <td class="text-center text-muted fw-medium">{{ (currentPage - 1) * pageSize + i + 1 }}</td>\r
              <td>\r
                <span *ngIf="result.status === 'success'"\r
                      class="badge bg-success-subtle text-success rounded-pill px-3">\r
                  <i class="bi bi-check-circle-fill me-1"></i>\xC9xito\r
                </span>\r
                <span *ngIf="result.status === 'error'"\r
                      class="badge bg-danger-subtle text-danger rounded-pill px-3">\r
                  <i class="bi bi-exclamation-circle-fill me-1"></i>Error\r
                </span>\r
              </td>\r
              <td class="text-dark">{{ result.message }}</td>\r
            </tr>\r
          </tbody>\r
        </table>\r
      </div>\r
\r
      <!-- Sin Resultados -->\r
      <ng-template #noResults>\r
        <div class="text-center py-5">\r
          <i class="bi bi-inbox text-muted" style="font-size: 3rem;"></i>\r
          <p class="text-muted mt-3 mb-1">Sin resultados</p>\r
          <p class="text-muted small">No hay registros que coincidan con tu b\xFAsqueda.</p>\r
        </div>\r
      </ng-template>\r
\r
      <!-- Paginaci\xF3n -->\r
      <div class="d-flex justify-content-between align-items-center mt-4 pt-3 border-top" *ngIf="uploadResults.length > pageSize">\r
        <small class="text-muted">\r
          Mostrando {{ (currentPage - 1) * pageSize + 1 }} a {{ Math.min(currentPage * pageSize, filteredResults.length) }} de {{ filteredResults.length }}\r
        </small>\r
        <nav aria-label="Paginaci\xF3n de resultados">\r
          <ul class="pagination pagination-sm mb-0">\r
            <li class="page-item" [class.disabled]="currentPage === 1">\r
              <button class="page-link rounded-start-pill" (click)="previousPage($event)" [disabled]="currentPage === 1">\r
                <i class="bi bi-chevron-left"></i>\r
              </button>\r
            </li>\r
            <li class="page-item disabled">\r
              <span class="page-link">{{ currentPage }} / {{ getTotalPages() }}</span>\r
            </li>\r
            <li class="page-item" [class.disabled]="!hasNextPage()">\r
              <button class="page-link rounded-end-pill" (click)="nextPage($event)" [disabled]="!hasNextPage()">\r
                <i class="bi bi-chevron-right"></i>\r
              </button>\r
            </li>\r
          </ul>\r
        </nav>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Hidden File Input -->\r
  <input type="file"\r
         #fileInput\r
         (change)="onFileSelected($event)"\r
         accept=".xlsx,.xls,.csv"\r
         style="display: none;">\r
</div>\r
\r
<!-- MODAL DE ALERTA DE PRERREQUISITO -->\r
<div *ngIf="showPrerequisiteModal" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.15); position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 1050; display: flex; align-items: center; justify-content: center;">\r
  <div class="modal-dialog modal-dialog-centered" style="margin: 0 auto;">\r
    <div class="modal-content border-2" style="border-color: #198754; background: #fff; min-width: 350px; max-width: 90vw;">\r
      <div class="modal-body text-center py-4">\r
        <div class="fw-bold text-success mb-2">\r
          <i class="bi bi-exclamation-circle me-2"></i> Atenci\xF3n\r
        </div>\r
        <div class="text-dark mb-3" style="font-size: 1.1rem;">{{ prerequisiteMessage }}</div>\r
        <button class="btn btn-success px-4 py-2 rounded-pill fw-bold" (click)="closePrerequisiteModal()">Aceptar</button>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- MODAL DE DETALLES DE VALIDACI\xD3N IA -->\r
<div *ngIf="showValidationModal && aiValidationResult"\r
     class="modal fade show d-block"\r
     tabindex="-1"\r
     style="background: rgba(0,0,0,0.5); position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 1050;">\r
  <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">\r
    <div class="modal-content border-0 shadow">\r
      <div class="modal-header"\r
           [class.bg-success]="aiValidationResult.recommendedAction === 'PROCEED'"\r
           [class.bg-warning]="aiValidationResult.recommendedAction === 'REVIEW'"\r
           [class.bg-danger]="aiValidationResult.recommendedAction === 'REJECT'"\r
           [class.text-white]="aiValidationResult.recommendedAction !== 'REVIEW'">\r
        <h5 class="modal-title d-flex align-items-center gap-2">\r
          <i class="bi"\r
             [class.bi-check-circle-fill]="aiValidationResult.recommendedAction === 'PROCEED'"\r
             [class.bi-exclamation-triangle-fill]="aiValidationResult.recommendedAction === 'REVIEW'"\r
             [class.bi-x-circle-fill]="aiValidationResult.recommendedAction === 'REJECT'"></i>\r
          Resultado de Validaci\xF3n\r
          <span *ngIf="aiValidationResult.aiValidated" class="badge bg-light text-primary small">Validado por IA</span>\r
          <span *ngIf="!aiValidationResult.aiValidated" class="badge bg-light text-secondary small">Validaci\xF3n Local</span>\r
        </h5>\r
        <button type="button" class="btn-close"\r
                [class.btn-close-white]="aiValidationResult.recommendedAction !== 'REVIEW'"\r
                (click)="closeValidationModal()"></button>\r
      </div>\r
      <div class="modal-body">\r
        <!-- Resumen -->\r
        <div class="alert"\r
             [class.alert-success]="aiValidationResult.recommendedAction === 'PROCEED'"\r
             [class.alert-warning]="aiValidationResult.recommendedAction === 'REVIEW'"\r
             [class.alert-danger]="aiValidationResult.recommendedAction === 'REJECT'">\r
          <p class="mb-1"><strong>Resumen:</strong> {{ aiValidationResult.summary }}</p>\r
          <small class="text-muted" *ngIf="aiValidationResult.validationTimeMs">\r
            Tiempo de validaci\xF3n: {{ aiValidationResult.validationTimeMs }}ms\r
          </small>\r
        </div>\r
\r
        <!-- Estad\xEDsticas de issues -->\r
        <div class="d-flex gap-3 mb-4" *ngIf="aiValidationResult.issues && aiValidationResult.issues.length > 0">\r
          <span class="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">\r
            <i class="bi bi-x-circle me-1"></i>{{ getIssueCount('ERROR') }} Errores\r
          </span>\r
          <span class="badge bg-warning-subtle text-warning rounded-pill px-3 py-2">\r
            <i class="bi bi-exclamation-triangle me-1"></i>{{ getIssueCount('WARNING') }} Advertencias\r
          </span>\r
          <span class="badge bg-info-subtle text-info rounded-pill px-3 py-2">\r
            <i class="bi bi-info-circle me-1"></i>{{ getIssueCount('INFO') }} Sugerencias\r
          </span>\r
        </div>\r
\r
        <!-- Lista de Issues -->\r
        <div *ngIf="aiValidationResult.issues && aiValidationResult.issues.length > 0" class="issues-list">\r
          <h6 class="fw-bold text-muted mb-3">\r
            <i class="bi bi-list-check me-2"></i>Problemas Detectados ({{ aiValidationResult.issues.length }})\r
          </h6>\r
\r
          <div class="accordion" id="issuesAccordion">\r
            <div *ngFor="let issue of aiValidationResult.issues; let i = index"\r
                 class="accordion-item border-0 mb-2 rounded overflow-hidden"\r
                 [class.border-start]="true"\r
                 [class.border-danger]="issue.severity === 'ERROR'"\r
                 [class.border-warning]="issue.severity === 'WARNING'"\r
                 [class.border-info]="issue.severity === 'INFO'"\r
                 style="border-left-width: 4px !important;">\r
              <h2 class="accordion-header">\r
                <button class="accordion-button collapsed py-2 bg-light"\r
                        type="button"\r
                        [attr.data-bs-toggle]="'collapse'"\r
                        [attr.data-bs-target]="'#issue' + i">\r
                  <span class="badge me-2"\r
                        [class.bg-danger]="issue.severity === 'ERROR'"\r
                        [class.bg-warning]="issue.severity === 'WARNING'"\r
                        [class.bg-info]="issue.severity === 'INFO'">\r
                    {{ issue.severity }}\r
                  </span>\r
                  <span class="badge bg-secondary me-2">Fila {{ issue.row }}</span>\r
                  <span class="badge bg-light text-dark me-2">{{ issue.field }}</span>\r
                  <span class="text-truncate small">{{ issue.message }}</span>\r
                </button>\r
              </h2>\r
              <div [id]="'issue' + i" class="accordion-collapse collapse" data-bs-parent="#issuesAccordion">\r
                <div class="accordion-body small bg-white">\r
                  <p class="mb-2"><strong>Problema:</strong> {{ issue.message }}</p>\r
                  <p *ngIf="issue.suggestion" class="mb-1 text-success">\r
                    <i class="bi bi-lightbulb me-1"></i><strong>Sugerencia:</strong> {{ issue.suggestion }}\r
                  </p>\r
                  <p class="mb-0 text-muted small">\r
                    <i class="bi bi-geo-alt me-1"></i>Ubicaci\xF3n: Fila {{ issue.row }}, Campo "{{ issue.field }}"\r
                  </p>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Sin Issues -->\r
        <div *ngIf="!aiValidationResult.issues || aiValidationResult.issues.length === 0" class="text-center py-4">\r
          <i class="bi bi-check-circle text-success" style="font-size: 4rem;"></i>\r
          <h5 class="text-success mt-3">\xA1Todo en orden!</h5>\r
          <p class="text-muted">No se detectaron problemas en el archivo. Puede proceder con la carga.</p>\r
        </div>\r
      </div>\r
      <div class="modal-footer bg-light">\r
        <button type="button" class="btn btn-secondary" (click)="closeValidationModal()">Cerrar</button>\r
        <button *ngIf="aiValidationResult.recommendedAction !== 'REJECT'"\r
                type="button"\r
                class="btn btn-success"\r
                (click)="proceedAfterValidation()">\r
          <i class="bi bi-cloud-arrow-up me-1"></i>Proceder con la carga\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
`, styles: ["/* src/app/components/coordination/coord-dataload/coord-dataload.component.css */\n\\feff.dropzone-container {\n  border: 2px dashed #dee2e6;\n  border-radius: 12px;\n  padding: 48px 24px;\n  text-align: center;\n  background-color: #f8f9fa;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  min-height: 180px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.dropzone-container:hover {\n  border-color: #1B7505;\n  background-color: #f1f8f4;\n}\n.dropzone-container.dragover {\n  border-color: #1B7505;\n  background-color: rgba(25, 135, 84, 0.05);\n  border-style: solid;\n}\n.dropzone-container.has-file {\n  border-color: #1B7505;\n  background-color: #f1f8f4;\n  border-style: solid;\n}\n.dropzone-content > i {\n  font-size: 3rem;\n  display: block;\n  margin-bottom: 12px;\n}\n.dropzone-content p {\n  margin-bottom: 0;\n}\n.dropzone-content .btn i {\n  font-size: 0.875rem;\n}\n.dropdown-menu {\n  min-width: 180px;\n}\n.dropdown-item.active {\n  background-color: #1B7505;\n  color: white;\n}\n.dropdown-item:hover:not(.active) {\n  background-color: #f8f9fa;\n}\n.table thead th {\n  font-weight: 600;\n  letter-spacing: 0.03em;\n}\n.page-link {\n  border: none;\n  color: #6c757d;\n}\n.page-link:hover {\n  background-color: #e9ecef;\n  color: #495057;\n}\n.page-item.disabled .page-link {\n  background-color: transparent;\n  color: #adb5bd;\n}\n@media (max-width: 768px) {\n  .dropzone-container {\n    padding: 32px 16px;\n    min-height: 150px;\n  }\n  .dropzone-content i {\n    font-size: 2.5rem;\n  }\n}\n.btn-outline-primary {\n  border-color: #0d6efd;\n  color: #0d6efd;\n}\n.btn-outline-primary:hover:not(:disabled) {\n  background-color: #0d6efd;\n  color: white;\n}\n.btn-outline-primary:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.alert {\n  border-radius: 8px;\n}\n.alert-success {\n  background-color: #d1e7dd;\n  border-color: #badbcc;\n}\n.alert-warning {\n  background-color: #fff3cd;\n  border-color: #ffecb5;\n}\n.alert-danger {\n  background-color: #f8d7da;\n  border-color: #f5c2c7;\n}\n.issues-list .accordion-item {\n  background-color: #f8f9fa;\n}\n.issues-list .accordion-button {\n  font-size: 0.875rem;\n  padding: 0.75rem 1rem;\n}\n.issues-list .accordion-button:not(.collapsed) {\n  background-color: #e9ecef;\n  box-shadow: none;\n}\n.issues-list .accordion-button::after {\n  width: 1rem;\n  height: 1rem;\n  background-size: 1rem;\n}\n.issues-list .accordion-body {\n  font-size: 0.875rem;\n  padding: 1rem;\n  border-top: 1px solid #dee2e6;\n}\n.badge.bg-danger {\n  background-color: #dc3545 !important;\n}\n.badge.bg-warning {\n  background-color: #ffc107 !important;\n  color: #212529 !important;\n}\n.badge.bg-info {\n  background-color: #0dcaf0 !important;\n  color: #212529 !important;\n}\n.form-check-input:checked {\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n/*# sourceMappingURL=coord-dataload.component.css.map */\n"] }]
  }], () => [{ type: CoordDataloadService }, { type: ChangeDetectorRef }], { fileInput: [{
    type: ViewChild,
    args: ["fileInput"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CoordDataloadComponent, { className: "CoordDataloadComponent", filePath: "app/components/coordination/coord-dataload/coord-dataload.component.ts", lineNumber: 17 });
})();
export {
  CoordDataloadComponent
};
//# sourceMappingURL=chunk-RHZMUUB7.js.map
