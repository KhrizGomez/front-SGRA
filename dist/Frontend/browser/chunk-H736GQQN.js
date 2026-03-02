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
  __spreadValues,
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

// src/app/services/administration/admin-role-management/admin-role-management.service.ts
var AdminRoleManagementService = class _AdminRoleManagementService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;
  getRoles(filter = "", state) {
    let params = new HttpParams();
    if (filter) {
      params = params.set("filter", filter);
    }
    if (state !== void 0 && state !== null) {
      params = params.set("state", state);
    }
    console.log(params);
    return this.http.get(`${this.apiUrl}/security/role-managements/list-roles`, { params });
  }
  createRole(roleData) {
    return this.http.post(`${this.apiUrl}/security/role-managements/create-role`, roleData);
  }
  updateRole(roleData) {
    console.log(roleData);
    return this.http.put(`${this.apiUrl}/security/role-managements/update-role`, roleData);
  }
  getRoleServerMatrix() {
    return this.http.get(`${this.apiUrl}/security/role-managements/list-rolesgroles-conexion`);
  }
  updateServerMappings(payload) {
    return this.http.put(`${this.apiUrl}/security/role-management-role/update-assignment`, payload);
  }
  static \u0275fac = function AdminRoleManagementService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminRoleManagementService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminRoleManagementService, factory: _AdminRoleManagementService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminRoleManagementService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/components/administration/admin-role-management/admin-role-table/admin-role-table.component.ts
