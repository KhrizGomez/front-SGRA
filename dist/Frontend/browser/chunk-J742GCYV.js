import {
  RouterLink,
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
  NgClass,
  environment,
  inject,
  map,
  of,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinterpolate1,
  ɵɵinterpolate2,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-OENL2SFL.js";

// src/app/services/administration/admin-dashboard/admin-dashboard.service.ts
var AdminDashboardService = class _AdminDashboardService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;
  getKpis() {
    return this.http.get(`${this.apiUrl}/security/user-role-managements/kpi-dashboard-management`).pipe(map((data) => {
      return [
        { id: "1", value: data.userActive, label: "Usuarios Activos", icon: "bi-people", theme: "success" },
        { id: "2", value: data.userIncative, label: "Usuarios Inactivos", icon: "bi-person-exclamation", theme: "danger" },
        { id: "3", value: data.rolesActive, label: "Roles Activos", icon: "bi-shield-check", theme: "success" },
        { id: "4", value: data.rolesInactive, label: "Roles Inactivos", icon: "bi-shield-x", theme: "secondary" }
      ];
    }));
  }
  getRecentLogs() {
    const logs = [
      { id: 1, action: "Cambio de rol: Docente -> Coordinador", user: "Daniela P.", timeAgo: "Hace 2 horas", status: "Aprobado" },
      { id: 2, action: "Reset de clave solicitado", user: "Mario C.", timeAgo: "Hace 1 d\xEDa", status: "Completado" },
      { id: 3, action: "Permisos del modulo Refuerzos ajustados", user: "Rol: Coordinador", timeAgo: "Hace 2 d\xEDas", status: "En revision" }
    ];
    return of(logs);
  }
  getQuickActions() {
    return [
      { id: "qa1", title: "Gestion de usuarios", icon: "bi-people", route: "/admin/users" },
      { id: "qa2", title: "Roles y niveles", icon: "bi-shield-check", route: "/admin/roles" },
      { id: "qa3", title: "Permisos por modulo", icon: "bi-key", route: "/admin/permissions" },
      { id: "qa4", title: "Activar accesos", icon: "bi-person-check", route: "/admin/users" }
    ];
  }
  static \u0275fac = function AdminDashboardService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminDashboardService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminDashboardService, factory: _AdminDashboardService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminDashboardService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/components/administration/admin-dashboard/admin-dashboard.component.ts
var _c0 = (a0, a1) => ({ "bg-success-subtle text-success": a0, "bg-warning-subtle text-warning": a1 });
var _forTrack0 = ($index, $item) => $item.id;
function AdminDashboardComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "article", 21)(2, "div", 22)(3, "div", 23)(4, "div");
    \u0275\u0275element(5, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h6", 24);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 25);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const kpi_r1 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275classMap(\u0275\u0275interpolate2("rounded-3 p-2 me-3 d-flex align-items-center justify-content-center bg-", kpi_r1.theme, "-subtle text-", kpi_r1.theme));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("bi ", kpi_r1.icon, " fs-4"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(kpi_r1.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(kpi_r1.value);
  }
}
function AdminDashboardComponent_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div")(2, "h6", 26);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 27);
    \u0275\u0275element(5, "i", 28);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 29);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const log_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(log_r2.action);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", log_r2.user, " \u2022 ", log_r2.timeAgo, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(5, _c0, log_r2.status === "Aprobado" || log_r2.status === "Completado", log_r2.status === "En revision"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", log_r2.status, " ");
  }
}
function AdminDashboardComponent_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 20)(1, "div", 30)(2, "div", 31);
    \u0275\u0275element(3, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 32);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "i", 33);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const action_r3 = ctx.$implicit;
    \u0275\u0275property("routerLink", action_r3.route);
    \u0275\u0275advance(3);
    \u0275\u0275classMap(\u0275\u0275interpolate1("bi ", action_r3.icon, " fs-5"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(action_r3.title);
  }
}
var AdminDashboardComponent = class _AdminDashboardComponent {
  kpiCard = [];
  logs = [];
  quickActions = [];
  dashboardService = inject(AdminDashboardService);
  cdr = inject(ChangeDetectorRef);
  ngOnInit() {
    this.quickActions = this.dashboardService.getQuickActions();
    this.loadDashboardData();
  }
  loadDashboardData() {
    this.dashboardService.getKpis().subscribe({
      next: (data) => {
        this.kpiCard = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Error cargando KPI's: " + err)
    });
    this.dashboardService.getRecentLogs().subscribe((data) => this.logs = data);
  }
  static \u0275fac = function AdminDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminDashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminDashboardComponent, selectors: [["app-admin-dashboard"]], decls: 32, vars: 0, consts: [[1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], [1, "mb-1"], [1, "text-muted", "mb-0"], [1, "row", "g-3", "mb-4"], [1, "col-12", "col-sm-6", "col-lg-3"], [1, "row", "g-3"], [1, "col-lg-8"], [1, "card", "border-0", "shadow-sm", "h-100"], [1, "card-header", "bg-transparent", "border-0", "px-4", "pt-4", "pb-0", "d-flex", "justify-content-between", "align-items-center"], [1, "fw-semibold", "mb-0"], [1, "bi", "bi-activity", "text-success", "me-2"], ["routerLink", "/admin/logs", 1, "btn", "btn-sm", "btn-link", "text-decoration-none", "text-success", "fw-semibold"], [1, "card-body", "p-4"], [1, "list-group", "list-group-flush"], [1, "list-group-item", "bg-transparent", "border-0", "py-3", "d-flex", "justify-content-between", "align-items-center"], [1, "col-lg-4"], [1, "fw-semibold", "mb-3"], [1, "bi", "bi-lightning-charge-fill", "text-warning", "me-2"], [1, "d-flex", "flex-column", "gap-3"], [1, "card", "border-0", "shadow-sm", "text-decoration-none", "quick-action-card", 3, "routerLink"], [1, "card", "h-100", "border-0", "shadow-sm"], [1, "card-body"], [1, "d-flex", "align-items-center", "mb-3"], [1, "card-title", "mb-0", "text-muted"], [1, "display-5", "fw-bold", "text-dark"], [1, "fw-semibold", "mb-1", "text-dark"], [1, "text-muted"], [1, "bi", "bi-person", "me-1"], [1, "badge", "rounded-pill", 3, "ngClass"], [1, "card-body", "p-3", "d-flex", "align-items-center"], [1, "bg-success-subtle", "text-success", "rounded-3", "p-2", "me-3", "d-flex", "align-items-center", "justify-content-center"], [1, "fw-semibold", "text-dark"], [1, "bi", "bi-chevron-right", "ms-auto", "text-muted"]], template: function AdminDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h3", 2);
      \u0275\u0275text(4, "Dashboard");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Resumen general del sistema de gesti\xF3n de refuerzos acad\xE9micos");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "div", 4);
      \u0275\u0275repeaterCreate(8, AdminDashboardComponent_For_9_Template, 10, 9, "div", 5, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 6)(11, "div", 7)(12, "section", 8)(13, "div", 9)(14, "h5", 10);
      \u0275\u0275element(15, "i", 11);
      \u0275\u0275text(16, "Auditor\xEDa Reciente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "a", 12);
      \u0275\u0275text(18, "Ver todo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 13)(20, "div", 14);
      \u0275\u0275repeaterCreate(21, AdminDashboardComponent_For_22_Template, 9, 8, "div", 15, _forTrack0);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(23, "div", 16)(24, "section", 8)(25, "div", 13)(26, "h5", 17);
      \u0275\u0275element(27, "i", 18);
      \u0275\u0275text(28, "Acciones R\xE1pidas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "div", 19);
      \u0275\u0275repeaterCreate(30, AdminDashboardComponent_For_31_Template, 7, 5, "a", 20, _forTrack0);
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.kpiCard);
      \u0275\u0275advance(13);
      \u0275\u0275repeater(ctx.logs);
      \u0275\u0275advance(9);
      \u0275\u0275repeater(ctx.quickActions);
    }
  }, dependencies: [CommonModule, NgClass, RouterModule, RouterLink], styles: ["\n\n.quick-action-card[_ngcontent-%COMP%] {\n  transition: transform 0.15s ease;\n}\n.quick-action-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n/*# sourceMappingURL=admin-dashboard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminDashboardComponent, [{
    type: Component,
    args: [{ selector: "app-admin-dashboard", standalone: true, imports: [CommonModule, RouterModule], template: `<div class="container-fluid">\r
\r
  <!-- Encabezado -->\r
  <div class="d-flex justify-content-between align-items-center mb-4">\r
    <div>\r
      <h3 class="mb-1">Dashboard</h3>\r
      <p class="text-muted mb-0">Resumen general del sistema de gesti\xF3n de refuerzos acad\xE9micos</p>\r
    </div>\r
  </div>\r
\r
  <!-- KPIs -->\r
  <div class="row g-3 mb-4">\r
    @for (kpi of kpiCard; track kpi.id) {\r
      <div class="col-12 col-sm-6 col-lg-3">\r
        <article class="card h-100 border-0 shadow-sm">\r
          <div class="card-body">\r
            <div class="d-flex align-items-center mb-3">\r
              <div class="rounded-3 p-2 me-3 d-flex align-items-center justify-content-center bg-{{ kpi.theme }}-subtle text-{{ kpi.theme }}">\r
                <i class="bi {{ kpi.icon }} fs-4"></i>\r
              </div>\r
              <h6 class="card-title mb-0 text-muted">{{ kpi.label }}</h6>\r
            </div>\r
            <div class="display-5 fw-bold text-dark">{{ kpi.value }}</div>\r
          </div>\r
        </article>\r
      </div>\r
    }\r
  </div>\r
\r
  <div class="row g-3">\r
\r
    <!-- Auditor\xEDa Reciente -->\r
    <div class="col-lg-8">\r
      <section class="card border-0 shadow-sm h-100">\r
        <div class="card-header bg-transparent border-0 px-4 pt-4 pb-0 d-flex justify-content-between align-items-center">\r
          <h5 class="fw-semibold mb-0"><i class="bi bi-activity text-success me-2"></i>Auditor\xEDa Reciente</h5>\r
          <a routerLink="/admin/logs" class="btn btn-sm btn-link text-decoration-none text-success fw-semibold">Ver todo</a>\r
        </div>\r
\r
        <div class="card-body p-4">\r
          <div class="list-group list-group-flush">\r
            @for (log of logs; track log.id) {\r
              <div class="list-group-item bg-transparent border-0 py-3 d-flex justify-content-between align-items-center">\r
                <div>\r
                  <h6 class="fw-semibold mb-1 text-dark">{{ log.action }}</h6>\r
                  <small class="text-muted">\r
                    <i class="bi bi-person me-1"></i>{{ log.user }} &bull; {{ log.timeAgo }}\r
                  </small>\r
                </div>\r
                <span class="badge rounded-pill"\r
                      [ngClass]="{\r
                        'bg-success-subtle text-success': log.status === 'Aprobado' || log.status === 'Completado',\r
                        'bg-warning-subtle text-warning': log.status === 'En revision'\r
                      }">\r
                  {{ log.status }}\r
                </span>\r
              </div>\r
            }\r
          </div>\r
        </div>\r
      </section>\r
    </div>\r
\r
    <!-- Acciones R\xE1pidas -->\r
    <div class="col-lg-4">\r
      <section class="card border-0 shadow-sm h-100">\r
        <div class="card-body p-4">\r
          <h5 class="fw-semibold mb-3"><i class="bi bi-lightning-charge-fill text-warning me-2"></i>Acciones R\xE1pidas</h5>\r
\r
          <div class="d-flex flex-column gap-3">\r
            @for (action of quickActions; track action.id) {\r
              <a [routerLink]="action.route"\r
                 class="card border-0 shadow-sm text-decoration-none quick-action-card">\r
                <div class="card-body p-3 d-flex align-items-center">\r
                  <div class="bg-success-subtle text-success rounded-3 p-2 me-3 d-flex align-items-center justify-content-center">\r
                    <i class="bi {{ action.icon }} fs-5"></i>\r
                  </div>\r
                  <span class="fw-semibold text-dark">{{ action.title }}</span>\r
                  <i class="bi bi-chevron-right ms-auto text-muted"></i>\r
                </div>\r
              </a>\r
            }\r
          </div>\r
        </div>\r
      </section>\r
    </div>\r
\r
  </div>\r
</div>\r
`, styles: ["/* src/app/components/administration/admin-dashboard/admin-dashboard.component.css */\n.quick-action-card {\n  transition: transform 0.15s ease;\n}\n.quick-action-card:hover {\n  transform: translateY(-2px);\n}\n/*# sourceMappingURL=admin-dashboard.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminDashboardComponent, { className: "AdminDashboardComponent", filePath: "app/components/administration/admin-dashboard/admin-dashboard.component.ts", lineNumber: 16 });
})();
export {
  AdminDashboardComponent
};
//# sourceMappingURL=chunk-J742GCYV.js.map
