import {
  AuthService
} from "./chunk-ZOQXTRIP.js";
import "./chunk-MXF362TW.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-RREETWSH.js";
import {
  HttpClient,
  HttpParams
} from "./chunk-K6SHIZGP.js";
import {
  ChangeDetectorRef,
  CommonModule,
  Component,
  DatePipe,
  EventEmitter,
  Injectable,
  Input,
  LowerCasePipe,
  NgClass,
  Output,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  environment,
  inject,
  setClassMetadata,
  startWith,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-OENL2SFL.js";

// src/app/services/administration/admin-email-config/admin-email-config.service.ts
var AdminEmailConfigService = class _AdminEmailConfigService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;
  getEmailConfigs(filter, state) {
    let params = new HttpParams();
    if (filter) {
      params = params.set("filter", filter);
    }
    if (state !== void 0 && state !== null) {
      params = params.set("state", state);
    }
    return this.http.get(`${this.apiUrl}/security/email-settings/list-emails`, { params });
  }
  getEmailConfigById(id) {
    let params = new HttpParams();
    params = params.set("idEmailConfig", id);
    return this.http.get(`${this.apiUrl}/security/email-config/detail`, { params });
  }
  createEmailConfig(data) {
    return this.http.post(`${this.apiUrl}/security/email-settings/create-email`, data);
  }
  updateEmailConfig(data) {
    return this.http.put(`${this.apiUrl}/security/email-config/update`, data);
  }
  static \u0275fac = function AdminEmailConfigService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminEmailConfigService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminEmailConfigService, factory: _AdminEmailConfigService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminEmailConfigService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/components/administration/admin-email-config/admin-email-config-table/admin-email-config-table.component.ts
var _c0 = (a0, a1) => ({ "bg-success-subtle text-success": a0, "bg-danger-subtle text-danger": a1 });
var _forTrack0 = ($index, $item) => $item.pidconfiguracioncorreo;
function AdminEmailConfigTableComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 5)(2, "div", 6);
    \u0275\u0275element(3, "i", 7);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td", 8);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td")(9, "span", 9);
    \u0275\u0275pipe(10, "lowercase");
    \u0275\u0275pipe(11, "lowercase");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td", 10)(14, "div", 11)(15, "button", 12);
    \u0275\u0275listener("click", function AdminEmailConfigTableComponent_For_14_Template_button_click_15_listener() {
      const config_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onEditClick(config_r3));
    });
    \u0275\u0275element(16, "i", 13);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const config_r3 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", config_r3.pcorreoemisor, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 4, config_r3.pfechahoracreacion, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(11, _c0, \u0275\u0275pipeBind1(10, 7, config_r3.pestadop) === "activo", \u0275\u0275pipeBind1(11, 9, config_r3.pestadop) === "inactivo"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", config_r3.pestadop, " ");
  }
}
function AdminEmailConfigTableComponent_ForEmpty_15_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 14);
    \u0275\u0275element(2, "i", 15);
    \u0275\u0275text(3, " No se encontraron configuraciones de correo. ");
    \u0275\u0275elementEnd()();
  }
}
function AdminEmailConfigTableComponent_ForEmpty_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AdminEmailConfigTableComponent_ForEmpty_15_Conditional_0_Template, 4, 0, "tr");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r0.isLoading ? 0 : -1);
  }
}
var AdminEmailConfigTableComponent = class _AdminEmailConfigTableComponent {
  emailConfigs = [];
  isLoading = true;
  editEmailConfig = new EventEmitter();
  onEditClick(config) {
    this.editEmailConfig.emit(config);
  }
  static \u0275fac = function AdminEmailConfigTableComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminEmailConfigTableComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminEmailConfigTableComponent, selectors: [["app-admin-email-config-table"]], inputs: { emailConfigs: "emailConfigs", isLoading: "isLoading" }, outputs: { editEmailConfig: "editEmailConfig" }, decls: 16, vars: 1, consts: [[1, "table-responsive"], ["aria-label", "Tabla de configuraciones de correo", 1, "table", "table-hover", "align-middle"], [1, "table-light"], ["scope", "col", 1, "py-3"], ["scope", "col", 1, "py-3", "text-end"], [1, "fw-medium"], [1, "d-flex", "align-items-center", "gap-2"], [1, "bi", "bi-envelope-fill", "text-success"], [1, "text-muted"], [1, "badge", "rounded-pill", 3, "ngClass"], [1, "text-end"], [1, "d-inline-flex", "gap-1"], ["title", "Editar configuraci\xF3n", "aria-label", "Editar configuraci\xF3n de correo", 1, "btn", "btn-sm", "btn-outline-success", 3, "click"], [1, "bi", "bi-pencil"], ["colspan", "4", 1, "text-center", "py-5", "text-muted"], [1, "bi", "bi-inbox", "fs-1", "d-block", "mb-2", "opacity-50"]], template: function AdminEmailConfigTableComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "table", 1)(2, "thead", 2)(3, "tr")(4, "th", 3);
      \u0275\u0275text(5, "Correo Electr\xF3nico");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "th", 3);
      \u0275\u0275text(7, "Fecha Creaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "th", 3);
      \u0275\u0275text(9, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "th", 4);
      \u0275\u0275text(11, "Acciones");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "tbody");
      \u0275\u0275repeaterCreate(13, AdminEmailConfigTableComponent_For_14_Template, 17, 14, "tr", null, _forTrack0, false, AdminEmailConfigTableComponent_ForEmpty_15_Template, 1, 1);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(13);
      \u0275\u0275repeater(ctx.emailConfigs);
    }
  }, dependencies: [CommonModule, NgClass, LowerCasePipe, DatePipe], styles: ["\n\n/*# sourceMappingURL=admin-email-config-table.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminEmailConfigTableComponent, [{
    type: Component,
    args: [{ selector: "app-admin-email-config-table", standalone: true, imports: [CommonModule], template: `<div class="table-responsive">\r
  <table class="table table-hover align-middle" aria-label="Tabla de configuraciones de correo">\r
    <thead class="table-light">\r
      <tr>\r
        <th scope="col" class="py-3">Correo Electr\xF3nico</th>\r
        <th scope="col" class="py-3">Fecha Creaci\xF3n</th>\r
        <th scope="col" class="py-3">Estado</th>\r
        <th scope="col" class="py-3 text-end">Acciones</th>\r
      </tr>\r
    </thead>\r
    <tbody>\r
      @for (config of emailConfigs; track config.pidconfiguracioncorreo) {\r
        <tr>\r
          <td class="fw-medium">\r
            <div class="d-flex align-items-center gap-2">\r
              <i class="bi bi-envelope-fill text-success"></i>\r
              {{ config.pcorreoemisor }}\r
            </div>\r
          </td>\r
          <td class="text-muted">{{ config.pfechahoracreacion | date:'dd/MM/yyyy' }}</td>\r
          <td>\r
            <span class="badge rounded-pill"\r
                  [ngClass]="{\r
                    'bg-success-subtle text-success': (config.pestadop | lowercase) === 'activo',\r
                    'bg-danger-subtle text-danger': (config.pestadop | lowercase) === 'inactivo'\r
                  }">\r
              {{ config.pestadop }}\r
            </span>\r
          </td>\r
          <td class="text-end">\r
            <div class="d-inline-flex gap-1">\r
              <button class="btn btn-sm btn-outline-success" title="Editar configuraci\xF3n"\r
                      (click)="onEditClick(config)"\r
                      aria-label="Editar configuraci\xF3n de correo">\r
                <i class="bi bi-pencil"></i>\r
              </button>\r
            </div>\r
          </td>\r
        </tr>\r
      } @empty {\r
        @if (!isLoading) {\r
          <tr>\r
            <td colspan="4" class="text-center py-5 text-muted">\r
              <i class="bi bi-inbox fs-1 d-block mb-2 opacity-50"></i>\r
              No se encontraron configuraciones de correo.\r
            </td>\r
          </tr>\r
        }\r
      }\r
    </tbody>\r
  </table>\r
</div>\r
`, styles: ["/* src/app/components/administration/admin-email-config/admin-email-config-table/admin-email-config-table.component.css */\n/*# sourceMappingURL=admin-email-config-table.component.css.map */\n"] }]
  }], null, { emailConfigs: [{
    type: Input
  }], isLoading: [{
    type: Input
  }], editEmailConfig: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminEmailConfigTableComponent, { className: "AdminEmailConfigTableComponent", filePath: "app/components/administration/admin-email-config/admin-email-config-table/admin-email-config-table.component.ts", lineNumber: 12 });
})();