var _c0 = (a0, a1) => ({ "bg-success-subtle text-success": a0, "bg-danger-subtle text-danger": a1 });
var _forTrack0 = ($index, $item) => $item.idg;
function AdminRoleTableComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 6);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "span", 7);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td")(9, "span", 8);
    \u0275\u0275pipe(10, "lowercase");
    \u0275\u0275pipe(11, "lowercase");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td", 6);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 9)(17, "button", 10);
    \u0275\u0275listener("click", function AdminRoleTableComponent_For_18_Template_button_click_17_listener() {
      const role_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onEditClick(role_r3));
    });
    \u0275\u0275element(18, "i", 11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const role_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(role_r3.nombreg);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(role_r3.descripciong);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", role_r3.permisosg, " permisos ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(13, _c0, \u0275\u0275pipeBind1(10, 6, role_r3.estadog) === "activo", \u0275\u0275pipeBind1(11, 8, role_r3.estadog) === "inactivo"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", role_r3.estadog, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(15, 10, role_r3.fechacreaciong, "dd/MM/yyyy"));
  }
}
function AdminRoleTableComponent_ForEmpty_19_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 12);
    \u0275\u0275element(2, "i", 13);
    \u0275\u0275text(3, " No hay roles registrados. ");
    \u0275\u0275elementEnd()();
  }
}
function AdminRoleTableComponent_ForEmpty_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AdminRoleTableComponent_ForEmpty_19_Conditional_0_Template, 4, 0, "tr");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r0.isLoading ? 0 : -1);
  }
}
var AdminRoleTableComponent = class _AdminRoleTableComponent {
  roles = [];
  isLoading = true;
  editRole = new EventEmitter();
  onEditClick(role) {
    this.editRole.emit(role);
  }
  static \u0275fac = function AdminRoleTableComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminRoleTableComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminRoleTableComponent, selectors: [["app-admin-role-table"]], inputs: { roles: "roles", isLoading: "isLoading" }, outputs: { editRole: "editRole" }, decls: 20, vars: 1, consts: [[1, "table-responsive"], [1, "table", "table-hover", "align-middle"], [1, "table-light"], ["scope", "col", 1, "py-3"], ["scope", "col", 1, "py-3", "text-end"], [1, "fw-medium"], [1, "text-muted", "small"], [1, "badge", "bg-light", "text-dark", "border", "rounded-pill", "px-3"], [1, "badge", "rounded-pill", 3, "ngClass"], [1, "text-end"], ["title", "Editar", "aria-label", "Editar rol", 1, "btn", "btn-sm", "btn-outline-success", 3, "click"], [1, "bi", "bi-pencil"], ["colspan", "6", 1, "text-center", "py-5", "text-muted"], [1, "bi", "bi-shield-slash", "fs-1", "d-block", "mb-2", "opacity-50"]], template: function AdminRoleTableComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "table", 1)(2, "thead", 2)(3, "tr")(4, "th", 3);
      \u0275\u0275text(5, "Nombre");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "th", 3);
      \u0275\u0275text(7, "Descripci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "th", 3);
      \u0275\u0275text(9, "Permisos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "th", 3);
      \u0275\u0275text(11, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "th", 3);
      \u0275\u0275text(13, "Fecha Creaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "th", 4);
      \u0275\u0275text(15, "Acciones");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "tbody");
      \u0275\u0275repeaterCreate(17, AdminRoleTableComponent_For_18_Template, 19, 16, "tr", null, _forTrack0, false, AdminRoleTableComponent_ForEmpty_19_Template, 1, 1);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(17);
      \u0275\u0275repeater(ctx.roles);
    }
  }, dependencies: [CommonModule, NgClass, LowerCasePipe, DatePipe], styles: ["\n\n/*# sourceMappingURL=admin-role-table.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminRoleTableComponent, [{
    type: Component,
    args: [{ selector: "app-admin-role-table", standalone: true, imports: [CommonModule], template: `<div class="table-responsive">\r
  <table class="table table-hover align-middle">\r
    <thead class="table-light">\r
      <tr>\r
        <th scope="col" class="py-3">Nombre</th>\r
        <th scope="col" class="py-3">Descripci\xF3n</th>\r
        <th scope="col" class="py-3">Permisos</th>\r
        <th scope="col" class="py-3">Estado</th>\r
        <th scope="col" class="py-3">Fecha Creaci\xF3n</th>\r
        <th scope="col" class="py-3 text-end">Acciones</th>\r
      </tr>\r
    </thead>\r
    <tbody>\r
      @for (role of roles; track role.idg) {\r
        <tr>\r
          <td class="fw-medium">{{ role.nombreg }}</td>\r
          <td class="text-muted small">{{ role.descripciong }}</td>\r
          <td>\r
            <span class="badge bg-light text-dark border rounded-pill px-3">\r
              {{ role.permisosg }} permisos\r
            </span>\r
          </td>\r
          <td>\r
            <span class="badge rounded-pill"\r
                  [ngClass]="{\r
                    'bg-success-subtle text-success': (role.estadog | lowercase) === 'activo',\r
                    'bg-danger-subtle text-danger': (role.estadog | lowercase) === 'inactivo'\r
                  }">\r
              {{ role.estadog }}\r
            </span>\r
          </td>\r
          <td class="text-muted small">{{ role.fechacreaciong | date:'dd/MM/yyyy' }}</td>\r
          <td class="text-end">\r
            <button class="btn btn-sm btn-outline-success" title="Editar"\r
                    (click)="onEditClick(role)" aria-label="Editar rol">\r
              <i class="bi bi-pencil"></i>\r
            </button>\r
          </td>\r
        </tr>\r
      } @empty {\r
        @if (!isLoading) {\r
          <tr>\r
            <td colspan="6" class="text-center py-5 text-muted">\r
              <i class="bi bi-shield-slash fs-1 d-block mb-2 opacity-50"></i>\r
              No hay roles registrados.\r
            </td>\r
          </tr>\r
        }\r
      }\r
    </tbody>\r
  </table>\r
</div>\r
`, styles: ["/* src/app/components/administration/admin-role-management/admin-role-table/admin-role-table.component.css */\n/*# sourceMappingURL=admin-role-table.component.css.map */\n"] }]
  }], null, { roles: [{
    type: Input
  }], isLoading: [{
    type: Input
  }], editRole: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminRoleTableComponent, { className: "AdminRoleTableComponent", filePath: "app/components/administration/admin-role-management/admin-role-table/admin-role-table.component.ts", lineNumber: 12 });
})();

