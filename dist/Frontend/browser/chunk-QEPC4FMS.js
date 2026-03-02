import {
  buildHttpParams
} from "./chunk-W7KL5CWJ.js";
import {
  Router
} from "./chunk-MXF362TW.js";
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
  ɵɵinject,
  ɵɵinterpolate1,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-OENL2SFL.js";

// src/app/services/student/student-dashboard.service.ts
var StudentDashboardService = class _StudentDashboardService {
  http;
  baseUrl = environment.apiUrl;
  httpOptions = { withCredentials: true };
  constructor(http) {
    this.http = http;
  }
  /**
   * Obtiene los contadores del dashboard del estudiante.
   * Endpoint: GET /api/student/dashboard?periodId=
   * Función BD: fn_sl_dashboard_estudiante_ui(p_user_id, p_period_id)
   * @param periodId Periodo opcional; si es null/undefined usa el activo
   */
  getDashboard(periodId) {
    const params = buildHttpParams({ periodId });
    return this.http.get(`${this.baseUrl}/student/dashboard`, __spreadProps(__spreadValues({}, this.httpOptions), { params })).pipe(catchError(this.handleError));
  }
  handleError(error) {
    let message = "Error al cargar los datos del dashboard";
    if (error.status === 0) {
      message = "No se pudo conectar con el servidor.";
    } else if (error.status === 401) {
      message = "Sesi\xF3n expirada. Por favor, inicia sesi\xF3n nuevamente.";
    } else if (error.status === 403) {
      message = "No tienes permisos para acceder a esta informaci\xF3n.";
    } else if (error.error?.message) {
      message = error.error.message;
    }
    console.error("[StudentDashboardService] Error:", error);
    return throwError(() => new Error(message));
  }
  static \u0275fac = function StudentDashboardService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StudentDashboardService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StudentDashboardService, factory: _StudentDashboardService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StudentDashboardService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/components/student/student-dashboard.component.ts
var _forTrack0 = ($index, $item) => $item.key;
function StudentDashboardComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 4);
    \u0275\u0275domElement(1, "i", 17);
    \u0275\u0275text(2);
    \u0275\u0275domElementStart(3, "button", 18);
    \u0275\u0275domListener("click", function StudentDashboardComponent_Conditional_7_Template_button_click_3_listener() {
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
function StudentDashboardComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 6)(1, "div", 19)(2, "div", 12)(3, "div", 20)(4, "div", 21);
    \u0275\u0275domElement(5, "i");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "div", 22)(7, "h6", 23);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(9, "div", 24);
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "small", 25);
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const card_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275classMap(card_r3.colorClass);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("bi ", card_r3.icon, " fs-4 text-white"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(card_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.dashboardData[card_r3.key], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(card_r3.subtitle);
  }
}
var StudentDashboardComponent = class _StudentDashboardComponent {
  dashboardService = inject(StudentDashboardService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  errorMessage = null;
  dashboardData = { pending: 0, accepted: 0, upcoming: 0, completed: 0 };
  cards = [
    { key: "pending", title: "Pendientes", subtitle: "Esperando aprobaci\xF3n", icon: "bi-hourglass", colorClass: "bg-pending" },
    { key: "accepted", title: "Aceptadas", subtitle: "Solicitudes aprobadas", icon: "bi-check2", colorClass: "bg-accepted" },
    { key: "upcoming", title: "Pr\xF3ximas", subtitle: "Sesiones programadas", icon: "bi-calendar-event", colorClass: "bg-upcoming" },
    { key: "completed", title: "Realizadas", subtitle: "Sesiones completadas", icon: "bi-flag", colorClass: "bg-finished" }
  ];
  ngAfterViewInit() {
    Promise.resolve().then(() => {
      this.loadDashboard();
    });
  }
  loadDashboard() {
    this.errorMessage = null;
    this.dashboardService.getDashboard().subscribe({
      next: (data) => {
        this.dashboardData = data ?? { pending: 0, accepted: 0, upcoming: 0, completed: 0 };
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err?.message || "Error al cargar los datos";
        this.dashboardData = { pending: 0, accepted: 0, upcoming: 0, completed: 0 };
        this.cdr.detectChanges();
      }
    });
  }
  navigateTo(path) {
    this.router.navigate([path]);
  }
  static \u0275fac = function StudentDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StudentDashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StudentDashboardComponent, selectors: [["app-student-dashboard"]], decls: 45, vars: 1, consts: [[1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], [1, "mb-1"], [1, "text-muted", "mb-0"], ["role", "alert", 1, "alert", "alert-danger", "alert-dismissible", "fade", "show"], [1, "row", "g-3", "mb-3"], [1, "col-12", "col-sm-6", "col-lg-3"], [1, "mt-3"], [1, "fw-semibold", "mb-3"], [1, "row", "g-3"], [1, "col-12", "col-lg-4"], ["role", "button", 1, "card", "h-100", "border-0", "shadow-sm", "quick-card", 3, "click"], [1, "card-body"], [1, "mb-2"], [1, "text-muted", "mb-3"], [1, "quick-link"], [1, "bi", "bi-arrow-right-short"], [1, "bi", "bi-exclamation-triangle-fill", "me-2"], ["type", "button", 1, "btn-close", 3, "click"], [1, "card", "h-100", "border-0", "shadow-sm"], [1, "d-flex", "align-items-center", "mb-3"], [1, "icon-wrapper", "rounded-3", "p-2", "me-3"], [1, "flex-grow-1"], [1, "card-title", "mb-0", "text-muted"], [1, "display-5", "fw-bold", "text-dark"], [1, "text-muted"]], template: function StudentDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h3", 2);
      \u0275\u0275text(4, "Dashboard");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "p", 3);
      \u0275\u0275text(6, "Resumen de tus solicitudes de refuerzo acad\xE9mico");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275conditionalCreate(7, StudentDashboardComponent_Conditional_7_Template, 4, 1, "div", 4);
      \u0275\u0275domElementStart(8, "div", 5);
      \u0275\u0275repeaterCreate(9, StudentDashboardComponent_For_10_Template, 13, 8, "div", 6, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(11, "div", 7)(12, "h5", 8);
      \u0275\u0275text(13, "Accesos r\xE1pidos");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(14, "div", 9)(15, "div", 10)(16, "div", 11);
      \u0275\u0275domListener("click", function StudentDashboardComponent_Template_div_click_16_listener() {
        return ctx.navigateTo("/student/new-request");
      });
      \u0275\u0275domElementStart(17, "div", 12)(18, "h5", 13);
      \u0275\u0275text(19, "Nueva Solicitud");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(20, "p", 14);
      \u0275\u0275text(21, "Solicita un refuerzo y selecciona tu horario ideal");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(22, "span", 15);
      \u0275\u0275text(23, " Crear solicitud ");
      \u0275\u0275domElement(24, "i", 16);
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275domElementStart(25, "div", 10)(26, "div", 11);
      \u0275\u0275domListener("click", function StudentDashboardComponent_Template_div_click_26_listener() {
        return ctx.navigateTo("/student/my-requests");
      });
      \u0275\u0275domElementStart(27, "div", 12)(28, "h5", 13);
      \u0275\u0275text(29, "Mis Solicitudes");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(30, "p", 14);
      \u0275\u0275text(31, "Revisa el estado, confirma horarios y realiza seguimiento.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(32, "span", 15);
      \u0275\u0275text(33, " Ver solicitudes ");
      \u0275\u0275domElement(34, "i", 16);
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275domElementStart(35, "div", 10)(36, "div", 11);
      \u0275\u0275domListener("click", function StudentDashboardComponent_Template_div_click_36_listener() {
        return ctx.navigateTo("/student/history");
      });
      \u0275\u0275domElementStart(37, "div", 12)(38, "h5", 13);
      \u0275\u0275text(39, "Historial");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(40, "p", 14);
      \u0275\u0275text(41, "Consulta sesiones anteriores y retroalimentaci\xF3n.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(42, "span", 15);
      \u0275\u0275text(43, " Ir al historial ");
      \u0275\u0275domElement(44, "i", 16);
      \u0275\u0275domElementEnd()()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.errorMessage ? 7 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.cards);
    }
  }, dependencies: [CommonModule], styles: ["\n\n.icon-wrapper[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.bg-pending[_ngcontent-%COMP%] {\n  background-color: #f59e0b;\n}\n.bg-accepted[_ngcontent-%COMP%] {\n  background-color: #3b82f6;\n}\n.bg-upcoming[_ngcontent-%COMP%] {\n  background-color: #8b5cf6;\n}\n.bg-finished[_ngcontent-%COMP%] {\n  background-color: #198754;\n}\n.quick-card[_ngcontent-%COMP%] {\n  border-radius: 14px;\n  cursor: pointer;\n  transition: transform .15s ease, box-shadow .15s ease;\n}\n.quick-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.quick-link[_ngcontent-%COMP%] {\n  color: #198754;\n  font-weight: 600;\n  -webkit-user-select: none;\n  user-select: none;\n}\n/*# sourceMappingURL=student-dashboard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StudentDashboardComponent, [{
    type: Component,
    args: [{ selector: "app-student-dashboard", standalone: true, imports: [CommonModule], template: `\r
    <div class="container-fluid">\r
      <!-- Header -->\r
      <div class="d-flex justify-content-between align-items-center mb-4">\r
        <div>\r
          <h3 class="mb-1">Dashboard</h3>\r
          <p class="text-muted mb-0">Resumen de tus solicitudes de refuerzo acad\xE9mico</p>\r
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
      <!-- Stats Cards -->\r
      <div class="row g-3 mb-3">\r
        @for (card of cards; track card.key) {\r
          <div class="col-12 col-sm-6 col-lg-3">\r
            <div class="card h-100 border-0 shadow-sm">\r
              <div class="card-body">\r
                <div class="d-flex align-items-center mb-3">\r
                  <div class="icon-wrapper rounded-3 p-2 me-3" [class]="card.colorClass">\r
                    <i class="bi {{ card.icon }} fs-4 text-white"></i>\r
                  </div>\r
                  <div class="flex-grow-1">\r
                    <h6 class="card-title mb-0 text-muted">{{ card.title }}</h6>\r
                  </div>\r
                </div>\r
\r
                <div class="display-5 fw-bold text-dark">\r
                  {{ dashboardData[card.key] }}\r
                </div>\r
\r
                <small class="text-muted">{{ card.subtitle }}</small>\r
              </div>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
\r
      <!-- Quick Actions -->\r
      <div class="mt-3">\r
        <h5 class="fw-semibold mb-3">Accesos r\xE1pidos</h5>\r
        <div class="row g-3">\r
          <div class="col-12 col-lg-4">\r
            <div class="card h-100 border-0 shadow-sm quick-card"\r
                 (click)="navigateTo('/student/new-request')" role="button">\r
              <div class="card-body">\r
                <h5 class="mb-2">Nueva Solicitud</h5>\r
                <p class="text-muted mb-3">Solicita un refuerzo y selecciona tu horario ideal</p>\r
                <span class="quick-link">\r
                  Crear solicitud <i class="bi bi-arrow-right-short"></i>\r
                </span>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="col-12 col-lg-4">\r
            <div class="card h-100 border-0 shadow-sm quick-card"\r
                 (click)="navigateTo('/student/my-requests')" role="button">\r
              <div class="card-body">\r
                <h5 class="mb-2">Mis Solicitudes</h5>\r
                <p class="text-muted mb-3">Revisa el estado, confirma horarios y realiza seguimiento.</p>\r
                <span class="quick-link">\r
                  Ver solicitudes <i class="bi bi-arrow-right-short"></i>\r
                </span>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="col-12 col-lg-4">\r
            <div class="card h-100 border-0 shadow-sm quick-card"\r
                 (click)="navigateTo('/student/history')" role="button">\r
              <div class="card-body">\r
                <h5 class="mb-2">Historial</h5>\r
                <p class="text-muted mb-3">Consulta sesiones anteriores y retroalimentaci\xF3n.</p>\r
                <span class="quick-link">\r
                  Ir al historial <i class="bi bi-arrow-right-short"></i>\r
                </span>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  `, styles: ["/* src/app/components/student/student-dashboard.component.css */\n.icon-wrapper {\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.bg-pending {\n  background-color: #f59e0b;\n}\n.bg-accepted {\n  background-color: #3b82f6;\n}\n.bg-upcoming {\n  background-color: #8b5cf6;\n}\n.bg-finished {\n  background-color: #198754;\n}\n.quick-card {\n  border-radius: 14px;\n  cursor: pointer;\n  transition: transform .15s ease, box-shadow .15s ease;\n}\n.quick-card:hover {\n  transform: translateY(-2px);\n}\n.quick-link {\n  color: #198754;\n  font-weight: 600;\n  -webkit-user-select: none;\n  user-select: none;\n}\n/*# sourceMappingURL=student-dashboard.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StudentDashboardComponent, { className: "StudentDashboardComponent", filePath: "app/components/student/student-dashboard.component.ts", lineNumber: 21 });
})();
export {
  StudentDashboardComponent
};
//# sourceMappingURL=chunk-QEPC4FMS.js.map
