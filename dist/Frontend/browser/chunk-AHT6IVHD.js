import {
  AuthService
} from "./chunk-ZOQXTRIP.js";
import "./chunk-MXF362TW.js";
import {
  HttpClient,
  HttpParams
} from "./chunk-K6SHIZGP.js";
import {
  ChangeDetectorRef,
  CommonModule,
  Component,
  Injectable,
  environment,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-OENL2SFL.js";

// src/app/services/workAreaManager/work-area-manager-in-person-requests/wam-in-person-requests.service.ts
var WamInPersonRequestsService = class _WamInPersonRequestsService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;
  getInPersonReinforcements(userId) {
    let params = new HttpParams();
    params = params.set("userId", userId);
    return this.http.get(`${this.apiUrl}/reinforcement/on-site-reinforcements/list-areas-ofsite`, { params });
  }
  static \u0275fac = function WamInPersonRequestsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WamInPersonRequestsService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _WamInPersonRequestsService, factory: _WamInPersonRequestsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WamInPersonRequestsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/components/workAreaManager/work-area-manager-management-of-in-person-requests/work-area-manager-management-of-in-person-requests.component.ts
var _forTrack0 = ($index, $item) => $item.pidrefuerzopresencial;
function WorkAreaManagerManagementOfInPersonRequestsComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 4);
    \u0275\u0275domElement(1, "i", 8);
    \u0275\u0275text(2);
    \u0275\u0275domElementStart(3, "button", 9);
    \u0275\u0275domListener("click", function WorkAreaManagerManagementOfInPersonRequestsComponent_Conditional_7_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.errorMessage = null);
    });
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.errorMessage, " ");
  }
}
function WorkAreaManagerManagementOfInPersonRequestsComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 5)(1, "div", 10)(2, "span", 11);
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275domElementEnd()()();
  }
}
function WorkAreaManagerManagementOfInPersonRequestsComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 6);
    \u0275\u0275domElement(1, "i", 12);
    \u0275\u0275domElementStart(2, "p", 13);
    \u0275\u0275text(3, "No se encontraron solicitudes presenciales para tu \xE1rea.");
    \u0275\u0275domElementEnd()();
  }
}
function WorkAreaManagerManagementOfInPersonRequestsComponent_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 14)(1, "article", 15)(2, "div", 16)(3, "div", 17)(4, "span");
    \u0275\u0275domElement(5, "i", 18);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "small", 19);
    \u0275\u0275domElement(8, "i", 20);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(10, "h6", 21);
    \u0275\u0275domElement(11, "i", 22);
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "div", 23);
    \u0275\u0275domElement(14, "i", 24);
    \u0275\u0275domElementStart(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(17, "div", 25)(18, "small", 26);
    \u0275\u0275domElement(19, "i", 27);
    \u0275\u0275text(20, "Participantes ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(21, "small", 28);
    \u0275\u0275text(22);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(23, "div", 29)(24, "small", 19);
    \u0275\u0275domElement(25, "i", 30);
    \u0275\u0275text(26);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(27, "small", 19);
    \u0275\u0275domElement(28, "i", 31);
    \u0275\u0275text(29);
    \u0275\u0275domElementEnd()()()()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275classMap(\u0275\u0275interpolate1("badge rounded-pill ", ctx_r1.getSessionBadgeClass(item_r3.ptiposesion), " px-3 py-2"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", item_r3.ptiposesion, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", item_r3.pfechaprogramadarefuerzo, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", item_r3.pdocente, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", item_r3.phorainicio, " - ", item_r3.phorariofin);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2(" ", item_r3.participantesconfirmados, " confirmados / ", item_r3.pparticipantesesperados, " invitados ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Ref. #", item_r3.pidrefuerzoprogramado, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Presencial #", item_r3.pidrefuerzopresencial, " ");
  }
}
function WorkAreaManagerManagementOfInPersonRequestsComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 7);
    \u0275\u0275repeaterCreate(1, WorkAreaManagerManagementOfInPersonRequestsComponent_Conditional_10_For_2_Template, 30, 12, "div", 14, _forTrack0);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.reinforcements);
  }
}
var WorkAreaManagerManagementOfInPersonRequestsComponent = class _WorkAreaManagerManagementOfInPersonRequestsComponent {
  inPersonService = inject(WamInPersonRequestsService);
  cdr = inject(ChangeDetectorRef);
  authService = inject(AuthService);
  reinforcements = [];
  isLoading = true;
  errorMessage = null;
  ngOnInit() {
    this.loadReinforcements();
  }
  loadReinforcements() {
    this.isLoading = true;
    this.errorMessage = null;
    const userId = this.authService.currentUser()?.userId;
    if (!userId)
      return;
    this.inPersonService.getInPersonReinforcements(userId).subscribe({
      next: (data) => {
        this.reinforcements = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = "No se pudieron cargar las solicitudes presenciales.";
        this.isLoading = false;
        this.cdr.detectChanges();
        console.error("Error al cargar refuerzos presenciales:", err);
      }
    });
  }
  getSessionBadgeClass(tipo) {
    return tipo === "Grupal" ? "bg-primary-subtle text-primary" : "bg-info-subtle text-info";
  }
  static \u0275fac = function WorkAreaManagerManagementOfInPersonRequestsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WorkAreaManagerManagementOfInPersonRequestsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WorkAreaManagerManagementOfInPersonRequestsComponent, selectors: [["app-work-area-manager-management-of-in-person-requests"]], decls: 11, vars: 4, consts: [[1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], [1, "mb-1"], [1, "text-muted", "mb-0"], ["role", "alert", 1, "alert", "alert-danger", "alert-dismissible", "fade", "show"], [1, "d-flex", "justify-content-center", "align-items-center", "py-5"], [1, "text-center", "py-5"], [1, "row", "g-3"], [1, "bi", "bi-exclamation-triangle-fill", "me-2"], ["type", "button", "aria-label", "Cerrar", 1, "btn-close", 3, "click"], ["role", "status", 1, "spinner-border", "text-success"], [1, "visually-hidden"], [1, "bi", "bi-inbox", "display-1", "text-muted"], [1, "text-muted", "mt-3", "fs-5"], [1, "col-12", "col-md-6", "col-xl-4"], [1, "card", "border-0", "shadow-sm", "h-100", "reinforcement-card"], [1, "card-body", "p-4"], [1, "d-flex", "justify-content-between", "align-items-start", "mb-3"], [1, "bi", "bi-people-fill", "me-1"], [1, "text-muted"], [1, "bi", "bi-calendar-event", "me-1"], [1, "fw-bold", "text-dark", "mb-2"], [1, "bi", "bi-person-badge", "me-2", "text-success"], [1, "d-flex", "align-items-center", "text-muted", "mb-3"], [1, "bi", "bi-clock", "me-2"], [1, "d-flex", "align-items-center", "justify-content-between", "mb-0"], [1, "text-muted", "fw-medium"], [1, "bi", "bi-people", "me-1"], [1, "fw-bold", "text-dark"], [1, "d-flex", "justify-content-between", "align-items-center", "mt-3", "pt-3", "border-top"], [1, "bi", "bi-hash", "me-1"], [1, "bi", "bi-bookmark", "me-1"]], template: function WorkAreaManagerManagementOfInPersonRequestsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h3", 2);
      \u0275\u0275text(4, "Gestionar Solicitudes Presenciales");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "p", 3);
      \u0275\u0275text(6, "Refuerzos acad\xE9micos presenciales asignados a tu \xE1rea de trabajo");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275conditionalCreate(7, WorkAreaManagerManagementOfInPersonRequestsComponent_Conditional_7_Template, 4, 1, "div", 4);
      \u0275\u0275conditionalCreate(8, WorkAreaManagerManagementOfInPersonRequestsComponent_Conditional_8_Template, 4, 0, "div", 5);
      \u0275\u0275conditionalCreate(9, WorkAreaManagerManagementOfInPersonRequestsComponent_Conditional_9_Template, 4, 0, "div", 6);
      \u0275\u0275conditionalCreate(10, WorkAreaManagerManagementOfInPersonRequestsComponent_Conditional_10_Template, 3, 0, "div", 7);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.errorMessage ? 7 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isLoading && ctx.reinforcements.length === 0 && !ctx.errorMessage ? 9 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isLoading && ctx.reinforcements.length > 0 ? 10 : -1);
    }
  }, dependencies: [CommonModule], styles: ["\n\n.reinforcement-card[_ngcontent-%COMP%] {\n  border-radius: 0.75rem;\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n}\n.reinforcement-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1) !important;\n}\n/*# sourceMappingURL=work-area-manager-management-of-in-person-requests.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WorkAreaManagerManagementOfInPersonRequestsComponent, [{
    type: Component,
    args: [{ selector: "app-work-area-manager-management-of-in-person-requests", standalone: true, imports: [CommonModule], template: '<div class="container-fluid">\r\n\r\n  <!-- Encabezado -->\r\n  <div class="d-flex justify-content-between align-items-center mb-4">\r\n    <div>\r\n      <h3 class="mb-1">Gestionar Solicitudes Presenciales</h3>\r\n      <p class="text-muted mb-0">Refuerzos acad\xE9micos presenciales asignados a tu \xE1rea de trabajo</p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Alerta de error -->\r\n  @if (errorMessage) {\r\n    <div class="alert alert-danger alert-dismissible fade show" role="alert">\r\n      <i class="bi bi-exclamation-triangle-fill me-2"></i>\r\n      {{ errorMessage }}\r\n      <button type="button" class="btn-close" (click)="errorMessage = null" aria-label="Cerrar"></button>\r\n    </div>\r\n  }\r\n\r\n  <!-- Loading spinner -->\r\n  @if (isLoading) {\r\n    <div class="d-flex justify-content-center align-items-center py-5">\r\n      <div class="spinner-border text-success" role="status">\r\n        <span class="visually-hidden">Cargando...</span>\r\n      </div>\r\n    </div>\r\n  }\r\n\r\n  <!-- Sin resultados -->\r\n  @if (!isLoading && reinforcements.length === 0 && !errorMessage) {\r\n    <div class="text-center py-5">\r\n      <i class="bi bi-inbox display-1 text-muted"></i>\r\n      <p class="text-muted mt-3 fs-5">No se encontraron solicitudes presenciales para tu \xE1rea.</p>\r\n    </div>\r\n  }\r\n\r\n  <!-- Cards de solicitudes -->\r\n  @if (!isLoading && reinforcements.length > 0) {\r\n    <div class="row g-3">\r\n      @for (item of reinforcements; track item.pidrefuerzopresencial) {\r\n        <div class="col-12 col-md-6 col-xl-4">\r\n          <article class="card border-0 shadow-sm h-100 reinforcement-card">\r\n            <div class="card-body p-4">\r\n\r\n              <!-- Cabecera: tipo de sesi\xF3n + fecha -->\r\n              <div class="d-flex justify-content-between align-items-start mb-3">\r\n                <span class="badge rounded-pill {{ getSessionBadgeClass(item.ptiposesion) }} px-3 py-2">\r\n                  <i class="bi bi-people-fill me-1"></i>{{ item.ptiposesion }}\r\n                </span>\r\n                <small class="text-muted">\r\n                  <i class="bi bi-calendar-event me-1"></i>{{ item.pfechaprogramadarefuerzo }}\r\n                </small>\r\n              </div>\r\n\r\n              <!-- Docente -->\r\n              <h6 class="fw-bold text-dark mb-2">\r\n                <i class="bi bi-person-badge me-2 text-success"></i>{{ item.pdocente }}\r\n              </h6>\r\n\r\n              <!-- Horario -->\r\n              <div class="d-flex align-items-center text-muted mb-3">\r\n                <i class="bi bi-clock me-2"></i>\r\n                <span>{{ item.phorainicio }} - {{ item.phorariofin }}</span>\r\n              </div>\r\n\r\n              <!-- Participantes -->\r\n              <div class="d-flex align-items-center justify-content-between mb-0">\r\n                <small class="text-muted fw-medium">\r\n                  <i class="bi bi-people me-1"></i>Participantes\r\n                </small>\r\n                <small class="fw-bold text-dark">\r\n                  {{ item.participantesconfirmados }} confirmados / {{ item.pparticipantesesperados }} invitados\r\n                </small>\r\n              </div>\r\n\r\n              <!-- Pie: IDs de referencia -->\r\n              <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">\r\n                <small class="text-muted">\r\n                  <i class="bi bi-hash me-1"></i>Ref. #{{ item.pidrefuerzoprogramado }}\r\n                </small>\r\n                <small class="text-muted">\r\n                  <i class="bi bi-bookmark me-1"></i>Presencial #{{ item.pidrefuerzopresencial }}\r\n                </small>\r\n              </div>\r\n\r\n            </div>\r\n          </article>\r\n        </div>\r\n      }\r\n    </div>\r\n  }\r\n\r\n</div>\r\n', styles: ["/* src/app/components/workAreaManager/work-area-manager-management-of-in-person-requests/work-area-manager-management-of-in-person-requests.component.css */\n.reinforcement-card {\n  border-radius: 0.75rem;\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n}\n.reinforcement-card:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1) !important;\n}\n/*# sourceMappingURL=work-area-manager-management-of-in-person-requests.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WorkAreaManagerManagementOfInPersonRequestsComponent, { className: "WorkAreaManagerManagementOfInPersonRequestsComponent", filePath: "app/components/workareamanager/work-area-manager-management-of-in-person-requests/work-area-manager-management-of-in-person-requests.component.ts", lineNumber: 14 });
})();
export {
  WorkAreaManagerManagementOfInPersonRequestsComponent
};
//# sourceMappingURL=chunk-AHT6IVHD.js.map
