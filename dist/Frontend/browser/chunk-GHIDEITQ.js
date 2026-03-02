import {
  TeacherSessionsService
} from "./chunk-OBGJFG5D.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-RREETWSH.js";
import "./chunk-K6SHIZGP.js";
import {
  ChangeDetectorRef,
  CommonModule,
  Component,
  DatePipe,
  NgClass,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-OENL2SFL.js";

// src/app/components/teacher/teacher-history/teacher-history.component.ts
var _forTrack0 = ($index, $item) => $item.scheduledId;
function TeacherHistoryComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "i", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "button", 25);
    \u0275\u0275listener("click", function TeacherHistoryComponent_Conditional_10_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.errorMsg = null);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.errorMsg, " ");
  }
}
function TeacherHistoryComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275element(1, "div", 26);
    \u0275\u0275elementStart(2, "p", 27);
    \u0275\u0275text(3, "Cargando historial...");
    \u0275\u0275elementEnd()();
  }
}
function TeacherHistoryComponent_Conditional_42_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 40);
    \u0275\u0275element(2, "i", 41);
    \u0275\u0275text(3, " No tienes sesiones registradas a\xFAn. ");
    \u0275\u0275elementEnd()();
  }
}
function TeacherHistoryComponent_Conditional_42_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 42);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 43);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 44);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td")(9, "span", 45);
    \u0275\u0275element(10, "i", 46);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td")(17, "span", 47);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td", 48);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td")(22, "span", 45);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", r_r4.scheduledId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r4.subjectName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 12, r_r4.scheduledDate, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r1.modalityBadge(r_r4.modality));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", r_r4.modality === "Virtual" ? "bi-camera-video" : "bi-building");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", r_r4.modality, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r4.timeSlot);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r4.estimatedDuration);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r4.sessionType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r4.studentCount);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.statusBadge(r_r4.statusName));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r4.statusName);
  }
}
function TeacherHistoryComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "table", 29)(2, "thead", 30)(3, "tr")(4, "th");
    \u0275\u0275text(5, "ID SESI\xD3N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "ASIGNATURA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "FECHA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "MODALIDAD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "FRANJA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "DURACI\xD3N EST.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "TIPO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th");
    \u0275\u0275text(19, "ESTUDIANTES");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th");
    \u0275\u0275text(21, "ESTADO");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "tbody");
    \u0275\u0275conditionalCreate(23, TeacherHistoryComponent_Conditional_42_Conditional_23_Template, 4, 0, "tr");
    \u0275\u0275repeaterCreate(24, TeacherHistoryComponent_Conditional_42_For_25_Template, 24, 15, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 31)(27, "div", 11);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 32)(30, "button", 33);
    \u0275\u0275listener("click", function TeacherHistoryComponent_Conditional_42_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goTo(ctx_r1.page - 1));
    });
    \u0275\u0275element(31, "i", 34);
    \u0275\u0275text(32, " Anterior ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 33);
    \u0275\u0275listener("click", function TeacherHistoryComponent_Conditional_42_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goTo(ctx_r1.page + 1));
    });
    \u0275\u0275text(34, " Siguiente ");
    \u0275\u0275element(35, "i", 35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 36)(37, "label", 37);
    \u0275\u0275text(38, "Filas:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "select", 38);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherHistoryComponent_Conditional_42_Template_select_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.size, $event) || (ctx_r1.size = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function TeacherHistoryComponent_Conditional_42_Template_select_change_39_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.page = 1;
      return \u0275\u0275resetView(ctx_r1.load());
    });
    \u0275\u0275elementStart(40, "option", 39);
    \u0275\u0275text(41, "10");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "option", 39);
    \u0275\u0275text(43, "25");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "option", 39);
    \u0275\u0275text(45, "50");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(23);
    \u0275\u0275conditional(ctx_r1.rows.length === 0 ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.rows);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate3(" P\xE1gina ", ctx_r1.page, " de ", ctx_r1.totalPages, " \xB7 Total: ", ctx_r1.totalCount, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.page <= 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.page >= ctx_r1.totalPages);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.size);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", 10);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 25);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 50);
  }
}
var TeacherHistoryComponent = class _TeacherHistoryComponent {
  sessSvc = inject(TeacherSessionsService);
  cdr = inject(ChangeDetectorRef);
  loading = false;
  errorMsg = null;
  rows = [];
  totalCount = 0;
  page = 1;
  size = 10;
  totalPages = 1;
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this.errorMsg = null;
    this.sessSvc.getHistory(this.page, this.size).subscribe({
      next: (d) => {
        this.rows = d.items ?? [];
        this.totalCount = d.totalCount;
        this.totalPages = d.totalPages ?? Math.max(1, Math.ceil(d.totalCount / this.size));
        this.page = d.page;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err?.message || "Error al cargar el historial";
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  goTo(p) {
    this.page = p;
    this.load();
  }
  countByModality(modality) {
    return this.rows.filter((r) => r.modality === modality).length;
  }
  modalityBadge(modality) {
    return modality === "Virtual" ? "bg-info text-white" : "bg-secondary";
  }
  statusBadge(statusName) {
    const map = {
      "Finalizada": "bg-primary",
      "Cancelada": "bg-danger",
      "Aceptada": "bg-success",
      "Rechazada": "bg-danger",
      "Pendiente": "bg-warning text-dark"
    };
    return map[statusName] ?? "bg-secondary";
  }
  static \u0275fac = function TeacherHistoryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeacherHistoryComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeacherHistoryComponent, selectors: [["app-teacher-history"]], decls: 43, vars: 5, consts: [[1, "container-fluid"], [1, "mb-4"], [1, "d-flex", "align-items-center", "gap-3"], [1, "header-icon"], [1, "bi", "bi-clock-history"], [1, "fw-bold", "text-dark", "mb-0"], [1, "text-muted", "mb-0"], ["role", "alert", 1, "alert", "alert-danger", "alert-dismissible", "fade", "show", "border"], [1, "row", "g-2", "mb-3"], [1, "col-6", "col-lg-3"], [1, "chip-box", "bg-white", "shadow-sm", "rounded-3", "p-3", "d-flex", "justify-content-between", "align-items-center"], [1, "text-muted", "small"], [1, "fw-bold", "fs-4", 2, "color", "#1B7505"], [1, "chip-icon", "d-flex", "align-items-center", "justify-content-center", "rounded-circle", 2, "background", "#e8f5e9"], [1, "bi", "bi-journals", 2, "color", "#1B7505"], [1, "fw-bold", "fs-4", 2, "color", "#0288d1"], [1, "chip-icon", "d-flex", "align-items-center", "justify-content-center", "rounded-circle", 2, "background", "#e1f5fe"], [1, "bi", "bi-camera-video", 2, "color", "#0288d1"], [1, "fw-bold", "fs-4", 2, "color", "#7b1fa2"], [1, "chip-icon", "d-flex", "align-items-center", "justify-content-center", "rounded-circle", 2, "background", "#f3e5f5"], [1, "bi", "bi-building", 2, "color", "#7b1fa2"], [1, "card", "border", "shadow-sm"], [1, "card-body"], [1, "text-center", "py-5"], [1, "bi", "bi-exclamation-triangle-fill", "me-2"], ["type", "button", 1, "btn-close", 3, "click"], ["role", "status", 1, "spinner-border", "text-success"], [1, "text-muted", "mt-2", "mb-0"], [1, "table-responsive"], [1, "table", "align-middle", "mb-0"], [1, "table-light"], [1, "d-flex", "justify-content-between", "align-items-center", "mt-3", "flex-wrap", "gap-2"], [1, "d-flex", "gap-2"], [1, "btn", "btn-outline-secondary", "btn-sm", "border", 3, "click", "disabled"], [1, "bi", "bi-chevron-left"], [1, "bi", "bi-chevron-right"], [1, "d-flex", "align-items-center", "gap-2"], [1, "text-muted", "small", "mb-0"], [1, "form-select", "form-select-sm", "border", 2, "width", "auto", 3, "ngModelChange", "change", "ngModel"], [3, "ngValue"], ["colspan", "9", 1, "text-center", "py-5", "text-muted"], [1, "bi", "bi-clock-history", "display-4", "d-block", "mb-2", "opacity-25"], [1, "fw-semibold", "text-muted"], [1, "fw-semibold"], [1, "text-nowrap"], [1, "badge", "rounded-pill", 3, "ngClass"], [1, "bi", "me-1", 3, "ngClass"], [1, "badge", "bg-light", "text-dark", "border"], [1, "text-center"]], template: function TeacherHistoryComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275element(4, "i", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div")(6, "h3", 5);
      \u0275\u0275text(7, "Historial de Sesiones");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 6);
      \u0275\u0275text(9, "Consulta el registro de todas tus sesiones de refuerzo realizadas");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(10, TeacherHistoryComponent_Conditional_10_Template, 4, 1, "div", 7);
      \u0275\u0275elementStart(11, "div", 8)(12, "div", 9)(13, "div", 10)(14, "div")(15, "div", 11);
      \u0275\u0275text(16, "Total sesiones");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 12);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 13);
      \u0275\u0275element(20, "i", 14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(21, "div", 9)(22, "div", 10)(23, "div")(24, "div", 11);
      \u0275\u0275text(25, "Virtuales");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "div", 15);
      \u0275\u0275text(27);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "div", 16);
      \u0275\u0275element(29, "i", 17);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "div", 9)(31, "div", 10)(32, "div")(33, "div", 11);
      \u0275\u0275text(34, "Presenciales");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "div", 18);
      \u0275\u0275text(36);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "div", 19);
      \u0275\u0275element(38, "i", 20);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(39, "div", 21)(40, "div", 22);
      \u0275\u0275conditionalCreate(41, TeacherHistoryComponent_Conditional_41_Template, 4, 0, "div", 23)(42, TeacherHistoryComponent_Conditional_42_Template, 46, 10);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275conditional(ctx.errorMsg ? 10 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.totalCount);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.countByModality("Virtual"));
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.countByModality("Presencial"));
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.loading ? 41 : 42);
    }
  }, dependencies: [CommonModule, NgClass, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel, DatePipe], styles: ['\n\n[_nghost-%COMP%] {\n  font-family:\n    "Inter",\n    "Segoe UI",\n    -apple-system,\n    BlinkMacSystemFont,\n    sans-serif;\n}\n.header-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  min-width: 48px;\n  border-radius: 14px;\n  background: #1B7505;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.4rem;\n  border: 1px solid #145904;\n}\n.chip-box[_ngcontent-%COMP%] {\n  min-height: 72px;\n  border: 1px solid #e0e0e0 !important;\n}\n.chip-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  min-width: 40px;\n  font-size: 1.1rem;\n}\nth[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  font-size: .85rem;\n  letter-spacing: .02em;\n}\ntd[_ngcontent-%COMP%] {\n  vertical-align: middle;\n}\n.table[_ngcontent-%COMP%] {\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  border-bottom: 2px solid #e0e0e0;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #f0f0f0;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: #f8fdf5;\n}\n/*# sourceMappingURL=teacher-history.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeacherHistoryComponent, [{
    type: Component,
    args: [{ selector: "app-teacher-history", standalone: true, imports: [CommonModule, FormsModule], template: `\r
<div class="container-fluid">\r
\r
  <!-- Header -->\r
  <div class="mb-4">\r
    <div class="d-flex align-items-center gap-3">\r
      <div class="header-icon"><i class="bi bi-clock-history"></i></div>\r
      <div>\r
        <h3 class="fw-bold text-dark mb-0">Historial de Sesiones</h3>\r
        <p class="text-muted mb-0">Consulta el registro de todas tus sesiones de refuerzo realizadas</p>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Alert -->\r
  @if (errorMsg) {\r
    <div class="alert alert-danger alert-dismissible fade show border" role="alert">\r
      <i class="bi bi-exclamation-triangle-fill me-2"></i>{{ errorMsg }}\r
      <button type="button" class="btn-close" (click)="errorMsg = null"></button>\r
    </div>\r
  }\r
\r
  <!-- Summary chips -->\r
  <div class="row g-2 mb-3">\r
    <div class="col-6 col-lg-3">\r
      <div class="chip-box bg-white shadow-sm rounded-3 p-3 d-flex justify-content-between align-items-center">\r
        <div>\r
          <div class="text-muted small">Total sesiones</div>\r
          <div class="fw-bold fs-4" style="color:#1B7505">{{ totalCount }}</div>\r
        </div>\r
        <div class="chip-icon d-flex align-items-center justify-content-center rounded-circle"\r
             style="background:#e8f5e9">\r
          <i class="bi bi-journals" style="color:#1B7505"></i>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="col-6 col-lg-3">\r
      <div class="chip-box bg-white shadow-sm rounded-3 p-3 d-flex justify-content-between align-items-center">\r
        <div>\r
          <div class="text-muted small">Virtuales</div>\r
          <div class="fw-bold fs-4" style="color:#0288d1">{{ countByModality('Virtual') }}</div>\r
        </div>\r
        <div class="chip-icon d-flex align-items-center justify-content-center rounded-circle"\r
             style="background:#e1f5fe">\r
          <i class="bi bi-camera-video" style="color:#0288d1"></i>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="col-6 col-lg-3">\r
      <div class="chip-box bg-white shadow-sm rounded-3 p-3 d-flex justify-content-between align-items-center">\r
        <div>\r
          <div class="text-muted small">Presenciales</div>\r
          <div class="fw-bold fs-4" style="color:#7b1fa2">{{ countByModality('Presencial') }}</div>\r
        </div>\r
        <div class="chip-icon d-flex align-items-center justify-content-center rounded-circle"\r
             style="background:#f3e5f5">\r
          <i class="bi bi-building" style="color:#7b1fa2"></i>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Table -->\r
  <div class="card border shadow-sm">\r
    <div class="card-body">\r
      @if (loading) {\r
        <div class="text-center py-5">\r
          <div class="spinner-border text-success" role="status"></div>\r
          <p class="text-muted mt-2 mb-0">Cargando historial...</p>\r
        </div>\r
      } @else {\r
        <div class="table-responsive">\r
          <table class="table align-middle mb-0">\r
            <thead class="table-light">\r
              <tr>\r
                <th>ID SESI\xD3N</th>\r
                <th>ASIGNATURA</th>\r
                <th>FECHA</th>\r
                <th>MODALIDAD</th>\r
                <th>FRANJA</th>\r
                <th>DURACI\xD3N EST.</th>\r
                <th>TIPO</th>\r
                <th>ESTUDIANTES</th>\r
                <th>ESTADO</th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              @if (rows.length === 0) {\r
                <tr>\r
                  <td colspan="9" class="text-center py-5 text-muted">\r
                    <i class="bi bi-clock-history display-4 d-block mb-2 opacity-25"></i>\r
                    No tienes sesiones registradas a\xFAn.\r
                  </td>\r
                </tr>\r
              }\r
              @for (r of rows; track r.scheduledId) {\r
                <tr>\r
                  <td class="fw-semibold text-muted">#{{ r.scheduledId }}</td>\r
                  <td class="fw-semibold">{{ r.subjectName }}</td>\r
                  <td class="text-nowrap">{{ r.scheduledDate | date:'dd/MM/yyyy' }}</td>\r
                  <td>\r
                    <span class="badge rounded-pill" [ngClass]="modalityBadge(r.modality)">\r
                      <i class="bi me-1" [ngClass]="r.modality === 'Virtual' ? 'bi-camera-video' : 'bi-building'"></i>\r
                      {{ r.modality }}\r
                    </span>\r
                  </td>\r
                  <td>{{ r.timeSlot }}</td>\r
                  <td>{{ r.estimatedDuration }}</td>\r
                  <td><span class="badge bg-light text-dark border">{{ r.sessionType }}</span></td>\r
                  <td class="text-center">{{ r.studentCount }}</td>\r
                  <td>\r
                    <span class="badge rounded-pill" [ngClass]="statusBadge(r.statusName)">{{ r.statusName }}</span>\r
                  </td>\r
                </tr>\r
              }\r
            </tbody>\r
          </table>\r
        </div>\r
\r
        <!-- Pagination -->\r
        <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">\r
          <div class="text-muted small">\r
            P\xE1gina {{ page }} de {{ totalPages }} \xB7 Total: {{ totalCount }}\r
          </div>\r
          <div class="d-flex gap-2">\r
            <button class="btn btn-outline-secondary btn-sm border"\r
                    [disabled]="page <= 1" (click)="goTo(page - 1)">\r
              <i class="bi bi-chevron-left"></i> Anterior\r
            </button>\r
            <button class="btn btn-outline-secondary btn-sm border"\r
                    [disabled]="page >= totalPages" (click)="goTo(page + 1)">\r
              Siguiente <i class="bi bi-chevron-right"></i>\r
            </button>\r
          </div>\r
          <div class="d-flex align-items-center gap-2">\r
            <label class="text-muted small mb-0">Filas:</label>\r
            <select class="form-select form-select-sm border" style="width:auto"\r
                    [(ngModel)]="size" (change)="page = 1; load()">\r
              <option [ngValue]="10">10</option>\r
              <option [ngValue]="25">25</option>\r
              <option [ngValue]="50">50</option>\r
            </select>\r
          </div>\r
        </div>\r
      }\r
    </div>\r
  </div>\r
\r
</div>\r
`, styles: ['/* src/app/components/teacher/teacher-history/teacher-history.component.css */\n:host {\n  font-family:\n    "Inter",\n    "Segoe UI",\n    -apple-system,\n    BlinkMacSystemFont,\n    sans-serif;\n}\n.header-icon {\n  width: 48px;\n  height: 48px;\n  min-width: 48px;\n  border-radius: 14px;\n  background: #1B7505;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.4rem;\n  border: 1px solid #145904;\n}\n.chip-box {\n  min-height: 72px;\n  border: 1px solid #e0e0e0 !important;\n}\n.chip-icon {\n  width: 40px;\n  height: 40px;\n  min-width: 40px;\n  font-size: 1.1rem;\n}\nth {\n  white-space: nowrap;\n  font-size: .85rem;\n  letter-spacing: .02em;\n}\ntd {\n  vertical-align: middle;\n}\n.table {\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.table thead th {\n  border-bottom: 2px solid #e0e0e0;\n}\n.table tbody tr {\n  border-bottom: 1px solid #f0f0f0;\n}\n.table tbody tr:hover {\n  background-color: #f8fdf5;\n}\n/*# sourceMappingURL=teacher-history.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeacherHistoryComponent, { className: "TeacherHistoryComponent", filePath: "app/components/teacher/teacher-history/teacher-history.component.ts", lineNumber: 14 });
})();
export {
  TeacherHistoryComponent
};
//# sourceMappingURL=chunk-GHIDEITQ.js.map
