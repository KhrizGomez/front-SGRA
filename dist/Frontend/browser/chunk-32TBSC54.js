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
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-OENL2SFL.js";

// src/app/components/workAreaManager/work-area-manager-layout/work-area-manager-layout.component.ts
var _forTrack0 = ($index, $item) => $item.path;
function WorkAreaManagerLayoutComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 8)(1, "a", 31);
    \u0275\u0275element(2, "i");
    \u0275\u0275elementStart(3, "span", 12);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", item_r1.path);
    \u0275\u0275attribute("aria-label", item_r1.label);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("bi ", item_r1.icon, " nav-icon"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
var WorkAreaManagerLayoutComponent = class _WorkAreaManagerLayoutComponent {
  authService = inject(AuthService);
  isSidebarCollapsed = signal(false, ...ngDevMode ? [{ debugName: "isSidebarCollapsed" }] : []);
  userName = signal("Gestor de Espacios", ...ngDevMode ? [{ debugName: "userName" }] : []);
  userRoleLabel = signal("Gestor de \xC1rea", ...ngDevMode ? [{ debugName: "userRoleLabel" }] : []);
  userInitials = computed(() => {
    const parts = this.userName().trim().split(" ");
    const first = parts[0]?.[0] ?? "G";
    const second = parts[1]?.[0] ?? "";
    return (first + second).toUpperCase();
  }, ...ngDevMode ? [{ debugName: "userInitials" }] : []);
  navItems = [
    { path: "/workAreaManagement/dashboard", label: "Dashboard", icon: "bi-boxes" },
    { path: "/workAreaManagement/management-requests", label: "Gestionar Solicitudes", icon: "bi-clipboard-check" }
  ];
  ngOnInit() {
    const user = this.authService.currentUser();
    if (user) {
      const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
      this.userName.set(fullName || user.username || "Gestor de Espacios");
      this.userRoleLabel.set("Gestor de \xC1rea");
    }
  }
  toggleSidebar() {
    this.isSidebarCollapsed.update((v) => !v);
  }
  logout() {
    this.authService.logout().subscribe();
  }
  static \u0275fac = function WorkAreaManagerLayoutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WorkAreaManagerLayoutComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WorkAreaManagerLayoutComponent, selectors: [["app-work-area-manager-layout"]], decls: 41, vars: 5, consts: [[1, "d-flex", "vh-100", "bg-light"], ["aria-label", "Navegaci\xF3n principal", 1, "wam-sidebar", "d-flex", "flex-column", "text-white", "shadow"], [1, "sidebar-header", "text-center", "p-4", "border-bottom", "border-light", "border-opacity-25"], [1, "bi", "bi-mortarboard-fill", "display-6", "mb-2"], [1, "brand-text"], [1, "m-0", "fw-bold"], ["aria-label", "Men\xFA de gesti\xF3n de \xE1rea"], [1, "nav", "nav-pills", "flex-column", "mb-auto", "p-3", "gap-2"], [1, "nav-item"], [1, "p-3", "border-top", "border-light", "border-opacity-25", "mt-auto"], ["type", "button", "aria-label", "Cerrar sesi\xF3n", 1, "btn", "btn-logout", "text-white", "w-100", "text-start", "d-flex", "align-items-center", "nav-link", "logout-link", 3, "click"], [1, "bi", "bi-box-arrow-left", "nav-icon"], [1, "nav-label"], [1, "flex-grow-1", "d-flex", "flex-column", "overflow-hidden"], [1, "bg-white", "shadow-sm", "p-3", "d-flex", "justify-content-between", "align-items-center", "z-1"], [1, "d-flex", "align-items-center", "gap-3"], ["type", "button", "aria-label", "Contraer o expandir men\xFA lateral", 1, "btn", "btn-toggle-sidebar", 3, "click"], [1, "bi", "bi-list", "fs-5"], [1, "m-0", "text-secondary", "fw-semibold", "d-none", "d-md-block"], [1, "dropdown"], ["type", "button", "data-bs-toggle", "dropdown", "aria-expanded", "false", "aria-haspopup", "true", "aria-label", "Men\xFA de usuario", 1, "btn", "btn-profile", "d-flex", "align-items-center", "gap-2", "border-0"], [1, "user-avatar", "rounded-circle", "text-white", "d-flex", "justify-content-center", "align-items-center", "shadow-sm"], [1, "d-none", "d-sm-block", "text-start"], [1, "fw-medium", "text-dark", "d-block", "lh-1"], [1, "text-muted"], [1, "bi", "bi-chevron-down", "text-muted"], ["role", "menu", 1, "dropdown-menu", "dropdown-menu-end", "shadow-sm"], ["role", "none"], ["type", "button", "role", "menuitem", 1, "dropdown-item", "text-danger", 3, "click"], [1, "bi", "bi-box-arrow-left", "me-2"], [1, "flex-grow-1", "p-4", "overflow-auto"], ["routerLinkActive", "active-link", 1, "nav-link", "text-white", "d-flex", "align-items-center", 3, "routerLink"]], template: function WorkAreaManagerLayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "aside", 1)(2, "div", 2);
      \u0275\u0275element(3, "i", 3);
      \u0275\u0275elementStart(4, "div", 4)(5, "h6", 5);
      \u0275\u0275text(6, "Gesti\xF3n de refuerzos acad\xE9micos");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "nav", 6)(8, "ul", 7);
      \u0275\u0275repeaterCreate(9, WorkAreaManagerLayoutComponent_For_10_Template, 5, 6, "li", 8, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 9)(12, "button", 10);
      \u0275\u0275listener("click", function WorkAreaManagerLayoutComponent_Template_button_click_12_listener() {
        return ctx.logout();
      });
      \u0275\u0275element(13, "i", 11);
      \u0275\u0275elementStart(14, "span", 12);
      \u0275\u0275text(15, "Cerrar Sesi\xF3n");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(16, "div", 13)(17, "header", 14)(18, "div", 15)(19, "button", 16);
      \u0275\u0275listener("click", function WorkAreaManagerLayoutComponent_Template_button_click_19_listener() {
        return ctx.toggleSidebar();
      });
      \u0275\u0275element(20, "i", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "h5", 18);
      \u0275\u0275text(22, " SGRA | Sistema de Gesti\xF3n de Refuerzos Acad\xE9micos ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "div", 15)(24, "div", 19)(25, "button", 20)(26, "div", 21);
      \u0275\u0275text(27);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div", 22)(29, "span", 23);
      \u0275\u0275text(30);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "small", 24);
      \u0275\u0275text(32);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(33, "i", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "ul", 26)(35, "li", 27)(36, "button", 28);
      \u0275\u0275listener("click", function WorkAreaManagerLayoutComponent_Template_button_click_36_listener() {
        return ctx.logout();
      });
      \u0275\u0275element(37, "i", 29);
      \u0275\u0275text(38, "Cerrar Sesi\xF3n ");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(39, "main", 30);
      \u0275\u0275element(40, "router-outlet");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275classProp("collapsed", ctx.isSidebarCollapsed());
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.navItems);
      \u0275\u0275advance(18);
      \u0275\u0275textInterpolate1(" ", ctx.userInitials(), " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.userName());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.userRoleLabel());
    }
  }, dependencies: [CommonModule, RouterModule, RouterOutlet, RouterLink, RouterLinkActive], styles: ["\n\n[_nghost-%COMP%] {\n  --sgra-primary: #1B7505;\n  --sgra-primary-dark: #124d1c;\n  --sgra-surface: #ffffff;\n  --sgra-border: rgba(255, 255, 255, 0.25);\n  --sgra-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.wam-sidebar[_ngcontent-%COMP%] {\n  width: 17.5rem;\n  background-color: var(--sgra-primary);\n  transition: width 0.3s ease-in-out;\n}\n.wam-sidebar.collapsed[_ngcontent-%COMP%] {\n  width: 5rem;\n}\n.wam-sidebar.collapsed[_ngcontent-%COMP%]   .brand-text[_ngcontent-%COMP%], \n.wam-sidebar.collapsed[_ngcontent-%COMP%]   .nav-label[_ngcontent-%COMP%] {\n  display: none;\n}\n.wam-sidebar.collapsed[_ngcontent-%COMP%]   .nav-icon[_ngcontent-%COMP%] {\n  margin-right: 0;\n}\n.sidebar-header[_ngcontent-%COMP%] {\n  transition: padding 0.3s ease-in-out;\n}\n.wam-sidebar.collapsed[_ngcontent-%COMP%]   .sidebar-header[_ngcontent-%COMP%] {\n  padding: 1rem !important;\n}\n.nav-icon[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  margin-right: 0.625rem;\n  min-width: 1.25rem;\n}\n.nav-link[_ngcontent-%COMP%], \n.btn-logout[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n  padding: 0.625rem 0.9375rem;\n  transition: all 0.2s ease-in-out;\n}\n.nav-link[_ngcontent-%COMP%] {\n  opacity: 0.85;\n}\n.nav-link[_ngcontent-%COMP%]:hover {\n  background-color: rgba(255, 255, 255, 0.15);\n  opacity: 1;\n  transform: translateX(0.25rem);\n}\n.active-link[_ngcontent-%COMP%] {\n  background-color: var(--sgra-primary-dark) !important;\n  font-weight: 600;\n  opacity: 1;\n  border-left: 0.25rem solid #ffffff;\n  border-radius: 0.25rem 0.5rem 0.5rem 0.25rem;\n}\n.btn-logout[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: none;\n  cursor: pointer;\n}\n.btn-logout[_ngcontent-%COMP%]:hover {\n  background-color: #9c5151;\n}\n.btn-toggle-sidebar[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: 1px solid #dee2e6;\n  border-radius: 0.5rem;\n  padding: 0.5rem 0.75rem;\n  transition: background-color 0.2s;\n}\n.btn-toggle-sidebar[_ngcontent-%COMP%]:hover {\n  background-color: #f8f9fa;\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 2.5rem;\n  background-color: var(--sgra-primary);\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n.btn-profile[_ngcontent-%COMP%] {\n  background-color: transparent;\n  transition: background-color 0.2s;\n  border-radius: 3.125rem;\n  padding: 0.3125rem 0.9375rem 0.3125rem 0.3125rem;\n}\n.btn-profile[_ngcontent-%COMP%]:hover {\n  background-color: #f8f9fa;\n}\n/*# sourceMappingURL=work-area-manager-layout.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WorkAreaManagerLayoutComponent, [{
    type: Component,
    args: [{ selector: "app-work-area-manager-layout", standalone: true, imports: [CommonModule, RouterModule], template: '<div class="d-flex vh-100 bg-light">\r\n\r\n  <aside class="wam-sidebar d-flex flex-column text-white shadow" [class.collapsed]="isSidebarCollapsed()"\r\n        aria-label="Navegaci\xF3n principal">\r\n\r\n    <div class="sidebar-header text-center p-4 border-bottom border-light border-opacity-25">\r\n      <i class="bi bi-mortarboard-fill display-6 mb-2"></i>\r\n      <div class="brand-text">\r\n        <h6 class="m-0 fw-bold">Gesti\xF3n de refuerzos acad\xE9micos</h6>\r\n      </div>\r\n    </div>\r\n\r\n    <nav aria-label="Men\xFA de gesti\xF3n de \xE1rea">\r\n      <ul class="nav nav-pills flex-column mb-auto p-3 gap-2">\r\n        @for (item of navItems; track item.path) {\r\n          <li class="nav-item">\r\n            <a [routerLink]="item.path" routerLinkActive="active-link"\r\n              class="nav-link text-white d-flex align-items-center"\r\n              [attr.aria-label]="item.label">\r\n              <i class="bi {{ item.icon }} nav-icon"></i>\r\n              <span class="nav-label">{{ item.label }}</span>\r\n            </a>\r\n          </li>\r\n        }\r\n      </ul>\r\n    </nav>\r\n\r\n    <div class="p-3 border-top border-light border-opacity-25 mt-auto">\r\n      <button type="button" (click)="logout()"\r\n              class="btn btn-logout text-white w-100 text-start d-flex align-items-center nav-link logout-link"\r\n              aria-label="Cerrar sesi\xF3n">\r\n        <i class="bi bi-box-arrow-left nav-icon"></i>\r\n        <span class="nav-label">Cerrar Sesi\xF3n</span>\r\n      </button>\r\n    </div>\r\n  </aside>\r\n\r\n  <div class="flex-grow-1 d-flex flex-column overflow-hidden">\r\n\r\n    <header class="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center z-1">\r\n      <div class="d-flex align-items-center gap-3">\r\n        <button type="button" class="btn btn-toggle-sidebar" (click)="toggleSidebar()"\r\n                aria-label="Contraer o expandir men\xFA lateral">\r\n          <i class="bi bi-list fs-5"></i>\r\n        </button>\r\n        <h5 class="m-0 text-secondary fw-semibold d-none d-md-block">\r\n          SGRA | Sistema de Gesti\xF3n de Refuerzos Acad\xE9micos\r\n        </h5>\r\n      </div>\r\n\r\n      <div class="d-flex align-items-center gap-3">\r\n        <div class="dropdown">\r\n          <button type="button"\r\n                  class="btn btn-profile d-flex align-items-center gap-2 border-0"\r\n                  data-bs-toggle="dropdown"\r\n                  aria-expanded="false"\r\n                  aria-haspopup="true"\r\n                  aria-label="Men\xFA de usuario">\r\n            <div class="user-avatar rounded-circle text-white d-flex justify-content-center align-items-center shadow-sm">\r\n              {{ userInitials() }}\r\n            </div>\r\n            <div class="d-none d-sm-block text-start">\r\n              <span class="fw-medium text-dark d-block lh-1">{{ userName() }}</span>\r\n              <small class="text-muted">{{ userRoleLabel() }}</small>\r\n            </div>\r\n            <i class="bi bi-chevron-down text-muted"></i>\r\n          </button>\r\n          <ul class="dropdown-menu dropdown-menu-end shadow-sm" role="menu">\r\n            <li role="none">\r\n              <button class="dropdown-item text-danger" type="button" (click)="logout()" role="menuitem">\r\n                <i class="bi bi-box-arrow-left me-2"></i>Cerrar Sesi\xF3n\r\n              </button>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </header>\r\n\r\n    <main class="flex-grow-1 p-4 overflow-auto">\r\n      <router-outlet></router-outlet>\r\n    </main>\r\n\r\n  </div>\r\n</div>\r\n', styles: ["/* src/app/components/workAreaManager/work-area-manager-layout/work-area-manager-layout.component.css */\n:host {\n  --sgra-primary: #1B7505;\n  --sgra-primary-dark: #124d1c;\n  --sgra-surface: #ffffff;\n  --sgra-border: rgba(255, 255, 255, 0.25);\n  --sgra-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.wam-sidebar {\n  width: 17.5rem;\n  background-color: var(--sgra-primary);\n  transition: width 0.3s ease-in-out;\n}\n.wam-sidebar.collapsed {\n  width: 5rem;\n}\n.wam-sidebar.collapsed .brand-text,\n.wam-sidebar.collapsed .nav-label {\n  display: none;\n}\n.wam-sidebar.collapsed .nav-icon {\n  margin-right: 0;\n}\n.sidebar-header {\n  transition: padding 0.3s ease-in-out;\n}\n.wam-sidebar.collapsed .sidebar-header {\n  padding: 1rem !important;\n}\n.nav-icon {\n  font-size: 1.1rem;\n  margin-right: 0.625rem;\n  min-width: 1.25rem;\n}\n.nav-link,\n.btn-logout {\n  border-radius: 0.5rem;\n  padding: 0.625rem 0.9375rem;\n  transition: all 0.2s ease-in-out;\n}\n.nav-link {\n  opacity: 0.85;\n}\n.nav-link:hover {\n  background-color: rgba(255, 255, 255, 0.15);\n  opacity: 1;\n  transform: translateX(0.25rem);\n}\n.active-link {\n  background-color: var(--sgra-primary-dark) !important;\n  font-weight: 600;\n  opacity: 1;\n  border-left: 0.25rem solid #ffffff;\n  border-radius: 0.25rem 0.5rem 0.5rem 0.25rem;\n}\n.btn-logout {\n  background-color: transparent;\n  border: none;\n  cursor: pointer;\n}\n.btn-logout:hover {\n  background-color: #9c5151;\n}\n.btn-toggle-sidebar {\n  background-color: transparent;\n  border: 1px solid #dee2e6;\n  border-radius: 0.5rem;\n  padding: 0.5rem 0.75rem;\n  transition: background-color 0.2s;\n}\n.btn-toggle-sidebar:hover {\n  background-color: #f8f9fa;\n}\n.user-avatar {\n  width: 2.5rem;\n  height: 2.5rem;\n  background-color: var(--sgra-primary);\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n.btn-profile {\n  background-color: transparent;\n  transition: background-color 0.2s;\n  border-radius: 3.125rem;\n  padding: 0.3125rem 0.9375rem 0.3125rem 0.3125rem;\n}\n.btn-profile:hover {\n  background-color: #f8f9fa;\n}\n/*# sourceMappingURL=work-area-manager-layout.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WorkAreaManagerLayoutComponent, { className: "WorkAreaManagerLayoutComponent", filePath: "app/components/workareamanager/work-area-manager-layout/work-area-manager-layout.component.ts", lineNumber: 13 });
})();
export {
  WorkAreaManagerLayoutComponent
};
//# sourceMappingURL=chunk-32TBSC54.js.map