// src/app/components/administration/admin-role-management/admin-role-create-modal/admin-role-create-modal.component.ts
var _c02 = (a0) => ({ "is-invalid": a0 });
function AdminRoleCreateModalComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, "El nombre es obligatorio.");
    \u0275\u0275elementEnd();
  }
}
function AdminRoleCreateModalComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, "La descripci\xF3n es obligatoria.");
    \u0275\u0275elementEnd();
  }
}
function AdminRoleCreateModalComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 22);
    \u0275\u0275text(1, " Guardando... ");
  }
}
function AdminRoleCreateModalComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isEditing ? "Guardar Cambios" : "Guardar Rol", " ");
  }
}
var AdminRoleCreateModalComponent = class _AdminRoleCreateModalComponent {
  roleCreated = new EventEmitter();
  createRoleForm;
  isSubmitting = false;
  isEditing = false;
  currentRoleId = null;
  fb = inject(FormBuilder);
  roleService = inject(AdminRoleManagementService);
  constructor() {
    this.createRoleForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", [Validators.required, Validators.maxLength(200)]],
      status: ["activo", Validators.required]
    });
  }
  onSubmitCreate() {
    if (this.createRoleForm.invalid) {
      this.createRoleForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const formValues = this.createRoleForm.value;
    const requestPayload = {
      roleGId: this.isEditing ? this.currentRoleId ?? void 0 : void 0,
      roleG: formValues.name,
      description: formValues.description,
      state: formValues.status === "activo"
    };
    const request$ = this.isEditing ? this.roleService.updateRole(requestPayload) : this.roleService.createRole(requestPayload);
    request$.subscribe({
      next: (response) => {
        if (response.success) {
          alert(response.message);
          const modalElement = document.getElementById("createRoleModal");
          if (modalElement) {
            bootstrap.Modal.getInstance(modalElement)?.hide();
          }
          this.createRoleForm.reset({ status: "activo" });
          this.roleCreated.emit();
        } else {
          alert(response.message);
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error("Error creando rol:", error);
        this.isSubmitting = false;
        alert(this.isEditing ? "Error al actualizar el rol" : "Error al crear el rol");
      }
    });
  }
  set roleToEdit(role) {
    if (role) {
      this.isEditing = true;
      this.currentRoleId = role.idg;
      this.createRoleForm.patchValue({
        name: role.nombreg,
        description: role.descripciong,
        status: role.estadog.toLowerCase() === "activo" ? "activo" : "inactivo"
      });
    } else {
      this.isEditing = false;
      this.currentRoleId = null;
      this.createRoleForm.reset({ status: "activo" });
    }
  }
  get f() {
    return this.createRoleForm.controls;
  }
  static \u0275fac = function AdminRoleCreateModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminRoleCreateModalComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminRoleCreateModalComponent, selectors: [["app-admin-role-create-modal"]], inputs: { roleToEdit: "roleToEdit" }, outputs: { roleCreated: "roleCreated" }, decls: 39, vars: 15, consts: [["id", "createRoleModal", "tabindex", "-1", "aria-labelledby", "createRoleModalLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog", "modal-dialog-centered"], [1, "modal-content", "rounded-3", "border-0", "shadow-lg"], [1, "modal-header", "border-bottom-0", "pt-4", "pb-2", "px-4"], ["id", "createRoleModalLabel", 1, "modal-title", "fw-bold", "fs-4", "text-dark", "mb-1"], [1, "text-muted", "small", "mb-0"], ["type", "button", "data-bs-dismiss", "modal", "aria-label", "Close", 1, "btn-close", "mb-auto"], [1, "modal-body", "px-4", "py-3"], [1, "d-flex", "flex-column", "gap-3", 3, "ngSubmit", "formGroup"], [1, "form-floating"], ["type", "text", "id", "name", "formControlName", "name", "placeholder", "Ej: Auditor", 1, "form-control", 3, "ngClass"], ["for", "name", 1, "text-muted"], [1, "text-danger", "mt-1", "small"], ["id", "description", "formControlName", "description", "placeholder", "Descripci\xF3n", 1, "form-control", 2, "height", "100px", 3, "ngClass"], ["for", "description", 1, "text-muted"], ["id", "status", "formControlName", "status", 1, "form-select", 3, "ngClass"], ["value", "activo"], ["value", "inactivo"], ["for", "status", 1, "text-muted"], [1, "modal-footer", "border-top-0", "px-4", "pb-4", "pt-1", "justify-content-end", "gap-2"], ["type", "button", "data-bs-dismiss", "modal", 1, "btn", "btn-light", "rounded-3", "px-4", "fw-medium", "text-secondary"], ["type", "submit", 1, "btn", "btn-success", "rounded-3", "px-4", "fw-medium", "shadow-sm", 3, "click", "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"]], template: function AdminRoleCreateModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div")(5, "h5", 4);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 5);
      \u0275\u0275text(8, "Defina los detalles del nuevo nivel de acceso.");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(9, "button", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 7)(11, "form", 8);
      \u0275\u0275listener("ngSubmit", function AdminRoleCreateModalComponent_Template_form_ngSubmit_11_listener() {
        return ctx.onSubmitCreate();
      });
      \u0275\u0275elementStart(12, "div")(13, "div", 9);
      \u0275\u0275element(14, "input", 10);
      \u0275\u0275elementStart(15, "label", 11);
      \u0275\u0275text(16, "Nombre del Rol *");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(17, AdminRoleCreateModalComponent_Conditional_17_Template, 2, 0, "div", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div")(19, "div", 9);
      \u0275\u0275element(20, "textarea", 13);
      \u0275\u0275elementStart(21, "label", 14);
      \u0275\u0275text(22, "Descripci\xF3n *");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(23, AdminRoleCreateModalComponent_Conditional_23_Template, 2, 0, "div", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div")(25, "div", 9)(26, "select", 15)(27, "option", 16);
      \u0275\u0275text(28, "Activo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "option", 17);
      \u0275\u0275text(30, "Inactivo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "label", 18);
      \u0275\u0275text(32, "Estado Inicial *");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(33, "div", 19)(34, "button", 20);
      \u0275\u0275text(35, "Cancelar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "button", 21);
      \u0275\u0275listener("click", function AdminRoleCreateModalComponent_Template_button_click_36_listener() {
        return ctx.onSubmitCreate();
      });
      \u0275\u0275conditionalCreate(37, AdminRoleCreateModalComponent_Conditional_37_Template, 2, 0)(38, AdminRoleCreateModalComponent_Conditional_38_Template, 1, 1);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.isEditing ? "Editar Rol" : "Nuevo Rol");
      \u0275\u0275advance(5);
      \u0275\u0275property("formGroup", ctx.createRoleForm);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(9, _c02, ctx.f["name"].invalid && (ctx.f["name"].dirty || ctx.f["name"].touched)));
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.f["name"].hasError("required") && ctx.f["name"].touched ? 17 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(11, _c02, ctx.f["description"].invalid && (ctx.f["description"].dirty || ctx.f["description"].touched)));
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.f["description"].invalid && ctx.f["description"].touched ? 23 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(13, _c02, ctx.f["status"].invalid && ctx.f["status"].touched));
      \u0275\u0275advance(10);
      \u0275\u0275property("disabled", ctx.createRoleForm.invalid || ctx.isSubmitting);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSubmitting ? 37 : 38);
    }
  }, dependencies: [CommonModule, NgClass, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminRoleCreateModalComponent, [{
    type: Component,
    args: [{ selector: "app-admin-role-create-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="modal fade" id="createRoleModal" tabindex="-1" aria-labelledby="createRoleModalLabel" aria-hidden="true">\r
  <div class="modal-dialog modal-dialog-centered">\r
    <div class="modal-content rounded-3 border-0 shadow-lg">\r
\r
      <div class="modal-header border-bottom-0 pt-4 pb-2 px-4">\r
        <div>\r
          <h5 class="modal-title fw-bold fs-4 text-dark mb-1" id="createRoleModalLabel">{{ isEditing ? 'Editar Rol' : 'Nuevo Rol' }}</h5>\r
          <p class="text-muted small mb-0">Defina los detalles del nuevo nivel de acceso.</p>\r
        </div>\r
        <button type="button" class="btn-close mb-auto" data-bs-dismiss="modal" aria-label="Close"></button>\r
      </div>\r
\r
      <div class="modal-body px-4 py-3">\r
        <form [formGroup]="createRoleForm" (ngSubmit)="onSubmitCreate()" class="d-flex flex-column gap-3">\r
\r
          <div>\r
            <div class="form-floating">\r
              <input type="text" class="form-control" id="name" formControlName="name" placeholder="Ej: Auditor"\r
                    [ngClass]="{'is-invalid': f['name'].invalid && (f['name'].dirty || f['name'].touched)}">\r
              <label for="name" class="text-muted">Nombre del Rol *</label>\r
            </div>\r
            @if (f['name'].hasError('required') && f['name'].touched) { <div class="text-danger mt-1 small">El nombre es obligatorio.</div> }\r
          </div>\r
\r
          <div>\r
            <div class="form-floating">\r
              <textarea class="form-control" id="description" formControlName="description" placeholder="Descripci\xF3n" style="height: 100px"\r
                        [ngClass]="{'is-invalid': f['description'].invalid && (f['description'].dirty || f['description'].touched)}"></textarea>\r
              <label for="description" class="text-muted">Descripci\xF3n *</label>\r
            </div>\r
            @if (f['description'].invalid && f['description'].touched) { <div class="text-danger mt-1 small">La descripci\xF3n es obligatoria.</div> }\r
          </div>\r
\r
          <div>\r
            <div class="form-floating">\r
              <select class="form-select" id="status" formControlName="status"\r
                      [ngClass]="{'is-invalid': f['status'].invalid && f['status'].touched}">\r
                <option value="activo">Activo</option>\r
                <option value="inactivo">Inactivo</option>\r
              </select>\r
              <label for="status" class="text-muted">Estado Inicial *</label>\r
            </div>\r
          </div>\r
\r
        </form>\r
      </div>\r
\r
      <div class="modal-footer border-top-0 px-4 pb-4 pt-1 justify-content-end gap-2">\r
        <button type="button" class="btn btn-light rounded-3 px-4 fw-medium text-secondary" data-bs-dismiss="modal">Cancelar</button>\r
        <button type="submit" class="btn btn-success rounded-3 px-4 fw-medium shadow-sm"\r
                [disabled]="createRoleForm.invalid || isSubmitting" (click)="onSubmitCreate()">\r
          @if (isSubmitting) {\r
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>\r
            Guardando...\r
          } @else {\r
            {{ isEditing ? 'Guardar Cambios' : 'Guardar Rol' }}\r
          }\r
        </button>\r
      </div>\r
\r
    </div>\r
  </div>\r
</div>\r
` }]
  }], () => [], { roleCreated: [{
    type: Output
  }], roleToEdit: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminRoleCreateModalComponent, { className: "AdminRoleCreateModalComponent", filePath: "app/components/administration/admin-role-management/admin-role-create-modal/admin-role-create-modal.component.ts", lineNumber: 16 });
})();

// src/app/components/administration/admin-role-management/admin-role-management-server-connection/admin-role-management-server-connection.component.ts
var _c03 = (a0) => ({ "border-success bg-success-subtle": a0 });
var _forTrack02 = ($index, $item) => $item.pidrol;
var _forTrack1 = ($index, $item) => $item.pidgrol;
function AdminRoleManagementServerConnectionComponent_For_9_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12)(2, "div")(3, "span", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small", 14);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 15)(8, "input", 16);
    \u0275\u0275listener("change", function AdminRoleManagementServerConnectionComponent_For_9_For_8_Template_input_change_8_listener($event) {
      const connection_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleRole(connection_r2, $event));
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const connection_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(5, _c03, connection_r2.prelacion));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(connection_r2.pgrol);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(connection_r2.pgdescripcion);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", connection_r2.prelacion);
    \u0275\u0275attribute("aria-label", "Activar conexi\xF3n " + connection_r2.pgrol);
  }
}
function AdminRoleManagementServerConnectionComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "h6", 8);
    \u0275\u0275element(3, "i", 9);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 5)(6, "div", 10);
    \u0275\u0275repeaterCreate(7, AdminRoleManagementServerConnectionComponent_For_9_For_8_Template, 9, 7, "div", 11, _forTrack1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const appRole_r4 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Rol App: ", appRole_r4.prol, " ");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(appRole_r4.grolesconection);
  }
}
var AdminRoleManagementServerConnectionComponent = class _AdminRoleManagementServerConnectionComponent {
  matrixData = [];
  roleService = inject(AdminRoleManagementService);
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.roleService.getRoleServerMatrix().subscribe({
      next: (data) => {
        this.matrixData = data;
      },
      error: (err) => {
        console.error("Error cargando la matriz", err);
      }
    });
  }
  toggleRole(connection, event) {
    connection.prelacion = event.target.checked;
  }
  saveConnections() {
    const payload = this.matrixData.map((appRole) => {
      return {
        roleAppGId: appRole.pidrol,
        serverRoleIds: appRole.grolesconection.filter((conn) => conn.prelacion).map((conn) => conn.pidgrol)
      };
    });
    console.log("JSON a enviar al backend:", payload);
    this.roleService.updateServerMappings(payload).subscribe({
      next: (response) => {
        if (response.success) {
          alert("Conexiones guardadas exitosamente.");
        } else {
          alert(response.message);
        }
      },
      error: (err) => {
        console.error(err);
        alert("Error al guardar las conexiones.");
      }
    });
  }
  static \u0275fac = function AdminRoleManagementServerConnectionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminRoleManagementServerConnectionComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminRoleManagementServerConnectionComponent, selectors: [["app-admin-role-management-server-connection"]], decls: 10, vars: 0, consts: [[1, "card", "border-0", "shadow-sm"], [1, "card-header", "bg-white", "border-0", "p-3", "d-flex", "justify-content-between", "align-items-center"], [1, "fw-semibold", "mb-0"], [1, "btn", "btn-success", "d-flex", "align-items-center", "gap-2", 3, "click"], [1, "bi", "bi-floppy"], [1, "card-body", "p-3"], [1, "card", "border", "shadow-sm", "mb-3"], [1, "card-header", "bg-light", "border-0", "py-3", "px-4"], [1, "fw-semibold", "mb-0", "d-flex", "align-items-center", "gap-2"], [1, "bi", "bi-shield-lock-fill", "text-success"], [1, "row", "g-3"], [1, "col-md-6", "col-lg-4"], [1, "p-3", "border", "rounded-3", "d-flex", "justify-content-between", "align-items-center", 3, "ngClass"], [1, "fw-medium", "d-block", "text-dark", "small"], [1, "text-muted"], [1, "form-check", "form-switch", "fs-5", "mb-0"], ["type", "checkbox", "role", "switch", 1, "form-check-input", 3, "change", "checked"]], template: function AdminRoleManagementServerConnectionComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h5", 2);
      \u0275\u0275text(3, "Conexi\xF3n de Roles");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function AdminRoleManagementServerConnectionComponent_Template_button_click_4_listener() {
        return ctx.saveConnections();
      });
      \u0275\u0275element(5, "i", 4);
      \u0275\u0275text(6, " Guardar cambios ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5);
      \u0275\u0275repeaterCreate(8, AdminRoleManagementServerConnectionComponent_For_9_Template, 9, 1, "div", 6, _forTrack02);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.matrixData);
    }
  }, dependencies: [CommonModule, NgClass], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n/*# sourceMappingURL=admin-role-management-server-connection.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminRoleManagementServerConnectionComponent, [{
    type: Component,
    args: [{ selector: "app-admin-role-management-server-connection", standalone: true, imports: [CommonModule], template: `<div class="card border-0 shadow-sm">\r
  <div class="card-header bg-white border-0 p-3 d-flex justify-content-between align-items-center">\r
    <h5 class="fw-semibold mb-0">Conexi\xF3n de Roles</h5>\r
    <button class="btn btn-success d-flex align-items-center gap-2"\r
            (click)="saveConnections()">\r
      <i class="bi bi-floppy"></i> Guardar cambios\r
    </button>\r
  </div>\r
\r
  <div class="card-body p-3">\r
    @for (appRole of matrixData; track appRole.pidrol) {\r
      <div class="card border shadow-sm mb-3">\r
        <div class="card-header bg-light border-0 py-3 px-4">\r
          <h6 class="fw-semibold mb-0 d-flex align-items-center gap-2">\r
            <i class="bi bi-shield-lock-fill text-success"></i> Rol App: {{ appRole.prol }}\r
          </h6>\r
        </div>\r
        <div class="card-body p-3">\r
          <div class="row g-3">\r
            @for (connection of appRole.grolesconection; track connection.pidgrol) {\r
              <div class="col-md-6 col-lg-4">\r
                <div class="p-3 border rounded-3 d-flex justify-content-between align-items-center"\r
                     [ngClass]="{'border-success bg-success-subtle': connection.prelacion}">\r
                  <div>\r
                    <span class="fw-medium d-block text-dark small">{{ connection.pgrol }}</span>\r
                    <small class="text-muted">{{ connection.pgdescripcion }}</small>\r
                  </div>\r
                  <div class="form-check form-switch fs-5 mb-0">\r
                    <input class="form-check-input" type="checkbox" role="switch"\r
                           [checked]="connection.prelacion"\r
                           (change)="toggleRole(connection, $event)"\r
                           [attr.aria-label]="'Activar conexi\xF3n ' + connection.pgrol">\r
                  </div>\r
                </div>\r
              </div>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
    }\r
  </div>\r
</div>\r
`, styles: ["/* src/app/components/administration/admin-role-management/admin-role-management-server-connection/admin-role-management-server-connection.component.css */\n:host {\n  display: block;\n  min-width: 0;\n}\n/*# sourceMappingURL=admin-role-management-server-connection.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminRoleManagementServerConnectionComponent, { className: "AdminRoleManagementServerConnectionComponent", filePath: "app/components/administration/admin-role-management/admin-role-management-server-connection/admin-role-management-server-connection.component.ts", lineNumber: 14 });
})();

// src/app/components/administration/admin-role-management/admin-role-management.component.ts
var AdminRoleManagementComponent = class _AdminRoleManagementComponent {
  roles = [];
  isLoading = true;
  selectedRoleToEdit = null;
  searchControl = new FormControl("");
  statusControl = new FormControl("");
  cdr = inject(ChangeDetectorRef);
  roleService = inject(AdminRoleManagementService);
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
      this.loadRoles(filterValue || "", stateParam);
    });
  }
  loadRoles(filter = "", state) {
    this.isLoading = true;
    this.roleService.getRoles(filter, state).subscribe({
      next: (data) => {
        this.roles = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error", err);
        this.isLoading = false;
      }
    });
  }
  openModal() {
    const modalElement = document.getElementById("createRoleModal");
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  prepareCreate() {
    this.selectedRoleToEdit = null;
    this.openModal();
  }
  prepareEdit(role) {
    this.selectedRoleToEdit = __spreadValues({}, role);
    this.openModal();
  }
  static \u0275fac = function AdminRoleManagementComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminRoleManagementComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminRoleManagementComponent, selectors: [["app-admin-role-management"]], decls: 45, vars: 5, consts: [[1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-start", "flex-wrap", "gap-2", "mb-3"], [1, "mb-1"], [1, "text-muted", "mb-0"], ["id", "rolesTab", "role", "tablist", 1, "nav", "nav-tabs", "mb-3"], ["role", "presentation", 1, "nav-item"], ["id", "app-roles-tab", "data-bs-toggle", "pill", "data-bs-target", "#app-roles", "type", "button", "role", "tab", "aria-controls", "app-roles", "aria-selected", "true", 1, "nav-link", "active"], [1, "bi", "bi-people-fill", "me-2"], ["id", "server-roles-tab", "data-bs-toggle", "pill", "data-bs-target", "#server-roles", "type", "button", "role", "tab", "aria-controls", "server-roles", "aria-selected", "false", 1, "nav-link"], [1, "bi", "bi-database-fill-gear", "me-2"], ["id", "rolesTabContent", 1, "tab-content"], ["id", "app-roles", "role", "tabpanel", "aria-labelledby", "app-roles-tab", 1, "tab-pane", "fade", "show", "active"], [1, "d-flex", "justify-content-end", "mb-3"], ["type", "button", 1, "btn", "btn-success", "d-flex", "align-items-center", "gap-2", 3, "click"], [1, "bi", "bi-plus-lg"], [1, "card", "border-0", "shadow-sm", "mb-3"], [1, "card-body"], [1, "row", "g-2", "align-items-end"], [1, "col-12", "col-md-8"], [1, "form-label", "mb-1"], ["type", "text", "placeholder", "Buscar por roles...", 1, "form-control", 3, "formControl"], [1, "col-12", "col-md-4"], [1, "form-select", 3, "formControl"], ["value", ""], ["value", "true"], ["value", "false"], [1, "card", "border-0", "shadow-sm"], [3, "editRole", "roles", "isLoading"], ["id", "server-roles", "role", "tabpanel", "aria-labelledby", "server-roles-tab", 1, "tab-pane", "fade"], [3, "roleCreated", "roleToEdit"]], template: function AdminRoleManagementComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h3", 2);
      \u0275\u0275text(4, "Gesti\xF3n de Roles");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Administra los roles y su conexi\xF3n de seguridad.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "ul", 4)(8, "li", 5)(9, "button", 6);
      \u0275\u0275element(10, "i", 7);
      \u0275\u0275text(11, "Roles del servidor ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "li", 5)(13, "button", 8);
      \u0275\u0275element(14, "i", 9);
      \u0275\u0275text(15, "Conexi\xF3n con roles del servidor ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "div", 10)(17, "div", 11)(18, "div", 12)(19, "button", 13);
      \u0275\u0275listener("click", function AdminRoleManagementComponent_Template_button_click_19_listener() {
        return ctx.prepareCreate();
      });
      \u0275\u0275element(20, "i", 14);
      \u0275\u0275text(21, " Nuevo Rol ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div", 15)(23, "div", 16)(24, "div", 17)(25, "div", 18)(26, "label", 19);
      \u0275\u0275text(27, "Buscar");
      \u0275\u0275elementEnd();
      \u0275\u0275element(28, "input", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "div", 21)(30, "label", 19);
      \u0275\u0275text(31, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "select", 22)(33, "option", 23);
      \u0275\u0275text(34, "Todos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "option", 24);
      \u0275\u0275text(36, "Activos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "option", 25);
      \u0275\u0275text(38, "Inactivos");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(39, "div", 26)(40, "div", 16)(41, "app-admin-role-table", 27);
      \u0275\u0275listener("editRole", function AdminRoleManagementComponent_Template_app_admin_role_table_editRole_41_listener($event) {
        return ctx.prepareEdit($event);
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(42, "div", 28);
      \u0275\u0275element(43, "app-admin-role-management-server-connection");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(44, "app-admin-role-create-modal", 29);
      \u0275\u0275listener("roleCreated", function AdminRoleManagementComponent_Template_app_admin_role_create_modal_roleCreated_44_listener() {
        return ctx.loadRoles();
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(28);
      \u0275\u0275property("formControl", ctx.searchControl);
      \u0275\u0275advance(4);
      \u0275\u0275property("formControl", ctx.statusControl);
      \u0275\u0275advance(9);
      \u0275\u0275property("roles", ctx.roles)("isLoading", ctx.isLoading);
      \u0275\u0275advance(3);
      \u0275\u0275property("roleToEdit", ctx.selectedRoleToEdit);
    }
  }, dependencies: [
    CommonModule,
    AdminRoleTableComponent,
    AdminRoleCreateModalComponent,
    ReactiveFormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    FormControlDirective,
    AdminRoleManagementServerConnectionComponent
  ], styles: ["\n\n/*# sourceMappingURL=admin-role-management.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminRoleManagementComponent, [{
    type: Component,
    args: [{ selector: "app-admin-role-management", standalone: true, imports: [
      CommonModule,
      AdminRoleTableComponent,
      AdminRoleCreateModalComponent,
      ReactiveFormsModule,
      AdminRoleManagementServerConnectionComponent
    ], template: '<div class="container-fluid">\r\n\r\n  <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">\r\n    <div>\r\n      <h3 class="mb-1">Gesti\xF3n de Roles</h3>\r\n      <p class="text-muted mb-0">Administra los roles y su conexi\xF3n de seguridad.</p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Tabs -->\r\n  <ul class="nav nav-tabs mb-3" id="rolesTab" role="tablist">\r\n    <li class="nav-item" role="presentation">\r\n      <button class="nav-link active" id="app-roles-tab" data-bs-toggle="pill"\r\n              data-bs-target="#app-roles" type="button" role="tab"\r\n              aria-controls="app-roles" aria-selected="true">\r\n        <i class="bi bi-people-fill me-2"></i>Roles del servidor\r\n      </button>\r\n    </li>\r\n    <li class="nav-item" role="presentation">\r\n      <button class="nav-link" id="server-roles-tab" data-bs-toggle="pill"\r\n              data-bs-target="#server-roles" type="button" role="tab"\r\n              aria-controls="server-roles" aria-selected="false">\r\n        <i class="bi bi-database-fill-gear me-2"></i>Conexi\xF3n con roles del servidor\r\n      </button>\r\n    </li>\r\n  </ul>\r\n\r\n  <div class="tab-content" id="rolesTabContent">\r\n\r\n    <!-- Tab: Roles de la Aplicaci\xF3n -->\r\n    <div class="tab-pane fade show active" id="app-roles" role="tabpanel" aria-labelledby="app-roles-tab">\r\n\r\n      <div class="d-flex justify-content-end mb-3">\r\n        <button type="button" class="btn btn-success d-flex align-items-center gap-2"\r\n                (click)="prepareCreate()">\r\n          <i class="bi bi-plus-lg"></i> Nuevo Rol\r\n        </button>\r\n      </div>\r\n\r\n      <!-- Filtros -->\r\n      <div class="card border-0 shadow-sm mb-3">\r\n        <div class="card-body">\r\n          <div class="row g-2 align-items-end">\r\n            <div class="col-12 col-md-8">\r\n              <label class="form-label mb-1">Buscar</label>\r\n              <input type="text" class="form-control"\r\n                     placeholder="Buscar por roles..." [formControl]="searchControl">\r\n            </div>\r\n            <div class="col-12 col-md-4">\r\n              <label class="form-label mb-1">Estado</label>\r\n              <select class="form-select" [formControl]="statusControl">\r\n                <option value="">Todos</option>\r\n                <option value="true">Activos</option>\r\n                <option value="false">Inactivos</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Tabla -->\r\n      <div class="card border-0 shadow-sm">\r\n        <div class="card-body">\r\n          <app-admin-role-table [roles]="roles" [isLoading]="isLoading"\r\n            (editRole)="prepareEdit($event)"></app-admin-role-table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Tab: Conexi\xF3n con servidor -->\r\n    <div class="tab-pane fade" id="server-roles" role="tabpanel" aria-labelledby="server-roles-tab">\r\n      <app-admin-role-management-server-connection></app-admin-role-management-server-connection>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n\r\n<app-admin-role-create-modal (roleCreated)="loadRoles()" [roleToEdit]="selectedRoleToEdit"></app-admin-role-create-modal>\r\n', styles: ["/* src/app/components/administration/admin-role-management/admin-role-management.component.css */\n/*# sourceMappingURL=admin-role-management.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminRoleManagementComponent, { className: "AdminRoleManagementComponent", filePath: "app/components/administration/admin-role-management/admin-role-management.component.ts", lineNumber: 26 });
})();
export {
  AdminRoleManagementComponent
};
//# sourceMappingURL=chunk-H736GQQN.js.map
