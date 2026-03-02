import {
  buildHttpParams
} from "./chunk-W7KL5CWJ.js";
import {
  CheckboxControlValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-RREETWSH.js";
import {
  HttpClient
} from "./chunk-K6SHIZGP.js";
import {
  ChangeDetectorRef,
  CommonModule,
  Component,
  Injectable,
  NgClass,
  __spreadProps,
  __spreadValues,
  catchError,
  environment,
  inject,
  setClassMetadata,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
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

// src/app/services/student/student-history.service.ts
var StudentHistoryService = class _StudentHistoryService {
  http;
  baseUrl = environment.apiUrl;
  httpOptions = { withCredentials: true };
  constructor(http) {
    this.http = http;
  }
  /**
   * GET /api/student/history/requests
   */
  getHistoryRequests(filters = {}) {
    const params = buildHttpParams({
      periodId: filters.periodId,
      statusId: filters.statusId,
      page: filters.page ?? 1,
      size: filters.size ?? 10
    });
    return this.http.get(`${this.baseUrl}/student/history/requests`, __spreadProps(__spreadValues({}, this.httpOptions), { params })).pipe(catchError(this.handleError));
  }
  /**
   * GET /api/student/history/sessions
   */
  getHistorySessions(filters = {}) {
    const params = buildHttpParams({
      onlyAttended: filters.onlyAttended,
      page: filters.page ?? 1,
      size: filters.size ?? 10
    });
    return this.http.get(`${this.baseUrl}/student/history/sessions`, __spreadProps(__spreadValues({}, this.httpOptions), { params })).pipe(catchError(this.handleError));
  }
  handleError(error) {
    let message = "Error al cargar el historial";
    if (error.status === 0)
      message = "No se pudo conectar con el servidor.";
    else if (error.status === 401)
      message = "Sesi\xF3n expirada. Inicia sesi\xF3n nuevamente.";
    else if (error.status === 403)
      message = "No tienes permisos para acceder.";
    else if (error.error?.message)
      message = error.error.message;
    console.error("[StudentHistoryService] Error:", error);
    return throwError(() => new Error(message));
  }
  static \u0275fac = function StudentHistoryService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StudentHistoryService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StudentHistoryService, factory: _StudentHistoryService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StudentHistoryService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/components/student/student-history/student-history.component.ts
var _forTrack0 = ($index, $item) => $item.requestId;
var _forTrack1 = ($index, $item) => $item.completedSessionId;
function StudentHistoryComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275element(1, "i", 10);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "button", 11);
    \u0275\u0275listener("click", function StudentHistoryComponent_Conditional_6_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.errorMessage = null);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.errorMessage, " ");
  }
}
function StudentHistoryComponent_Conditional_16_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 28);
    \u0275\u0275element(2, "div", 29);
    \u0275\u0275text(3, " Cargando... ");
    \u0275\u0275elementEnd()();
  }
}
function StudentHistoryComponent_Conditional_16_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 30);
    \u0275\u0275text(2, " No hay solicitudes en el historial. ");
    \u0275\u0275elementEnd()();
  }
}
function StudentHistoryComponent_Conditional_16_Conditional_41_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 31);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 25);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td")(9, "div");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "small", 25);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td")(16, "span", 32);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td")(19, "span", 33);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(r_r4.createdAt));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatTime(r_r4.createdAt));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r4.subjectName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r4.reason);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Semestre ", r_r4.unit);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r4.teacherName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r4.sessionType);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.getStatusClass(r_r4.statusId));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", r_r4.statusName, " ");
  }
}
function StudentHistoryComponent_Conditional_16_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, StudentHistoryComponent_Conditional_16_Conditional_41_For_1_Template, 21, 9, "tr", null, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r1.requests);
  }
}
function StudentHistoryComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13)(2, "div", 14)(3, "div", 15)(4, "label", 16);
    \u0275\u0275text(5, "Estado:");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 15)(7, "select", 17);
    \u0275\u0275twoWayListener("ngModelChange", function StudentHistoryComponent_Conditional_16_Template_select_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.requestFilters.statusId, $event) || (ctx_r1.requestFilters.statusId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function StudentHistoryComponent_Conditional_16_Template_select_change_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadRequests());
    });
    \u0275\u0275elementStart(8, "option", 18);
    \u0275\u0275text(9, "Todos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "option", 18);
    \u0275\u0275text(11, "Pendiente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "option", 18);
    \u0275\u0275text(13, "Aceptada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "option", 18);
    \u0275\u0275text(15, "Rechazada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "option", 18);
    \u0275\u0275text(17, "Cancelada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "option", 18);
    \u0275\u0275text(19, "Finalizada");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(20, "div", 19)(21, "div", 20)(22, "div", 21)(23, "table", 22)(24, "thead", 23)(25, "tr")(26, "th");
    \u0275\u0275text(27, "FECHA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "th");
    \u0275\u0275text(29, "ASIGNATURA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "th");
    \u0275\u0275text(31, "MOTIVO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "th");
    \u0275\u0275text(33, "DOCENTE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "th");
    \u0275\u0275text(35, "TIPO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "th");
    \u0275\u0275text(37, "ESTADO");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "tbody");
    \u0275\u0275conditionalCreate(39, StudentHistoryComponent_Conditional_16_Conditional_39_Template, 4, 0, "tr")(40, StudentHistoryComponent_Conditional_16_Conditional_40_Template, 3, 0, "tr")(41, StudentHistoryComponent_Conditional_16_Conditional_41_Template, 2, 0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(42, "div", 24)(43, "small", 25);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div", 26)(46, "button", 27);
    \u0275\u0275listener("click", function StudentHistoryComponent_Conditional_16_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToRequestPage(ctx_r1.requestPage - 1));
    });
    \u0275\u0275text(47, " Anterior ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "button", 27);
    \u0275\u0275listener("click", function StudentHistoryComponent_Conditional_16_Template_button_click_48_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToRequestPage(ctx_r1.requestPage + 1));
    });
    \u0275\u0275text(49, " Siguiente ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.requestFilters.statusId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 4);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 5);
    \u0275\u0275advance(21);
    \u0275\u0275conditional(ctx_r1.loadingRequests ? 39 : ctx_r1.requests.length === 0 ? 40 : 41);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate3(" P\xE1gina ", ctx_r1.requestPage, " de ", ctx_r1.requestTotalPages, " \xB7 Total: ", ctx_r1.requestTotalCount, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.requestPage <= 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.requestPage >= ctx_r1.requestTotalPages);
  }
}
function StudentHistoryComponent_Conditional_17_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 37);
    \u0275\u0275element(2, "div", 29);
    \u0275\u0275text(3, " Cargando... ");
    \u0275\u0275elementEnd()();
  }
}
function StudentHistoryComponent_Conditional_17_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 38);
    \u0275\u0275text(2, " No hay sesiones completadas. ");
    \u0275\u0275elementEnd()();
  }
}
function StudentHistoryComponent_Conditional_17_Conditional_29_For_1_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1, "Asisti\xF3");
    \u0275\u0275elementEnd();
  }
}
function StudentHistoryComponent_Conditional_17_Conditional_29_For_1_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "No asisti\xF3");
    \u0275\u0275elementEnd();
  }
}
function StudentHistoryComponent_Conditional_17_Conditional_29_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 31);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 25);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td")(9, "div");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "small", 25);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td");
    \u0275\u0275conditionalCreate(18, StudentHistoryComponent_Conditional_17_Conditional_29_For_1_Conditional_18_Template, 2, 0, "span", 39)(19, StudentHistoryComponent_Conditional_17_Conditional_29_For_1_Conditional_19_Template, 2, 0, "span", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td")(21, "small", 25);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const s_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(s_r6.requestDateTime));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatTime(s_r6.requestDateTime));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r6.subjectName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r6.syllabusName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Semestre ", s_r6.unit);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r6.teacherName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r6.duration || "-");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(s_r6.attended ? 18 : 19);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(s_r6.notes || "-");
  }
}
function StudentHistoryComponent_Conditional_17_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, StudentHistoryComponent_Conditional_17_Conditional_29_For_1_Template, 23, 9, "tr", null, _forTrack1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r1.sessions);
  }
}
function StudentHistoryComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13)(2, "div", 34)(3, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function StudentHistoryComponent_Conditional_17_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.sessionFilters.onlyAttended, $event) || (ctx_r1.sessionFilters.onlyAttended = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function StudentHistoryComponent_Conditional_17_Template_input_change_3_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadSessions());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "label", 36);
    \u0275\u0275text(5, " Solo sesiones a las que asist\xED ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(6, "div", 19)(7, "div", 20)(8, "div", 21)(9, "table", 22)(10, "thead", 23)(11, "tr")(12, "th");
    \u0275\u0275text(13, "FECHA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "ASIGNATURA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "MOTIVO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th");
    \u0275\u0275text(19, "DOCENTE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th");
    \u0275\u0275text(21, "DURACI\xD3N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "th");
    \u0275\u0275text(23, "ASISTENCIA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th");
    \u0275\u0275text(25, "NOTAS");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "tbody");
    \u0275\u0275conditionalCreate(27, StudentHistoryComponent_Conditional_17_Conditional_27_Template, 4, 0, "tr")(28, StudentHistoryComponent_Conditional_17_Conditional_28_Template, 3, 0, "tr")(29, StudentHistoryComponent_Conditional_17_Conditional_29_Template, 2, 0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 24)(31, "small", 25);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 26)(34, "button", 27);
    \u0275\u0275listener("click", function StudentHistoryComponent_Conditional_17_Template_button_click_34_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToSessionPage(ctx_r1.sessionPage - 1));
    });
    \u0275\u0275text(35, " Anterior ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "button", 27);
    \u0275\u0275listener("click", function StudentHistoryComponent_Conditional_17_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToSessionPage(ctx_r1.sessionPage + 1));
    });
    \u0275\u0275text(37, " Siguiente ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.sessionFilters.onlyAttended);
    \u0275\u0275advance(24);
    \u0275\u0275conditional(ctx_r1.loadingSessions ? 27 : ctx_r1.sessions.length === 0 ? 28 : 29);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate3(" P\xE1gina ", ctx_r1.sessionPage, " de ", ctx_r1.sessionTotalPages, " \xB7 Total: ", ctx_r1.sessionTotalCount, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.sessionPage <= 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.sessionPage >= ctx_r1.sessionTotalPages);
  }
}
var StudentHistoryComponent = class _StudentHistoryComponent {
  svc = inject(StudentHistoryService);
  cdr = inject(ChangeDetectorRef);
  activeTab = "requests";
  errorMessage = null;
  // Requests
  requests = [];
  loadingRequests = false;
  requestPage = 1;
  requestSize = 10;
  requestTotalCount = 0;
  requestTotalPages = 1;
  requestFilters = { statusId: null };
  // Sessions
  sessions = [];
  loadingSessions = false;
  sessionPage = 1;
  sessionSize = 10;
  sessionTotalCount = 0;
  sessionTotalPages = 1;
  sessionFilters = { onlyAttended: false };
  ngAfterViewInit() {
    Promise.resolve().then(() => {
      this.loadRequests();
    });
  }
  switchTab(tab) {
    this.activeTab = tab;
    if (tab === "requests" && this.requests.length === 0) {
      this.loadRequests();
    } else if (tab === "sessions" && this.sessions.length === 0) {
      this.loadSessions();
    }
  }
  loadRequests() {
    this.loadingRequests = true;
    this.errorMessage = null;
    this.svc.getHistoryRequests({
      statusId: this.requestFilters.statusId ?? void 0,
      page: this.requestPage,
      size: this.requestSize
    }).subscribe({
      next: (res) => {
        this.requests = res.items || [];
        this.requestTotalCount = res.totalCount || 0;
        this.requestTotalPages = Math.max(1, Math.ceil(this.requestTotalCount / this.requestSize));
        this.loadingRequests = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err?.message || "Error al cargar historial";
        this.loadingRequests = false;
        this.cdr.detectChanges();
      }
    });
  }
  loadSessions() {
    this.loadingSessions = true;
    this.errorMessage = null;
    this.svc.getHistorySessions({
      onlyAttended: this.sessionFilters.onlyAttended,
      page: this.sessionPage,
      size: this.sessionSize
    }).subscribe({
      next: (res) => {
        this.sessions = res.items || [];
        this.sessionTotalCount = res.totalCount || 0;
        this.sessionTotalPages = Math.max(1, Math.ceil(this.sessionTotalCount / this.sessionSize));
        this.loadingSessions = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err?.message || "Error al cargar sesiones";
        this.loadingSessions = false;
        this.cdr.detectChanges();
      }
    });
  }
  goToRequestPage(page) {
    this.requestPage = page;
    this.loadRequests();
  }
  goToSessionPage(page) {
    this.sessionPage = page;
    this.loadSessions();
  }
  formatDate(dt) {
    const d = new Date(dt);
    return isNaN(d.getTime()) ? dt : d.toLocaleDateString();
  }
  formatTime(dt) {
    const d = new Date(dt);
    return isNaN(d.getTime()) ? "" : d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  getStatusClass(statusId) {
    switch (statusId) {
      case 1:
        return "bg-warning text-dark";
      // Pendiente
      case 2:
        return "bg-success";
      // Aceptada
      case 3:
        return "bg-danger";
      // Rechazada
      case 4:
        return "bg-secondary";
      // Cancelada
      case 5:
        return "bg-dark";
      // Finalizada
      default:
        return "bg-light text-dark";
    }
  }
  static \u0275fac = function StudentHistoryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StudentHistoryComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StudentHistoryComponent, selectors: [["app-student-history"]], decls: 18, vars: 7, consts: [[1, "container-fluid"], [1, "mb-4"], [1, "mb-1"], [1, "text-muted", "mb-0"], ["role", "alert", 1, "alert", "alert-danger", "alert-dismissible", "fade", "show"], [1, "nav", "nav-tabs", "mb-3"], [1, "nav-item"], [1, "nav-link", 3, "click"], [1, "bi", "bi-file-text", "me-2"], [1, "bi", "bi-calendar-check", "me-2"], [1, "bi", "bi-exclamation-triangle-fill", "me-2"], ["type", "button", 1, "btn-close", 3, "click"], [1, "card", "border-0", "shadow-sm", "mb-3"], [1, "card-body", "py-2"], [1, "row", "g-2", "align-items-center"], [1, "col-auto"], [1, "form-label", "mb-0", "small"], [1, "form-select", "form-select-sm", 3, "ngModelChange", "change", "ngModel"], [3, "ngValue"], [1, "card", "border-0", "shadow-sm"], [1, "card-body"], [1, "table-responsive"], [1, "table", "align-middle", "mb-0"], [1, "table-light"], [1, "d-flex", "justify-content-between", "align-items-center", "mt-3"], [1, "text-muted"], [1, "btn-group", "btn-group-sm"], [1, "btn", "btn-outline-secondary", 3, "click", "disabled"], ["colspan", "6", 1, "text-center", "py-4"], [1, "spinner-border", "spinner-border-sm", "text-success", "me-2"], ["colspan", "6", 1, "text-center", "py-5", "text-muted"], [1, "fw-semibold"], [1, "badge", "bg-light", "text-dark", "border"], [1, "badge", "rounded-pill", 3, "ngClass"], [1, "form-check"], ["type", "checkbox", "id", "onlyAttended", 1, "form-check-input", 3, "ngModelChange", "change", "ngModel"], ["for", "onlyAttended", 1, "form-check-label"], ["colspan", "7", 1, "text-center", "py-4"], ["colspan", "7", 1, "text-center", "py-5", "text-muted"], [1, "badge", "bg-success"], [1, "badge", "bg-secondary"]], template: function StudentHistoryComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h3", 2);
      \u0275\u0275text(3, "Historial");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 3);
      \u0275\u0275text(5, "Consulta tus solicitudes pasadas y sesiones completadas");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(6, StudentHistoryComponent_Conditional_6_Template, 4, 1, "div", 4);
      \u0275\u0275elementStart(7, "ul", 5)(8, "li", 6)(9, "button", 7);
      \u0275\u0275listener("click", function StudentHistoryComponent_Template_button_click_9_listener() {
        return ctx.switchTab("requests");
      });
      \u0275\u0275element(10, "i", 8);
      \u0275\u0275text(11, "Solicitudes ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "li", 6)(13, "button", 7);
      \u0275\u0275listener("click", function StudentHistoryComponent_Template_button_click_13_listener() {
        return ctx.switchTab("sessions");
      });
      \u0275\u0275element(14, "i", 9);
      \u0275\u0275text(15, "Sesiones Completadas ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(16, StudentHistoryComponent_Conditional_16_Template, 50, 13);
      \u0275\u0275conditionalCreate(17, StudentHistoryComponent_Conditional_17_Template, 38, 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.errorMessage ? 6 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275classProp("active", ctx.activeTab === "requests");
      \u0275\u0275advance(4);
      \u0275\u0275classProp("active", ctx.activeTab === "sessions");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.activeTab === "requests" ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab === "sessions" ? 17 : -1);
    }
  }, dependencies: [CommonModule, NgClass, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.nav-link[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\nth[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  font-size: .85rem;\n}\n/*# sourceMappingURL=student-history.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StudentHistoryComponent, [{
    type: Component,
    args: [{ selector: "app-student-history", standalone: true, imports: [CommonModule, FormsModule], template: `\r
    <div class="container-fluid">\r
      <!-- Header -->\r
      <div class="mb-4">\r
        <h3 class="mb-1">Historial</h3>\r
        <p class="text-muted mb-0">Consulta tus solicitudes pasadas y sesiones completadas</p>\r
      </div>\r
\r
      @if (errorMessage) {\r
        <div class="alert alert-danger alert-dismissible fade show" role="alert">\r
          <i class="bi bi-exclamation-triangle-fill me-2"></i>\r
          {{ errorMessage }}\r
          <button type="button" class="btn-close" (click)="errorMessage = null"></button>\r
        </div>\r
      }\r
\r
      <!-- Tabs -->\r
      <ul class="nav nav-tabs mb-3">\r
        <li class="nav-item">\r
          <button class="nav-link" [class.active]="activeTab === 'requests'" (click)="switchTab('requests')">\r
            <i class="bi bi-file-text me-2"></i>Solicitudes\r
          </button>\r
        </li>\r
        <li class="nav-item">\r
          <button class="nav-link" [class.active]="activeTab === 'sessions'" (click)="switchTab('sessions')">\r
            <i class="bi bi-calendar-check me-2"></i>Sesiones Completadas\r
          </button>\r
        </li>\r
      </ul>\r
\r
      <!-- Requests Tab -->\r
      @if (activeTab === 'requests') {\r
        <!-- Filters -->\r
        <div class="card border-0 shadow-sm mb-3">\r
          <div class="card-body py-2">\r
            <div class="row g-2 align-items-center">\r
              <div class="col-auto">\r
                <label class="form-label mb-0 small">Estado:</label>\r
              </div>\r
              <div class="col-auto">\r
                <select class="form-select form-select-sm" [(ngModel)]="requestFilters.statusId" (change)="loadRequests()">\r
                  <option [ngValue]="null">Todos</option>\r
                  <option [ngValue]="1">Pendiente</option>\r
                  <option [ngValue]="2">Aceptada</option>\r
                  <option [ngValue]="3">Rechazada</option>\r
                  <option [ngValue]="4">Cancelada</option>\r
                  <option [ngValue]="5">Finalizada</option>\r
                </select>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Requests Table -->\r
        <div class="card border-0 shadow-sm">\r
          <div class="card-body">\r
            <div class="table-responsive">\r
              <table class="table align-middle mb-0">\r
                <thead class="table-light">\r
                  <tr>\r
                    <th>FECHA</th>\r
                    <th>ASIGNATURA</th>\r
                    <th>MOTIVO</th>\r
                    <th>DOCENTE</th>\r
                    <th>TIPO</th>\r
                    <th>ESTADO</th>\r
                  </tr>\r
                </thead>\r
                <tbody>\r
                  @if (loadingRequests) {\r
                    <tr>\r
                      <td colspan="6" class="text-center py-4">\r
                        <div class="spinner-border spinner-border-sm text-success me-2"></div>\r
                        Cargando...\r
                      </td>\r
                    </tr>\r
                  } @else if (requests.length === 0) {\r
                    <tr>\r
                      <td colspan="6" class="text-center py-5 text-muted">\r
                        No hay solicitudes en el historial.\r
                      </td>\r
                    </tr>\r
                  } @else {\r
                    @for (r of requests; track r.requestId) {\r
                      <tr>\r
                        <td>\r
                          <div class="fw-semibold">{{ formatDate(r.createdAt) }}</div>\r
                          <small class="text-muted">{{ formatTime(r.createdAt) }}</small>\r
                        </td>\r
                        <td>{{ r.subjectName }}</td>\r
                        <td>\r
                          <div>{{ r.reason }}</div>\r
                          <small class="text-muted">Semestre {{ r.unit }}</small>\r
                        </td>\r
                        <td>{{ r.teacherName }}</td>\r
                        <td><span class="badge bg-light text-dark border">{{ r.sessionType }}</span></td>\r
                        <td>\r
                          <span class="badge rounded-pill" [ngClass]="getStatusClass(r.statusId)">\r
                            {{ r.statusName }}\r
                          </span>\r
                        </td>\r
                      </tr>\r
                    }\r
                  }\r
                </tbody>\r
              </table>\r
            </div>\r
\r
            <!-- Pagination -->\r
            <div class="d-flex justify-content-between align-items-center mt-3">\r
              <small class="text-muted">\r
                P\xE1gina {{ requestPage }} de {{ requestTotalPages }} \xB7 Total: {{ requestTotalCount }}\r
              </small>\r
              <div class="btn-group btn-group-sm">\r
                <button class="btn btn-outline-secondary" [disabled]="requestPage <= 1" (click)="goToRequestPage(requestPage - 1)">\r
                  Anterior\r
                </button>\r
                <button class="btn btn-outline-secondary" [disabled]="requestPage >= requestTotalPages" (click)="goToRequestPage(requestPage + 1)">\r
                  Siguiente\r
                </button>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      }\r
\r
      <!-- Sessions Tab -->\r
      @if (activeTab === 'sessions') {\r
        <!-- Filters -->\r
        <div class="card border-0 shadow-sm mb-3">\r
          <div class="card-body py-2">\r
            <div class="form-check">\r
              <input class="form-check-input" type="checkbox" id="onlyAttended"\r
                     [(ngModel)]="sessionFilters.onlyAttended" (change)="loadSessions()">\r
              <label class="form-check-label" for="onlyAttended">\r
                Solo sesiones a las que asist\xED\r
              </label>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Sessions Table -->\r
        <div class="card border-0 shadow-sm">\r
          <div class="card-body">\r
            <div class="table-responsive">\r
              <table class="table align-middle mb-0">\r
                <thead class="table-light">\r
                  <tr>\r
                    <th>FECHA</th>\r
                    <th>ASIGNATURA</th>\r
                    <th>MOTIVO</th>\r
                    <th>DOCENTE</th>\r
                    <th>DURACI\xD3N</th>\r
                    <th>ASISTENCIA</th>\r
                    <th>NOTAS</th>\r
                  </tr>\r
                </thead>\r
                <tbody>\r
                  @if (loadingSessions) {\r
                    <tr>\r
                      <td colspan="7" class="text-center py-4">\r
                        <div class="spinner-border spinner-border-sm text-success me-2"></div>\r
                        Cargando...\r
                      </td>\r
                    </tr>\r
                  } @else if (sessions.length === 0) {\r
                    <tr>\r
                      <td colspan="7" class="text-center py-5 text-muted">\r
                        No hay sesiones completadas.\r
                      </td>\r
                    </tr>\r
                  } @else {\r
                    @for (s of sessions; track s.completedSessionId) {\r
                      <tr>\r
                        <td>\r
                          <div class="fw-semibold">{{ formatDate(s.requestDateTime) }}</div>\r
                          <small class="text-muted">{{ formatTime(s.requestDateTime) }}</small>\r
                        </td>\r
                        <td>{{ s.subjectName }}</td>\r
                        <td>\r
                          <div>{{ s.syllabusName }}</div>\r
                          <small class="text-muted">Semestre {{ s.unit }}</small>\r
                        </td>\r
                        <td>{{ s.teacherName }}</td>\r
                        <td>{{ s.duration || '-' }}</td>\r
                        <td>\r
                          @if (s.attended) {\r
                            <span class="badge bg-success">Asisti\xF3</span>\r
                          } @else {\r
                            <span class="badge bg-secondary">No asisti\xF3</span>\r
                          }\r
                        </td>\r
                        <td>\r
                          <small class="text-muted">{{ s.notes || '-' }}</small>\r
                        </td>\r
                      </tr>\r
                    }\r
                  }\r
                </tbody>\r
              </table>\r
            </div>\r
\r
            <!-- Pagination -->\r
            <div class="d-flex justify-content-between align-items-center mt-3">\r
              <small class="text-muted">\r
                P\xE1gina {{ sessionPage }} de {{ sessionTotalPages }} \xB7 Total: {{ sessionTotalCount }}\r
              </small>\r
              <div class="btn-group btn-group-sm">\r
                <button class="btn btn-outline-secondary" [disabled]="sessionPage <= 1" (click)="goToSessionPage(sessionPage - 1)">\r
                  Anterior\r
                </button>\r
                <button class="btn btn-outline-secondary" [disabled]="sessionPage >= sessionTotalPages" (click)="goToSessionPage(sessionPage + 1)">\r
                  Siguiente\r
                </button>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      }\r
    </div>\r
  `, styles: ["/* src/app/components/student/student-history/student-history.component.css */\n.nav-link {\n  cursor: pointer;\n}\nth {\n  white-space: nowrap;\n  font-size: .85rem;\n}\n/*# sourceMappingURL=student-history.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StudentHistoryComponent, { className: "StudentHistoryComponent", filePath: "app/components/student/student-history/student-history.component.ts", lineNumber: 19 });
})();
export {
  StudentHistoryComponent
};
//# sourceMappingURL=chunk-SXWOKHHQ.js.map
