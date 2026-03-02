import {
  TeacherAvailabilityService,
  TeacherClassScheduleService
} from "./chunk-SJNSHORJ.js";
import "./chunk-MDNOZLIJ.js";
import "./chunk-OBGJFG5D.js";
import {
  AuthService
} from "./chunk-ZOQXTRIP.js";
import {
  Router
} from "./chunk-MXF362TW.js";
import "./chunk-K6SHIZGP.js";
import {
  ChangeDetectorRef,
  CommonModule,
  Component,
  forkJoin,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
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
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-OENL2SFL.js";

// src/app/components/teacher/teacher-dashboard/teacher-dashboard.component.ts
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.title;
function TeacherDashboardComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 8);
    \u0275\u0275domElement(1, "div", 9);
    \u0275\u0275domElementStart(2, "p", 10);
    \u0275\u0275text(3, "Cargando datos...");
    \u0275\u0275domElementEnd()();
  }
}
function TeacherDashboardComponent_Conditional_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 12)(1, "div", 15)(2, "div", 16)(3, "div", 17);
    \u0275\u0275domElement(4, "i");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div", 18)(6, "h3", 19);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "p", 20);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "small", 21);
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd()()()()();
  }
  if (rf & 2) {
    const stat_r1 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275classMap(\u0275\u0275interpolate1("bi ", stat_r1.icon));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(stat_r1.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r1.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r1.subtitle);
  }
}
function TeacherDashboardComponent_Conditional_12_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 14)(1, "div", 22);
    \u0275\u0275domListener("click", function TeacherDashboardComponent_Conditional_12_For_7_Template_div_click_1_listener() {
      const card_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.navigateTo(card_r3.route));
    });
    \u0275\u0275domElementStart(2, "div", 23)(3, "div", 24);
    \u0275\u0275domElement(4, "i");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div", 25)(6, "h6", 26);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "p", 27);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElement(10, "i", 28);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const card_r3 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275classMap(\u0275\u0275interpolate1("bi ", card_r3.icon));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(card_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(card_r3.description);
  }
}
function TeacherDashboardComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 11);
    \u0275\u0275repeaterCreate(1, TeacherDashboardComponent_Conditional_12_For_2_Template, 12, 6, "div", 12, _forTrack0);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "h5", 13);
    \u0275\u0275text(4, "Accesos R\xE1pidos");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div", 11);
    \u0275\u0275repeaterCreate(6, TeacherDashboardComponent_Conditional_12_For_7_Template, 11, 5, "div", 14, _forTrack1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.stats);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r3.cards);
  }
}
var TeacherDashboardComponent = class _TeacherDashboardComponent {
  authService = inject(AuthService);
  router = inject(Router);
  scheduleSvc = inject(TeacherClassScheduleService);
  availabilitySvc = inject(TeacherAvailabilityService);
  cdr = inject(ChangeDetectorRef);
  loading = true;
  // Stats
  stats = [];
  schedules = [];
  availabilitySlots = [];
  // Quick access cards
  cards = [
    {
      title: "Disponibilidad Horaria",
      description: "Gestiona tus bloques horarios disponibles para refuerzos.",
      icon: "bi-calendar2-week",
      route: "/teacher/availability"
    },
    {
      title: "Mi Horario de Clases",
      description: "Consulta tu horario asignado del periodo actual.",
      icon: "bi-table",
      route: "/teacher/availability"
    },
    {
      title: "Solicitudes de Refuerzo",
      description: "Revisa y responde solicitudes de estudiantes.",
      icon: "bi-inbox",
      route: "/teacher/requests"
    }
  ];
  ngOnInit() {
    this.loadDashboardData();
  }
  loadDashboardData() {
    const userId = this.authService.currentUser()?.userId;
    if (!userId) {
      this.loading = false;
      return;
    }
    forkJoin({
      schedules: this.scheduleSvc.getSchedulesByTeacherId(userId),
      availability: this.availabilitySvc.getAvailabilityByUser(userId)
    }).subscribe({
      next: ({ schedules, availability }) => {
        this.schedules = schedules;
        this.availabilitySlots = availability;
        this.buildStats();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.stats = this.defaultStats();
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  buildStats() {
    const active = this.schedules.filter((s) => s.active);
    const subjects = new Set(active.map((s) => s.subjectName));
    const period = active[0]?.period ?? "\u2014";
    const classDays = new Set(active.map((s) => s.day));
    this.stats = [
      {
        label: "Clases Asignadas",
        value: active.length,
        icon: "bi-easel",
        subtitle: `en ${classDays.size} d\xEDa(s) de la semana`
      },
      {
        label: "Materias Activas",
        value: subjects.size,
        icon: "bi-journals",
        subtitle: Array.from(subjects).slice(0, 2).join(", ") || "\u2014"
      },
      {
        label: "Bloques Disponibles",
        value: this.availabilitySlots.length,
        icon: "bi-calendar2-check",
        subtitle: "bloques horarios registrados"
      },
      {
        label: "Periodo Acad\xE9mico",
        value: period,
        icon: "bi-mortarboard",
        subtitle: active[0] ? `${active[0].periodStartDate} \u2014 ${active[0].periodEndDate}` : "\u2014"
      }
    ];
  }
  defaultStats() {
    return [
      { label: "Clases Asignadas", value: 0, icon: "bi-easel", subtitle: "Sin datos" },
      { label: "Materias Activas", value: 0, icon: "bi-journals", subtitle: "\u2014" },
      { label: "Bloques Disponibles", value: 0, icon: "bi-calendar2-check", subtitle: "\u2014" },
      { label: "Periodo Acad\xE9mico", value: "\u2014", icon: "bi-mortarboard", subtitle: "\u2014" }
    ];
  }
  navigateTo(route) {
    this.router.navigate([route]);
  }
  static \u0275fac = function TeacherDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeacherDashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeacherDashboardComponent, selectors: [["app-teacher-dashboard"]], decls: 13, vars: 4, consts: [[1, "container-fluid", "p-0", "mb-5"], [1, "row", "g-4", "mb-4"], [1, "col-12"], [1, "d-flex", "align-items-center", "gap-3"], [1, "header-icon"], [1, "bi", "bi-mortarboard-fill"], [1, "fw-bold", "text-dark", "mb-0"], [1, "text-muted", "mb-0"], [1, "text-center", "py-5"], ["role", "status", 1, "spinner-border", "text-success"], [1, "text-muted", "mt-2", "mb-0"], [1, "row", "g-3", "mb-4"], [1, "col-sm-6", "col-xl-3"], [1, "fw-bold", "mb-3"], [1, "col-sm-6"], [1, "card", "stat-card", "border-0", "shadow-sm", "h-100"], [1, "card-body", "p-3", "d-flex", "align-items-center", "gap-3"], [1, "stat-icon-wrapper"], [1, "flex-grow-1", "overflow-hidden"], [1, "mb-0", "fw-bold", "stat-value"], [1, "text-muted", "mb-0", "small", "fw-medium", "text-uppercase", "stat-label"], [1, "text-muted", "stat-subtitle", "text-truncate", "d-block"], ["role", "button", 1, "card", "quick-card", "border-0", "shadow-sm", "h-100", 3, "click"], [1, "card-body", "p-4", "d-flex", "align-items-center", "gap-3"], [1, "quick-icon-wrapper"], [1, "flex-grow-1"], [1, "fw-bold", "mb-1"], [1, "text-muted", "mb-0", "small"], [1, "bi", "bi-chevron-right", "text-muted"]], template: function TeacherDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
      \u0275\u0275domElement(5, "i", 5);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "div")(7, "h3", 6);
      \u0275\u0275text(8, "Panel de Control");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(9, "p", 7);
      \u0275\u0275text(10);
      \u0275\u0275domElementEnd()()()()();
      \u0275\u0275conditionalCreate(11, TeacherDashboardComponent_Conditional_11_Template, 4, 0, "div", 8);
      \u0275\u0275conditionalCreate(12, TeacherDashboardComponent_Conditional_12_Template, 8, 0);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate2(" Bienvenido, ", (tmp_0_0 = ctx.authService.currentUser()) == null ? null : tmp_0_0.firstName, " ", (tmp_0_0 = ctx.authService.currentUser()) == null ? null : tmp_0_0.lastName, " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 11 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading ? 12 : -1);
    }
  }, dependencies: [CommonModule], styles: ['\n\n[_nghost-%COMP%] {\n  font-family:\n    "Inter",\n    "Segoe UI",\n    -apple-system,\n    BlinkMacSystemFont,\n    sans-serif;\n}\n.header-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  background-color: #1B7505;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.4rem;\n  border: 1px solid #145904;\n}\n.stat-card[_ngcontent-%COMP%] {\n  border-radius: 14px;\n  border: 1px solid #e0e0e0 !important;\n  border-left: 4px solid #1B7505 !important;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08) !important;\n}\n.stat-icon-wrapper[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  min-width: 48px;\n  border-radius: 12px;\n  background-color: #e8f5e9;\n  color: #1B7505;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.3rem;\n  border: 1px solid #c8e6c9;\n}\n.stat-value[_ngcontent-%COMP%] {\n  color: #1B7505;\n  font-size: 1.5rem;\n  line-height: 1.2;\n  font-family:\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  letter-spacing: 0.04em;\n}\n.stat-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.quick-card[_ngcontent-%COMP%] {\n  border-radius: 14px;\n  border: 1px solid #e0e0e0 !important;\n  cursor: pointer;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.quick-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08) !important;\n  border-color: #1B7505 !important;\n}\n.quick-icon-wrapper[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  min-width: 44px;\n  border-radius: 12px;\n  background-color: #1B7505;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.2rem;\n  border: 1px solid #145904;\n}\n/*# sourceMappingURL=teacher-dashboard.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeacherDashboardComponent, [{
    type: Component,
    args: [{ selector: "app-teacher-dashboard", standalone: true, imports: [CommonModule], template: '<div class="container-fluid p-0 mb-5">\r\n\r\n  <!-- Header -->\r\n  <div class="row g-4 mb-4">\r\n    <div class="col-12">\r\n      <div class="d-flex align-items-center gap-3">\r\n        <div class="header-icon">\r\n          <i class="bi bi-mortarboard-fill"></i>\r\n        </div>\r\n        <div>\r\n          <h3 class="fw-bold text-dark mb-0">Panel de Control</h3>\r\n          <p class="text-muted mb-0">\r\n            Bienvenido, {{ authService.currentUser()?.firstName }} {{ authService.currentUser()?.lastName }}\r\n          </p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Loading -->\r\n  @if (loading) {\r\n  <div class="text-center py-5">\r\n    <div class="spinner-border text-success" role="status"></div>\r\n    <p class="text-muted mt-2 mb-0">Cargando datos...</p>\r\n  </div>\r\n  }\r\n\r\n  @if (!loading) {\r\n  <!-- Stats Cards -->\r\n  <div class="row g-3 mb-4">\r\n    @for (stat of stats; track stat.label) {\r\n    <div class="col-sm-6 col-xl-3">\r\n      <div class="card stat-card border-0 shadow-sm h-100">\r\n        <div class="card-body p-3 d-flex align-items-center gap-3">\r\n          <div class="stat-icon-wrapper">\r\n            <i class="bi {{ stat.icon }}"></i>\r\n          </div>\r\n          <div class="flex-grow-1 overflow-hidden">\r\n            <h3 class="mb-0 fw-bold stat-value">{{ stat.value }}</h3>\r\n            <p class="text-muted mb-0 small fw-medium text-uppercase stat-label">{{ stat.label }}</p>\r\n            <small class="text-muted stat-subtitle text-truncate d-block">{{ stat.subtitle }}</small>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    }\r\n  </div>\r\n\r\n  <!-- Quick Access -->\r\n  <h5 class="fw-bold mb-3">Accesos R\xE1pidos</h5>\r\n  <div class="row g-3 mb-4">\r\n    @for (card of cards; track card.title) {\r\n    <div class="col-sm-6">\r\n      <div class="card quick-card border-0 shadow-sm h-100" (click)="navigateTo(card.route)" role="button">\r\n        <div class="card-body p-4 d-flex align-items-center gap-3">\r\n          <div class="quick-icon-wrapper">\r\n            <i class="bi {{ card.icon }}"></i>\r\n          </div>\r\n          <div class="flex-grow-1">\r\n            <h6 class="fw-bold mb-1">{{ card.title }}</h6>\r\n            <p class="text-muted mb-0 small">{{ card.description }}</p>\r\n          </div>\r\n          <i class="bi bi-chevron-right text-muted"></i>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    }\r\n  </div>\r\n  }\r\n\r\n</div>', styles: ['/* src/app/components/teacher/teacher-dashboard/teacher-dashboard.component.css */\n:host {\n  font-family:\n    "Inter",\n    "Segoe UI",\n    -apple-system,\n    BlinkMacSystemFont,\n    sans-serif;\n}\n.header-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  background-color: #1B7505;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.4rem;\n  border: 1px solid #145904;\n}\n.stat-card {\n  border-radius: 14px;\n  border: 1px solid #e0e0e0 !important;\n  border-left: 4px solid #1B7505 !important;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.stat-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08) !important;\n}\n.stat-icon-wrapper {\n  width: 48px;\n  height: 48px;\n  min-width: 48px;\n  border-radius: 12px;\n  background-color: #e8f5e9;\n  color: #1B7505;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.3rem;\n  border: 1px solid #c8e6c9;\n}\n.stat-value {\n  color: #1B7505;\n  font-size: 1.5rem;\n  line-height: 1.2;\n  font-family:\n    "Inter",\n    "Segoe UI",\n    sans-serif;\n}\n.stat-label {\n  font-size: 0.7rem;\n  letter-spacing: 0.04em;\n}\n.stat-subtitle {\n  font-size: 0.75rem;\n}\n.quick-card {\n  border-radius: 14px;\n  border: 1px solid #e0e0e0 !important;\n  cursor: pointer;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.quick-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08) !important;\n  border-color: #1B7505 !important;\n}\n.quick-icon-wrapper {\n  width: 44px;\n  height: 44px;\n  min-width: 44px;\n  border-radius: 12px;\n  background-color: #1B7505;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.2rem;\n  border: 1px solid #145904;\n}\n/*# sourceMappingURL=teacher-dashboard.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeacherDashboardComponent, { className: "TeacherDashboardComponent", filePath: "app/components/teacher/teacher-dashboard/teacher-dashboard.component.ts", lineNumber: 31 });
})();
export {
  TeacherDashboardComponent
};
//# sourceMappingURL=chunk-WD54Q4HF.js.map
