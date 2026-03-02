import {
  AuthService
} from "./chunk-ZOQXTRIP.js";
import {
  Router
} from "./chunk-MXF362TW.js";
import "./chunk-K6SHIZGP.js";
import {
  CommonModule,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵtext
} from "./chunk-OENL2SFL.js";

// src/app/components/auth/change-password/change-password.component.ts
var ChangePasswordComponent = class _ChangePasswordComponent {
  router;
  authService;
  constructor(router, authService) {
    this.router = router;
    this.authService = authService;
  }
  goBackToLogin() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(["/login"]);
      },
      error: () => {
        this.router.navigate(["/login"]);
      }
    });
  }
  static \u0275fac = function ChangePasswordComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChangePasswordComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChangePasswordComponent, selectors: [["app-change-password"]], decls: 39, vars: 0, consts: [[1, "change-password-container"], [1, "change-password-card"], [1, "change-password-header"], ["src", "assets/UTEQ_logo.ico", "alt", "UTEQ Logo", 1, "change-password-logo"], [1, "change-password-title"], [1, "change-password-subtitle"], [1, "change-password-body"], [1, "warning-icon-wrapper"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "warning-icon"], ["d", "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"], ["x1", "12", "y1", "9", "x2", "12", "y2", "13"], ["x1", "12", "y1", "17", "x2", "12.01", "y2", "17"], [1, "info-message"], [1, "placeholder-form"], [1, "placeholder-field"], [1, "placeholder-label"], [1, "placeholder-input"], [1, "placeholder-button"], [1, "btn-back", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "change-password-footer"]], template: function ChangePasswordComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275domElement(3, "img", 3);
      \u0275\u0275domElementStart(4, "h1", 4);
      \u0275\u0275text(5, "Cambio de Contrase\xF1a");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "p", 5);
      \u0275\u0275text(7, "Es necesario que actualices tu contrase\xF1a para continuar");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(8, "div", 6)(9, "div", 7);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(10, "svg", 8);
      \u0275\u0275domElement(11, "path", 9)(12, "line", 10)(13, "line", 11);
      \u0275\u0275domElementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(14, "div", 12)(15, "h2");
      \u0275\u0275text(16, "Cambio de contrase\xF1a requerido");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(17, "p");
      \u0275\u0275text(18, " El administrador ha solicitado que cambies tu contrase\xF1a antes de poder acceder al sistema. Esta funcionalidad estar\xE1 disponible pr\xF3ximamente. ");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(19, "div", 13)(20, "div", 14);
      \u0275\u0275domElement(21, "div", 15)(22, "div", 16);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(23, "div", 14);
      \u0275\u0275domElement(24, "div", 15)(25, "div", 16);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(26, "div", 14);
      \u0275\u0275domElement(27, "div", 15)(28, "div", 16);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElement(29, "div", 17);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(30, "button", 18);
      \u0275\u0275domListener("click", function ChangePasswordComponent_Template_button_click_30_listener() {
        return ctx.goBackToLogin();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(31, "svg", 19);
      \u0275\u0275domElement(32, "line", 20)(33, "polyline", 21);
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(34, "span");
      \u0275\u0275text(35, "Volver al inicio de sesi\xF3n");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(36, "div", 22)(37, "p");
      \u0275\u0275text(38, "\xA9 2026 UTEQ - Todos los derechos reservados");
      \u0275\u0275domElementEnd()()()();
    }
  }, dependencies: [CommonModule], styles: ["\n\n[_nghost-%COMP%] {\n  --primary-green: #1B7505;\n  --primary-green-light: #239108;\n  --primary-green-dark: #145904;\n  --bg-gradient:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  --bg-card: #ffffff;\n  --text-dark: #212529;\n  --text-muted: #6c757d;\n  --border-color: #dee2e6;\n  --warning-color: #e67e22;\n  --warning-bg: #fef9e7;\n  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15);\n  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);\n  --radius-sm: 8px;\n  --radius-md: 12px;\n  --radius-lg: 16px;\n}\n.change-password-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  min-height: 100dvh;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--bg-gradient);\n  padding: 1rem;\n  box-sizing: border-box;\n}\n.change-password-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 440px;\n  background: var(--bg-card);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-lg);\n  overflow: hidden;\n}\n.change-password-header[_ngcontent-%COMP%] {\n  background: var(--primary-green);\n  padding: clamp(1.5rem, 5vw, 2rem);\n  text-align: center;\n  color: white;\n}\n.change-password-logo[_ngcontent-%COMP%] {\n  width: auto;\n  height: clamp(50px, 12vw, 65px);\n  margin-bottom: 0.75rem;\n  object-fit: contain;\n}\n.change-password-title[_ngcontent-%COMP%] {\n  font-size: clamp(1rem, 3vw, 1.25rem);\n  font-weight: 600;\n  margin: 0 0 0.5rem 0;\n  line-height: 1.3;\n}\n.change-password-subtitle[_ngcontent-%COMP%] {\n  font-size: clamp(0.8rem, 2.5vw, 0.875rem);\n  opacity: 0.9;\n  margin: 0;\n}\n.change-password-body[_ngcontent-%COMP%] {\n  padding: clamp(1.5rem, 5vw, 2rem);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1.25rem;\n}\n.warning-icon-wrapper[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  background: var(--warning-bg);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.warning-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  color: var(--warning-color);\n}\n.info-message[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.info-message[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--text-dark);\n  margin: 0 0 0.5rem 0;\n}\n.info-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--text-muted);\n  margin: 0;\n  line-height: 1.5;\n}\n.placeholder-form[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1rem;\n  border: 2px dashed var(--border-color);\n  border-radius: var(--radius-sm);\n  background: #fafafa;\n}\n.placeholder-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n}\n.placeholder-label[_ngcontent-%COMP%] {\n  width: 40%;\n  height: 14px;\n  background: #e0e0e0;\n  border-radius: 4px;\n  animation: _ngcontent-%COMP%_shimmer 1.5s ease-in-out infinite;\n}\n.placeholder-input[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 40px;\n  background: #e8e8e8;\n  border-radius: var(--radius-sm);\n  animation: _ngcontent-%COMP%_shimmer 1.5s ease-in-out infinite;\n  animation-delay: 0.2s;\n}\n.placeholder-button[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 44px;\n  background: #c8e6c9;\n  border-radius: var(--radius-sm);\n  margin-top: 0.5rem;\n  animation: _ngcontent-%COMP%_shimmer 1.5s ease-in-out infinite;\n  animation-delay: 0.4s;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n.btn-back[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem 1.25rem;\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: var(--primary-green);\n  background: transparent;\n  border: 2px solid var(--primary-green);\n  border-radius: var(--radius-sm);\n  cursor: pointer;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n}\n.btn-back[_ngcontent-%COMP%]:hover {\n  background: var(--primary-green);\n  color: white;\n  box-shadow: var(--shadow-md);\n}\n.btn-back[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n.btn-back[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n}\n.change-password-footer[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  text-align: center;\n  background: #f8f9fa;\n  border-top: 1px solid var(--border-color);\n}\n.change-password-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.75rem;\n  color: var(--text-muted);\n}\n@media (max-width: 400px) {\n  .change-password-card[_ngcontent-%COMP%] {\n    border-radius: var(--radius-md);\n  }\n}\n/*# sourceMappingURL=change-password.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChangePasswordComponent, [{
    type: Component,
    args: [{ selector: "app-change-password", standalone: true, imports: [CommonModule], template: '<div class="change-password-container">\r\n  <div class="change-password-card">\r\n    <!-- Header con logo -->\r\n    <div class="change-password-header">\r\n      <img src="assets/UTEQ_logo.ico" alt="UTEQ Logo" class="change-password-logo">\r\n      <h1 class="change-password-title">Cambio de Contrase\xF1a</h1>\r\n      <p class="change-password-subtitle">Es necesario que actualices tu contrase\xF1a para continuar</p>\r\n    </div>\r\n\r\n    <!-- Contenido placeholder -->\r\n    <div class="change-password-body">\r\n      <!-- Icono de advertencia -->\r\n      <div class="warning-icon-wrapper">\r\n        <svg class="warning-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r\n          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>\r\n          <line x1="12" y1="9" x2="12" y2="13"/>\r\n          <line x1="12" y1="17" x2="12.01" y2="17"/>\r\n        </svg>\r\n      </div>\r\n\r\n      <div class="info-message">\r\n        <h2>Cambio de contrase\xF1a requerido</h2>\r\n        <p>\r\n          El administrador ha solicitado que cambies tu contrase\xF1a antes de poder acceder al sistema.\r\n          Esta funcionalidad estar\xE1 disponible pr\xF3ximamente.\r\n        </p>\r\n      </div>\r\n\r\n      <!-- Placeholder: aqu\xED ir\xE1 el formulario de cambio de contrase\xF1a -->\r\n      <div class="placeholder-form">\r\n        <div class="placeholder-field">\r\n          <div class="placeholder-label"></div>\r\n          <div class="placeholder-input"></div>\r\n        </div>\r\n        <div class="placeholder-field">\r\n          <div class="placeholder-label"></div>\r\n          <div class="placeholder-input"></div>\r\n        </div>\r\n        <div class="placeholder-field">\r\n          <div class="placeholder-label"></div>\r\n          <div class="placeholder-input"></div>\r\n        </div>\r\n        <div class="placeholder-button"></div>\r\n      </div>\r\n\r\n      <!-- Bot\xF3n volver al login -->\r\n      <button class="btn-back" (click)="goBackToLogin()">\r\n        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r\n          <line x1="19" y1="12" x2="5" y2="12"/>\r\n          <polyline points="12 19 5 12 12 5"/>\r\n        </svg>\r\n        <span>Volver al inicio de sesi\xF3n</span>\r\n      </button>\r\n    </div>\r\n\r\n    <!-- Footer -->\r\n    <div class="change-password-footer">\r\n      <p>\xA9 2026 UTEQ - Todos los derechos reservados</p>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n', styles: ["/* src/app/components/auth/change-password/change-password.component.css */\n:host {\n  --primary-green: #1B7505;\n  --primary-green-light: #239108;\n  --primary-green-dark: #145904;\n  --bg-gradient:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  --bg-card: #ffffff;\n  --text-dark: #212529;\n  --text-muted: #6c757d;\n  --border-color: #dee2e6;\n  --warning-color: #e67e22;\n  --warning-bg: #fef9e7;\n  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15);\n  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);\n  --radius-sm: 8px;\n  --radius-md: 12px;\n  --radius-lg: 16px;\n}\n.change-password-container {\n  min-height: 100vh;\n  min-height: 100dvh;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--bg-gradient);\n  padding: 1rem;\n  box-sizing: border-box;\n}\n.change-password-card {\n  width: 100%;\n  max-width: 440px;\n  background: var(--bg-card);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-lg);\n  overflow: hidden;\n}\n.change-password-header {\n  background: var(--primary-green);\n  padding: clamp(1.5rem, 5vw, 2rem);\n  text-align: center;\n  color: white;\n}\n.change-password-logo {\n  width: auto;\n  height: clamp(50px, 12vw, 65px);\n  margin-bottom: 0.75rem;\n  object-fit: contain;\n}\n.change-password-title {\n  font-size: clamp(1rem, 3vw, 1.25rem);\n  font-weight: 600;\n  margin: 0 0 0.5rem 0;\n  line-height: 1.3;\n}\n.change-password-subtitle {\n  font-size: clamp(0.8rem, 2.5vw, 0.875rem);\n  opacity: 0.9;\n  margin: 0;\n}\n.change-password-body {\n  padding: clamp(1.5rem, 5vw, 2rem);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1.25rem;\n}\n.warning-icon-wrapper {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  background: var(--warning-bg);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.warning-icon {\n  width: 36px;\n  height: 36px;\n  color: var(--warning-color);\n}\n.info-message {\n  text-align: center;\n}\n.info-message h2 {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--text-dark);\n  margin: 0 0 0.5rem 0;\n}\n.info-message p {\n  font-size: 0.875rem;\n  color: var(--text-muted);\n  margin: 0;\n  line-height: 1.5;\n}\n.placeholder-form {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1rem;\n  border: 2px dashed var(--border-color);\n  border-radius: var(--radius-sm);\n  background: #fafafa;\n}\n.placeholder-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n}\n.placeholder-label {\n  width: 40%;\n  height: 14px;\n  background: #e0e0e0;\n  border-radius: 4px;\n  animation: shimmer 1.5s ease-in-out infinite;\n}\n.placeholder-input {\n  width: 100%;\n  height: 40px;\n  background: #e8e8e8;\n  border-radius: var(--radius-sm);\n  animation: shimmer 1.5s ease-in-out infinite;\n  animation-delay: 0.2s;\n}\n.placeholder-button {\n  width: 100%;\n  height: 44px;\n  background: #c8e6c9;\n  border-radius: var(--radius-sm);\n  margin-top: 0.5rem;\n  animation: shimmer 1.5s ease-in-out infinite;\n  animation-delay: 0.4s;\n}\n@keyframes shimmer {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n.btn-back {\n  width: 100%;\n  padding: 0.75rem 1.25rem;\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: var(--primary-green);\n  background: transparent;\n  border: 2px solid var(--primary-green);\n  border-radius: var(--radius-sm);\n  cursor: pointer;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n}\n.btn-back:hover {\n  background: var(--primary-green);\n  color: white;\n  box-shadow: var(--shadow-md);\n}\n.btn-back:active {\n  transform: scale(0.98);\n}\n.btn-back svg {\n  width: 18px;\n  height: 18px;\n}\n.change-password-footer {\n  padding: 1rem 1.5rem;\n  text-align: center;\n  background: #f8f9fa;\n  border-top: 1px solid var(--border-color);\n}\n.change-password-footer p {\n  margin: 0;\n  font-size: 0.75rem;\n  color: var(--text-muted);\n}\n@media (max-width: 400px) {\n  .change-password-card {\n    border-radius: var(--radius-md);\n  }\n}\n/*# sourceMappingURL=change-password.component.css.map */\n"] }]
  }], () => [{ type: Router }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChangePasswordComponent, { className: "ChangePasswordComponent", filePath: "app/components/auth/change-password/change-password.component.ts", lineNumber: 13 });
})();
export {
  ChangePasswordComponent
};
//# sourceMappingURL=chunk-UKW5I2Q2.js.map