// src/app/components/administration/admin-email-config/admin-email-config-modal/admin-email-config-modal.component.ts
var _c02 = (a0) => ({ "is-invalid": a0 });
function AdminEmailConfigModalComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1, "El correo es obligatorio.");
    \u0275\u0275elementEnd();
  }
}
function AdminEmailConfigModalComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1, "Ingrese un correo electr\xF3nico v\xE1lido.");
    \u0275\u0275elementEnd();
  }
}
function AdminEmailConfigModalComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1, "La contrase\xF1a de aplicaci\xF3n es obligatoria.");
    \u0275\u0275elementEnd();
  }
}
function AdminEmailConfigModalComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1, "M\xEDnimo 8 caracteres.");
    \u0275\u0275elementEnd();
  }
}
function AdminEmailConfigModalComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 28);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isEditing ? "Guardando..." : "Creando...", " ");
  }
}
function AdminEmailConfigModalComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isEditing ? "Guardar Cambios" : "Crear Configuraci\xF3n", " ");
  }
}
var AdminEmailConfigModalComponent = class _AdminEmailConfigModalComponent {
  emailConfigSaved = new EventEmitter();
  emailForm;
  isSubmitting = false;
  isEditing = false;
  currentConfigId = null;
  showPassword = false;
  fb = inject(FormBuilder);
  emailConfigService = inject(AdminEmailConfigService);
  authService = inject(AuthService);
  constructor() {
    this.emailForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      appPassword: ["", [Validators.required, Validators.minLength(8)]],
      status: ["activo"]
    });
  }
  set configIdToEdit(id) {
    const passwordControl = this.emailForm.get("appPassword");
    if (id) {
      this.isEditing = true;
      this.currentConfigId = id;
      passwordControl?.clearValidators();
      passwordControl?.setValidators([Validators.minLength(8)]);
      passwordControl?.updateValueAndValidity();
      this.emailConfigService.getEmailConfigById(id).subscribe({
        next: (data) => {
          this.emailForm.patchValue({
            email: data.correo,
            appPassword: data.contrasenaApp,
            status: data.estado.toLowerCase() === "activo" ? "activo" : "inactivo"
          });
        },
        error: () => {
          alert("No se pudo cargar la informaci\xF3n del correo.");
        }
      });
    } else {
      this.isEditing = false;
      this.currentConfigId = null;
      this.emailForm.reset({ status: "activo" });
      passwordControl?.setValidators([Validators.required, Validators.minLength(8)]);
      passwordControl?.updateValueAndValidity();
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const formValues = this.emailForm.value;
    const currentUser = this.authService.currentUser();
    const payload = {
      pidconfiguracioncorreo: this.isEditing ? this.currentConfigId ?? void 0 : void 0,
      idusuario: currentUser?.userId ?? 0,
      pcorreoemisor: formValues.email,
      paplicacionsontrasena: formValues.appPassword
    };
    const request$ = this.isEditing ? this.emailConfigService.updateEmailConfig(payload) : this.emailConfigService.createEmailConfig(payload);
    request$.subscribe({
      next: (response) => {
        if (response.success) {
          alert(response.message);
          const modalElement = document.getElementById("emailConfigModal");
          if (modalElement) {
            bootstrap.Modal.getInstance(modalElement)?.hide();
          }
          this.emailForm.reset({ status: "activo" });
          this.emailConfigSaved.emit();
        } else {
          alert(response.message);
        }
        this.isSubmitting = false;
      },
      error: () => {
        this.isSubmitting = false;
        alert(this.isEditing ? "Error al actualizar la configuraci\xF3n" : "Error al crear la configuraci\xF3n");
      }
    });
  }
  get f() {
    return this.emailForm.controls;
  }
  static \u0275fac = function AdminEmailConfigModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminEmailConfigModalComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminEmailConfigModalComponent, selectors: [["app-admin-email-config-modal"]], inputs: { configIdToEdit: "configIdToEdit" }, outputs: { emailConfigSaved: "emailConfigSaved" }, decls: 46, vars: 20, consts: [["id", "emailConfigModal", "tabindex", "-1", "aria-labelledby", "emailConfigModalLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog", "modal-dialog-centered"], [1, "modal-content", "rounded-3", "border-0", "shadow-lg"], [1, "modal-header", "border-bottom-0", "pt-4", "pb-2", "px-4"], ["id", "emailConfigModalLabel", 1, "modal-title", "fw-bold", "fs-4", "text-dark", "mb-1"], [1, "text-muted", "small", "mb-0"], ["type", "button", "data-bs-dismiss", "modal", "aria-label", "Cerrar", 1, "btn-close", "mb-auto"], [1, "modal-body", "px-4", "py-3"], ["autocomplete", "off", 1, "d-flex", "flex-column", "gap-3", 3, "ngSubmit", "formGroup"], [1, "form-floating"], ["type", "email", "id", "emailInput", "formControlName", "email", "placeholder", "correo@ejemplo.com", 1, "form-control", 3, "ngClass"], ["for", "emailInput", 1, "text-muted"], [1, "bi", "bi-envelope", "me-1"], [1, "text-danger", "mt-1", "small"], [1, "input-group"], [1, "form-floating", "flex-grow-1"], ["id", "appPasswordInput", "formControlName", "appPassword", "placeholder", "contrase\xF1a de aplicaci\xF3n", 1, "form-control", 3, "type", "ngClass"], ["for", "appPasswordInput", 1, "text-muted"], [1, "bi", "bi-key", "me-1"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "bi", 3, "ngClass"], ["id", "emailStatus", "formControlName", "status", 1, "form-select", 3, "ngClass"], ["value", "activo"], ["value", "inactivo"], ["for", "emailStatus", 1, "text-muted"], [1, "modal-footer", "border-top-0", "px-4", "pb-4", "pt-1", "justify-content-end", "gap-2"], ["type", "button", "data-bs-dismiss", "modal", 1, "btn", "btn-light", "rounded-3", "px-4", "fw-medium", "text-secondary"], ["type", "submit", 1, "btn", "btn-success", "rounded-3", "px-4", "fw-medium", "shadow-sm", 3, "click", "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"]], template: function AdminEmailConfigModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "header", 3)(4, "div")(5, "h5", 4);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 5);
      \u0275\u0275text(8, " Ingrese el correo electr\xF3nico y su contrase\xF1a de aplicaci\xF3n. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(9, "button", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 7)(11, "form", 8);
      \u0275\u0275listener("ngSubmit", function AdminEmailConfigModalComponent_Template_form_ngSubmit_11_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(12, "div")(13, "div", 9);
      \u0275\u0275element(14, "input", 10);
      \u0275\u0275elementStart(15, "label", 11);
      \u0275\u0275element(16, "i", 12);
      \u0275\u0275text(17, "Correo electr\xF3nico ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(18, AdminEmailConfigModalComponent_Conditional_18_Template, 2, 0, "div", 13);
      \u0275\u0275conditionalCreate(19, AdminEmailConfigModalComponent_Conditional_19_Template, 2, 0, "div", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div")(21, "div", 14)(22, "div", 15);
      \u0275\u0275element(23, "input", 16);
      \u0275\u0275elementStart(24, "label", 17);
      \u0275\u0275element(25, "i", 18);
      \u0275\u0275text(26, "Contrase\xF1a de aplicaci\xF3n ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "button", 19);
      \u0275\u0275listener("click", function AdminEmailConfigModalComponent_Template_button_click_27_listener() {
        return ctx.togglePasswordVisibility();
      });
      \u0275\u0275element(28, "i", 20);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(29, AdminEmailConfigModalComponent_Conditional_29_Template, 2, 0, "div", 13);
      \u0275\u0275conditionalCreate(30, AdminEmailConfigModalComponent_Conditional_30_Template, 2, 0, "div", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div")(32, "div", 9)(33, "select", 21)(34, "option", 22);
      \u0275\u0275text(35, "Activo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "option", 23);
      \u0275\u0275text(37, "Inactivo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "label", 24);
      \u0275\u0275text(39, "Estado");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(40, "footer", 25)(41, "button", 26);
      \u0275\u0275text(42, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "button", 27);
      \u0275\u0275listener("click", function AdminEmailConfigModalComponent_Template_button_click_43_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275conditionalCreate(44, AdminEmailConfigModalComponent_Conditional_44_Template, 2, 1)(45, AdminEmailConfigModalComponent_Conditional_45_Template, 1, 1);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", ctx.isEditing ? "Editar Correo" : "Nuevo Correo", " ");
      \u0275\u0275advance(5);
      \u0275\u0275property("formGroup", ctx.emailForm);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(14, _c02, ctx.f["email"].invalid && (ctx.f["email"].dirty || ctx.f["email"].touched)));
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.f["email"].hasError("required") && ctx.f["email"].touched ? 18 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.f["email"].hasError("email") && ctx.f["email"].touched ? 19 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("type", ctx.showPassword ? "text" : "password")("ngClass", \u0275\u0275pureFunction1(16, _c02, ctx.f["appPassword"].invalid && (ctx.f["appPassword"].dirty || ctx.f["appPassword"].touched)));
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-label", ctx.showPassword ? "Ocultar contrase\xF1a" : "Mostrar contrase\xF1a");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.showPassword ? "bi-eye-slash" : "bi-eye");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.f["appPassword"].hasError("required") && ctx.f["appPassword"].touched ? 29 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.f["appPassword"].hasError("minlength") && ctx.f["appPassword"].touched ? 30 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(18, _c02, ctx.f["status"].invalid && ctx.f["status"].touched));
      \u0275\u0275advance(10);
      \u0275\u0275property("disabled", ctx.emailForm.invalid || ctx.isSubmitting);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSubmitting ? 44 : 45);
    }
  }, dependencies: [CommonModule, NgClass, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n/*# sourceMappingURL=admin-email-config-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminEmailConfigModalComponent, [{
    type: Component,
    args: [{ selector: "app-admin-email-config-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="modal fade" id="emailConfigModal" tabindex="-1"\r
     aria-labelledby="emailConfigModalLabel" aria-hidden="true">\r
  <div class="modal-dialog modal-dialog-centered">\r
    <div class="modal-content rounded-3 border-0 shadow-lg">\r
\r
      <!-- Header -->\r
      <header class="modal-header border-bottom-0 pt-4 pb-2 px-4">\r
        <div>\r
          <h5 class="modal-title fw-bold fs-4 text-dark mb-1" id="emailConfigModalLabel">\r
            {{ isEditing ? 'Editar Correo' : 'Nuevo Correo' }}\r
          </h5>\r
          <p class="text-muted small mb-0">\r
            Ingrese el correo electr\xF3nico y su contrase\xF1a de aplicaci\xF3n.\r
          </p>\r
        </div>\r
        <button type="button" class="btn-close mb-auto"\r
                data-bs-dismiss="modal" aria-label="Cerrar"></button>\r
      </header>\r
\r
      <!-- Body -->\r
      <div class="modal-body px-4 py-3">\r
        <form [formGroup]="emailForm" (ngSubmit)="onSubmit()"\r
              class="d-flex flex-column gap-3" autocomplete="off">\r
\r
          <!-- Correo electr\xF3nico -->\r
          <div>\r
            <div class="form-floating">\r
              <input type="email" class="form-control" id="emailInput"\r
                     formControlName="email"\r
                     placeholder="correo&#64;ejemplo.com"\r
                     [ngClass]="{'is-invalid': f['email'].invalid && (f['email'].dirty || f['email'].touched)}">\r
              <label for="emailInput" class="text-muted">\r
                <i class="bi bi-envelope me-1"></i>Correo electr\xF3nico\r
              </label>\r
            </div>\r
            @if (f['email'].hasError('required') && f['email'].touched) {\r
              <div class="text-danger mt-1 small">El correo es obligatorio.</div>\r
            }\r
            @if (f['email'].hasError('email') && f['email'].touched) {\r
              <div class="text-danger mt-1 small">Ingrese un correo electr\xF3nico v\xE1lido.</div>\r
            }\r
          </div>\r
\r
          <!-- Contrase\xF1a de aplicaci\xF3n -->\r
          <div>\r
            <div class="input-group">\r
              <div class="form-floating flex-grow-1">\r
                <input [type]="showPassword ? 'text' : 'password'"\r
                       class="form-control" id="appPasswordInput"\r
                       formControlName="appPassword"\r
                       placeholder="contrase\xF1a de aplicaci\xF3n"\r
                       [ngClass]="{'is-invalid': f['appPassword'].invalid && (f['appPassword'].dirty || f['appPassword'].touched)}">\r
                <label for="appPasswordInput" class="text-muted">\r
                  <i class="bi bi-key me-1"></i>Contrase\xF1a de aplicaci\xF3n\r
                </label>\r
              </div>\r
              <button type="button" class="btn btn-outline-secondary"\r
                      (click)="togglePasswordVisibility()"\r
                      [attr.aria-label]="showPassword ? 'Ocultar contrase\xF1a' : 'Mostrar contrase\xF1a'">\r
                <i class="bi" [ngClass]="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>\r
              </button>\r
            </div>\r
            @if (f['appPassword'].hasError('required') && f['appPassword'].touched) {\r
              <div class="text-danger mt-1 small">La contrase\xF1a de aplicaci\xF3n es obligatoria.</div>\r
            }\r
            @if (f['appPassword'].hasError('minlength') && f['appPassword'].touched) {\r
              <div class="text-danger mt-1 small">M\xEDnimo 8 caracteres.</div>\r
            }\r
          </div>\r
\r
          <!-- Estado -->\r
          <div>\r
            <div class="form-floating">\r
              <select class="form-select" id="emailStatus" formControlName="status"\r
                      [ngClass]="{'is-invalid': f['status'].invalid && f['status'].touched}">\r
                <option value="activo">Activo</option>\r
                <option value="inactivo">Inactivo</option>\r
              </select>\r
              <label for="emailStatus" class="text-muted">Estado</label>\r
            </div>\r
          </div>\r
\r
        </form>\r
      </div>\r
\r
      <!-- Footer -->\r
      <footer class="modal-footer border-top-0 px-4 pb-4 pt-1 justify-content-end gap-2">\r
        <button type="button" class="btn btn-light rounded-3 px-4 fw-medium text-secondary"\r
                data-bs-dismiss="modal">\r
          Cancelar\r
        </button>\r
        <button type="submit" class="btn btn-success rounded-3 px-4 fw-medium shadow-sm"\r
                [disabled]="emailForm.invalid || isSubmitting"\r
                (click)="onSubmit()">\r
          @if (isSubmitting) {\r
            <span class="spinner-border spinner-border-sm me-2"\r
                  role="status" aria-hidden="true"></span>\r
            {{ isEditing ? 'Guardando...' : 'Creando...' }}\r
          } @else {\r
            {{ isEditing ? 'Guardar Cambios' : 'Crear Configuraci\xF3n' }}\r
          }\r
        </button>\r
      </footer>\r
\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/components/administration/admin-email-config/admin-email-config-modal/admin-email-config-modal.component.css */\n/*# sourceMappingURL=admin-email-config-modal.component.css.map */\n"] }]
  }], () => [], { emailConfigSaved: [{
    type: Output
  }], configIdToEdit: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminEmailConfigModalComponent, { className: "AdminEmailConfigModalComponent", filePath: "app/components/administration/admin-email-config/admin-email-config-modal/admin-email-config-modal.component.ts", lineNumber: 16 });
})();

// src/app/components/administration/admin-email-config/admin-email-config.component.ts
var AdminEmailConfigComponent = class _AdminEmailConfigComponent {
  emailConfigs = [];
  isLoading = true;
  selectedConfigId = null;
  searchControl = new FormControl("");
  statusControl = new FormControl("");
  cdr = inject(ChangeDetectorRef);
  emailConfigService = inject(AdminEmailConfigService);
  ngOnInit() {
    combineLatest([
      this.searchControl.valueChanges.pipe(startWith(""), debounceTime(200), distinctUntilChanged()),
      this.statusControl.valueChanges.pipe(startWith(""))
    ]).subscribe(([filterValue, statusValue]) => {
      let stateParam = void 0;
      if (statusValue === "true")
        stateParam = true;
      if (statusValue === "false")
        stateParam = false;
      this.loadEmailConfigs(filterValue || "", stateParam);
    });
  }
  loadEmailConfigs(filter = "", state) {
    this.isLoading = true;
    this.emailConfigService.getEmailConfigs(filter, state).subscribe({
      next: (data) => {
        this.emailConfigs = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error cargando configuraciones de correo", err);
        this.isLoading = false;
      }
    });
  }
  openModal() {
    const modalElement = document.getElementById("emailConfigModal");
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  prepareCreate() {
    this.selectedConfigId = null;
    this.openModal();
  }
  prepareEdit(config) {
    this.selectedConfigId = config.pidconfiguracioncorreo;
    this.openModal();
  }
  static \u0275fac = function AdminEmailConfigComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminEmailConfigComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminEmailConfigComponent, selectors: [["app-admin-email-config"]], decls: 31, vars: 5, consts: [["aria-label", "Configuraci\xF3n de correo electr\xF3nico", 1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-start", "flex-wrap", "gap-2", "mb-3"], [1, "mb-1"], [1, "text-muted", "mb-0"], ["type", "button", 1, "btn", "btn-success", "d-flex", "align-items-center", "gap-2", 3, "click"], [1, "bi", "bi-plus-lg"], ["role", "search", "aria-label", "Filtros de b\xFAsqueda", 1, "card", "border-0", "shadow-sm", "mb-3"], [1, "card-body"], [1, "row", "g-2", "align-items-end"], [1, "col-12", "col-md-8"], ["for", "emailSearchInput", 1, "form-label", "mb-1"], ["type", "text", "id", "emailSearchInput", "placeholder", "Buscar por correo...", 1, "form-control", 3, "formControl"], [1, "col-12", "col-md-4"], ["for", "emailStatusFilter", 1, "form-label", "mb-1"], ["id", "emailStatusFilter", 1, "form-select", 3, "formControl"], ["value", ""], ["value", "true"], ["value", "false"], [1, "card", "border-0", "shadow-sm"], [3, "editEmailConfig", "emailConfigs", "isLoading"], [3, "emailConfigSaved", "configIdToEdit"]], template: function AdminEmailConfigComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "header", 1)(2, "div")(3, "h3", 2);
      \u0275\u0275text(4, "Configuraci\xF3n de Correo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Administra los correos electr\xF3nicos y sus contrase\xF1as de aplicaci\xF3n.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "button", 4);
      \u0275\u0275listener("click", function AdminEmailConfigComponent_Template_button_click_7_listener() {
        return ctx.prepareCreate();
      });
      \u0275\u0275element(8, "i", 5);
      \u0275\u0275text(9, " Nuevo Correo ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 6)(11, "div", 7)(12, "div", 8)(13, "div", 9)(14, "label", 10);
      \u0275\u0275text(15, "Buscar");
      \u0275\u0275elementEnd();
      \u0275\u0275element(16, "input", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 12)(18, "label", 13);
      \u0275\u0275text(19, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "select", 14)(21, "option", 15);
      \u0275\u0275text(22, "Todos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "option", 16);
      \u0275\u0275text(24, "Activos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "option", 17);
      \u0275\u0275text(26, "Inactivos");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(27, "div", 18)(28, "div", 7)(29, "app-admin-email-config-table", 19);
      \u0275\u0275listener("editEmailConfig", function AdminEmailConfigComponent_Template_app_admin_email_config_table_editEmailConfig_29_listener($event) {
        return ctx.prepareEdit($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "app-admin-email-config-modal", 20);
      \u0275\u0275listener("emailConfigSaved", function AdminEmailConfigComponent_Template_app_admin_email_config_modal_emailConfigSaved_30_listener() {
        return ctx.loadEmailConfigs();
      });
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275property("formControl", ctx.searchControl);
      \u0275\u0275advance(4);
      \u0275\u0275property("formControl", ctx.statusControl);
      \u0275\u0275advance(9);
      \u0275\u0275property("emailConfigs", ctx.emailConfigs)("isLoading", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("configIdToEdit", ctx.selectedConfigId);
    }
  }, dependencies: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    FormControlDirective,
    AdminEmailConfigTableComponent,
    AdminEmailConfigModalComponent
  ], styles: ["\n\n/*# sourceMappingURL=admin-email-config.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminEmailConfigComponent, [{
    type: Component,
    args: [{ selector: "app-admin-email-config", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      AdminEmailConfigTableComponent,
      AdminEmailConfigModalComponent
    ], template: '<section class="container-fluid" aria-label="Configuraci\xF3n de correo electr\xF3nico">\r\n\r\n  <!-- Encabezado -->\r\n  <header class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">\r\n    <div>\r\n      <h3 class="mb-1">Configuraci\xF3n de Correo</h3>\r\n      <p class="text-muted mb-0">Administra los correos electr\xF3nicos y sus contrase\xF1as de aplicaci\xF3n.</p>\r\n    </div>\r\n    <button type="button" class="btn btn-success d-flex align-items-center gap-2"\r\n            (click)="prepareCreate()">\r\n      <i class="bi bi-plus-lg"></i> Nuevo Correo\r\n    </button>\r\n  </header>\r\n\r\n  <!-- Filtros -->\r\n  <div class="card border-0 shadow-sm mb-3" role="search" aria-label="Filtros de b\xFAsqueda">\r\n    <div class="card-body">\r\n      <div class="row g-2 align-items-end">\r\n        <div class="col-12 col-md-8">\r\n          <label for="emailSearchInput" class="form-label mb-1">Buscar</label>\r\n          <input type="text" class="form-control" id="emailSearchInput"\r\n                 placeholder="Buscar por correo..." [formControl]="searchControl">\r\n        </div>\r\n        <div class="col-12 col-md-4">\r\n          <label for="emailStatusFilter" class="form-label mb-1">Estado</label>\r\n          <select class="form-select" id="emailStatusFilter" [formControl]="statusControl">\r\n            <option value="">Todos</option>\r\n            <option value="true">Activos</option>\r\n            <option value="false">Inactivos</option>\r\n          </select>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Tabla -->\r\n  <div class="card border-0 shadow-sm">\r\n    <div class="card-body">\r\n      <app-admin-email-config-table\r\n        [emailConfigs]="emailConfigs"\r\n        [isLoading]="isLoading"\r\n        (editEmailConfig)="prepareEdit($event)">\r\n      </app-admin-email-config-table>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Modal -->\r\n  <app-admin-email-config-modal\r\n    [configIdToEdit]="selectedConfigId"\r\n    (emailConfigSaved)="loadEmailConfigs()">\r\n  </app-admin-email-config-modal>\r\n\r\n</section>\r\n', styles: ["/* src/app/components/administration/admin-email-config/admin-email-config.component.css */\n/*# sourceMappingURL=admin-email-config.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminEmailConfigComponent, { className: "AdminEmailConfigComponent", filePath: "app/components/administration/admin-email-config/admin-email-config.component.ts", lineNumber: 24 });
})();
export {
  AdminEmailConfigComponent
};
//# sourceMappingURL=chunk-YFOAPBE6.js.map
