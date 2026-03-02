import {
  DefaultValueAccessor,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
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
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-OENL2SFL.js";

// src/app/services/student/student-preferences.service.ts
var StudentPreferencesService = class _StudentPreferencesService {
  http;
  baseUrl = environment.apiUrl;
  httpOptions = { withCredentials: true };
  constructor(http) {
    this.http = http;
  }
  /**
   * GET /api/student/preferences/channels
   * Returns list of available notification channels
   */
  getActiveChannels() {
    return this.http.get(`${this.baseUrl}/student/preferences/channels`, this.httpOptions).pipe(catchError(this.handleError));
  }
  /**
   * GET /api/student/preferences/me
   * Returns current user's preference (or null if not set)
   */
  getMyPreference() {
    return this.http.get(`${this.baseUrl}/student/preferences/me`, this.httpOptions).pipe(catchError(this.handleError));
  }
  /**
   * PUT /api/student/preferences/me
   * Save/update user's preference
   */
  saveMyPreference(req) {
    return this.http.put(`${this.baseUrl}/student/preferences/me`, req, this.httpOptions).pipe(catchError(this.handleError));
  }
  handleError(error) {
    let message = "Error al procesar preferencias";
    if (error.status === 0)
      message = "No se pudo conectar con el servidor.";
    else if (error.status === 401)
      message = "Sesi\xF3n expirada. Inicia sesi\xF3n nuevamente.";
    else if (error.status === 400)
      message = error.error?.message || "Datos inv\xE1lidos.";
    else if (error.error?.message)
      message = error.error.message;
    console.error("[StudentPreferencesService] Error:", error);
    return throwError(() => new Error(message));
  }
  static \u0275fac = function StudentPreferencesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StudentPreferencesService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StudentPreferencesService, factory: _StudentPreferencesService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StudentPreferencesService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/components/student/student-preferences/student-preferences.component.ts
var _forTrack0 = ($index, $item) => $item.channelId;
function StudentPreferencesComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "i", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "button", 9);
    \u0275\u0275listener("click", function StudentPreferencesComponent_Conditional_6_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.errorMessage = null);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.errorMessage, " ");
  }
}
function StudentPreferencesComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "i", 10);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "button", 9);
    \u0275\u0275listener("click", function StudentPreferencesComponent_Conditional_7_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.successMessage = null);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.successMessage, " ");
  }
}
function StudentPreferencesComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 11);
    \u0275\u0275element(2, "div", 12);
    \u0275\u0275elementStart(3, "p", 4);
    \u0275\u0275text(4, "Cargando preferencias...");
    \u0275\u0275elementEnd()()();
  }
}
function StudentPreferencesComponent_Conditional_9_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 36);
    \u0275\u0275element(2, "i", 37);
    \u0275\u0275elementStart(3, "div")(4, "h6", 38);
    \u0275\u0275text(5, "\xA1Bienvenido! Configura tus preferencias");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 39);
    \u0275\u0275text(7, " A\xFAn no tienes preferencias de notificaci\xF3n configuradas. Selecciona c\xF3mo deseas recibir avisos sobre tus solicitudes de refuerzo y guarda los cambios. ");
    \u0275\u0275elementEnd()()()();
  }
}
function StudentPreferencesComponent_Conditional_9_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const channel_r5 = ctx.$implicit;
    \u0275\u0275property("ngValue", channel_r5.channelId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(channel_r5.channelName);
  }
}
function StudentPreferencesComponent_Conditional_9_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "small");
    \u0275\u0275element(2, "i", 40);
    \u0275\u0275text(3, " Preferencia actual: ");
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " con recordatorio de ");
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.currentPreference.channelName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.currentPreference.reminderAnticipation, " minutos");
  }
}
function StudentPreferencesComponent_Conditional_9_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 41);
    \u0275\u0275text(1, " Guardando... ");
  }
}
function StudentPreferencesComponent_Conditional_9_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 42);
    \u0275\u0275text(1, " Guardar cambios ");
  }
}
function StudentPreferencesComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, StudentPreferencesComponent_Conditional_9_Conditional_0_Template, 8, 0, "div", 13);
    \u0275\u0275elementStart(1, "div", 7)(2, "div", 14)(3, "h5", 15);
    \u0275\u0275element(4, "i", 16);
    \u0275\u0275text(5, " Notificaciones ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 17)(7, "form", 18, 0);
    \u0275\u0275listener("ngSubmit", function StudentPreferencesComponent_Conditional_9_Template_form_ngSubmit_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSave());
    });
    \u0275\u0275elementStart(9, "div", 2)(10, "label", 19);
    \u0275\u0275text(11, " Canal de Notificaci\xF3n ");
    \u0275\u0275elementStart(12, "span", 20);
    \u0275\u0275text(13, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "p", 21);
    \u0275\u0275text(15, " Selecciona c\xF3mo deseas recibir notificaciones sobre tus solicitudes de refuerzo ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "select", 22);
    \u0275\u0275twoWayListener("ngModelChange", function StudentPreferencesComponent_Conditional_9_Template_select_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.channelId, $event) || (ctx_r1.form.channelId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(17, "option", 23);
    \u0275\u0275text(18, "Selecciona un canal");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(19, StudentPreferencesComponent_Conditional_9_For_20_Template, 2, 2, "option", 23, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 2)(22, "label", 19);
    \u0275\u0275text(23, " Anticipaci\xF3n del Recordatorio ");
    \u0275\u0275elementStart(24, "span", 20);
    \u0275\u0275text(25, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "p", 21);
    \u0275\u0275text(27, " \xBFCon cu\xE1ntos minutos de anticipaci\xF3n deseas recibir un recordatorio antes de tu sesi\xF3n? ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 24)(29, "input", 25);
    \u0275\u0275twoWayListener("ngModelChange", function StudentPreferencesComponent_Conditional_9_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.reminderAnticipation, $event) || (ctx_r1.form.reminderAnticipation = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 26);
    \u0275\u0275text(31, "minutos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "small", 27);
    \u0275\u0275text(33, "Entre 0 y 1440 minutos (24 horas)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 2)(35, "label", 28);
    \u0275\u0275text(36, "Opciones r\xE1pidas:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 29)(38, "button", 30);
    \u0275\u0275listener("click", function StudentPreferencesComponent_Conditional_9_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setAnticipation(0));
    });
    \u0275\u0275text(39, " Sin recordatorio ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "button", 30);
    \u0275\u0275listener("click", function StudentPreferencesComponent_Conditional_9_Template_button_click_40_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setAnticipation(15));
    });
    \u0275\u0275text(41, " 15 min ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "button", 30);
    \u0275\u0275listener("click", function StudentPreferencesComponent_Conditional_9_Template_button_click_42_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setAnticipation(30));
    });
    \u0275\u0275text(43, " 30 min ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "button", 30);
    \u0275\u0275listener("click", function StudentPreferencesComponent_Conditional_9_Template_button_click_44_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setAnticipation(60));
    });
    \u0275\u0275text(45, " 1 hora ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "button", 30);
    \u0275\u0275listener("click", function StudentPreferencesComponent_Conditional_9_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setAnticipation(120));
    });
    \u0275\u0275text(47, " 2 horas ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(48, StudentPreferencesComponent_Conditional_9_Conditional_48_Template, 9, 2, "div", 31);
    \u0275\u0275elementStart(49, "div", 32)(50, "button", 33);
    \u0275\u0275conditionalCreate(51, StudentPreferencesComponent_Conditional_9_Conditional_51_Template, 2, 0)(52, StudentPreferencesComponent_Conditional_9_Conditional_52_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "button", 34);
    \u0275\u0275listener("click", function StudentPreferencesComponent_Conditional_9_Template_button_click_53_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetForm());
    });
    \u0275\u0275element(54, "i", 35);
    \u0275\u0275text(55, " Restablecer ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const preferencesForm_r6 = \u0275\u0275reference(8);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.isNewUser ? 0 : -1);
    \u0275\u0275advance(16);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.channelId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.channels);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.reminderAnticipation);
    \u0275\u0275advance(9);
    \u0275\u0275classProp("active", ctx_r1.form.reminderAnticipation === 0);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.form.reminderAnticipation === 15);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.form.reminderAnticipation === 30);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.form.reminderAnticipation === 60);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.form.reminderAnticipation === 120);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.currentPreference ? 48 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !preferencesForm_r6.valid || ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.saving ? 51 : 52);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.saving);
  }
}
var StudentPreferencesComponent = class _StudentPreferencesComponent {
  svc = inject(StudentPreferencesService);
  cdr = inject(ChangeDetectorRef);
  // State
  loading = true;
  saving = false;
  isNewUser = false;
  errorMessage = null;
  successMessage = null;
  // Data
  channels = [];
  currentPreference = null;
  // Form
  form = {
    channelId: null,
    reminderAnticipation: 30
  };
  ngAfterViewInit() {
    Promise.resolve().then(() => {
      this.loadData();
    });
  }
  loadData() {
    this.loading = true;
    this.errorMessage = null;
    Promise.all([
      this.svc.getActiveChannels().toPromise(),
      this.svc.getMyPreference().toPromise().catch(() => null)
    ]).then(([channels, preference]) => {
      this.channels = channels || [];
      if (!preference || typeof preference === "object" && "preference" in preference) {
        this.currentPreference = null;
        this.isNewUser = true;
      } else {
        this.currentPreference = preference;
      }
      if (this.currentPreference) {
        this.form.channelId = this.currentPreference.channelId;
        this.form.reminderAnticipation = this.currentPreference.reminderAnticipation;
      } else if (this.channels.length > 0) {
        this.form.channelId = this.channels[0].channelId;
      }
      this.loading = false;
      this.cdr.detectChanges();
    }).catch((err) => {
      this.errorMessage = err?.message || "Error al cargar datos";
      this.loading = false;
      this.cdr.detectChanges();
    });
  }
  setAnticipation(minutes) {
    this.form.reminderAnticipation = minutes;
  }
  resetForm() {
    if (this.currentPreference) {
      this.form.channelId = this.currentPreference.channelId;
      this.form.reminderAnticipation = this.currentPreference.reminderAnticipation;
    } else if (this.channels.length > 0) {
      this.form.channelId = this.channels[0].channelId;
      this.form.reminderAnticipation = 30;
    }
    this.successMessage = null;
    this.errorMessage = null;
  }
  onSave() {
    if (!this.form.channelId || this.form.reminderAnticipation < 0) {
      this.errorMessage = "Por favor completa todos los campos correctamente";
      return;
    }
    this.saving = true;
    this.errorMessage = null;
    this.successMessage = null;
    this.svc.saveMyPreference(this.form).subscribe({
      next: (response) => {
        this.saving = false;
        this.isNewUser = false;
        this.successMessage = response.message || "Preferencias guardadas exitosamente";
        const selectedChannel = this.channels.find((c) => c.channelId === this.form.channelId);
        this.currentPreference = {
          preferenceId: this.currentPreference?.preferenceId || 0,
          userId: this.currentPreference?.userId || 0,
          channelId: this.form.channelId,
          channelName: selectedChannel?.channelName || "",
          reminderAnticipation: this.form.reminderAnticipation
        };
        this.cdr.detectChanges();
        setTimeout(() => {
          this.successMessage = null;
          this.cdr.detectChanges();
        }, 5e3);
      },
      error: (err) => {
        this.saving = false;
        this.errorMessage = err?.message || "Error al guardar preferencias";
        this.cdr.detectChanges();
      }
    });
  }
  static \u0275fac = function StudentPreferencesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StudentPreferencesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StudentPreferencesComponent, selectors: [["app-student-preferences"]], decls: 10, vars: 4, consts: [["preferencesForm", "ngForm"], [1, "container-fluid"], [1, "mb-4"], [1, "mb-1"], [1, "text-muted", "mb-0"], ["role", "alert", 1, "alert", "alert-danger", "alert-dismissible", "fade", "show"], ["role", "alert", 1, "alert", "alert-success", "alert-dismissible", "fade", "show"], [1, "card", "border-0", "shadow-sm"], [1, "bi", "bi-exclamation-triangle-fill", "me-2"], ["type", "button", 1, "btn-close", 3, "click"], [1, "bi", "bi-check-circle-fill", "me-2"], [1, "card-body", "text-center", "py-5"], ["role", "status", 1, "spinner-border", "text-success", "mb-3"], [1, "alert", "alert-success", "border-0", "shadow-sm", "mb-3"], [1, "card-header", "bg-white", "border-0", "py-3"], [1, "mb-0"], [1, "bi", "bi-bell", "me-2", "text-success"], [1, "card-body"], [3, "ngSubmit"], [1, "form-label", "fw-semibold"], [1, "text-danger"], [1, "text-muted", "small", "mb-2"], ["name", "channelId", "required", "", 1, "form-select", 3, "ngModelChange", "ngModel"], [3, "ngValue"], [1, "input-group", 2, "max-width", "200px"], ["type", "number", "name", "reminderAnticipation", "min", "0", "max", "1440", "required", "", "placeholder", "0", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "input-group-text"], [1, "text-muted"], [1, "form-label", "small", "text-muted"], [1, "d-flex", "flex-wrap", "gap-2"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-secondary", 3, "click"], [1, "alert", "alert-light", "mb-4"], [1, "d-flex", "gap-2"], ["type", "submit", 1, "btn", "btn-success", 3, "disabled"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "bi", "bi-arrow-counterclockwise", "me-2"], [1, "d-flex", "align-items-start"], [1, "bi", "bi-info-circle-fill", "fs-4", "me-3", "text-success"], [1, "fw-bold", "mb-1"], [1, "mb-0", "text-muted"], [1, "bi", "bi-info-circle", "me-1"], [1, "spinner-border", "spinner-border-sm", "me-2"], [1, "bi", "bi-check-lg", "me-2"]], template: function StudentPreferencesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h3", 3);
      \u0275\u0275text(3, "Preferencias");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 4);
      \u0275\u0275text(5, "Configura tus preferencias para notificaciones de refuerzos acad\xE9micos");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(6, StudentPreferencesComponent_Conditional_6_Template, 4, 1, "div", 5);
      \u0275\u0275conditionalCreate(7, StudentPreferencesComponent_Conditional_7_Template, 4, 1, "div", 6);
      \u0275\u0275conditionalCreate(8, StudentPreferencesComponent_Conditional_8_Template, 5, 0, "div", 7);
      \u0275\u0275conditionalCreate(9, StudentPreferencesComponent_Conditional_9_Template, 56, 18);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.errorMessage ? 6 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.successMessage ? 7 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading ? 9 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, MaxValidator, NgModel, NgForm], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StudentPreferencesComponent, [{
    type: Component,
    args: [{ selector: "app-student-preferences", standalone: true, imports: [CommonModule, FormsModule], template: '\r\n    <div class="container-fluid">\r\n      <!-- Header -->\r\n      <div class="mb-4">\r\n        <h3 class="mb-1">Preferencias</h3>\r\n        <p class="text-muted mb-0">Configura tus preferencias para notificaciones de refuerzos acad\xE9micos</p>\r\n      </div>\r\n\r\n      <!-- Error Alert -->\r\n      @if (errorMessage) {\r\n        <div class="alert alert-danger alert-dismissible fade show" role="alert">\r\n          <i class="bi bi-exclamation-triangle-fill me-2"></i>\r\n          {{ errorMessage }}\r\n          <button type="button" class="btn-close" (click)="errorMessage = null"></button>\r\n        </div>\r\n      }\r\n\r\n      <!-- Success Alert -->\r\n      @if (successMessage) {\r\n        <div class="alert alert-success alert-dismissible fade show" role="alert">\r\n          <i class="bi bi-check-circle-fill me-2"></i>\r\n          {{ successMessage }}\r\n          <button type="button" class="btn-close" (click)="successMessage = null"></button>\r\n        </div>\r\n      }\r\n\r\n      <!-- Loading State -->\r\n      @if (loading) {\r\n        <div class="card border-0 shadow-sm">\r\n          <div class="card-body text-center py-5">\r\n            <div class="spinner-border text-success mb-3" role="status"></div>\r\n            <p class="text-muted mb-0">Cargando preferencias...</p>\r\n          </div>\r\n        </div>\r\n      }\r\n\r\n      <!-- Preferences Form -->\r\n      @if (!loading) {\r\n\r\n        <!-- Welcome message for new users -->\r\n        @if (isNewUser) {\r\n          <div class="alert alert-success border-0 shadow-sm mb-3">\r\n            <div class="d-flex align-items-start">\r\n              <i class="bi bi-info-circle-fill fs-4 me-3 text-success"></i>\r\n              <div>\r\n                <h6 class="fw-bold mb-1">\xA1Bienvenido! Configura tus preferencias</h6>\r\n                <p class="mb-0 text-muted">\r\n                  A\xFAn no tienes preferencias de notificaci\xF3n configuradas. Selecciona c\xF3mo deseas recibir\r\n                  avisos sobre tus solicitudes de refuerzo y guarda los cambios.\r\n                </p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        }\r\n        <div class="card border-0 shadow-sm">\r\n          <div class="card-header bg-white border-0 py-3">\r\n            <h5 class="mb-0">\r\n              <i class="bi bi-bell me-2 text-success"></i>\r\n              Notificaciones\r\n            </h5>\r\n          </div>\r\n          <div class="card-body">\r\n            <form (ngSubmit)="onSave()" #preferencesForm="ngForm">\r\n              <!-- Channel Selection -->\r\n              <div class="mb-4">\r\n                <label class="form-label fw-semibold">\r\n                  Canal de Notificaci\xF3n <span class="text-danger">*</span>\r\n                </label>\r\n                <p class="text-muted small mb-2">\r\n                  Selecciona c\xF3mo deseas recibir notificaciones sobre tus solicitudes de refuerzo\r\n                </p>\r\n                <select class="form-select" [(ngModel)]="form.channelId" name="channelId" required>\r\n                  <option [ngValue]="null">Selecciona un canal</option>\r\n                  @for (channel of channels; track channel.channelId) {\r\n                    <option [ngValue]="channel.channelId">{{ channel.channelName }}</option>\r\n                  }\r\n                </select>\r\n              </div>\r\n\r\n              <!-- Reminder Anticipation -->\r\n              <div class="mb-4">\r\n                <label class="form-label fw-semibold">\r\n                  Anticipaci\xF3n del Recordatorio <span class="text-danger">*</span>\r\n                </label>\r\n                <p class="text-muted small mb-2">\r\n                  \xBFCon cu\xE1ntos minutos de anticipaci\xF3n deseas recibir un recordatorio antes de tu sesi\xF3n?\r\n                </p>\r\n                <div class="input-group" style="max-width: 200px;">\r\n                  <input type="number" class="form-control"\r\n                         [(ngModel)]="form.reminderAnticipation"\r\n                         name="reminderAnticipation"\r\n                         min="0" max="1440" required\r\n                         placeholder="0">\r\n                  <span class="input-group-text">minutos</span>\r\n                </div>\r\n                <small class="text-muted">Entre 0 y 1440 minutos (24 horas)</small>\r\n              </div>\r\n\r\n              <!-- Anticipation presets -->\r\n              <div class="mb-4">\r\n                <label class="form-label small text-muted">Opciones r\xE1pidas:</label>\r\n                <div class="d-flex flex-wrap gap-2">\r\n                  <button type="button" class="btn btn-sm btn-outline-secondary"\r\n                          (click)="setAnticipation(0)" [class.active]="form.reminderAnticipation === 0">\r\n                    Sin recordatorio\r\n                  </button>\r\n                  <button type="button" class="btn btn-sm btn-outline-secondary"\r\n                          (click)="setAnticipation(15)" [class.active]="form.reminderAnticipation === 15">\r\n                    15 min\r\n                  </button>\r\n                  <button type="button" class="btn btn-sm btn-outline-secondary"\r\n                          (click)="setAnticipation(30)" [class.active]="form.reminderAnticipation === 30">\r\n                    30 min\r\n                  </button>\r\n                  <button type="button" class="btn btn-sm btn-outline-secondary"\r\n                          (click)="setAnticipation(60)" [class.active]="form.reminderAnticipation === 60">\r\n                    1 hora\r\n                  </button>\r\n                  <button type="button" class="btn btn-sm btn-outline-secondary"\r\n                          (click)="setAnticipation(120)" [class.active]="form.reminderAnticipation === 120">\r\n                    2 horas\r\n                  </button>\r\n                </div>\r\n              </div>\r\n\r\n              <!-- Current preference info -->\r\n              @if (currentPreference) {\r\n                <div class="alert alert-light mb-4">\r\n                  <small>\r\n                    <i class="bi bi-info-circle me-1"></i>\r\n                    Preferencia actual: <strong>{{ currentPreference.channelName }}</strong>\r\n                    con recordatorio de <strong>{{ currentPreference.reminderAnticipation }} minutos</strong>\r\n                  </small>\r\n                </div>\r\n              }\r\n\r\n              <!-- Buttons -->\r\n              <div class="d-flex gap-2">\r\n                <button type="submit" class="btn btn-success"\r\n                        [disabled]="!preferencesForm.valid || saving">\r\n                  @if (saving) {\r\n                    <span class="spinner-border spinner-border-sm me-2"></span>\r\n                    Guardando...\r\n                  } @else {\r\n                    <i class="bi bi-check-lg me-2"></i>\r\n                    Guardar cambios\r\n                  }\r\n                </button>\r\n                <button type="button" class="btn btn-outline-secondary"\r\n                        (click)="resetForm()" [disabled]="saving">\r\n                  <i class="bi bi-arrow-counterclockwise me-2"></i>\r\n                  Restablecer\r\n                </button>\r\n              </div>\r\n            </form>\r\n          </div>\r\n        </div>\r\n      }\r\n    </div>\r\n  ' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StudentPreferencesComponent, { className: "StudentPreferencesComponent", filePath: "app/components/student/student-preferences/student-preferences.component.ts", lineNumber: 17 });
})();
export {
  StudentPreferencesComponent
};
//# sourceMappingURL=chunk-VR5HRGAW.js.map
