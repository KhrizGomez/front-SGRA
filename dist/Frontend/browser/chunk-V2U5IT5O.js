import {
  StudentNewRequestService
} from "./chunk-CQDBQWHQ.js";
import {
  Router
} from "./chunk-MXF362TW.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MinLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-RREETWSH.js";
import "./chunk-K6SHIZGP.js";
import {
  ChangeDetectorRef,
  CommonModule,
  Component,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-OENL2SFL.js";

// src/app/components/student/student-new-request/student-new-request.component.ts
var _c0 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.subjectId;
var _forTrack1 = ($index, $item) => $item.sessionTypeId;
var _forTrack2 = ($index, $item) => $item.studentId;
function StudentNewRequestComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "i", 33);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "button", 34);
    \u0275\u0275listener("click", function StudentNewRequestComponent_Conditional_7_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.errorMessage = null);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.errorMessage, " ");
  }
}
function StudentNewRequestComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "i", 35);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "button", 34);
    \u0275\u0275listener("click", function StudentNewRequestComponent_Conditional_8_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.successMessage = null);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.successMessage, " ");
  }
}
function StudentNewRequestComponent_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r5 = ctx.$implicit;
    \u0275\u0275property("ngValue", s_r5.subjectId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", s_r5.subjectName, " (Semestre ", s_r5.semester, ")");
  }
}
function StudentNewRequestComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "span", 36);
    \u0275\u0275text(2, " Cargando docente... ");
    \u0275\u0275elementEnd();
  }
}
function StudentNewRequestComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "input", 37);
    \u0275\u0275elementStart(1, "small", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("value", ctx_r2.teacherInfo.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.teacherInfo.email);
  }
}
function StudentNewRequestComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275element(1, "i", 38);
    \u0275\u0275text(2, " No hay docente asignado para esta asignatura ");
    \u0275\u0275elementEnd();
  }
}
function StudentNewRequestComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "input", 18);
  }
}
function StudentNewRequestComponent_For_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const st_r6 = ctx.$implicit;
    \u0275\u0275property("ngValue", st_r6.sessionTypeId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(st_r6.sessionTypeName);
  }
}
function StudentNewRequestComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20)(1, "div");
    \u0275\u0275element(2, "i", 39);
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementStart(6, "span", 40);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 41);
    \u0275\u0275listener("click", function StudentNewRequestComponent_Conditional_43_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openClassmatesModal());
    });
    \u0275\u0275element(9, "i", 42);
    \u0275\u0275text(10, "Editar ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.selectedClassmates.length);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" compa\xF1ero", ctx_r2.selectedClassmates.length > 1 ? "s" : "", " seleccionado", ctx_r2.selectedClassmates.length > 1 ? "s" : "", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" (", ctx_r2.getSelectedNames(), ") ");
  }
}
function StudentNewRequestComponent_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 43);
    \u0275\u0275listener("click", function StudentNewRequestComponent_Conditional_59_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clearFiles());
    });
    \u0275\u0275element(1, "i", 44);
    \u0275\u0275elementEnd();
  }
}
function StudentNewRequestComponent_Conditional_62_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45)(1, "div");
    \u0275\u0275element(2, "i", 46);
    \u0275\u0275elementStart(3, "span", 47);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small", 40);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 48);
    \u0275\u0275listener("click", function StudentNewRequestComponent_Conditional_62_For_2_Template_button_click_7_listener() {
      const $index_r10 = \u0275\u0275restoreView(_r9).$index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.removeFile($index_r10));
    });
    \u0275\u0275element(8, "i", 49);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const file_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(file_r11.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r2.formatFileSize(file_r11.size), ")");
  }
}
function StudentNewRequestComponent_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275repeaterCreate(1, StudentNewRequestComponent_Conditional_62_For_2_Template, 9, 2, "div", 45, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.selectedFiles);
  }
}
function StudentNewRequestComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 36);
    \u0275\u0275text(1, " Creando... ");
  }
}
function StudentNewRequestComponent_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 50);
    \u0275\u0275text(1, " Crear Solicitud ");
  }
}
function StudentNewRequestComponent_Conditional_69_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275element(1, "span", 61);
    \u0275\u0275elementStart(2, "p", 62);
    \u0275\u0275text(3, "Cargando compa\xF1eros...");
    \u0275\u0275elementEnd()();
  }
}
function StudentNewRequestComponent_Conditional_69_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275element(1, "i", 63);
    \u0275\u0275elementStart(2, "p", 62);
    \u0275\u0275text(3, "No se encontraron compa\xF1eros matriculados en esta asignatura.");
    \u0275\u0275elementEnd()();
  }
}
function StudentNewRequestComponent_Conditional_69_Conditional_11_For_17_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 79);
  }
}
function StudentNewRequestComponent_Conditional_69_Conditional_11_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 76)(1, "input", 77);
    \u0275\u0275listener("change", function StudentNewRequestComponent_Conditional_69_Conditional_11_For_17_Template_input_change_1_listener() {
      const c_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.toggleClassmate(c_r15.studentId));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 78)(3, "div", 47);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, StudentNewRequestComponent_Conditional_69_Conditional_11_For_17_Conditional_7_Template, 1, 0, "i", 79);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r15 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", ctx_r2.tempSelectedIds.has(c_r15.studentId));
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r2.tempSelectedIds.has(c_r15.studentId));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-white", ctx_r2.tempSelectedIds.has(c_r15.studentId));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r15.fullName, " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("text-white-50", ctx_r2.tempSelectedIds.has(c_r15.studentId))("text-muted", !ctx_r2.tempSelectedIds.has(c_r15.studentId));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r15.email, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.tempSelectedIds.has(c_r15.studentId) ? 7 : -1);
  }
}
function StudentNewRequestComponent_Conditional_69_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 64)(1, "div", 65)(2, "span", 66);
    \u0275\u0275element(3, "i", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 68);
    \u0275\u0275twoWayListener("ngModelChange", function StudentNewRequestComponent_Conditional_69_Conditional_11_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.classmateSearch, $event) || (ctx_r2.classmateSearch = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 69)(6, "button", 41);
    \u0275\u0275listener("click", function StudentNewRequestComponent_Conditional_69_Conditional_11_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectAllClassmates());
    });
    \u0275\u0275element(7, "i", 70);
    \u0275\u0275text(8, "Seleccionar Todos ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 71);
    \u0275\u0275listener("click", function StudentNewRequestComponent_Conditional_69_Conditional_11_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.deselectAllClassmates());
    });
    \u0275\u0275element(10, "i", 72);
    \u0275\u0275text(11, "Quitar Todos ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 73)(13, "small", 23);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 74);
    \u0275\u0275repeaterCreate(16, StudentNewRequestComponent_Conditional_69_Conditional_11_For_17_Template, 8, 12, "label", 75, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.classmateSearch);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(5, _c0));
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r2.tempSelectedIds.size === 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" ", ctx_r2.tempSelectedIds.size, " de ", ctx_r2.filteredClassmates().length, " seleccionado(s) ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.filteredClassmates());
  }
}
function StudentNewRequestComponent_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 51)(2, "div", 52)(3, "div", 53)(4, "h5", 54);
    \u0275\u0275element(5, "i", 39);
    \u0275\u0275text(6, "Seleccionar Compa\xF1eros ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 34);
    \u0275\u0275listener("click", function StudentNewRequestComponent_Conditional_69_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeClassmatesModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 55);
    \u0275\u0275conditionalCreate(9, StudentNewRequestComponent_Conditional_69_Conditional_9_Template, 4, 0, "div", 56)(10, StudentNewRequestComponent_Conditional_69_Conditional_10_Template, 4, 0, "div", 56)(11, StudentNewRequestComponent_Conditional_69_Conditional_11_Template, 18, 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 57)(13, "button", 58);
    \u0275\u0275listener("click", function StudentNewRequestComponent_Conditional_69_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeClassmatesModal());
    });
    \u0275\u0275text(14, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 59);
    \u0275\u0275listener("click", function StudentNewRequestComponent_Conditional_69_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmClassmatesSelection());
    });
    \u0275\u0275element(16, "i", 60);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx_r2.loadingClassmates ? 9 : ctx_r2.classmates.length === 0 ? 10 : 11);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r2.loadingClassmates);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Confirmar (", ctx_r2.tempSelectedIds.size, ") ");
  }
}
var StudentNewRequestComponent = class _StudentNewRequestComponent {
  svc = inject(StudentNewRequestService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  // Catálogos
  subjects = [];
  sessionTypes = [];
  // Docente (auto-cargado por paralelo)
  teacherInfo = null;
  loadingTeacher = false;
  // Compañeros (sesión grupal)
  classmates = [];
  selectedClassmates = [];
  selectedClassmateIds = /* @__PURE__ */ new Set();
  tempSelectedIds = /* @__PURE__ */ new Set();
  showClassmatesModal = false;
  loadingClassmates = false;
  classmateSearch = "";
  // Archivos
  selectedFiles = [];
  // Estados de carga
  loadingCatalogs = false;
  submitting = false;
  // Mensajes
  errorMessage = null;
  successMessage = null;
  // Modelo del formulario (simplificado)
  form = {
    subjectId: null,
    sessionTypeId: null,
    reason: ""
  };
  ngAfterViewInit() {
    Promise.resolve().then(() => {
      this.loadCatalogs();
    });
  }
  // ==================== CARGA DE CATÁLOGOS ====================
  loadCatalogs() {
    this.loadingCatalogs = true;
    this.errorMessage = null;
    Promise.all([
      this.svc.getSubjects().toPromise(),
      this.svc.getSessionTypes().toPromise()
    ]).then(([subjects, sessionTypes]) => {
      this.subjects = subjects || [];
      this.sessionTypes = sessionTypes || [];
      this.loadingCatalogs = false;
      this.cdr.detectChanges();
    }).catch((err) => {
      this.errorMessage = err?.message || "Error al cargar los cat\xE1logos";
      this.loadingCatalogs = false;
      this.cdr.detectChanges();
    });
  }
  // ==================== CAMBIO DE ASIGNATURA ====================
  onSubjectChange() {
    this.teacherInfo = null;
    this.classmates = [];
    this.selectedClassmates = [];
    this.selectedClassmateIds.clear();
    if (!this.form.subjectId) {
      this.cdr.detectChanges();
      return;
    }
    this.loadingTeacher = true;
    this.cdr.detectChanges();
    this.svc.getTeacherBySubject(this.form.subjectId).subscribe({
      next: (data) => {
        this.loadingTeacher = false;
        if (data && data.found === false) {
          this.teacherInfo = null;
        } else if (data && data.teacherId) {
          this.teacherInfo = data;
        } else {
          this.teacherInfo = null;
        }
        this.cdr.detectChanges();
        if (this.isGroupSession()) {
          this.openClassmatesModal();
        }
      },
      error: (err) => {
        this.loadingTeacher = false;
        this.teacherInfo = null;
        this.errorMessage = err?.message || "Error al cargar el docente";
        this.cdr.detectChanges();
      }
    });
  }
  // ==================== SESIÓN GRUPAL / COMPAÑEROS ====================
  isGroupSession() {
    return this.form.sessionTypeId === 2;
  }
  onSessionTypeChange() {
    if (this.isGroupSession() && this.form.subjectId) {
      this.openClassmatesModal();
    } else if (!this.isGroupSession()) {
      this.selectedClassmates = [];
      this.selectedClassmateIds.clear();
    }
  }
  openClassmatesModal() {
    if (!this.form.subjectId) {
      this.errorMessage = "Selecciona una asignatura primero para ver los compa\xF1eros";
      return;
    }
    this.showClassmatesModal = true;
    this.classmateSearch = "";
    this.tempSelectedIds = new Set(this.selectedClassmateIds);
    this.loadingClassmates = true;
    this.cdr.detectChanges();
    this.svc.getClassmatesBySubject(this.form.subjectId).subscribe({
      next: (data) => {
        this.classmates = data || [];
        this.loadingClassmates = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err?.message || "Error al cargar compa\xF1eros";
        this.loadingClassmates = false;
        this.cdr.detectChanges();
      }
    });
  }
  closeClassmatesModal() {
    this.showClassmatesModal = false;
    this.classmateSearch = "";
  }
  filteredClassmates() {
    if (!this.classmateSearch.trim()) {
      return this.classmates;
    }
    const search = this.classmateSearch.toLowerCase().trim();
    return this.classmates.filter((c) => c.fullName.toLowerCase().includes(search) || c.email.toLowerCase().includes(search));
  }
  toggleClassmate(studentId) {
    if (this.tempSelectedIds.has(studentId)) {
      this.tempSelectedIds.delete(studentId);
    } else {
      this.tempSelectedIds.add(studentId);
    }
  }
  selectAllClassmates() {
    for (const c of this.filteredClassmates()) {
      this.tempSelectedIds.add(c.studentId);
    }
    this.cdr.detectChanges();
  }
  deselectAllClassmates() {
    this.tempSelectedIds.clear();
    this.cdr.detectChanges();
  }
  confirmClassmatesSelection() {
    this.selectedClassmateIds = new Set(this.tempSelectedIds);
    this.selectedClassmates = this.classmates.filter((c) => this.selectedClassmateIds.has(c.studentId));
    this.showClassmatesModal = false;
    this.classmateSearch = "";
    this.cdr.detectChanges();
  }
  getSelectedNames() {
    return this.selectedClassmates.map((c) => c.fullName.split(" ")[0]).join(", ");
  }
  // ==================== ARCHIVOS ====================
  onFilesSelected(event) {
    const input = event.target;
    if (input.files) {
      const newFiles = Array.from(input.files);
      const maxSize = 10 * 1024 * 1024;
      for (const file of newFiles) {
        if (file.size > maxSize) {
          this.errorMessage = `El archivo "${file.name}" excede el tama\xF1o m\xE1ximo de 10MB`;
          return;
        }
      }
      this.selectedFiles = [...this.selectedFiles, ...newFiles];
      this.cdr.detectChanges();
    }
  }
  removeFile(index) {
    this.selectedFiles.splice(index, 1);
    this.cdr.detectChanges();
  }
  clearFiles() {
    this.selectedFiles = [];
    this.cdr.detectChanges();
  }
  formatFileSize(bytes) {
    if (bytes < 1024)
      return bytes + " B";
    if (bytes < 1024 * 1024)
      return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }
  // ==================== ENVIAR SOLICITUD ====================
  onSubmit() {
    if (!this.isFormValid()) {
      this.errorMessage = "Por favor completa todos los campos obligatorios";
      return;
    }
    this.submitting = true;
    this.errorMessage = null;
    const payload = {
      subjectId: this.form.subjectId,
      sessionTypeId: this.form.sessionTypeId,
      reason: this.form.reason.trim(),
      participantIds: this.isGroupSession() ? Array.from(this.selectedClassmateIds) : void 0
    };
    this.svc.createRequest(payload, this.selectedFiles).subscribe({
      next: (response) => {
        this.submitting = false;
        this.successMessage = `Solicitud #${response.requestId} creada exitosamente`;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.router.navigate(["/student/my-requests"]);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage = err?.message || "Error al crear la solicitud";
        this.submitting = false;
        this.cdr.detectChanges();
      }
    });
  }
  isFormValid() {
    return !!(this.form.subjectId && this.form.sessionTypeId && this.teacherInfo && // Debe haber docente asignado
    this.form.reason?.trim().length >= 10);
  }
  goBack() {
    this.router.navigate(["/student/my-requests"]);
  }
  static \u0275fac = function StudentNewRequestComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StudentNewRequestComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StudentNewRequestComponent, selectors: [["app-student-new-request"]], decls: 70, vars: 18, consts: [["requestForm", "ngForm"], [1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], [1, "mb-1"], [1, "text-muted", "mb-0"], ["role", "alert", 1, "alert", "alert-danger", "alert-dismissible", "fade", "show"], ["role", "alert", 1, "alert", "alert-success", "alert-dismissible", "fade", "show"], [1, "card", "border-0", "shadow-sm"], [1, "card-body", "p-4"], [3, "ngSubmit"], [1, "row", "g-3", "mb-3"], [1, "col-md-6"], [1, "form-label", "fw-semibold"], [1, "text-danger"], ["name", "subjectId", "required", "", 1, "form-select", 3, "ngModelChange", "change", "ngModel", "disabled"], [3, "ngValue"], [1, "form-control", "bg-light", "text-muted"], [1, "form-control", "bg-light", "text-danger"], ["type", "text", "value", "Selecciona una asignatura primero", "readonly", "", "disabled", "", 1, "form-control", "bg-light"], ["name", "sessionTypeId", "required", "", 1, "form-select", 3, "ngModelChange", "ngModel", "disabled"], [1, "alert", "alert-success", "d-flex", "align-items-center", "justify-content-between", "mb-3"], [1, "col-12"], ["name", "reason", "rows", "3", "required", "", "minlength", "10", "maxlength", "500", "placeholder", "Describe brevemente el motivo de tu solicitud de refuerzo...", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "text-muted"], [1, "row", "g-3", "mb-4"], [1, "input-group"], ["type", "file", "multiple", "", "accept", ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.zip,.rar", 1, "form-control", 3, "change"], ["type", "button", 1, "btn", "btn-outline-danger"], [1, "mt-2"], [1, "d-flex", "justify-content-end", "gap-2"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-success", 3, "disabled"], ["tabindex", "-1", 1, "modal", "fade", "show", "d-block", 2, "background", "rgba(0,0,0,0.5)", "z-index", "1050"], [1, "bi", "bi-exclamation-triangle-fill", "me-2"], ["type", "button", 1, "btn-close", 3, "click"], [1, "bi", "bi-check-circle-fill", "me-2"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], ["type", "text", "readonly", "", 1, "form-control", "bg-light", 3, "value"], [1, "bi", "bi-exclamation-triangle", "me-1"], [1, "bi", "bi-people-fill", "me-2"], [1, "text-muted", "ms-2"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-success", 3, "click"], [1, "bi", "bi-pencil", "me-1"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click"], [1, "bi", "bi-trash"], [1, "d-flex", "align-items-center", "justify-content-between", "bg-light", "rounded", "px-3", "py-2", "mb-1"], [1, "bi", "bi-file-earmark", "me-2"], [1, "fw-semibold"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-danger", "border-0", 3, "click"], [1, "bi", "bi-x-lg"], [1, "bi", "bi-check-lg", "me-2"], [1, "modal-dialog", "modal-dialog-centered", "modal-dialog-scrollable", "modal-lg"], [1, "modal-content"], [1, "modal-header"], [1, "modal-title"], [1, "modal-body"], [1, "text-center", "py-4"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-success", 3, "click", "disabled"], [1, "bi", "bi-check-lg", "me-1"], ["role", "status", 1, "spinner-border", "text-success"], [1, "text-muted", "mt-2"], [1, "bi", "bi-person-x", "fs-1", "text-muted"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3"], [1, "input-group", 2, "max-width", "300px"], [1, "input-group-text"], [1, "bi", "bi-search"], ["type", "text", "placeholder", "Buscar compa\xF1ero...", 1, "form-control", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "d-flex", "gap-2"], [1, "bi", "bi-check-all", "me-1"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-secondary", 3, "click", "disabled"], [1, "bi", "bi-x-lg", "me-1"], [1, "mb-3"], [1, "list-group", 2, "max-height", "350px", "overflow-y", "auto"], [1, "list-group-item", "list-group-item-action", "d-flex", "align-items-center", "gap-3", 2, "cursor", "pointer", 3, "active"], [1, "list-group-item", "list-group-item-action", "d-flex", "align-items-center", "gap-3", 2, "cursor", "pointer"], ["type", "checkbox", 1, "form-check-input", "m-0", 3, "change", "checked"], [1, "flex-grow-1"], [1, "bi", "bi-check-circle-fill", "text-white"]], template: function StudentNewRequestComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h3", 3);
      \u0275\u0275text(4, "Nueva Solicitud");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Crea una nueva solicitud de refuerzo acad\xE9mico");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(7, StudentNewRequestComponent_Conditional_7_Template, 4, 1, "div", 5);
      \u0275\u0275conditionalCreate(8, StudentNewRequestComponent_Conditional_8_Template, 4, 1, "div", 6);
      \u0275\u0275elementStart(9, "div", 7)(10, "div", 8)(11, "form", 9, 0);
      \u0275\u0275listener("ngSubmit", function StudentNewRequestComponent_Template_form_ngSubmit_11_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSubmit());
      });
      \u0275\u0275elementStart(13, "div", 10)(14, "div", 11)(15, "label", 12);
      \u0275\u0275text(16, "Asignatura ");
      \u0275\u0275elementStart(17, "span", 13);
      \u0275\u0275text(18, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "select", 14);
      \u0275\u0275twoWayListener("ngModelChange", function StudentNewRequestComponent_Template_select_ngModelChange_19_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.subjectId, $event) || (ctx.form.subjectId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function StudentNewRequestComponent_Template_select_change_19_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSubjectChange());
      });
      \u0275\u0275elementStart(20, "option", 15);
      \u0275\u0275text(21, "Selecciona una asignatura");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(22, StudentNewRequestComponent_For_23_Template, 2, 3, "option", 15, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div", 11)(25, "label", 12);
      \u0275\u0275text(26, "Docente");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(27, StudentNewRequestComponent_Conditional_27_Template, 3, 0, "div", 16)(28, StudentNewRequestComponent_Conditional_28_Template, 3, 2)(29, StudentNewRequestComponent_Conditional_29_Template, 3, 0, "div", 17)(30, StudentNewRequestComponent_Conditional_30_Template, 1, 0, "input", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "div", 10)(32, "div", 11)(33, "label", 12);
      \u0275\u0275text(34, "Tipo de Sesi\xF3n ");
      \u0275\u0275elementStart(35, "span", 13);
      \u0275\u0275text(36, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "select", 19);
      \u0275\u0275twoWayListener("ngModelChange", function StudentNewRequestComponent_Template_select_ngModelChange_37_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.sessionTypeId, $event) || (ctx.form.sessionTypeId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("ngModelChange", function StudentNewRequestComponent_Template_select_ngModelChange_37_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSessionTypeChange());
      });
      \u0275\u0275elementStart(38, "option", 15);
      \u0275\u0275text(39, "Selecciona tipo de sesi\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(40, StudentNewRequestComponent_For_41_Template, 2, 2, "option", 15, _forTrack1);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(42, "div", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(43, StudentNewRequestComponent_Conditional_43_Template, 11, 4, "div", 20);
      \u0275\u0275elementStart(44, "div", 10)(45, "div", 21)(46, "label", 12);
      \u0275\u0275text(47, "Motivo ");
      \u0275\u0275elementStart(48, "span", 13);
      \u0275\u0275text(49, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "textarea", 22);
      \u0275\u0275twoWayListener("ngModelChange", function StudentNewRequestComponent_Template_textarea_ngModelChange_50_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.reason, $event) || (ctx.form.reason = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "small", 23);
      \u0275\u0275text(52);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(53, "div", 24)(54, "div", 21)(55, "label", 12);
      \u0275\u0275text(56, "Archivos de Apoyo (opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "div", 25)(58, "input", 26);
      \u0275\u0275listener("change", function StudentNewRequestComponent_Template_input_change_58_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFilesSelected($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(59, StudentNewRequestComponent_Conditional_59_Template, 2, 0, "button", 27);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "small", 23);
      \u0275\u0275text(61, "M\xE1ximo 10MB por archivo. Formatos: PDF, documentos Office, im\xE1genes, ZIP");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(62, StudentNewRequestComponent_Conditional_62_Template, 3, 0, "div", 28);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(63, "div", 29)(64, "button", 30);
      \u0275\u0275listener("click", function StudentNewRequestComponent_Template_button_click_64_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.goBack());
      });
      \u0275\u0275text(65, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "button", 31);
      \u0275\u0275conditionalCreate(67, StudentNewRequestComponent_Conditional_67_Template, 2, 0)(68, StudentNewRequestComponent_Conditional_68_Template, 2, 0);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275conditionalCreate(69, StudentNewRequestComponent_Conditional_69_Template, 18, 3, "div", 32);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.errorMessage ? 7 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.successMessage ? 8 : -1);
      \u0275\u0275advance(11);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.subjectId);
      \u0275\u0275property("disabled", ctx.loadingCatalogs);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.subjects);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.loadingTeacher ? 27 : ctx.teacherInfo ? 28 : ctx.form.subjectId && !ctx.loadingTeacher ? 29 : 30);
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.sessionTypeId);
      \u0275\u0275property("disabled", ctx.loadingCatalogs);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.sessionTypes);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.isGroupSession() && ctx.selectedClassmates.length > 0 ? 43 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.reason);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("M\xEDnimo 10 caracteres (", ctx.form.reason.length, "/500)");
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.selectedFiles.length > 0 ? 59 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.selectedFiles.length > 0 ? 62 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.submitting);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.isFormValid() || ctx.submitting);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.submitting ? 67 : 68);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showClassmatesModal ? 69 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, NgModel, NgForm], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StudentNewRequestComponent, [{
    type: Component,
    args: [{ selector: "app-student-new-request", standalone: true, imports: [CommonModule, FormsModule], template: `\r
    <div class="container-fluid">\r
      <!-- Header -->\r
      <div class="d-flex justify-content-between align-items-center mb-4">\r
        <div>\r
          <h3 class="mb-1">Nueva Solicitud</h3>\r
          <p class="text-muted mb-0">Crea una nueva solicitud de refuerzo acad\xE9mico</p>\r
        </div>\r
      </div>\r
\r
      <!-- Error Alert -->\r
      @if (errorMessage) {\r
        <div class="alert alert-danger alert-dismissible fade show" role="alert">\r
          <i class="bi bi-exclamation-triangle-fill me-2"></i>\r
          {{ errorMessage }}\r
          <button type="button" class="btn-close" (click)="errorMessage = null"></button>\r
        </div>\r
      }\r
\r
      <!-- Success Alert -->\r
      @if (successMessage) {\r
        <div class="alert alert-success alert-dismissible fade show" role="alert">\r
          <i class="bi bi-check-circle-fill me-2"></i>\r
          {{ successMessage }}\r
          <button type="button" class="btn-close" (click)="successMessage = null"></button>\r
        </div>\r
      }\r
\r
      <!-- Form Card -->\r
      <div class="card border-0 shadow-sm">\r
        <div class="card-body p-4">\r
          <form (ngSubmit)="onSubmit()" #requestForm="ngForm">\r
\r
            <!-- Row 1: Asignatura y Docente -->\r
            <div class="row g-3 mb-3">\r
              <div class="col-md-6">\r
                <label class="form-label fw-semibold">Asignatura <span class="text-danger">*</span></label>\r
                <select class="form-select" [(ngModel)]="form.subjectId" name="subjectId"\r
                        (change)="onSubjectChange()" required [disabled]="loadingCatalogs">\r
                  <option [ngValue]="null">Selecciona una asignatura</option>\r
                  @for (s of subjects; track s.subjectId) {\r
                    <option [ngValue]="s.subjectId">{{ s.subjectName }} (Semestre {{ s.semester }})</option>\r
                  }\r
                </select>\r
              </div>\r
\r
              <div class="col-md-6">\r
                <label class="form-label fw-semibold">Docente</label>\r
                @if (loadingTeacher) {\r
                  <div class="form-control bg-light text-muted">\r
                    <span class="spinner-border spinner-border-sm me-2" role="status"></span>\r
                    Cargando docente...\r
                  </div>\r
                } @else if (teacherInfo) {\r
                  <input type="text" class="form-control bg-light" [value]="teacherInfo.fullName" readonly>\r
                  <small class="text-muted">{{ teacherInfo.email }}</small>\r
                } @else if (form.subjectId && !loadingTeacher) {\r
                  <div class="form-control bg-light text-danger">\r
                    <i class="bi bi-exclamation-triangle me-1"></i>\r
                    No hay docente asignado para esta asignatura\r
                  </div>\r
                } @else {\r
                  <input type="text" class="form-control bg-light" value="Selecciona una asignatura primero" readonly disabled>\r
                }\r
              </div>\r
            </div>\r
\r
            <!-- Row 2: Tipo de Sesi\xF3n -->\r
            <div class="row g-3 mb-3">\r
              <div class="col-md-6">\r
                <label class="form-label fw-semibold">Tipo de Sesi\xF3n <span class="text-danger">*</span></label>\r
                <select class="form-select" [(ngModel)]="form.sessionTypeId" name="sessionTypeId"\r
                        (ngModelChange)="onSessionTypeChange()" required [disabled]="loadingCatalogs">\r
                  <option [ngValue]="null">Selecciona tipo de sesi\xF3n</option>\r
                  @for (st of sessionTypes; track st.sessionTypeId) {\r
                    <option [ngValue]="st.sessionTypeId">{{ st.sessionTypeName }}</option>\r
                  }\r
                </select>\r
              </div>\r
\r
              <div class="col-md-6">\r
                <!-- Placeholder para mantener layout equilibrado -->\r
              </div>\r
            </div>\r
\r
            <!-- Compa\xF1eros seleccionados (visible solo en Grupal) -->\r
            @if (isGroupSession() && selectedClassmates.length > 0) {\r
              <div class="alert alert-success d-flex align-items-center justify-content-between mb-3">\r
                <div>\r
                  <i class="bi bi-people-fill me-2"></i>\r
                  <strong>{{ selectedClassmates.length }}</strong> compa\xF1ero{{ selectedClassmates.length > 1 ? 's' : '' }} seleccionado{{ selectedClassmates.length > 1 ? 's' : '' }}\r
                  <span class="text-muted ms-2">\r
                    ({{ getSelectedNames() }})\r
                  </span>\r
                </div>\r
                <button type="button" class="btn btn-sm btn-outline-success" (click)="openClassmatesModal()">\r
                  <i class="bi bi-pencil me-1"></i>Editar\r
                </button>\r
              </div>\r
            }\r
\r
            <!-- Row 3: Motivo -->\r
            <div class="row g-3 mb-3">\r
              <div class="col-12">\r
                <label class="form-label fw-semibold">Motivo <span class="text-danger">*</span></label>\r
                <textarea class="form-control" [(ngModel)]="form.reason" name="reason"\r
                          rows="3" required minlength="10" maxlength="500"\r
                          placeholder="Describe brevemente el motivo de tu solicitud de refuerzo..."></textarea>\r
                <small class="text-muted">M\xEDnimo 10 caracteres ({{ form.reason.length }}/500)</small>\r
              </div>\r
            </div>\r
\r
            <!-- Row 4: Subida de Archivos -->\r
            <div class="row g-3 mb-4">\r
              <div class="col-12">\r
                <label class="form-label fw-semibold">Archivos de Apoyo (opcional)</label>\r
                <div class="input-group">\r
                  <input type="file" class="form-control" multiple\r
                         (change)="onFilesSelected($event)"\r
                         accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.zip,.rar">\r
                  @if (selectedFiles.length > 0) {\r
                    <button type="button" class="btn btn-outline-danger" (click)="clearFiles()">\r
                      <i class="bi bi-trash"></i>\r
                    </button>\r
                  }\r
                </div>\r
                <small class="text-muted">M\xE1ximo 10MB por archivo. Formatos: PDF, documentos Office, im\xE1genes, ZIP</small>\r
\r
                <!-- Lista de archivos seleccionados -->\r
                @if (selectedFiles.length > 0) {\r
                  <div class="mt-2">\r
                    @for (file of selectedFiles; track $index) {\r
                      <div class="d-flex align-items-center justify-content-between bg-light rounded px-3 py-2 mb-1">\r
                        <div>\r
                          <i class="bi bi-file-earmark me-2"></i>\r
                          <span class="fw-semibold">{{ file.name }}</span>\r
                          <small class="text-muted ms-2">({{ formatFileSize(file.size) }})</small>\r
                        </div>\r
                        <button type="button" class="btn btn-sm btn-outline-danger border-0" (click)="removeFile($index)">\r
                          <i class="bi bi-x-lg"></i>\r
                        </button>\r
                      </div>\r
                    }\r
                  </div>\r
                }\r
              </div>\r
            </div>\r
\r
            <!-- Buttons -->\r
            <div class="d-flex justify-content-end gap-2">\r
              <button type="button" class="btn btn-outline-secondary" (click)="goBack()" [disabled]="submitting">\r
                Cancelar\r
              </button>\r
              <button type="submit" class="btn btn-success" [disabled]="!isFormValid() || submitting">\r
                @if (submitting) {\r
                  <span class="spinner-border spinner-border-sm me-2" role="status"></span>\r
                  Creando...\r
                } @else {\r
                  <i class="bi bi-check-lg me-2"></i>\r
                  Crear Solicitud\r
                }\r
              </button>\r
            </div>\r
\r
          </form>\r
        </div>\r
      </div>\r
\r
      <!-- ====== Modal Compa\xF1eros (Sesi\xF3n Grupal) ====== -->\r
      @if (showClassmatesModal) {\r
        <div class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5); z-index: 1050;">\r
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">\r
            <div class="modal-content">\r
              <div class="modal-header">\r
                <h5 class="modal-title">\r
                  <i class="bi bi-people-fill me-2"></i>Seleccionar Compa\xF1eros\r
                </h5>\r
                <button type="button" class="btn-close" (click)="closeClassmatesModal()"></button>\r
              </div>\r
\r
              <div class="modal-body">\r
                @if (loadingClassmates) {\r
                  <div class="text-center py-4">\r
                    <span class="spinner-border text-success" role="status"></span>\r
                    <p class="text-muted mt-2">Cargando compa\xF1eros...</p>\r
                  </div>\r
                } @else if (classmates.length === 0) {\r
                  <div class="text-center py-4">\r
                    <i class="bi bi-person-x fs-1 text-muted"></i>\r
                    <p class="text-muted mt-2">No se encontraron compa\xF1eros matriculados en esta asignatura.</p>\r
                  </div>\r
                } @else {\r
                  <!-- Buscador y bot\xF3n seleccionar todos -->\r
                  <div class="d-flex justify-content-between align-items-center mb-3">\r
                    <div class="input-group" style="max-width: 300px;">\r
                      <span class="input-group-text"><i class="bi bi-search"></i></span>\r
                      <input type="text" class="form-control" placeholder="Buscar compa\xF1ero..."\r
                             [(ngModel)]="classmateSearch" [ngModelOptions]="{standalone: true}">\r
                    </div>\r
                    <div class="d-flex gap-2">\r
                      <button type="button" class="btn btn-sm btn-outline-success"\r
                              (click)="selectAllClassmates()">\r
                        <i class="bi bi-check-all me-1"></i>Seleccionar Todos\r
                      </button>\r
                      <button type="button" class="btn btn-sm btn-outline-secondary"\r
                              (click)="deselectAllClassmates()"\r
                              [disabled]="tempSelectedIds.size === 0">\r
                        <i class="bi bi-x-lg me-1"></i>Quitar Todos\r
                      </button>\r
                    </div>\r
                  </div>\r
\r
                  <!-- Info de selecci\xF3n -->\r
                  <div class="mb-3">\r
                    <small class="text-muted">\r
                      {{ tempSelectedIds.size }} de {{ filteredClassmates().length }} seleccionado(s)\r
                    </small>\r
                  </div>\r
\r
                  <!-- Lista de compa\xF1eros -->\r
                  <div class="list-group" style="max-height: 350px; overflow-y: auto;">\r
                    @for (c of filteredClassmates(); track c.studentId) {\r
                      <label class="list-group-item list-group-item-action d-flex align-items-center gap-3"\r
                             [class.active]="tempSelectedIds.has(c.studentId)"\r
                             style="cursor: pointer;">\r
                        <input type="checkbox" class="form-check-input m-0"\r
                               [checked]="tempSelectedIds.has(c.studentId)"\r
                               (change)="toggleClassmate(c.studentId)">\r
                        <div class="flex-grow-1">\r
                          <div class="fw-semibold" [class.text-white]="tempSelectedIds.has(c.studentId)">\r
                            {{ c.fullName }}\r
                          </div>\r
                          <small [class.text-white-50]="tempSelectedIds.has(c.studentId)"\r
                                 [class.text-muted]="!tempSelectedIds.has(c.studentId)">\r
                            {{ c.email }}\r
                          </small>\r
                        </div>\r
                        @if (tempSelectedIds.has(c.studentId)) {\r
                          <i class="bi bi-check-circle-fill text-white"></i>\r
                        }\r
                      </label>\r
                    }\r
                  </div>\r
                }\r
              </div>\r
\r
              <div class="modal-footer">\r
                <button type="button" class="btn btn-secondary" (click)="closeClassmatesModal()">\r
                  Cancelar\r
                </button>\r
                <button type="button" class="btn btn-success" (click)="confirmClassmatesSelection()"\r
                        [disabled]="loadingClassmates">\r
                  <i class="bi bi-check-lg me-1"></i>\r
                  Confirmar ({{ tempSelectedIds.size }})\r
                </button>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      }\r
\r
    </div>\r
  ` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StudentNewRequestComponent, { className: "StudentNewRequestComponent", filePath: "app/components/student/student-new-request/student-new-request.component.ts", lineNumber: 20 });
})();
export {
  StudentNewRequestComponent
};
//# sourceMappingURL=chunk-V2U5IT5O.js.map
