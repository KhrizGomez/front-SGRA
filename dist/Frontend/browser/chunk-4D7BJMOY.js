import {
  StudentNewRequestService
} from "./chunk-CQDBQWHQ.js";
import {
  buildHttpParams
} from "./chunk-W7KL5CWJ.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-MXF362TW.js";
import {
  DefaultValueAccessor,
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
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-OENL2SFL.js";

// src/app/services/student/student-my-requests.service.ts
var StudentMyRequestsService = class _StudentMyRequestsService {
  http;
  baseUrl = environment.apiUrl;
  httpOptions = { withCredentials: true };
  constructor(http) {
    this.http = http;
  }
  getMyRequests(filters) {
    const params = buildHttpParams({
      periodId: filters.periodId,
      statusId: filters.statusId,
      sessionTypeId: filters.sessionTypeId,
      subjectId: filters.subjectId,
      search: filters.search,
      page: filters.page ?? 1,
      size: filters.size ?? 10
    });
    return this.http.get(`${this.baseUrl}/student/requests`, __spreadProps(__spreadValues({}, this.httpOptions), { params })).pipe(catchError(this.handleError));
  }
  getMyRequestsSummary(periodId) {
    const params = buildHttpParams({ periodId });
    return this.http.get(`${this.baseUrl}/student/requests/summary`, __spreadProps(__spreadValues({}, this.httpOptions), { params })).pipe(catchError(this.handleError));
  }
  cancelRequest(requestId) {
    return this.http.put(`${this.baseUrl}/student/requests/${requestId}/cancel`, {}, this.httpOptions).pipe(catchError(this.handleError));
  }
  handleError(error) {
    let message = "Error al cargar la informaci\xF3n";
    if (error.status === 0)
      message = "No se pudo conectar con el servidor.";
    else if (error.status === 401)
      message = "Sesi\xF3n expirada. Inicia sesi\xF3n nuevamente.";
    else if (error.status === 403)
      message = "No tienes permisos para acceder.";
    else if (error.status === 409)
      message = error.error?.message || "La solicitud no puede ser cancelada.";
    else if (error.error?.message)
      message = error.error.message;
    console.error("[StudentMyRequestsService] Error:", error);
    return throwError(() => new Error(message));
  }
  static \u0275fac = function StudentMyRequestsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StudentMyRequestsService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StudentMyRequestsService, factory: _StudentMyRequestsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StudentMyRequestsService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/services/student/student-invitations.service.ts
var StudentInvitationsService = class _StudentInvitationsService {
  http;
  baseUrl = environment.apiUrl;
  httpOptions = { withCredentials: true };
  constructor(http) {
    this.http = http;
  }
  /**
   * Obtiene las invitaciones a tutorías grupales pendientes de respuesta.
   */
  getMyInvitations() {
    return this.http.get(`${this.baseUrl}/student/invitations`, this.httpOptions).pipe(catchError(this.handleError));
  }
  /**
   * Acepta o rechaza una invitación a tutoría grupal.
   * @param participantId ID del registro de participación
   * @param accept true = acepta, false = rechaza
   */
  respondInvitation(participantId, accept) {
    return this.http.put(`${this.baseUrl}/student/invitations/${participantId}`, { accept }, this.httpOptions).pipe(catchError(this.handleError));
  }
  handleError(error) {
    let message = "Error al procesar la invitaci\xF3n";
    if (error.status === 0) {
      message = "No se pudo conectar con el servidor.";
    } else if (error.status === 401) {
      message = "Sesi\xF3n expirada. Por favor, inicia sesi\xF3n nuevamente.";
    } else if (error.status === 400) {
      message = error.error?.message || "Datos inv\xE1lidos.";
    } else if (error.status >= 500) {
      message = "Error en el servidor. Intenta m\xE1s tarde.";
    } else if (error.error?.message) {
      message = error.error.message;
    }
    console.error("[StudentInvitationsService] Error:", error);
    return throwError(() => new Error(message));
  }
  static \u0275fac = function StudentInvitationsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StudentInvitationsService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StudentInvitationsService, factory: _StudentInvitationsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StudentInvitationsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/components/student/student-my-requests/student-my-requests.component.ts
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.requestId;
var _forTrack2 = ($index, $item) => $item.participantId;
function StudentMyRequestsComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.invitations.length);
  }
}
function StudentMyRequestsComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275element(1, "i", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "button", 16);
    \u0275\u0275listener("click", function StudentMyRequestsComponent_Conditional_20_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.errorMessage = null);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage, " ");
  }
}
function StudentMyRequestsComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "i", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "button", 16);
    \u0275\u0275listener("click", function StudentMyRequestsComponent_Conditional_21_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.successMessage = null);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.successMessage, " ");
  }
}
function StudentMyRequestsComponent_Conditional_22_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 40)(2, "div", 41)(3, "div", 42)(4, "h5", 43);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 16);
    \u0275\u0275listener("click", function StudentMyRequestsComponent_Conditional_22_Conditional_0_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.closeDetailModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 44)(8, "div", 45)(9, "div", 46)(10, "label", 47);
    \u0275\u0275text(11, "Fecha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 48);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 46)(15, "label", 47);
    \u0275\u0275text(16, "Hora");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 48);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 49)(20, "label", 47);
    \u0275\u0275text(21, "Asignatura");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 48);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "small", 50);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 49)(27, "label", 47);
    \u0275\u0275text(28, "Motivo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 48);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 46)(32, "label", 47);
    \u0275\u0275text(33, "Docente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 48);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 46)(37, "label", 47);
    \u0275\u0275text(38, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 48);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 49)(42, "label", 47);
    \u0275\u0275text(43, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div")(45, "span", 51);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(47, "div", 52)(48, "button", 53);
    \u0275\u0275listener("click", function StudentMyRequestsComponent_Conditional_22_Conditional_0_Template_button_click_48_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.closeDetailModal());
    });
    \u0275\u0275text(49, "Cerrar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Detalle de Solicitud #", ctx_r0.selectedRequest.requestId);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(ctx_r0.selectedRequest.requestDateTime));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.formatTime(ctx_r0.selectedRequest.requestDateTime));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.selectedRequest.subjectName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.selectedRequest.subjectCode);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.selectedRequest.topic);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.selectedRequest.teacherName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.selectedRequest.sessionType);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("bg-warning", ctx_r0.isPending(ctx_r0.selectedRequest.status))("text-dark", ctx_r0.isPending(ctx_r0.selectedRequest.status))("bg-success", ctx_r0.isAccepted(ctx_r0.selectedRequest.status))("bg-danger", ctx_r0.isRejected(ctx_r0.selectedRequest.status))("bg-secondary", ctx_r0.isCancelled(ctx_r0.selectedRequest.status))("bg-dark", ctx_r0.isFinished(ctx_r0.selectedRequest.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.selectedRequest.status, " ");
  }
}
function StudentMyRequestsComponent_Conditional_22_Conditional_1_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 58);
    \u0275\u0275text(1, " Cancelando... ");
  }
}
function StudentMyRequestsComponent_Conditional_22_Conditional_1_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " S\xED, cancelar ");
  }
}
function StudentMyRequestsComponent_Conditional_22_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 40)(2, "div", 41)(3, "div", 42)(4, "h5", 43);
    \u0275\u0275text(5, "Confirmar Cancelaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 54);
    \u0275\u0275listener("click", function StudentMyRequestsComponent_Conditional_22_Conditional_1_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.closeCancelModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 44)(8, "p");
    \u0275\u0275text(9, "\xBFEst\xE1s seguro de que deseas cancelar la solicitud ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, "?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 55);
    \u0275\u0275text(14, "Esta acci\xF3n no se puede deshacer.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 52)(16, "button", 56);
    \u0275\u0275listener("click", function StudentMyRequestsComponent_Conditional_22_Conditional_1_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.closeCancelModal());
    });
    \u0275\u0275text(17, " No, volver ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 57);
    \u0275\u0275listener("click", function StudentMyRequestsComponent_Conditional_22_Conditional_1_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.doCancelRequest());
    });
    \u0275\u0275conditionalCreate(19, StudentMyRequestsComponent_Conditional_22_Conditional_1_Conditional_19_Template, 2, 0)(20, StudentMyRequestsComponent_Conditional_22_Conditional_1_Conditional_20_Template, 1, 0);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r0.cancelling);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("#", ctx_r0.selectedRequest.requestId);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r0.cancelling);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.cancelling);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.cancelling ? 19 : 20);
  }
}
function StudentMyRequestsComponent_Conditional_22_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r7 = ctx.$implicit;
    \u0275\u0275property("ngValue", o_r7.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r7.label);
  }
}
function StudentMyRequestsComponent_Conditional_22_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r8 = ctx.$implicit;
    \u0275\u0275property("ngValue", o_r8.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r8.label);
  }
}
function StudentMyRequestsComponent_Conditional_22_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r9 = ctx.$implicit;
    \u0275\u0275property("ngValue", o_r9.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r9.label);
  }
}
function StudentMyRequestsComponent_Conditional_22_For_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 59)(2, "div")(3, "div", 37);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 60);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(7, "i", 61);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const chip_r10 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(chip_r10.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(chip_r10.value);
  }
}
function StudentMyRequestsComponent_Conditional_22_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 62);
    \u0275\u0275text(2, " Sin solicitudes para mostrar. ");
    \u0275\u0275elementEnd()();
  }
}
function StudentMyRequestsComponent_Conditional_22_Conditional_55_For_1_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275element(1, "hr", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "li")(3, "button", 71);
    \u0275\u0275listener("click", function StudentMyRequestsComponent_Conditional_22_Conditional_55_For_1_Conditional_29_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r13);
      const r_r12 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.confirmCancel(r_r12));
    });
    \u0275\u0275element(4, "i", 72);
    \u0275\u0275text(5, "Cancelar solicitud ");
    \u0275\u0275elementEnd()();
  }
}
function StudentMyRequestsComponent_Conditional_22_Conditional_55_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 48);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "div", 37);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td")(6, "div", 48);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 37);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "span", 63);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td")(18, "span", 51);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "td", 35)(21, "div", 64)(22, "button", 65);
    \u0275\u0275element(23, "i", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "ul", 67)(25, "li")(26, "button", 68);
    \u0275\u0275listener("click", function StudentMyRequestsComponent_Conditional_22_Conditional_55_For_1_Template_button_click_26_listener() {
      const r_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.viewDetail(r_r12));
    });
    \u0275\u0275element(27, "i", 69);
    \u0275\u0275text(28, "Ver detalle ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(29, StudentMyRequestsComponent_Conditional_22_Conditional_55_For_1_Conditional_29_Template, 6, 0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const r_r12 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDate(r_r12.requestDateTime), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatTime(r_r12.requestDateTime));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r12.subjectName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r12.subjectCode);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r12.topic);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r12.teacherName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", r_r12.sessionType, " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-warning", ctx_r0.isPending(r_r12.status))("text-dark", ctx_r0.isPending(r_r12.status))("bg-success", ctx_r0.isAccepted(r_r12.status))("bg-danger", ctx_r0.isRejected(r_r12.status))("bg-secondary", ctx_r0.isCancelled(r_r12.status))("bg-dark", ctx_r0.isFinished(r_r12.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", r_r12.status, " ");
    \u0275\u0275advance(10);
    \u0275\u0275conditional(ctx_r0.canCancel(r_r12.status) ? 29 : -1);
  }
}
function StudentMyRequestsComponent_Conditional_22_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, StudentMyRequestsComponent_Conditional_22_Conditional_55_For_1_Template, 30, 21, "tr", null, _forTrack1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r0.rows);
  }
}
function StudentMyRequestsComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, StudentMyRequestsComponent_Conditional_22_Conditional_0_Template, 50, 21, "div", 18);
    \u0275\u0275conditionalCreate(1, StudentMyRequestsComponent_Conditional_22_Conditional_1_Template, 21, 5, "div", 18);
    \u0275\u0275elementStart(2, "div", 19)(3, "div", 20)(4, "div", 21)(5, "div", 22)(6, "label", 23);
    \u0275\u0275text(7, "Buscar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function StudentMyRequestsComponent_Conditional_22_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.filters.search, $event) || (ctx_r0.filters.search = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function StudentMyRequestsComponent_Conditional_22_Template_input_keyup_enter_8_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.applyFilters());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 25)(10, "label", 23);
    \u0275\u0275text(11, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "select", 26);
    \u0275\u0275twoWayListener("ngModelChange", function StudentMyRequestsComponent_Conditional_22_Template_select_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.filters.statusId, $event) || (ctx_r0.filters.statusId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function StudentMyRequestsComponent_Conditional_22_Template_select_change_12_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.applyFilters());
    });
    \u0275\u0275repeaterCreate(13, StudentMyRequestsComponent_Conditional_22_For_14_Template, 2, 2, "option", 27, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 25)(16, "label", 23);
    \u0275\u0275text(17, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "select", 26);
    \u0275\u0275twoWayListener("ngModelChange", function StudentMyRequestsComponent_Conditional_22_Template_select_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.filters.sessionTypeId, $event) || (ctx_r0.filters.sessionTypeId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function StudentMyRequestsComponent_Conditional_22_Template_select_change_18_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.applyFilters());
    });
    \u0275\u0275repeaterCreate(19, StudentMyRequestsComponent_Conditional_22_For_20_Template, 2, 2, "option", 27, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 25)(22, "label", 23);
    \u0275\u0275text(23, "Asignatura");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "select", 26);
    \u0275\u0275twoWayListener("ngModelChange", function StudentMyRequestsComponent_Conditional_22_Template_select_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.filters.subjectId, $event) || (ctx_r0.filters.subjectId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function StudentMyRequestsComponent_Conditional_22_Template_select_change_24_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.applyFilters());
    });
    \u0275\u0275repeaterCreate(25, StudentMyRequestsComponent_Conditional_22_For_26_Template, 2, 2, "option", 27, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 28)(28, "button", 29);
    \u0275\u0275listener("click", function StudentMyRequestsComponent_Conditional_22_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.clearFilters());
    });
    \u0275\u0275text(29, " Limpiar ");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(30, "div", 30);
    \u0275\u0275repeaterCreate(31, StudentMyRequestsComponent_Conditional_22_For_32_Template, 8, 2, "div", 31, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 14)(34, "div", 20)(35, "div", 32)(36, "table", 33)(37, "thead", 34)(38, "tr")(39, "th");
    \u0275\u0275text(40, "FECHA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "th");
    \u0275\u0275text(42, "ASIGNATURA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "th");
    \u0275\u0275text(44, "MOTIVO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "th");
    \u0275\u0275text(46, "DOCENTE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "th");
    \u0275\u0275text(48, "TIPO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "th");
    \u0275\u0275text(50, "ESTADO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "th", 35);
    \u0275\u0275text(52, "ACCIONES");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "tbody");
    \u0275\u0275conditionalCreate(54, StudentMyRequestsComponent_Conditional_22_Conditional_54_Template, 3, 0, "tr")(55, StudentMyRequestsComponent_Conditional_22_Conditional_55_Template, 2, 0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(56, "div", 36)(57, "div", 37);
    \u0275\u0275text(58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "div", 38)(60, "button", 39);
    \u0275\u0275listener("click", function StudentMyRequestsComponent_Conditional_22_Template_button_click_60_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.goTo(ctx_r0.page - 1));
    });
    \u0275\u0275text(61, " Anterior ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "button", 39);
    \u0275\u0275listener("click", function StudentMyRequestsComponent_Conditional_22_Template_button_click_62_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.goTo(ctx_r0.page + 1));
    });
    \u0275\u0275text(63, " Siguiente ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.showDetailModal && ctx_r0.selectedRequest ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showCancelModal && ctx_r0.selectedRequest ? 1 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.filters.search);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.filters.statusId);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.statusOptions);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.filters.sessionTypeId);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.sessionTypeOptions);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.filters.subjectId);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.subjectOptions);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r0.summaryChips);
    \u0275\u0275advance(23);
    \u0275\u0275conditional(ctx_r0.rows.length === 0 ? 54 : 55);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate3(" P\xE1gina ", ctx_r0.page, " de ", ctx_r0.totalPages, " \xB7 Total: ", ctx_r0.totalCount, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.page <= 1 || ctx_r0.loading);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.page >= ctx_r0.totalPages || ctx_r0.loading);
  }
}
function StudentMyRequestsComponent_Conditional_23_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 77);
    \u0275\u0275element(1, "div", 79);
    \u0275\u0275elementStart(2, "p", 3);
    \u0275\u0275text(3, "Cargando invitaciones...");
    \u0275\u0275elementEnd()();
  }
}
function StudentMyRequestsComponent_Conditional_23_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 78);
    \u0275\u0275element(1, "i", 80);
    \u0275\u0275elementStart(2, "p", 74);
    \u0275\u0275text(3, "No tienes invitaciones pendientes.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5, "Cuando un compa\xF1ero te invite a una tutor\xEDa grupal, aparecer\xE1 aqu\xED.");
    \u0275\u0275elementEnd()();
  }
}
function StudentMyRequestsComponent_Conditional_23_Conditional_11_For_1_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 94);
  }
}
function StudentMyRequestsComponent_Conditional_23_Conditional_11_For_1_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 95);
  }
}
function StudentMyRequestsComponent_Conditional_23_Conditional_11_For_1_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 94);
  }
}
function StudentMyRequestsComponent_Conditional_23_Conditional_11_For_1_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 97);
  }
}
function StudentMyRequestsComponent_Conditional_23_Conditional_11_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 81)(1, "div", 20)(2, "div", 45)(3, "div", 82)(4, "h6", 83);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small", 50);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 84)(9, "div", 2);
    \u0275\u0275element(10, "i", 85);
    \u0275\u0275elementStart(11, "strong");
    \u0275\u0275text(12, "Solicitante:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementStart(14, "small", 50);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 2);
    \u0275\u0275element(17, "i", 86);
    \u0275\u0275elementStart(18, "strong");
    \u0275\u0275text(19, "Docente:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 2);
    \u0275\u0275element(22, "i", 87);
    \u0275\u0275elementStart(23, "strong");
    \u0275\u0275text(24, "Motivo:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 2);
    \u0275\u0275element(27, "i", 88);
    \u0275\u0275elementStart(28, "strong");
    \u0275\u0275text(29, "Fecha:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 84)(32, "span", 89);
    \u0275\u0275element(33, "i", 90);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 91);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "div", 92)(38, "button", 93);
    \u0275\u0275listener("click", function StudentMyRequestsComponent_Conditional_23_Conditional_11_For_1_Template_button_click_38_listener() {
      const inv_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.respondInvitation(inv_r16.participantId, true));
    });
    \u0275\u0275conditionalCreate(39, StudentMyRequestsComponent_Conditional_23_Conditional_11_For_1_Conditional_39_Template, 1, 0, "span", 94)(40, StudentMyRequestsComponent_Conditional_23_Conditional_11_For_1_Conditional_40_Template, 1, 0, "i", 95);
    \u0275\u0275text(41, " Aceptar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "button", 96);
    \u0275\u0275listener("click", function StudentMyRequestsComponent_Conditional_23_Conditional_11_For_1_Template_button_click_42_listener() {
      const inv_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.respondInvitation(inv_r16.participantId, false));
    });
    \u0275\u0275conditionalCreate(43, StudentMyRequestsComponent_Conditional_23_Conditional_11_For_1_Conditional_43_Template, 1, 0, "span", 94)(44, StudentMyRequestsComponent_Conditional_23_Conditional_11_For_1_Conditional_44_Template, 1, 0, "i", 97);
    \u0275\u0275text(45, " Rechazar ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const inv_r16 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(inv_r16.subjectName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Semestre ", inv_r16.semester);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", inv_r16.requesterName, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", inv_r16.requesterEmail, ")");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", inv_r16.teacherName, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", inv_r16.reason, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDate(inv_r16.requestDate), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", inv_r16.totalAccepted, "/", inv_r16.totalInvited, " aceptaron ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", inv_r16.sessionType, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.respondingInvId === inv_r16.participantId);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.respondingInvId === inv_r16.participantId && ctx_r0.respondingAccept ? 39 : 40);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.respondingInvId === inv_r16.participantId);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.respondingInvId === inv_r16.participantId && !ctx_r0.respondingAccept ? 43 : 44);
  }
}
function StudentMyRequestsComponent_Conditional_23_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, StudentMyRequestsComponent_Conditional_23_Conditional_11_For_1_Template, 46, 14, "div", 81, _forTrack2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r0.invitations);
  }
}
function StudentMyRequestsComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 73)(2, "h5", 74);
    \u0275\u0275element(3, "i", 75);
    \u0275\u0275text(4, " Invitaciones a Tutor\xEDas Grupales ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 39);
    \u0275\u0275listener("click", function StudentMyRequestsComponent_Conditional_23_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.loadInvitations());
    });
    \u0275\u0275element(6, "i", 76);
    \u0275\u0275text(7, " Actualizar ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 20);
    \u0275\u0275conditionalCreate(9, StudentMyRequestsComponent_Conditional_23_Conditional_9_Template, 4, 0, "div", 77)(10, StudentMyRequestsComponent_Conditional_23_Conditional_10_Template, 6, 0, "div", 78)(11, StudentMyRequestsComponent_Conditional_23_Conditional_11_Template, 2, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r0.loadingInvitations);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.loadingInvitations ? 9 : ctx_r0.invitations.length === 0 ? 10 : 11);
  }
}
var StudentMyRequestsComponent = class _StudentMyRequestsComponent {
  svc = inject(StudentMyRequestsService);
  catalogSvc = inject(StudentNewRequestService);
  invitationsSvc = inject(StudentInvitationsService);
  cdr = inject(ChangeDetectorRef);
  activeTab = "requests";
  loading = false;
  errorMessage = null;
  rows = [];
  totalCount = 0;
  page = 1;
  size = 10;
  totalPages = 1;
  // filtros reales del controller
  filters = {
    periodId: null,
    statusId: null,
    sessionTypeId: null,
    subjectId: null,
    search: ""
  };
  // ✅ Estados reales de tu BD:
  // 1 Pendiente, 2 Aceptada, 3 Rechazada, 4 Cancelada, 5 Finalizada
  statusOptions = [
    { value: null, label: "Todos" },
    { value: 1, label: "Pendiente" },
    { value: 2, label: "Aceptada" },
    { value: 3, label: "Rechazada" },
    { value: 4, label: "Cancelada" },
    { value: 5, label: "Finalizada" }
  ];
  sessionTypeOptions = [
    { value: null, label: "Todos" },
    { value: 1, label: "Individual" },
    { value: 2, label: "Grupal" }
  ];
  subjectOptions = [
    { value: null, label: "Todas" }
  ];
  // ✅ Chips alineados a tu BD (sin "Programadas/Completadas")
  summaryChips = [
    { label: "Pendientes", value: 0 },
    { label: "Aceptadas", value: 0 },
    { label: "Canceladas", value: 0 },
    { label: "Finalizadas", value: 0 }
  ];
  ngAfterViewInit() {
    Promise.resolve().then(() => {
      this.loadSubjects();
      this.load();
      this.loadSummary();
      this.loadInvitations();
    });
  }
  switchTab(tab) {
    this.activeTab = tab;
    if (tab === "invitations" && this.invitations.length === 0 && !this.loadingInvitations) {
      this.loadInvitations();
    }
  }
  applyFilters() {
    this.page = 1;
    this.load();
    this.loadSummary();
  }
  clearFilters() {
    this.filters = { periodId: null, statusId: null, sessionTypeId: null, subjectId: null, search: "" };
    this.applyFilters();
  }
  goTo(p) {
    this.page = p;
    this.load();
  }
  loadSubjects() {
    this.catalogSvc.getSubjects().subscribe({
      next: (subjects) => {
        this.subjectOptions = [
          { value: null, label: "Todas" },
          ...subjects.map((s) => ({ value: s.subjectId, label: s.subjectName }))
        ];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error loading subjects:", err);
      }
    });
  }
  load() {
    this.loading = true;
    this.errorMessage = null;
    this.svc.getMyRequests({
      periodId: this.filters.periodId ?? void 0,
      statusId: this.filters.statusId ?? void 0,
      sessionTypeId: this.filters.sessionTypeId ?? void 0,
      subjectId: this.filters.subjectId ?? void 0,
      search: (this.filters.search ?? "").trim() || void 0,
      page: this.page,
      size: this.size
    }).subscribe({
      next: (res) => {
        this.rows = res.items ?? [];
        this.totalCount = res.totalCount ?? 0;
        this.page = res.page ?? this.page;
        this.size = res.size ?? this.size;
        this.totalPages = Math.max(1, Math.ceil(this.totalCount / this.size));
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err?.message || "Error al cargar solicitudes";
        this.rows = [];
        this.totalCount = 0;
        this.totalPages = 1;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  loadSummary() {
    this.svc.getMyRequestsSummary(this.filters.periodId ?? void 0).subscribe({
      next: (data) => {
        const map = /* @__PURE__ */ new Map();
        for (const s of data ?? [])
          map.set(Number(s.statusId), Number(s.total ?? 0));
        this.summaryChips = [
          { label: "Pendientes", value: map.get(1) ?? 0 },
          { label: "Aceptadas", value: map.get(2) ?? 0 },
          { label: "Canceladas", value: map.get(4) ?? 0 },
          { label: "Finalizadas", value: map.get(5) ?? 0 }
        ];
        this.cdr.detectChanges();
      },
      error: () => {
      }
    });
  }
  // Modal states
  showDetailModal = false;
  showCancelModal = false;
  selectedRequest = null;
  cancelling = false;
  successMessage = null;
  viewDetail(row) {
    this.selectedRequest = row;
    this.showDetailModal = true;
  }
  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedRequest = null;
  }
  confirmCancel(row) {
    this.selectedRequest = row;
    this.showCancelModal = true;
  }
  closeCancelModal() {
    this.showCancelModal = false;
    this.selectedRequest = null;
  }
  canCancel(status) {
    const s = this.norm(status);
    return s.includes("pend") || s.includes("acept");
  }
  doCancelRequest() {
    if (!this.selectedRequest)
      return;
    this.cancelling = true;
    this.errorMessage = null;
    this.svc.cancelRequest(this.selectedRequest.requestId).subscribe({
      next: (response) => {
        this.cancelling = false;
        this.closeCancelModal();
        this.successMessage = response.message || "Solicitud cancelada exitosamente";
        this.load();
        this.loadSummary();
        this.cdr.detectChanges();
        setTimeout(() => {
          this.successMessage = null;
          this.cdr.detectChanges();
        }, 5e3);
      },
      error: (err) => {
        this.cancelling = false;
        this.closeCancelModal();
        this.errorMessage = err?.message || "Error al cancelar la solicitud";
        this.cdr.detectChanges();
      }
    });
  }
  formatDate(dt) {
    const d = new Date(dt);
    return isNaN(d.getTime()) ? dt : d.toLocaleDateString();
  }
  formatTime(dt) {
    const d = new Date(dt);
    return isNaN(d.getTime()) ? "" : d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  // badges por estado (tu BD real)
  norm(s) {
    return (s || "").toLowerCase();
  }
  isPending(status) {
    return this.norm(status).includes("pend");
  }
  isAccepted(status) {
    return this.norm(status).includes("acept");
  }
  isRejected(status) {
    return this.norm(status).includes("rech");
  }
  isCancelled(status) {
    return this.norm(status).includes("cancel");
  }
  isFinished(status) {
    return this.norm(status).includes("final");
  }
  // ==================== INVITACIONES GRUPALES ====================
  invitations = [];
  loadingInvitations = false;
  respondingInvId = null;
  respondingAccept = false;
  loadInvitations() {
    this.loadingInvitations = true;
    this.invitationsSvc.getMyInvitations().subscribe({
      next: (data) => {
        this.invitations = data ?? [];
        this.loadingInvitations = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.invitations = [];
        this.loadingInvitations = false;
        this.errorMessage = err?.message || "Error al cargar invitaciones";
        this.cdr.detectChanges();
      }
    });
  }
  respondInvitation(participantId, accept) {
    this.respondingInvId = participantId;
    this.respondingAccept = accept;
    this.errorMessage = null;
    this.invitationsSvc.respondInvitation(participantId, accept).subscribe({
      next: (response) => {
        this.respondingInvId = null;
        this.successMessage = response.message || (accept ? "Invitaci\xF3n aceptada" : "Invitaci\xF3n rechazada");
        this.loadInvitations();
        this.cdr.detectChanges();
        setTimeout(() => {
          this.successMessage = null;
          this.cdr.detectChanges();
        }, 5e3);
      },
      error: (err) => {
        this.respondingInvId = null;
        this.errorMessage = err?.message || "Error al responder la invitaci\xF3n";
        this.cdr.detectChanges();
      }
    });
  }
  static \u0275fac = function StudentMyRequestsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StudentMyRequestsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StudentMyRequestsComponent, selectors: [["app-student-my-requests"]], decls: 24, vars: 13, consts: [[1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-start", "flex-wrap", "gap-2", "mb-3"], [1, "mb-1"], [1, "text-muted", "mb-0"], ["routerLink", "/student/new-request", 1, "btn", "btn-success"], [1, "bi", "bi-plus-lg", "me-2"], [1, "nav", "nav-tabs", "mb-3"], [1, "nav-item"], [1, "nav-link", 3, "click"], [1, "bi", "bi-card-list", "me-2"], [1, "bi", "bi-people", "me-2"], [1, "badge", "bg-danger", "ms-1"], ["role", "alert", 1, "alert", "alert-danger", "alert-dismissible", "fade", "show"], ["role", "alert", 1, "alert", "alert-success", "alert-dismissible", "fade", "show"], [1, "card", "border-0", "shadow-sm"], [1, "bi", "bi-exclamation-triangle-fill", "me-2"], ["type", "button", 1, "btn-close", 3, "click"], [1, "bi", "bi-check-circle-fill", "me-2"], ["tabindex", "-1", 1, "modal", "fade", "show", "d-block", 2, "background", "rgba(0,0,0,0.5)"], [1, "card", "border-0", "shadow-sm", "mb-3"], [1, "card-body"], [1, "row", "g-2", "align-items-end"], [1, "col-12", "col-lg-4"], [1, "form-label", "mb-1"], ["placeholder", "Buscar por motivo o asignatura", 1, "form-control", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "col-6", "col-lg-2"], [1, "form-select", 3, "ngModelChange", "change", "ngModel"], [3, "ngValue"], [1, "col-6", "col-lg-2", "d-flex", "gap-2"], [1, "btn", "btn-outline-secondary", "w-100", 3, "click"], [1, "row", "g-2", "mb-3"], [1, "col-6", "col-lg-3"], [1, "table-responsive"], [1, "table", "align-middle", "mb-0"], [1, "table-light"], [1, "text-end"], [1, "d-flex", "justify-content-between", "align-items-center", "mt-3", "flex-wrap", "gap-2"], [1, "text-muted", "small"], [1, "d-flex", "gap-2"], [1, "btn", "btn-outline-secondary", "btn-sm", 3, "click", "disabled"], [1, "modal-dialog", "modal-dialog-centered"], [1, "modal-content"], [1, "modal-header"], [1, "modal-title"], [1, "modal-body"], [1, "row", "g-3"], [1, "col-6"], [1, "form-label", "text-muted", "small", "mb-0"], [1, "fw-semibold"], [1, "col-12"], [1, "text-muted"], [1, "badge", "rounded-pill"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn-close", 3, "click", "disabled"], [1, "text-muted", "small", "mb-0"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-danger", 3, "click", "disabled"], [1, "spinner-border", "spinner-border-sm", "me-2"], [1, "chip-box", "p-3", "bg-white", "shadow-sm", "border", "rounded-3", "d-flex", "justify-content-between"], [1, "fw-bold", "fs-4"], [1, "bi", "bi-dot", "fs-1", "text-success", "opacity-50"], ["colspan", "7", 1, "text-center", "py-5", "text-muted"], [1, "badge", "rounded-pill", "bg-light", "text-dark", "border"], [1, "dropdown"], ["type", "button", "data-bs-toggle", "dropdown", "aria-expanded", "false", 1, "btn", "btn-sm", "btn-outline-secondary"], [1, "bi", "bi-three-dots"], [1, "dropdown-menu", "dropdown-menu-end"], ["type", "button", 1, "dropdown-item", 3, "click"], [1, "bi", "bi-eye", "me-2"], [1, "dropdown-divider"], ["type", "button", 1, "dropdown-item", "text-danger", 3, "click"], [1, "bi", "bi-x-circle", "me-2"], [1, "card-header", "bg-white", "border-0", "py-3", "d-flex", "justify-content-between", "align-items-center"], [1, "mb-0"], [1, "bi", "bi-people", "me-2", "text-success"], [1, "bi", "bi-arrow-clockwise", "me-1"], [1, "text-center", "py-5"], [1, "text-center", "py-5", "text-muted"], ["role", "status", 1, "spinner-border", "text-success", "mb-3"], [1, "bi", "bi-inbox", "display-4", "mb-3", "d-block", "opacity-50"], [1, "card", "mb-3", "border"], [1, "col-12", "col-md-8"], [1, "fw-bold", "mb-1"], [1, "mt-2"], [1, "bi", "bi-person-fill", "me-1", "text-muted"], [1, "bi", "bi-mortarboard", "me-1", "text-muted"], [1, "bi", "bi-chat-text", "me-1", "text-muted"], [1, "bi", "bi-calendar", "me-1", "text-muted"], [1, "badge", "bg-light", "text-dark", "border", "me-2"], [1, "bi", "bi-people", "me-1"], [1, "badge", "bg-success", "text-white"], [1, "col-12", "col-md-4", "d-flex", "flex-column", "justify-content-center", "gap-2"], [1, "btn", "btn-success", 3, "click", "disabled"], [1, "spinner-border", "spinner-border-sm", "me-1"], [1, "bi", "bi-check-lg", "me-1"], [1, "btn", "btn-outline-danger", 3, "click", "disabled"], [1, "bi", "bi-x-lg", "me-1"]], template: function StudentMyRequestsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h3", 2);
      \u0275\u0275text(4, "Mis Solicitudes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Gestiona y realiza seguimiento a tus solicitudes de refuerzo acad\xE9mico.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "a", 4);
      \u0275\u0275element(8, "i", 5);
      \u0275\u0275text(9, " Nueva Solicitud ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "ul", 6)(11, "li", 7)(12, "button", 8);
      \u0275\u0275listener("click", function StudentMyRequestsComponent_Template_button_click_12_listener() {
        return ctx.switchTab("requests");
      });
      \u0275\u0275element(13, "i", 9);
      \u0275\u0275text(14, "Mis Solicitudes ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "li", 7)(16, "button", 8);
      \u0275\u0275listener("click", function StudentMyRequestsComponent_Template_button_click_16_listener() {
        return ctx.switchTab("invitations");
      });
      \u0275\u0275element(17, "i", 10);
      \u0275\u0275text(18, "Invitaciones Grupales ");
      \u0275\u0275conditionalCreate(19, StudentMyRequestsComponent_Conditional_19_Template, 2, 1, "span", 11);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(20, StudentMyRequestsComponent_Conditional_20_Template, 4, 1, "div", 12);
      \u0275\u0275conditionalCreate(21, StudentMyRequestsComponent_Conditional_21_Template, 4, 1, "div", 13);
      \u0275\u0275conditionalCreate(22, StudentMyRequestsComponent_Conditional_22_Template, 64, 12);
      \u0275\u0275conditionalCreate(23, StudentMyRequestsComponent_Conditional_23_Template, 12, 2, "div", 14);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(12);
      \u0275\u0275classProp("active", ctx.activeTab === "requests")("text-success", ctx.activeTab !== "requests");
      \u0275\u0275advance(4);
      \u0275\u0275classProp("active", ctx.activeTab === "invitations")("text-success", ctx.activeTab !== "invitations");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.invitations.length > 0 ? 19 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage ? 20 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.successMessage ? 21 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab === "requests" ? 22 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab === "invitations" ? 23 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, RouterModule, RouterLink], styles: ["\n\n.chip-box[_ngcontent-%COMP%] {\n  min-height: 72px;\n}\nth[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  font-size: .85rem;\n  letter-spacing: .02em;\n}\ntd[_ngcontent-%COMP%] {\n  vertical-align: middle;\n}\n.nav-link[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n/*# sourceMappingURL=student-my-requests.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StudentMyRequestsComponent, [{
    type: Component,
    args: [{ selector: "app-student-my-requests", standalone: true, imports: [CommonModule, FormsModule, RouterModule], template: `\r
    <div class="container-fluid">\r
\r
      <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">\r
        <div>\r
          <h3 class="mb-1">Mis Solicitudes</h3>\r
          <p class="text-muted mb-0">Gestiona y realiza seguimiento a tus solicitudes de refuerzo acad\xE9mico.</p>\r
        </div>\r
\r
        <a class="btn btn-success" routerLink="/student/new-request">\r
          <i class="bi bi-plus-lg me-2"></i> Nueva Solicitud\r
        </a>\r
      </div>\r
\r
      <!-- Tabs -->\r
      <ul class="nav nav-tabs mb-3">\r
        <li class="nav-item">\r
          <button class="nav-link" [class.active]="activeTab === 'requests'" [class.text-success]="activeTab !== 'requests'" (click)="switchTab('requests')">\r
            <i class="bi bi-card-list me-2"></i>Mis Solicitudes\r
          </button>\r
        </li>\r
        <li class="nav-item">\r
          <button class="nav-link" [class.active]="activeTab === 'invitations'" [class.text-success]="activeTab !== 'invitations'" (click)="switchTab('invitations')">\r
            <i class="bi bi-people me-2"></i>Invitaciones Grupales\r
            @if (invitations.length > 0) {\r
              <span class="badge bg-danger ms-1">{{ invitations.length }}</span>\r
            }\r
          </button>\r
        </li>\r
      </ul>\r
\r
      @if (errorMessage) {\r
        <div class="alert alert-danger alert-dismissible fade show" role="alert">\r
          <i class="bi bi-exclamation-triangle-fill me-2"></i>\r
          {{ errorMessage }}\r
          <button type="button" class="btn-close" (click)="errorMessage = null"></button>\r
        </div>\r
      }\r
\r
      @if (successMessage) {\r
        <div class="alert alert-success alert-dismissible fade show" role="alert">\r
          <i class="bi bi-check-circle-fill me-2"></i>\r
          {{ successMessage }}\r
          <button type="button" class="btn-close" (click)="successMessage = null"></button>\r
        </div>\r
      }\r
\r
      <!-- Tab: Mis Solicitudes -->\r
      @if (activeTab === 'requests') {\r
\r
      <!-- Modal Ver Detalle -->\r
      @if (showDetailModal && selectedRequest) {\r
        <div class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5);">\r
          <div class="modal-dialog modal-dialog-centered">\r
            <div class="modal-content">\r
              <div class="modal-header">\r
                <h5 class="modal-title">Detalle de Solicitud #{{ selectedRequest.requestId }}</h5>\r
                <button type="button" class="btn-close" (click)="closeDetailModal()"></button>\r
              </div>\r
              <div class="modal-body">\r
                <div class="row g-3">\r
                  <div class="col-6">\r
                    <label class="form-label text-muted small mb-0">Fecha</label>\r
                    <div class="fw-semibold">{{ formatDate(selectedRequest.requestDateTime) }}</div>\r
                  </div>\r
                  <div class="col-6">\r
                    <label class="form-label text-muted small mb-0">Hora</label>\r
                    <div class="fw-semibold">{{ formatTime(selectedRequest.requestDateTime) }}</div>\r
                  </div>\r
                  <div class="col-12">\r
                    <label class="form-label text-muted small mb-0">Asignatura</label>\r
                    <div class="fw-semibold">{{ selectedRequest.subjectName }}</div>\r
                    <small class="text-muted">{{ selectedRequest.subjectCode }}</small>\r
                  </div>\r
                  <div class="col-12">\r
                    <label class="form-label text-muted small mb-0">Motivo</label>\r
                    <div class="fw-semibold">{{ selectedRequest.topic }}</div>\r
                  </div>\r
                  <div class="col-6">\r
                    <label class="form-label text-muted small mb-0">Docente</label>\r
                    <div class="fw-semibold">{{ selectedRequest.teacherName }}</div>\r
                  </div>\r
                  <div class="col-6">\r
                    <label class="form-label text-muted small mb-0">Tipo</label>\r
                    <div class="fw-semibold">{{ selectedRequest.sessionType }}</div>\r
                  </div>\r
                  <div class="col-12">\r
                    <label class="form-label text-muted small mb-0">Estado</label>\r
                    <div>\r
                      <span class="badge rounded-pill"\r
                            [class.bg-warning]="isPending(selectedRequest.status)"\r
                            [class.text-dark]="isPending(selectedRequest.status)"\r
                            [class.bg-success]="isAccepted(selectedRequest.status)"\r
                            [class.bg-danger]="isRejected(selectedRequest.status)"\r
                            [class.bg-secondary]="isCancelled(selectedRequest.status)"\r
                            [class.bg-dark]="isFinished(selectedRequest.status)">\r
                        {{ selectedRequest.status }}\r
                      </span>\r
                    </div>\r
                  </div>\r
                </div>\r
              </div>\r
              <div class="modal-footer">\r
                <button type="button" class="btn btn-secondary" (click)="closeDetailModal()">Cerrar</button>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      }\r
\r
      <!-- Modal Confirmar Cancelaci\xF3n -->\r
      @if (showCancelModal && selectedRequest) {\r
        <div class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5);">\r
          <div class="modal-dialog modal-dialog-centered">\r
            <div class="modal-content">\r
              <div class="modal-header">\r
                <h5 class="modal-title">Confirmar Cancelaci\xF3n</h5>\r
                <button type="button" class="btn-close" (click)="closeCancelModal()" [disabled]="cancelling"></button>\r
              </div>\r
              <div class="modal-body">\r
                <p>\xBFEst\xE1s seguro de que deseas cancelar la solicitud <strong>#{{ selectedRequest.requestId }}</strong>?</p>\r
                <p class="text-muted small mb-0">Esta acci\xF3n no se puede deshacer.</p>\r
              </div>\r
              <div class="modal-footer">\r
                <button type="button" class="btn btn-secondary" (click)="closeCancelModal()" [disabled]="cancelling">\r
                  No, volver\r
                </button>\r
                <button type="button" class="btn btn-danger" (click)="doCancelRequest()" [disabled]="cancelling">\r
                  @if (cancelling) {\r
                    <span class="spinner-border spinner-border-sm me-2"></span>\r
                    Cancelando...\r
                  } @else {\r
                    S\xED, cancelar\r
                  }\r
                </button>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      }\r
\r
      <!-- Filtros -->\r
      <div class="card border-0 shadow-sm mb-3">\r
        <div class="card-body">\r
          <div class="row g-2 align-items-end">\r
\r
            <div class="col-12 col-lg-4">\r
              <label class="form-label mb-1">Buscar</label>\r
              <input class="form-control"\r
                     [(ngModel)]="filters.search"\r
                     placeholder="Buscar por motivo o asignatura"\r
                     (keyup.enter)="applyFilters()"/>\r
            </div>\r
\r
            <div class="col-6 col-lg-2">\r
              <label class="form-label mb-1">Estado</label>\r
              <select class="form-select" [(ngModel)]="filters.statusId" (change)="applyFilters()">\r
                @for (o of statusOptions; track o.label) {\r
                  <option [ngValue]="o.value">{{ o.label }}</option>\r
                }\r
              </select>\r
            </div>\r
\r
            <div class="col-6 col-lg-2">\r
              <label class="form-label mb-1">Tipo</label>\r
              <select class="form-select" [(ngModel)]="filters.sessionTypeId" (change)="applyFilters()">\r
                @for (o of sessionTypeOptions; track o.label) {\r
                  <option [ngValue]="o.value">{{ o.label }}</option>\r
                }\r
              </select>\r
            </div>\r
\r
            <div class="col-6 col-lg-2">\r
              <label class="form-label mb-1">Asignatura</label>\r
              <select class="form-select" [(ngModel)]="filters.subjectId" (change)="applyFilters()">\r
                @for (o of subjectOptions; track o.label) {\r
                  <option [ngValue]="o.value">{{ o.label }}</option>\r
                }\r
              </select>\r
            </div>\r
\r
            <div class="col-6 col-lg-2 d-flex gap-2">\r
              <button class="btn btn-outline-secondary w-100" (click)="clearFilters()">\r
                Limpiar\r
              </button>\r
            </div>\r
\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Chips resumen (se alimenta de /summary) -->\r
      <div class="row g-2 mb-3">\r
        @for (chip of summaryChips; track chip.label) {\r
          <div class="col-6 col-lg-3">\r
            <div class="chip-box p-3 bg-white shadow-sm border rounded-3 d-flex justify-content-between">\r
              <div>\r
                <div class="text-muted small">{{ chip.label }}</div>\r
                <div class="fw-bold fs-4">{{ chip.value }}</div>\r
              </div>\r
              <i class="bi bi-dot fs-1 text-success opacity-50"></i>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
\r
      <!-- Tabla -->\r
      <div class="card border-0 shadow-sm">\r
        <div class="card-body">\r
\r
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
                <th class="text-end">ACCIONES</th>\r
              </tr>\r
              </thead>\r
\r
              <tbody>\r
                @if (rows.length === 0) {\r
                  <tr>\r
                    <td colspan="7" class="text-center py-5 text-muted">\r
                      Sin solicitudes para mostrar.\r
                    </td>\r
                  </tr>\r
                } @else {\r
                  @for (r of rows; track r.requestId) {\r
                    <tr>\r
                      <td class="fw-semibold">\r
                        {{ formatDate(r.requestDateTime) }}\r
                        <div class="text-muted small">{{ formatTime(r.requestDateTime) }}</div>\r
                      </td>\r
\r
                      <td>\r
                        <div class="fw-semibold">{{ r.subjectName }}</div>\r
                        <div class="text-muted small">{{ r.subjectCode }}</div>\r
                      </td>\r
\r
                      <td>{{ r.topic }}</td>\r
                      <td>{{ r.teacherName }}</td>\r
\r
                      <td>\r
                      <span class="badge rounded-pill bg-light text-dark border">\r
                        {{ r.sessionType }}\r
                      </span>\r
                      </td>\r
\r
                      <td>\r
                      <span class="badge rounded-pill"\r
                            [class.bg-warning]="isPending(r.status)"\r
                            [class.text-dark]="isPending(r.status)"\r
                            [class.bg-success]="isAccepted(r.status)"\r
                            [class.bg-danger]="isRejected(r.status)"\r
                            [class.bg-secondary]="isCancelled(r.status)"\r
                            [class.bg-dark]="isFinished(r.status)">\r
                        {{ r.status }}\r
                      </span>\r
                      </td>\r
\r
                      <td class="text-end">\r
                        <div class="dropdown">\r
                          <button class="btn btn-sm btn-outline-secondary" type="button"\r
                                  data-bs-toggle="dropdown" aria-expanded="false">\r
                            <i class="bi bi-three-dots"></i>\r
                          </button>\r
                          <ul class="dropdown-menu dropdown-menu-end">\r
                            <li>\r
                              <button class="dropdown-item" type="button" (click)="viewDetail(r)">\r
                                <i class="bi bi-eye me-2"></i>Ver detalle\r
                              </button>\r
                            </li>\r
                            @if (canCancel(r.status)) {\r
                              <li><hr class="dropdown-divider"></li>\r
                              <li>\r
                                <button class="dropdown-item text-danger" type="button" (click)="confirmCancel(r)">\r
                                  <i class="bi bi-x-circle me-2"></i>Cancelar solicitud\r
                                </button>\r
                              </li>\r
                            }\r
                          </ul>\r
                        </div>\r
                      </td>\r
                    </tr>\r
                  }\r
                }\r
              </tbody>\r
            </table>\r
          </div>\r
\r
          <!-- Footer paginaci\xF3n -->\r
          <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">\r
            <div class="text-muted small">\r
              P\xE1gina {{ page }} de {{ totalPages }} \xB7 Total: {{ totalCount }}\r
            </div>\r
\r
            <div class="d-flex gap-2">\r
              <button class="btn btn-outline-secondary btn-sm"\r
                      [disabled]="page <= 1 || loading"\r
                      (click)="goTo(page - 1)">\r
                Anterior\r
              </button>\r
              <button class="btn btn-outline-secondary btn-sm"\r
                      [disabled]="page >= totalPages || loading"\r
                      (click)="goTo(page + 1)">\r
                Siguiente\r
              </button>\r
            </div>\r
          </div>\r
\r
        </div>\r
      </div>\r
\r
      } <!-- fin tab requests -->\r
\r
      <!-- Tab: Invitaciones Grupales -->\r
      @if (activeTab === 'invitations') {\r
        <div class="card border-0 shadow-sm">\r
          <div class="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">\r
            <h5 class="mb-0">\r
              <i class="bi bi-people me-2 text-success"></i>\r
              Invitaciones a Tutor\xEDas Grupales\r
            </h5>\r
            <button class="btn btn-outline-secondary btn-sm" (click)="loadInvitations()" [disabled]="loadingInvitations">\r
              <i class="bi bi-arrow-clockwise me-1"></i> Actualizar\r
            </button>\r
          </div>\r
          <div class="card-body">\r
\r
            @if (loadingInvitations) {\r
              <div class="text-center py-5">\r
                <div class="spinner-border text-success mb-3" role="status"></div>\r
                <p class="text-muted mb-0">Cargando invitaciones...</p>\r
              </div>\r
            } @else if (invitations.length === 0) {\r
              <div class="text-center py-5 text-muted">\r
                <i class="bi bi-inbox display-4 mb-3 d-block opacity-50"></i>\r
                <p class="mb-0">No tienes invitaciones pendientes.</p>\r
                <small>Cuando un compa\xF1ero te invite a una tutor\xEDa grupal, aparecer\xE1 aqu\xED.</small>\r
              </div>\r
            } @else {\r
              @for (inv of invitations; track inv.participantId) {\r
                <div class="card mb-3 border">\r
                  <div class="card-body">\r
                    <div class="row g-3">\r
                      <div class="col-12 col-md-8">\r
                        <h6 class="fw-bold mb-1">{{ inv.subjectName }}</h6>\r
                        <small class="text-muted">Semestre {{ inv.semester }}</small>\r
\r
                        <div class="mt-2">\r
                          <div class="mb-1">\r
                            <i class="bi bi-person-fill me-1 text-muted"></i>\r
                            <strong>Solicitante:</strong> {{ inv.requesterName }}\r
                            <small class="text-muted">({{ inv.requesterEmail }})</small>\r
                          </div>\r
                          <div class="mb-1">\r
                            <i class="bi bi-mortarboard me-1 text-muted"></i>\r
                            <strong>Docente:</strong> {{ inv.teacherName }}\r
                          </div>\r
                          <div class="mb-1">\r
                            <i class="bi bi-chat-text me-1 text-muted"></i>\r
                            <strong>Motivo:</strong> {{ inv.reason }}\r
                          </div>\r
                          <div class="mb-1">\r
                            <i class="bi bi-calendar me-1 text-muted"></i>\r
                            <strong>Fecha:</strong> {{ formatDate(inv.requestDate) }}\r
                          </div>\r
                        </div>\r
\r
                        <div class="mt-2">\r
                          <span class="badge bg-light text-dark border me-2">\r
                            <i class="bi bi-people me-1"></i> {{ inv.totalAccepted }}/{{ inv.totalInvited }} aceptaron\r
                          </span>\r
                          <span class="badge bg-success text-white">\r
                            {{ inv.sessionType }}\r
                          </span>\r
                        </div>\r
                      </div>\r
\r
                      <div class="col-12 col-md-4 d-flex flex-column justify-content-center gap-2">\r
                        <button class="btn btn-success"\r
                                (click)="respondInvitation(inv.participantId, true)"\r
                                [disabled]="respondingInvId === inv.participantId">\r
                          @if (respondingInvId === inv.participantId && respondingAccept) {\r
                            <span class="spinner-border spinner-border-sm me-1"></span>\r
                          } @else {\r
                            <i class="bi bi-check-lg me-1"></i>\r
                          }\r
                          Aceptar\r
                        </button>\r
                        <button class="btn btn-outline-danger"\r
                                (click)="respondInvitation(inv.participantId, false)"\r
                                [disabled]="respondingInvId === inv.participantId">\r
                          @if (respondingInvId === inv.participantId && !respondingAccept) {\r
                            <span class="spinner-border spinner-border-sm me-1"></span>\r
                          } @else {\r
                            <i class="bi bi-x-lg me-1"></i>\r
                          }\r
                          Rechazar\r
                        </button>\r
                      </div>\r
                    </div>\r
                  </div>\r
                </div>\r
              }\r
            }\r
\r
          </div>\r
        </div>\r
      } <!-- fin tab invitations -->\r
\r
    </div>\r
  `, styles: ["/* src/app/components/student/student-my-requests/student-my-requests.component.css */\n.chip-box {\n  min-height: 72px;\n}\nth {\n  white-space: nowrap;\n  font-size: .85rem;\n  letter-spacing: .02em;\n}\ntd {\n  vertical-align: middle;\n}\n.nav-link {\n  cursor: pointer;\n}\n/*# sourceMappingURL=student-my-requests.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StudentMyRequestsComponent, { className: "StudentMyRequestsComponent", filePath: "app/components/student/student-my-requests/student-my-requests.component.ts", lineNumber: 24 });
})();
export {
  StudentMyRequestsComponent
};
//# sourceMappingURL=chunk-4D7BJMOY.js.map
