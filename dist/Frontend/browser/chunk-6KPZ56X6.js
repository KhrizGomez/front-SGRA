import {
  Router,
  RouterModule
} from "./chunk-MXF362TW.js";
import {
  HttpClient
} from "./chunk-K6SHIZGP.js";
import {
  ChangeDetectorRef,
  CommonModule,
  Component,
  Injectable,
  environment,
  inject,
  map,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵinterpolate2,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-OENL2SFL.js";

// src/app/services/workAreaManager/work-area-manager-dashboard/wam-dashboard.service.ts
var WamDashboardService = class _WamDashboardService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;
  getKpis() {
    return this.http.get(`${this.apiUrl}/work-area-management/kpi-dashboard`).pipe(map((data) => [
      { id: 1, value: data.registeredSpaces, label: "Espacios Registrados", subtitle: "Espacios disponibles", icon: "bi-building", theme: "success" },
      { id: 2, value: data.pendingRequests, label: "Solicitudes Pendientes", subtitle: "Esperando revisi\xF3n", icon: "bi-clock-history", theme: "warning" },
      { id: 3, value: data.approvedRequests, label: "Solicitudes Aprobadas", subtitle: "Solicitudes aceptadas", icon: "bi-check-circle", theme: "primary" },
      { id: 4, value: data.rejectedRequests, label: "Solicitudes Rechazadas", subtitle: "Solicitudes denegadas", icon: "bi-x-circle", theme: "danger" }
    ]));
  }
  getQuickActions() {
    return [
      {
        id: 1,
        icon: "bi-clipboard-check",
        title: "Gestionar Solicitudes",
        description: "Revisa, aprueba o rechaza las solicitudes presenciales asignadas.",
        linkText: "Ir a solicitudes",
        route: "/workAreaManagement/management-requests"
      },
      {
        id: 2,
        icon: "bi-boxes",
        title: "Ver Dashboard",
        description: "Consulta las m\xE9tricas y el estado general de tu \xE1rea de trabajo.",
        linkText: "Ver resumen",
        route: "/workAreaManagement/dashboard"
      }
    ];
  }
  static \u0275fac = function WamDashboardService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WamDashboardService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _WamDashboardService, factory: _WamDashboardService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WamDashboardService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/components/workAreaManager/work-area-manager-dashboard/work-area-manager-dashboard.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function WorkAreaManagerDashboardComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 5)(1, "article", 13)(2, "div", 14)(3, "div", 15)(4, "div");
    \u0275\u0275domElement(5, "i");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "h6", 16);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "div", 17);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "small", 18);
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const kpi_r1 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275classMap(\u0275\u0275interpolate2("icon-wrapper rounded-3 p-2 me-3 d-flex align-items-center justify-content-center bg-", kpi_r1.theme, "-subtle text-", kpi_r1.theme));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("bi ", kpi_r1.icon, " fs-4"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(kpi_r1.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(kpi_r1.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(kpi_r1.subtitle);
  }
}
function WorkAreaManagerDashboardComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 12)(1, "div", 19);
    \u0275\u0275domListener("click", function WorkAreaManagerDashboardComponent_For_19_Template_div_click_1_listener() {
      const action_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.navigateTo(action_r3.route));
    });
    \u0275\u0275domElementStart(2, "div", 20)(3, "div", 21)(4, "div", 22);
    \u0275\u0275domElement(5, "i");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "span", 23);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElement(8, "i", 24);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "p", 25);
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "span", 26);
    \u0275\u0275text(12);
    \u0275\u0275domElement(13, "i", 27);
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const action_r3 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275classMap(\u0275\u0275interpolate1("bi ", action_r3.icon, " fs-5"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(action_r3.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(action_r3.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", action_r3.linkText, " ");
  }
}
var WorkAreaManagerDashboardComponent = class _WorkAreaManagerDashboardComponent {
  router = inject(Router);
  dashboardService = inject(WamDashboardService);
  cdr = inject(ChangeDetectorRef);
  kpiCards = [];
  quickActions = [];
  ngOnInit() {
    this.quickActions = this.dashboardService.getQuickActions();
    this.loadKpis();
  }
  loadKpis() {
    this.dashboardService.getKpis().subscribe({
      next: (data) => {
        this.kpiCards = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Error al cargar KPIs:", err)
    });
  }
  navigateTo(path) {
    this.router.navigate([path]);
  }
  static \u0275fac = function WorkAreaManagerDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WorkAreaManagerDashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WorkAreaManagerDashboardComponent, selectors: [["app-work-area-manager-dashboard"]], decls: 20, vars: 0, consts: [[1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], [1, "mb-1"], [1, "text-muted", "mb-0"], [1, "row", "g-3", "mb-4"], [1, "col-12", "col-sm-6", "col-lg-3"], [1, "row", "g-3"], [1, "col-12"], [1, "card", "border-0", "shadow-sm", "h-100"], [1, "card-body", "p-4"], [1, "fw-semibold", "mb-3"], [1, "bi", "bi-lightning-charge-fill", "text-warning", "me-2"], [1, "col-12", "col-md-6", "col-lg-4"], [1, "card", "h-100", "border-0", "shadow-sm"], [1, "card-body"], [1, "d-flex", "align-items-center", "mb-3"], [1, "card-title", "mb-0", "text-muted"], [1, "display-5", "fw-bold", "text-dark"], [1, "text-muted"], ["role", "button", 1, "card", "border-0", "shadow-sm", "quick-action-card", "h-100", 3, "click"], [1, "card-body", "p-3"], [1, "d-flex", "align-items-center", "mb-2"], [1, "bg-success-subtle", "text-success", "rounded-3", "p-2", "me-3", "d-flex", "align-items-center", "justify-content-center"], [1, "fw-semibold", "text-dark"], [1, "bi", "bi-chevron-right", "ms-auto", "text-muted"], [1, "text-muted", "mb-2", "small", "ps-5"], [1, "quick-link", "ps-5"], [1, "bi", "bi-arrow-right-short"]], template: function WorkAreaManagerDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h3", 2);
      \u0275\u0275text(4, "Dashboard");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "p", 3);
      \u0275\u0275text(6, "Resumen general del \xE1rea de gesti\xF3n de solicitudes presenciales");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(7, "div", 4);
      \u0275\u0275repeaterCreate(8, WorkAreaManagerDashboardComponent_For_9_Template, 12, 10, "div", 5, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "div", 6)(11, "div", 7)(12, "section", 8)(13, "div", 9)(14, "h5", 10);
      \u0275\u0275domElement(15, "i", 11);
      \u0275\u0275text(16, "Acciones R\xE1pidas ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(17, "div", 6);
      \u0275\u0275repeaterCreate(18, WorkAreaManagerDashboardComponent_For_19_Template, 14, 6, "div", 12, _forTrack0);
      \u0275\u0275domElementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.kpiCards);
      \u0275\u0275advance(10);
      \u0275\u0275repeater(ctx.quickActions);
    }
  }, dependencies: [CommonModule, RouterModule], styles: ["\n\n.icon-wrapper[_ngcontent-%COMP%] {\n  width: 3rem;\n  height: 3rem;\n}\n.quick-action-card[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n}\n.quick-action-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;\n}\n.quick-link[_ngcontent-%COMP%] {\n  color: #198754;\n  font-weight: 600;\n  font-size: 0.875rem;\n  -webkit-user-select: none;\n  user-select: none;\n}\n/*# sourceMappingURL=work-area-manager-dashboard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WorkAreaManagerDashboardComponent, [{
    type: Component,
    args: [{ selector: "app-work-area-manager-dashboard", standalone: true, imports: [CommonModule, RouterModule], template: '<div class="container-fluid">\r\n\r\n  <div class="d-flex justify-content-between align-items-center mb-4">\r\n    <div>\r\n      <h3 class="mb-1">Dashboard</h3>\r\n      <p class="text-muted mb-0">Resumen general del \xE1rea de gesti\xF3n de solicitudes presenciales</p>\r\n    </div>\r\n  </div>\r\n\r\n  <div class="row g-3 mb-4">\r\n    @for (kpi of kpiCards; track kpi.id) {\r\n      <div class="col-12 col-sm-6 col-lg-3">\r\n        <article class="card h-100 border-0 shadow-sm">\r\n          <div class="card-body">\r\n            <div class="d-flex align-items-center mb-3">\r\n              <div class="icon-wrapper rounded-3 p-2 me-3 d-flex align-items-center justify-content-center bg-{{ kpi.theme }}-subtle text-{{ kpi.theme }}">\r\n                <i class="bi {{ kpi.icon }} fs-4"></i>\r\n              </div>\r\n              <h6 class="card-title mb-0 text-muted">{{ kpi.label }}</h6>\r\n            </div>\r\n            <div class="display-5 fw-bold text-dark">{{ kpi.value }}</div>\r\n            <small class="text-muted">{{ kpi.subtitle }}</small>\r\n          </div>\r\n        </article>\r\n      </div>\r\n    }\r\n  </div>\r\n\r\n  <div class="row g-3">\r\n    <div class="col-12">\r\n      <section class="card border-0 shadow-sm h-100">\r\n        <div class="card-body p-4">\r\n          <h5 class="fw-semibold mb-3">\r\n            <i class="bi bi-lightning-charge-fill text-warning me-2"></i>Acciones R\xE1pidas\r\n          </h5>\r\n\r\n          <div class="row g-3">\r\n            @for (action of quickActions; track action.id) {\r\n              <div class="col-12 col-md-6 col-lg-4">\r\n                <div class="card border-0 shadow-sm quick-action-card h-100" role="button"\r\n                    (click)="navigateTo(action.route)">\r\n                  <div class="card-body p-3">\r\n                    <div class="d-flex align-items-center mb-2">\r\n                      <div class="bg-success-subtle text-success rounded-3 p-2 me-3 d-flex align-items-center justify-content-center">\r\n                        <i class="bi {{ action.icon }} fs-5"></i>\r\n                      </div>\r\n                      <span class="fw-semibold text-dark">{{ action.title }}</span>\r\n                      <i class="bi bi-chevron-right ms-auto text-muted"></i>\r\n                    </div>\r\n                    <p class="text-muted mb-2 small ps-5">{{ action.description }}</p>\r\n                    <span class="quick-link ps-5">\r\n                      {{ action.linkText }} <i class="bi bi-arrow-right-short"></i>\r\n                    </span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            }\r\n          </div>\r\n        </div>\r\n      </section>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n', styles: ["/* src/app/components/workAreaManager/work-area-manager-dashboard/work-area-manager-dashboard.component.css */\n.icon-wrapper {\n  width: 3rem;\n  height: 3rem;\n}\n.quick-action-card {\n  cursor: pointer;\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n}\n.quick-action-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;\n}\n.quick-link {\n  color: #198754;\n  font-weight: 600;\n  font-size: 0.875rem;\n  -webkit-user-select: none;\n  user-select: none;\n}\n/*# sourceMappingURL=work-area-manager-dashboard.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WorkAreaManagerDashboardComponent, { className: "WorkAreaManagerDashboardComponent", filePath: "app/components/workareamanager/work-area-manager-dashboard/work-area-manager-dashboard.component.ts", lineNumber: 14 });
})();
export {
  WorkAreaManagerDashboardComponent
};
//# sourceMappingURL=chunk-6KPZ56X6.js.map
