import {
  AuthService
} from "./chunk-ZOQXTRIP.js";
import {
  Router
} from "./chunk-MXF362TW.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-RREETWSH.js";
import "./chunk-K6SHIZGP.js";
import {
  CommonModule,
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-OENL2SFL.js";

// src/app/components/auth/login.component.ts
function LoginComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 24);
    \u0275\u0275element(2, "circle", 25)(3, "line", 26)(4, "line", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
function LoginComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getUsernameError());
  }
}
function LoginComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 21);
    \u0275\u0275element(1, "path", 28)(2, "line", 29);
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 21);
    \u0275\u0275element(1, "path", 30)(2, "circle", 31);
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getPasswordError());
  }
}
function LoginComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 32);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Cargando...");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Iniciar sesi\xF3n");
    \u0275\u0275elementEnd();
  }
}
var LoginComponent = class _LoginComponent {
  fb;
  authService;
  router;
  loginForm;
  showPassword = signal(false, ...ngDevMode ? [{ debugName: "showPassword" }] : []);
  errorMessage = signal(null, ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  constructor(fb, authService, router) {
    this.fb = fb;
    this.authService = authService;
    this.router = router;
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required, Validators.minLength(5)]]
    });
  }
  togglePassword() {
    this.showPassword.update((v) => !v);
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.errorMessage.set(null);
    this.isLoading.set(true);
    const { username, password } = this.loginForm.value;
    this.authService.login({ username, password }).subscribe({
      next: (user) => {
        this.isLoading.set(false);
        if (user.accountState === "C") {
          this.router.navigate(["/change-password"]);
          return;
        }
        this.authService.redirectByRole(user);
      },
      error: (error) => {
        this.isLoading.set(false);
        if (error.error?.error) {
          this.errorMessage.set(error.error.error);
        } else {
          this.errorMessage.set("Error al conectar con el servidor");
        }
      }
    });
  }
  // Helpers para validación
  get usernameInvalid() {
    const ctrl = this.loginForm.get("username");
    return ctrl ? ctrl.invalid && ctrl.touched : false;
  }
  get passwordInvalid() {
    const ctrl = this.loginForm.get("password");
    return ctrl ? ctrl.invalid && ctrl.touched : false;
  }
  getUsernameError() {
    const ctrl = this.loginForm.get("username");
    if (ctrl?.hasError("required"))
      return "El usuario es obligatorio";
    if (ctrl?.hasError("minlength"))
      return "M\xEDnimo 3 caracteres";
    return "";
  }
  getPasswordError() {
    const ctrl = this.loginForm.get("password");
    if (ctrl?.hasError("required"))
      return "La contrase\xF1a es obligatoria";
    if (ctrl?.hasError("minlength"))
      return "M\xEDnimo 5 caracteres";
    return "";
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 37, vars: 12, consts: [[1, "login-container"], [1, "login-card"], [1, "login-header"], ["src", "assets/UTEQ_logo.ico", "alt", "UTEQ Logo", 1, "login-logo"], [1, "login-title"], [1, "login-subtitle"], [1, "login-form", 3, "ngSubmit", "formGroup"], [1, "alert", "alert-danger"], [1, "form-group"], ["for", "username", 1, "form-label"], [1, "input-wrapper"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "input-icon"], ["d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"], ["cx", "12", "cy", "7", "r", "4"], ["type", "text", "id", "username", "formControlName", "username", "placeholder", "Ingresa tu usuario", "autocomplete", "username", 1, "form-control"], [1, "invalid-feedback"], ["for", "password", 1, "form-label"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2", "ry", "2"], ["d", "M7 11V7a5 5 0 0 1 10 0v4"], ["id", "password", "formControlName", "password", "placeholder", "Ingresa tu contrase\xF1a", "autocomplete", "current-password", 1, "form-control", 3, "type"], ["type", "button", "tabindex", "-1", 1, "password-toggle", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["type", "submit", 1, "btn-login", 3, "disabled"], [1, "login-footer"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "alert-icon"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], ["d", "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"], ["cx", "12", "cy", "12", "r", "3"], [1, "spinner"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "img", 3);
      \u0275\u0275elementStart(4, "h1", 4);
      \u0275\u0275text(5, "Sistema de Gesti\xF3n de Refuerzos Acad\xE9micos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 5);
      \u0275\u0275text(7, "Inicia sesi\xF3n para continuar");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "form", 6);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_8_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275conditionalCreate(9, LoginComponent_Conditional_9_Template, 7, 1, "div", 7);
      \u0275\u0275elementStart(10, "div", 8)(11, "label", 9);
      \u0275\u0275text(12, "Usuario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 10);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(14, "svg", 11);
      \u0275\u0275element(15, "path", 12)(16, "circle", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275element(17, "input", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(18, LoginComponent_Conditional_18_Template, 2, 1, "div", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 8)(20, "label", 16);
      \u0275\u0275text(21, "Contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div", 10);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(23, "svg", 11);
      \u0275\u0275element(24, "rect", 17)(25, "path", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275element(26, "input", 19);
      \u0275\u0275elementStart(27, "button", 20);
      \u0275\u0275listener("click", function LoginComponent_Template_button_click_27_listener() {
        return ctx.togglePassword();
      });
      \u0275\u0275conditionalCreate(28, LoginComponent_Conditional_28_Template, 3, 0, ":svg:svg", 21)(29, LoginComponent_Conditional_29_Template, 3, 0, ":svg:svg", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(30, LoginComponent_Conditional_30_Template, 2, 1, "div", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "button", 22);
      \u0275\u0275conditionalCreate(32, LoginComponent_Conditional_32_Template, 3, 0)(33, LoginComponent_Conditional_33_Template, 2, 0, "span");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "div", 23)(35, "p");
      \u0275\u0275text(36, "\xA9 2026 UTEQ - Todos los derechos reservados");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("formGroup", ctx.loginForm);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 9 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275classProp("is-invalid", ctx.usernameInvalid);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.usernameInvalid ? 18 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275classProp("is-invalid", ctx.passwordInvalid);
      \u0275\u0275property("type", ctx.showPassword() ? "text" : "password");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showPassword() ? 28 : 29);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.passwordInvalid ? 30 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 32 : 33);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ['\n\n[_nghost-%COMP%] {\n  --accent: #2e7d32;\n  --accent-hover: #1b5e20;\n  --accent-subtle: rgba(46, 125, 50, 0.08);\n  --bg-card: rgba(255, 255, 255, 0.92);\n  --bg-card-header: rgba(255, 255, 255, 0.97);\n  --text-dark: #1a1a2e;\n  --text-secondary: #555770;\n  --text-muted: #8b8da3;\n  --border-color: rgba(0, 0, 0, 0.08);\n  --error-color: #d32f2f;\n  --error-bg: rgba(211, 47, 47, 0.08);\n  --shadow-card: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);\n  --radius-sm: 10px;\n  --radius-md: 14px;\n  --radius-lg: 20px;\n}\n.login-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  min-height: 100dvh;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  box-sizing: border-box;\n  position: relative;\n  background: url(/assets/images/uteq-campus.png) center/cover no-repeat fixed;\n}\n.login-container[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(10, 15, 30, 0.65) 0%,\n      rgba(20, 40, 30, 0.55) 50%,\n      rgba(10, 15, 30, 0.70) 100%);\n  z-index: 0;\n}\n.login-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  background: var(--bg-card);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-card);\n  overflow: hidden;\n  position: relative;\n  z-index: 1;\n  backdrop-filter: blur(20px);\n  -webkit-backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.25);\n  animation: _ngcontent-%COMP%_cardEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;\n}\n@keyframes _ngcontent-%COMP%_cardEntrance {\n  from {\n    opacity: 0;\n    transform: translateY(24px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.login-header[_ngcontent-%COMP%] {\n  background: var(--bg-card-header);\n  padding: clamp(1.5rem, 5vw, 2rem) clamp(1.5rem, 5vw, 2rem) clamp(1.2rem, 4vw, 1.5rem);\n  text-align: center;\n  color: var(--text-dark);\n  border-bottom: 1px solid var(--border-color);\n  position: relative;\n}\n.login-logo[_ngcontent-%COMP%] {\n  width: auto;\n  height: clamp(56px, 14vw, 72px);\n  margin-bottom: 0.75rem;\n  object-fit: contain;\n  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.08));\n}\n.login-title[_ngcontent-%COMP%] {\n  font-size: clamp(0.95rem, 2.8vw, 1.15rem);\n  font-weight: 700;\n  margin: 0 0 0.35rem 0;\n  line-height: 1.35;\n  color: var(--text-dark);\n  letter-spacing: -0.01em;\n}\n.login-subtitle[_ngcontent-%COMP%] {\n  font-size: clamp(0.78rem, 2.3vw, 0.85rem);\n  color: var(--text-muted);\n  margin: 0;\n  font-weight: 400;\n}\n.login-form[_ngcontent-%COMP%] {\n  padding: clamp(1.5rem, 5vw, 2rem);\n}\n.alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 0.75rem 1rem;\n  border-radius: var(--radius-sm);\n  margin-bottom: 1.25rem;\n  font-size: 0.85rem;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background: var(--error-bg);\n  color: var(--error-color);\n  border: 1px solid rgba(211, 47, 47, 0.15);\n}\n.alert-icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  flex-shrink: 0;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.25rem;\n}\n.form-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n  margin-bottom: 0.45rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.input-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 14px;\n  width: 18px;\n  height: 18px;\n  color: var(--text-muted);\n  pointer-events: none;\n  z-index: 1;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.8rem 0.875rem 0.8rem 2.75rem;\n  font-size: 0.95rem;\n  border: 1.5px solid var(--border-color);\n  border-radius: var(--radius-sm);\n  background: rgba(255, 255, 255, 0.7);\n  color: var(--text-dark);\n  transition: all 0.25s ease;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent);\n  box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);\n  background: #fff;\n}\n.form-control[_ngcontent-%COMP%]::placeholder {\n  color: #b0b3c5;\n}\n.form-control.is-invalid[_ngcontent-%COMP%] {\n  border-color: var(--error-color);\n}\n.form-control.is-invalid[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1);\n}\n.password-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  background: none;\n  border: none;\n  padding: 4px;\n  cursor: pointer;\n  color: var(--text-muted);\n  transition: color 0.2s ease;\n}\n.password-toggle[_ngcontent-%COMP%]:hover {\n  color: var(--accent);\n}\n.password-toggle[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.78rem;\n  color: var(--error-color);\n  margin-top: 0.35rem;\n}\n.btn-login[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.85rem 1.5rem;\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: white;\n  background: var(--accent);\n  border: none;\n  border-radius: var(--radius-sm);\n  cursor: pointer;\n  transition: all 0.25s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.625rem;\n  margin-top: 0.75rem;\n  letter-spacing: 0.02em;\n}\n.btn-login[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--accent-hover);\n  box-shadow: 0 4px 16px rgba(46, 125, 50, 0.25);\n  transform: translateY(-1px);\n}\n.btn-login[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: translateY(0) scale(0.98);\n}\n.btn-login[_ngcontent-%COMP%]:disabled {\n  opacity: 0.65;\n  cursor: not-allowed;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.login-footer[_ngcontent-%COMP%] {\n  padding: 0.85rem 1.5rem;\n  text-align: center;\n  background: rgba(248, 249, 250, 0.6);\n  border-top: 1px solid var(--border-color);\n}\n.login-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.72rem;\n  color: var(--text-muted);\n  letter-spacing: 0.02em;\n}\n@media (max-width: 440px) {\n  .login-card[_ngcontent-%COMP%] {\n    border-radius: var(--radius-md);\n    margin: 0.5rem;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="login-container">\r
  <div class="login-card">\r
    <!-- Header con logo -->\r
    <div class="login-header">\r
      <img src="assets/UTEQ_logo.ico" alt="UTEQ Logo" class="login-logo">\r
      <h1 class="login-title">Sistema de Gesti\xF3n de Refuerzos Acad\xE9micos</h1>\r
      <p class="login-subtitle">Inicia sesi\xF3n para continuar</p>\r
    </div>\r
\r
    <!-- Formulario -->\r
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">\r
      <!-- Error general -->\r
      @if (errorMessage()) {\r
        <div class="alert alert-danger">\r
          <svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
            <circle cx="12" cy="12" r="10"/>\r
            <line x1="12" y1="8" x2="12" y2="12"/>\r
            <line x1="12" y1="16" x2="12.01" y2="16"/>\r
          </svg>\r
          <span>{{ errorMessage() }}</span>\r
        </div>\r
      }\r
\r
      <!-- Campo Usuario -->\r
      <div class="form-group">\r
        <label for="username" class="form-label">Usuario</label>\r
        <div class="input-wrapper">\r
          <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>\r
            <circle cx="12" cy="7" r="4"/>\r
          </svg>\r
          <input\r
            type="text"\r
            id="username"\r
            formControlName="username"\r
            class="form-control"\r
            [class.is-invalid]="usernameInvalid"\r
            placeholder="Ingresa tu usuario"\r
            autocomplete="username">\r
        </div>\r
        @if (usernameInvalid) {\r
          <div class="invalid-feedback">{{ getUsernameError() }}</div>\r
        }\r
      </div>\r
\r
      <!-- Campo Contrase\xF1a -->\r
      <div class="form-group">\r
        <label for="password" class="form-label">Contrase\xF1a</label>\r
        <div class="input-wrapper">\r
          <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>\r
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>\r
          </svg>\r
          <input\r
            [type]="showPassword() ? 'text' : 'password'"\r
            id="password"\r
            formControlName="password"\r
            class="form-control"\r
            [class.is-invalid]="passwordInvalid"\r
            placeholder="Ingresa tu contrase\xF1a"\r
            autocomplete="current-password">\r
          <button\r
            type="button"\r
            class="password-toggle"\r
            (click)="togglePassword()"\r
            tabindex="-1">\r
            @if (showPassword()) {\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>\r
                <line x1="1" y1="1" x2="23" y2="23"/>\r
              </svg>\r
            } @else {\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>\r
                <circle cx="12" cy="12" r="3"/>\r
              </svg>\r
            }\r
          </button>\r
        </div>\r
        @if (passwordInvalid) {\r
          <div class="invalid-feedback">{{ getPasswordError() }}</div>\r
        }\r
      </div>\r
\r
      <!-- Bot\xF3n de submit -->\r
      <button\r
        type="submit"\r
        class="btn-login"\r
        [disabled]="isLoading()">\r
        @if (isLoading()) {\r
          <span class="spinner"></span>\r
          <span>Cargando...</span>\r
        } @else {\r
          <span>Iniciar sesi\xF3n</span>\r
        }\r
      </button>\r
    </form>\r
\r
    <!-- Footer -->\r
    <div class="login-footer">\r
      <p>\xA9 2026 UTEQ - Todos los derechos reservados</p>\r
    </div>\r
  </div>\r
</div>\r
\r
`, styles: ['/* src/app/components/auth/login.component.css */\n:host {\n  --accent: #2e7d32;\n  --accent-hover: #1b5e20;\n  --accent-subtle: rgba(46, 125, 50, 0.08);\n  --bg-card: rgba(255, 255, 255, 0.92);\n  --bg-card-header: rgba(255, 255, 255, 0.97);\n  --text-dark: #1a1a2e;\n  --text-secondary: #555770;\n  --text-muted: #8b8da3;\n  --border-color: rgba(0, 0, 0, 0.08);\n  --error-color: #d32f2f;\n  --error-bg: rgba(211, 47, 47, 0.08);\n  --shadow-card: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);\n  --radius-sm: 10px;\n  --radius-md: 14px;\n  --radius-lg: 20px;\n}\n.login-container {\n  min-height: 100vh;\n  min-height: 100dvh;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  box-sizing: border-box;\n  position: relative;\n  background: url(/assets/images/uteq-campus.png) center/cover no-repeat fixed;\n}\n.login-container::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(10, 15, 30, 0.65) 0%,\n      rgba(20, 40, 30, 0.55) 50%,\n      rgba(10, 15, 30, 0.70) 100%);\n  z-index: 0;\n}\n.login-card {\n  width: 100%;\n  max-width: 420px;\n  background: var(--bg-card);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-card);\n  overflow: hidden;\n  position: relative;\n  z-index: 1;\n  backdrop-filter: blur(20px);\n  -webkit-backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.25);\n  animation: cardEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;\n}\n@keyframes cardEntrance {\n  from {\n    opacity: 0;\n    transform: translateY(24px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.login-header {\n  background: var(--bg-card-header);\n  padding: clamp(1.5rem, 5vw, 2rem) clamp(1.5rem, 5vw, 2rem) clamp(1.2rem, 4vw, 1.5rem);\n  text-align: center;\n  color: var(--text-dark);\n  border-bottom: 1px solid var(--border-color);\n  position: relative;\n}\n.login-logo {\n  width: auto;\n  height: clamp(56px, 14vw, 72px);\n  margin-bottom: 0.75rem;\n  object-fit: contain;\n  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.08));\n}\n.login-title {\n  font-size: clamp(0.95rem, 2.8vw, 1.15rem);\n  font-weight: 700;\n  margin: 0 0 0.35rem 0;\n  line-height: 1.35;\n  color: var(--text-dark);\n  letter-spacing: -0.01em;\n}\n.login-subtitle {\n  font-size: clamp(0.78rem, 2.3vw, 0.85rem);\n  color: var(--text-muted);\n  margin: 0;\n  font-weight: 400;\n}\n.login-form {\n  padding: clamp(1.5rem, 5vw, 2rem);\n}\n.alert {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 0.75rem 1rem;\n  border-radius: var(--radius-sm);\n  margin-bottom: 1.25rem;\n  font-size: 0.85rem;\n}\n.alert-danger {\n  background: var(--error-bg);\n  color: var(--error-color);\n  border: 1px solid rgba(211, 47, 47, 0.15);\n}\n.alert-icon {\n  width: 20px;\n  height: 20px;\n  flex-shrink: 0;\n}\n.form-group {\n  margin-bottom: 1.25rem;\n}\n.form-label {\n  display: block;\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n  margin-bottom: 0.45rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.input-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.input-icon {\n  position: absolute;\n  left: 14px;\n  width: 18px;\n  height: 18px;\n  color: var(--text-muted);\n  pointer-events: none;\n  z-index: 1;\n}\n.form-control {\n  width: 100%;\n  padding: 0.8rem 0.875rem 0.8rem 2.75rem;\n  font-size: 0.95rem;\n  border: 1.5px solid var(--border-color);\n  border-radius: var(--radius-sm);\n  background: rgba(255, 255, 255, 0.7);\n  color: var(--text-dark);\n  transition: all 0.25s ease;\n}\n.form-control:focus {\n  outline: none;\n  border-color: var(--accent);\n  box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);\n  background: #fff;\n}\n.form-control::placeholder {\n  color: #b0b3c5;\n}\n.form-control.is-invalid {\n  border-color: var(--error-color);\n}\n.form-control.is-invalid:focus {\n  box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1);\n}\n.password-toggle {\n  position: absolute;\n  right: 12px;\n  background: none;\n  border: none;\n  padding: 4px;\n  cursor: pointer;\n  color: var(--text-muted);\n  transition: color 0.2s ease;\n}\n.password-toggle:hover {\n  color: var(--accent);\n}\n.password-toggle svg {\n  width: 20px;\n  height: 20px;\n}\n.invalid-feedback {\n  display: block;\n  font-size: 0.78rem;\n  color: var(--error-color);\n  margin-top: 0.35rem;\n}\n.btn-login {\n  width: 100%;\n  padding: 0.85rem 1.5rem;\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: white;\n  background: var(--accent);\n  border: none;\n  border-radius: var(--radius-sm);\n  cursor: pointer;\n  transition: all 0.25s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.625rem;\n  margin-top: 0.75rem;\n  letter-spacing: 0.02em;\n}\n.btn-login:hover:not(:disabled) {\n  background: var(--accent-hover);\n  box-shadow: 0 4px 16px rgba(46, 125, 50, 0.25);\n  transform: translateY(-1px);\n}\n.btn-login:active:not(:disabled) {\n  transform: translateY(0) scale(0.98);\n}\n.btn-login:disabled {\n  opacity: 0.65;\n  cursor: not-allowed;\n}\n.spinner {\n  width: 20px;\n  height: 20px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.login-footer {\n  padding: 0.85rem 1.5rem;\n  text-align: center;\n  background: rgba(248, 249, 250, 0.6);\n  border-top: 1px solid var(--border-color);\n}\n.login-footer p {\n  margin: 0;\n  font-size: 0.72rem;\n  color: var(--text-muted);\n  letter-spacing: 0.02em;\n}\n@media (max-width: 440px) {\n  .login-card {\n    border-radius: var(--radius-md);\n    margin: 0.5rem;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */\n'] }]
  }], () => [{ type: FormBuilder }, { type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "app/components/auth/login.component.ts", lineNumber: 16 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-JHHQNDOB.js.map
