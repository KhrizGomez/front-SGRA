import {
  AuthService
} from "./chunk-ZOQXTRIP.js";
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet
} from "./chunk-MXF362TW.js";
import "./chunk-K6SHIZGP.js";
import {
  CommonModule,
  Component,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-OENL2SFL.js";

// src/app/components/teacher/teacher-layout/teacher-layout.component.ts
function TeacherLayoutComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 24)(2, "p", 25);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 26);
    \u0275\u0275text(5, "Docente");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 27);
    \u0275\u0275listener("click", function TeacherLayoutComponent_Conditional_30_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.logout());
    });
    \u0275\u0275element(7, "i", 28);
    \u0275\u0275text(8, " Cerrar sesi\xF3n ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 29);
    \u0275\u0275listener("click", function TeacherLayoutComponent_Conditional_30_Template_div_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDropdown());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.userName);
  }
}
var TeacherLayoutComponent = class _TeacherLayoutComponent {
  authService = inject(AuthService);
  showDropdown = false;
  get userName() {
    const user = this.authService.currentUser();
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return "Docente";
  }
  get userInitials() {
    const user = this.authService.currentUser();
    const f = user?.firstName?.[0] ?? "";
    const l = user?.lastName?.[0] ?? "";
    return (f + l).toUpperCase() || "D";
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  closeDropdown() {
    this.showDropdown = false;
  }
  logout() {
    this.authService.logout().subscribe();
  }
  static \u0275fac = function TeacherLayoutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeacherLayoutComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeacherLayoutComponent, selectors: [["app-teacher-layout"]], decls: 33, vars: 3, consts: [[1, "d-flex", "vh-100", "bg-light"], [1, "teacher-sidebar", "d-flex", "flex-column", "text-white", "shadow"], [1, "sidebar-header", "text-center", "p-4", "border-bottom", "border-light", "border-opacity-25"], [1, "bi", "bi-mortarboard-fill", "display-6", "mb-2"], [1, "m-0", "fw-bold"], [1, "nav", "nav-pills", "flex-column", "mb-auto", "p-3", "gap-2"], [1, "nav-item"], ["routerLink", "/teacher/dashboard", "routerLinkActive", "active-link", 1, "nav-link", "text-white"], [1, "bi", "bi-boxes"], ["routerLink", "/teacher/requests", "routerLinkActive", "active-link", 1, "nav-link", "text-white"], [1, "bi", "bi-inbox", "me-2"], ["routerLink", "/teacher/history", "routerLinkActive", "active-link", 1, "nav-link", "text-white"], [1, "bi", "bi-clock-history", "me-2"], [1, "flex-grow-1", "d-flex", "flex-column", "content-area"], [1, "top-header", "bg-white", "shadow-sm", "p-3", "d-flex", "justify-content-between", "align-items-center", "z-1"], [1, "m-0", "text-secondary", "fw-semibold", "header-title"], [1, "position-relative"], ["type", "button", 1, "btn", "btn-profile", "d-flex", "align-items-center", "gap-2", 3, "click"], [1, "fw-medium", "text-dark", "d-none", "d-md-inline"], [1, "teacher-avatar", "rounded-circle", "text-white", "d-flex", "justify-content-center", "align-items-center"], [1, "fw-bold"], [1, "bi", "bi-chevron-down", "text-muted", "small"], [1, "flex-grow-1", "p-4", "overflow-auto"], [1, "profile-dropdown", "shadow-sm", "border"], [1, "dropdown-header", "px-3", "py-2", "border-bottom"], [1, "fw-bold", "mb-0", "small"], [1, "text-muted"], ["type", "button", 1, "dropdown-item", "text-danger", "d-flex", "align-items-center", "gap-2", "px-3", "py-2", 3, "click"], [1, "bi", "bi-box-arrow-left"], [1, "dropdown-backdrop", 3, "click"]], template: function TeacherLayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "aside", 1)(2, "div", 2);
      \u0275\u0275element(3, "i", 3);
      \u0275\u0275elementStart(4, "h6", 4);
      \u0275\u0275text(5, "Gesti\xF3n de Refuerzos Acad\xE9micos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "ul", 5)(7, "li", 6)(8, "a", 7);
      \u0275\u0275element(9, "i", 8);
      \u0275\u0275text(10, "\u2800Dashboard ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "li", 6)(12, "a", 9);
      \u0275\u0275element(13, "i", 10);
      \u0275\u0275text(14, " Solicitudes ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "li", 6)(16, "a", 11);
      \u0275\u0275element(17, "i", 12);
      \u0275\u0275text(18, " Historial ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(19, "div", 13)(20, "header", 14);
      \u0275\u0275element(21, "h5", 15);
      \u0275\u0275elementStart(22, "div", 16)(23, "button", 17);
      \u0275\u0275listener("click", function TeacherLayoutComponent_Template_button_click_23_listener() {
        return ctx.toggleDropdown();
      });
      \u0275\u0275elementStart(24, "span", 18);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "div", 19)(27, "span", 20);
      \u0275\u0275text(28);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(29, "i", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(30, TeacherLayoutComponent_Conditional_30_Template, 10, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "main", 22);
      \u0275\u0275element(32, "router-outlet");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(25);
      \u0275\u0275textInterpolate(ctx.userName);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.userInitials);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showDropdown ? 30 : -1);
    }
  }, dependencies: [CommonModule, RouterModule, RouterOutlet, RouterLink, RouterLinkActive], styles: ['\n\n[_nghost-%COMP%] {\n  font-family:\n    "Inter",\n    "Segoe UI",\n    -apple-system,\n    BlinkMacSystemFont,\n    sans-serif;\n}\n.teacher-sidebar[_ngcontent-%COMP%] {\n  width: 15rem;\n  min-width: 15rem;\n  max-width: 15rem;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  background-color: #1B7505;\n  transition: all 0.3s ease-in-out;\n  z-index: 20;\n  overflow-y: auto;\n  border-right: 1px solid rgba(0, 0, 0, 0.15);\n}\n.teacher-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  min-width: 36px;\n  background-color: #1B7505;\n  font-size: 0.8rem;\n  border: 2px solid #e8f5e9;\n}\n.btn-profile[_ngcontent-%COMP%] {\n  background-color: transparent;\n  transition: background-color 0.2s;\n  border-radius: 50px;\n  padding: 4px 12px 4px 12px;\n  border: 1px solid #e0e0e0;\n}\n.btn-profile[_ngcontent-%COMP%]:hover {\n  background-color: #f1f8e9;\n  border-color: #c8e6c9;\n}\n.profile-dropdown[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  min-width: 200px;\n  background: #fff;\n  border-radius: 10px;\n  overflow: hidden;\n  z-index: 1050;\n}\n.profile-dropdown[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  width: 100%;\n  text-align: left;\n  font-size: 0.875rem;\n  cursor: pointer;\n  transition: background-color 0.15s;\n}\n.profile-dropdown[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]:hover {\n  background-color: #fff5f5;\n}\n.dropdown-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1040;\n}\n.nav-link[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n  padding: 0.625rem 0.9375rem;\n  transition: all 0.2s ease-in-out;\n  opacity: 0.85;\n  font-size: 0.9rem;\n}\n.nav-link[_ngcontent-%COMP%]:hover {\n  background-color: rgba(255, 255, 255, 0.15);\n  opacity: 1;\n  transform: translateX(0.25rem);\n}\n.active-link[_ngcontent-%COMP%] {\n  background-color: #124d1c !important;\n  font-weight: 600;\n  opacity: 1;\n  border-left: 4px solid #ffffff;\n  border-radius: 4px 8px 8px 4px;\n}\n.top-header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e0e0e0;\n  position: relative;\n  z-index: 20;\n  overflow: visible;\n}\n.header-title[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  letter-spacing: 0.01em;\n}\n.content-area[_ngcontent-%COMP%] {\n  margin-left: 15rem;\n  overflow: visible;\n}\n/*# sourceMappingURL=teacher-layout.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeacherLayoutComponent, [{
    type: Component,
    args: [{ selector: "app-teacher-layout", standalone: true, imports: [CommonModule, RouterModule], template: '<div class="d-flex vh-100 bg-light">\r\n\r\n  <aside class="teacher-sidebar d-flex flex-column text-white shadow">\r\n    <div class="sidebar-header text-center p-4 border-bottom border-light border-opacity-25">\r\n      <i class="bi bi-mortarboard-fill display-6 mb-2"></i>\r\n      <h6 class="m-0 fw-bold">Gesti\xF3n de Refuerzos Acad\xE9micos</h6>\r\n    </div>\r\n\r\n    <ul class="nav nav-pills flex-column mb-auto p-3 gap-2">\r\n      <li class="nav-item">\r\n        <a routerLink="/teacher/dashboard" routerLinkActive="active-link" class="nav-link text-white">\r\n          <i class="bi bi-boxes"></i>\u2800Dashboard\r\n        </a>\r\n      </li>\r\n      <!-- <li class="nav-item">\r\n        <a routerLink="/teacher/availability" routerLinkActive="active-link" class="nav-link text-white">\r\n          <i class="bi bi-calendar2-week me-2"></i> Disponibilidad\r\n        </a>\r\n      </li> -->\r\n      <li class="nav-item">\r\n        <a routerLink="/teacher/requests" routerLinkActive="active-link" class="nav-link text-white">\r\n          <i class="bi bi-inbox me-2"></i> Solicitudes\r\n        </a>\r\n      </li>\r\n      <li class="nav-item">\r\n        <a routerLink="/teacher/history" routerLinkActive="active-link" class="nav-link text-white">\r\n          <i class="bi bi-clock-history me-2"></i> Historial\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </aside>\r\n\r\n  <div class="flex-grow-1 d-flex flex-column content-area">\r\n\r\n    <header class="top-header bg-white shadow-sm p-3 d-flex justify-content-between align-items-center z-1">\r\n      <h5 class="m-0 text-secondary fw-semibold header-title"></h5>\r\n\r\n      <!-- Profile Dropdown -->\r\n      <div class="position-relative">\r\n        <button type="button" class="btn btn-profile d-flex align-items-center gap-2" (click)="toggleDropdown()">\r\n          <span class="fw-medium text-dark d-none d-md-inline">{{ userName }}</span>\r\n          <div class="teacher-avatar rounded-circle text-white d-flex justify-content-center align-items-center">\r\n            <span class="fw-bold">{{ userInitials }}</span>\r\n          </div>\r\n          <i class="bi bi-chevron-down text-muted small"></i>\r\n        </button>\r\n\r\n        @if (showDropdown) {\r\n        <div class="profile-dropdown shadow-sm border">\r\n          <div class="dropdown-header px-3 py-2 border-bottom">\r\n            <p class="fw-bold mb-0 small">{{ userName }}</p>\r\n            <small class="text-muted">Docente</small>\r\n          </div>\r\n          <button type="button" class="dropdown-item text-danger d-flex align-items-center gap-2 px-3 py-2"\r\n            (click)="logout()">\r\n            <i class="bi bi-box-arrow-left"></i> Cerrar sesi\xF3n\r\n          </button>\r\n        </div>\r\n        <!-- Backdrop to close dropdown on outside click -->\r\n        <div class="dropdown-backdrop" (click)="closeDropdown()"></div>\r\n        }\r\n      </div>\r\n    </header>\r\n\r\n    <main class="flex-grow-1 p-4 overflow-auto">\r\n      <router-outlet></router-outlet>\r\n    </main>\r\n\r\n  </div>\r\n</div>', styles: ['/* src/app/components/teacher/teacher-layout/teacher-layout.component.css */\n:host {\n  font-family:\n    "Inter",\n    "Segoe UI",\n    -apple-system,\n    BlinkMacSystemFont,\n    sans-serif;\n}\n.teacher-sidebar {\n  width: 15rem;\n  min-width: 15rem;\n  max-width: 15rem;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  background-color: #1B7505;\n  transition: all 0.3s ease-in-out;\n  z-index: 20;\n  overflow-y: auto;\n  border-right: 1px solid rgba(0, 0, 0, 0.15);\n}\n.teacher-avatar {\n  width: 36px;\n  height: 36px;\n  min-width: 36px;\n  background-color: #1B7505;\n  font-size: 0.8rem;\n  border: 2px solid #e8f5e9;\n}\n.btn-profile {\n  background-color: transparent;\n  transition: background-color 0.2s;\n  border-radius: 50px;\n  padding: 4px 12px 4px 12px;\n  border: 1px solid #e0e0e0;\n}\n.btn-profile:hover {\n  background-color: #f1f8e9;\n  border-color: #c8e6c9;\n}\n.profile-dropdown {\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  min-width: 200px;\n  background: #fff;\n  border-radius: 10px;\n  overflow: hidden;\n  z-index: 1050;\n}\n.profile-dropdown .dropdown-item {\n  background: none;\n  border: none;\n  width: 100%;\n  text-align: left;\n  font-size: 0.875rem;\n  cursor: pointer;\n  transition: background-color 0.15s;\n}\n.profile-dropdown .dropdown-item:hover {\n  background-color: #fff5f5;\n}\n.dropdown-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 1040;\n}\n.nav-link {\n  border-radius: 0.5rem;\n  padding: 0.625rem 0.9375rem;\n  transition: all 0.2s ease-in-out;\n  opacity: 0.85;\n  font-size: 0.9rem;\n}\n.nav-link:hover {\n  background-color: rgba(255, 255, 255, 0.15);\n  opacity: 1;\n  transform: translateX(0.25rem);\n}\n.active-link {\n  background-color: #124d1c !important;\n  font-weight: 600;\n  opacity: 1;\n  border-left: 4px solid #ffffff;\n  border-radius: 4px 8px 8px 4px;\n}\n.top-header {\n  border-bottom: 1px solid #e0e0e0;\n  position: relative;\n  z-index: 20;\n  overflow: visible;\n}\n.header-title {\n  font-size: 0.95rem;\n  letter-spacing: 0.01em;\n}\n.content-area {\n  margin-left: 15rem;\n  overflow: visible;\n}\n/*# sourceMappingURL=teacher-layout.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeacherLayoutComponent, { className: "TeacherLayoutComponent", filePath: "app/components/teacher/teacher-layout/teacher-layout.component.ts", lineNumber: 13 });
})();
export {
  TeacherLayoutComponent
};
//# sourceMappingURL=chunk-LFZB532Y.js.map
