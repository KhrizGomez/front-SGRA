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

// src/app/services/administration/admin-user-management/admin-user-management.service.ts
var AdminUserManagementService = class _AdminUserManagementService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;
  getUsers(filter, date, state) {
    let params = new HttpParams();
    if (filter) {
      params = params.set("filter", filter);
    }
    if (date) {
      params = params.set("date", date);
    }
    if (state !== void 0 && state !== null) {
      params = params.set("state", state);
    }
    return this.http.get(`${this.apiUrl}/security/user-managements/list-userG`, { params });
  }
  getRolesForSelect() {
    return this.http.get(`${this.apiUrl}/security/role-managements/list-roles-combo`);
  }
  getUserById(userId) {
    let params = new HttpParams();
    params = params.set("idUser", userId);
    return this.http.get(`${this.apiUrl}/security/user-managements/list-userG-update`, { params });
  }
  createUser(userData) {
    return this.http.post(`${this.apiUrl}/security/user-managements/create-user`, userData);
  }
  updateUser(userData) {
    console.log("ojecto enviado:", userData);
    return this.http.put(`${this.apiUrl}/security/user-managements/update-user`, userData);
  }
  static \u0275fac = function AdminUserManagementService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminUserManagementService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminUserManagementService, factory: _AdminUserManagementService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminUserManagementService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/components/administration/admin-user-management/admin-user-table/admin-use-table.component.ts
var _c0 = (a0, a1) => ({ "bg-success-subtle text-success": a0, "bg-danger-subtle text-danger": a1 });
var _forTrack0 = ($index, $item) => $item.idgu;
function AdminUseTableComponent_For_16_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const user_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", user_r3.rolesasignadosgu, " Rol asignado ");
  }
}
function AdminUseTableComponent_For_16_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const user_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", user_r3.rolesasignadosgu, " Roles asignados ");
  }
}
function AdminUseTableComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "span", 6);
    \u0275\u0275conditionalCreate(5, AdminUseTableComponent_For_16_Conditional_5_Template, 1, 1)(6, AdminUseTableComponent_For_16_Conditional_6_Template, 1, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td", 7);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td")(11, "span", 8);
    \u0275\u0275pipe(12, "lowercase");
    \u0275\u0275pipe(13, "lowercase");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 9)(16, "div", 10)(17, "button", 11);
    \u0275\u0275element(18, "i", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 13);
    \u0275\u0275listener("click", function AdminUseTableComponent_For_16_Template_button_click_19_listener() {
      const user_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onEditClick(user_r3));
    });
    \u0275\u0275element(20, "i", 14);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const user_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r3.usuariogu);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(user_r3.rolesasignadosgu === 1 ? 5 : 6);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 5, user_r3.fechacreaciongu, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(12, _c0, \u0275\u0275pipeBind1(12, 8, user_r3.estadogu) === "activo", \u0275\u0275pipeBind1(13, 10, user_r3.estadogu) === "inactivo"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", user_r3.estadogu, " ");
  }
}
function AdminUseTableComponent_ForEmpty_17_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 15);
    \u0275\u0275element(2, "i", 16);
    \u0275\u0275text(3, " No se encontraron usuarios. ");
    \u0275\u0275elementEnd()();
  }
}
function AdminUseTableComponent_ForEmpty_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AdminUseTableComponent_ForEmpty_17_Conditional_0_Template, 4, 0, "tr");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r0.isLoading ? 0 : -1);
  }
}
var AdminUseTableComponent = class _AdminUseTableComponent {
  users = [];
  editUser = new EventEmitter();
  isLoading = true;
  onEditClick(user) {
    this.editUser.emit(user);
  }
  static \u0275fac = function AdminUseTableComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminUseTableComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminUseTableComponent, selectors: [["app-admin-user-table"]], inputs: { users: "users", isLoading: "isLoading" }, outputs: { editUser: "editUser" }, decls: 18, vars: 1, consts: [[1, "table-responsive"], [1, "table", "table-hover", "align-middle"], [1, "table-light"], ["scope", "col", 1, "py-3"], ["scope", "col", 1, "py-3", "text-end"], [1, "fw-medium"], [1, "badge", "bg-light", "text-dark", "border", "rounded-pill", "px-3"], [1, "text-muted"], [1, "badge", "rounded-pill", 3, "ngClass"], [1, "text-end"], [1, "d-inline-flex", "gap-1"], ["title", "Ver detalles", "aria-label", "Ver detalles del usuario", 1, "btn", "btn-sm", "btn-outline-secondary"], [1, "bi", "bi-eye"], ["title", "Editar", "aria-label", "Editar usuario", 1, "btn", "btn-sm", "btn-outline-success", 3, "click"], [1, "bi", "bi-pencil"], ["colspan", "5", 1, "text-center", "py-5", "text-muted"], [1, "bi", "bi-inbox", "fs-1", "d-block", "mb-2", "opacity-50"]], template: function AdminUseTableComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "table", 1)(2, "thead", 2)(3, "tr")(4, "th", 3);
      \u0275\u0275text(5, "Usuario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "th", 3);
      \u0275\u0275text(7, "Roles Asignados");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "th", 3);
      \u0275\u0275text(9, "Fecha Creaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "th", 3);
      \u0275\u0275text(11, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "th", 4);
      \u0275\u0275text(13, "Acciones");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "tbody");
      \u0275\u0275repeaterCreate(15, AdminUseTableComponent_For_16_Template, 21, 15, "tr", null, _forTrack0, false, AdminUseTableComponent_ForEmpty_17_Template, 1, 1);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(15);
      \u0275\u0275repeater(ctx.users);
    }
  }, dependencies: [CommonModule, NgClass, LowerCasePipe, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminUseTableComponent, [{
    type: Component,
    args: [{ selector: "app-admin-user-table", standalone: true, imports: [CommonModule], template: `<div class="table-responsive">\r
  <table class="table table-hover align-middle">\r
    <thead class="table-light">\r
      <tr>\r
        <th scope="col" class="py-3">Usuario</th>\r
        <th scope="col" class="py-3">Roles Asignados</th>\r
        <th scope="col" class="py-3">Fecha Creaci\xF3n</th>\r
        <th scope="col" class="py-3">Estado</th>\r
        <th scope="col" class="py-3 text-end">Acciones</th>\r
      </tr>\r
    </thead>\r
    <tbody>\r
      @for (user of users; track user.idgu) {\r
        <tr>\r
          <td class="fw-medium">{{ user.usuariogu }}</td>\r
          <td>\r
            <span class="badge bg-light text-dark border rounded-pill px-3">\r
              @if (user.rolesasignadosgu === 1) {\r
                {{ user.rolesasignadosgu }} Rol asignado\r
              } @else {\r
                {{ user.rolesasignadosgu }} Roles asignados\r
              }\r
            </span>\r
          </td>\r
          <td class="text-muted">{{ user.fechacreaciongu | date:'dd/MM/yyyy' }}</td>\r
          <td>\r
            <span class="badge rounded-pill"\r
                  [ngClass]="{\r
                    'bg-success-subtle text-success': (user.estadogu | lowercase) === 'activo',\r
                    'bg-danger-subtle text-danger': (user.estadogu | lowercase) === 'inactivo'\r
                  }">\r
              {{ user.estadogu }}\r
            </span>\r
          </td>\r
          <td class="text-end">\r
            <div class="d-inline-flex gap-1">\r
              <button class="btn btn-sm btn-outline-secondary" title="Ver detalles"\r
                      aria-label="Ver detalles del usuario">\r
                <i class="bi bi-eye"></i>\r
              </button>\r
              <button class="btn btn-sm btn-outline-success" title="Editar"\r
                      (click)="onEditClick(user)" aria-label="Editar usuario">\r
                <i class="bi bi-pencil"></i>\r
              </button>\r
            </div>\r
          </td>\r
        </tr>\r
      } @empty {\r
        @if (!isLoading) {\r
          <tr>\r
            <td colspan="5" class="text-center py-5 text-muted">\r
              <i class="bi bi-inbox fs-1 d-block mb-2 opacity-50"></i>\r
              No se encontraron usuarios.\r
            </td>\r
          </tr>\r
        }\r
      }\r
    </tbody>\r
  </table>\r
</div>\r
` }]
  }], null, { users: [{
    type: Input
  }], editUser: [{
    type: Output
  }], isLoading: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminUseTableComponent, { className: "AdminUseTableComponent", filePath: "app/components/administration/admin-user-management/admin-user-table/admin-use-table.component.ts", lineNumber: 12 });
})();

// src/app/components/administration/admin-user-management/admin-user-create-modal/admin-user-create-modal.component.ts
var _c02 = (a0) => ({ "is-invalid": a0 });
var _c1 = (a0, a1) => ({ "border-success bg-success-subtle text-success": a0, "border-light bg-light text-muted": a1 });
var _forTrack02 = ($index, $item) => $item.roleGId;
function AdminUserCreateModalComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, "El usuario es obligatorio.");
    \u0275\u0275elementEnd();
  }
}
function AdminUserCreateModalComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, "M\xEDnimo 4 caracteres.");
    \u0275\u0275elementEnd();
  }
}
function AdminUserCreateModalComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, "La contrase\xF1a es obligatoria (m\xEDn. 6 caracteres).");
    \u0275\u0275elementEnd();
  }
}
function AdminUserCreateModalComponent_For_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "input", 27);
    \u0275\u0275listener("change", function AdminUserCreateModalComponent_For_39_Template_input_change_1_listener($event) {
      const role_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onRoleToggle($event, role_r2.roleGId));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "label", 28)(3, "div", 29);
    \u0275\u0275element(4, "i", 30);
    \u0275\u0275elementStart(5, "span", 31);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const role_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("id", "role_" + role_r2.roleGId)("checked", ctx_r2.isRoleSelected(role_r2.roleGId));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(6, _c1, ctx_r2.isRoleSelected(role_r2.roleGId), !ctx_r2.isRoleSelected(role_r2.roleGId)))("for", "role_" + role_r2.roleGId);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.isRoleSelected(role_r2.roleGId) ? "bi-check-circle-fill" : "bi-circle");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(role_r2.roleG);
  }
}
function AdminUserCreateModalComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1, "Debe seleccionar al menos un rol para el usuario.");
    \u0275\u0275elementEnd();
  }
}
function AdminUserCreateModalComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 32);
    \u0275\u0275text(1, " Creando... ");
  }
}
function AdminUserCreateModalComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isEditing ? "Guardar Cambios" : "Crear Usuario", " ");
  }
}
var AdminUserCreateModalComponent = class _AdminUserCreateModalComponent {
  userCreated = new EventEmitter();
  rolesList = [];
  createUserForm;
  isSubmitting = false;
  isEditing = false;
  currentUserId = null;
  fb = inject(FormBuilder);
  userService = inject(AdminUserManagementService);
  constructor() {
    this.createUserForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      roleIds: this.fb.array([], [Validators.required]),
      status: ["activo"]
    });
  }
  ngOnInit() {
    this.userService.getRolesForSelect().subscribe((data) => this.rolesList = data);
  }
  onRoleToggle(event, roleId) {
    const roleIdsArray = this.createUserForm.get("roleIds");
    const isChecked = event.target.checked;
    if (isChecked) {
      if (!this.isRoleSelected(roleId)) {
        roleIdsArray.push(new FormControl(roleId));
      }
    } else {
      const index = roleIdsArray.controls.findIndex((ctrl) => ctrl.value === roleId);
      if (index !== -1) {
        roleIdsArray.removeAt(index);
      }
    }
    roleIdsArray.markAsTouched();
  }
  isRoleSelected(roleId) {
    const roleIdsArray = this.createUserForm.get("roleIds");
    return roleIdsArray.value.includes(roleId);
  }
  onSubmitCreate() {
    if (this.createUserForm.invalid) {
      this.createUserForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const formValues = this.createUserForm.value;
    const requestPayLoad = {
      userGId: this.isEditing ? this.currentUserId ?? void 0 : void 0,
      user: formValues.username,
      password: formValues.password,
      state: formValues.status === "activo",
      roles: formValues.roleIds
    };
    const request$ = this.isEditing ? this.userService.updateUser(requestPayLoad) : this.userService.createUser(requestPayLoad);
    request$.subscribe({
      next: (response) => {
        if (response.success) {
          alert(response.message);
          const modalElement = document.getElementById("createUserModal");
          if (modalElement) {
            bootstrap.Modal.getInstance(modalElement)?.hide();
          }
          this.createUserForm.reset({ status: "activo" });
          const roleIdsArray = this.createUserForm.get("roleIds");
          roleIdsArray.clear();
          this.userCreated.emit();
        } else {
          alert(response.message);
        }
        this.isSubmitting = false;
      },
      error: () => {
        this.isSubmitting = false;
        alert(this.isEditing ? "Error al actualizar usuario" : "Error al crear usuario");
      }
    });
  }
  set userIdToEdit(id) {
    const roleIdsArray = this.createUserForm.get("roleIds");
    const passwordControl = this.createUserForm.get("password");
    if (id) {
      this.isEditing = true;
      roleIdsArray.clear();
      this.currentUserId = id;
      passwordControl?.clearValidators();
      passwordControl?.setValidators([Validators.minLength(6)]);
      passwordControl?.updateValueAndValidity();
      this.userService.getUserById(id).subscribe({
        next: (userData) => {
          this.createUserForm.patchValue({
            username: userData.usuariogu,
            password: userData.contrasena,
            status: userData.estadogu.toLowerCase() === "activo" ? "activo" : "inactivo"
          });
          if (userData.roles && Array.isArray(userData.roles)) {
            const uniqueRoles = [...new Set(userData.roles)];
            uniqueRoles.forEach((roleId) => {
              roleIdsArray.push(new FormControl(roleId));
            });
          }
          this.createUserForm.updateValueAndValidity();
        },
        error: (err) => {
          alert("No se pudo cargar la informaci\xF3n del usuario.");
        }
      });
    } else {
      this.isEditing = false;
      this.currentUserId = null;
      this.createUserForm.reset({ status: "activo" });
      if (roleIdsArray)
        roleIdsArray.clear();
      passwordControl?.setValidators([Validators.required, Validators.minLength(6)]);
      passwordControl?.updateValueAndValidity();
    }
  }
  get f() {
    return this.createUserForm.controls;
  }
  static \u0275fac = function AdminUserCreateModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminUserCreateModalComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminUserCreateModalComponent, selectors: [["app-admin-user-create-modal"]], inputs: { userIdToEdit: "userIdToEdit" }, outputs: { userCreated: "userCreated" }, decls: 47, vars: 17, consts: [["id", "createUserModal", "tabindex", "-1", "aria-labelledby", "createUserModalLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog", "modal-dialog-centered"], [1, "modal-content", "rounded-3", "border-0", "shadow-lg"], [1, "modal-header", "border-bottom-0", "pt-4", "pb-2", "px-4"], ["id", "createUserModalLabel", 1, "modal-title", "fw-bold", "fs-4", "text-dark", "mb-1"], [1, "text-muted", "small", "mb-0"], ["type", "button", "data-bs-dismiss", "modal", "aria-label", "Close", 1, "btn-close", "mb-auto"], [1, "modal-body", "px-4", "py-3"], [1, "d-flex", "flex-column", "gap-3", 3, "ngSubmit", "formGroup"], [1, "form-floating"], ["type", "text", "id", "username", "formControlName", "username", "placeholder", "admin01", 1, "form-control", 3, "ngClass"], ["for", "username", 1, "text-muted"], [1, "text-danger", "mt-1", "small"], ["type", "password", "id", "password", "formControlName", "password", "placeholder", "123456", 1, "form-control", 3, "ngClass"], ["for", "password", 1, "text-muted"], ["id", "status", "formControlName", "status", 1, "form-select", 3, "ngClass"], ["value", "activo"], ["value", "inactivo"], ["for", "status", 1, "text-muted"], [1, "mt-2"], [1, "text-muted", "fw-medium", "small", "mb-2"], [1, "row", "g-2"], [1, "col-6"], [1, "text-danger", "mt-2", "small"], [1, "modal-footer", "border-top-0", "px-4", "pb-4", "pt-1", "justify-content-end", "gap-2"], ["type", "button", "data-bs-dismiss", "modal", 1, "btn", "btn-light", "rounded-3", "px-4", "fw-medium", "text-secondary"], ["type", "submit", 1, "btn", "btn-success", "rounded-3", "px-4", "fw-medium", "shadow-sm", 3, "click", "disabled"], ["type", "checkbox", 1, "d-none", 3, "change", "id", "checked"], [1, "w-100", "border", "rounded-3", "p-3", "transition-all", 2, "cursor", "pointer", 3, "ngClass", "for"], [1, "d-flex", "align-items-center", "gap-2"], [1, "bi", "fs-5", 3, "ngClass"], [1, "fw-medium", "small"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"]], template: function AdminUserCreateModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div")(5, "h5", 4);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 5);
      \u0275\u0275text(8, "Complete las credenciales y asigne sus roles.");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(9, "button", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 7)(11, "form", 8);
      \u0275\u0275listener("ngSubmit", function AdminUserCreateModalComponent_Template_form_ngSubmit_11_listener() {
        return ctx.onSubmitCreate();
      });
      \u0275\u0275elementStart(12, "div")(13, "div", 9);
      \u0275\u0275element(14, "input", 10);
      \u0275\u0275elementStart(15, "label", 11);
      \u0275\u0275text(16, "Usuario");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(17, AdminUserCreateModalComponent_Conditional_17_Template, 2, 0, "div", 12);
      \u0275\u0275conditionalCreate(18, AdminUserCreateModalComponent_Conditional_18_Template, 2, 0, "div", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div")(20, "div", 9);
      \u0275\u0275element(21, "input", 13);
      \u0275\u0275elementStart(22, "label", 14);
      \u0275\u0275text(23, "Contrase\xF1a *");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(24, AdminUserCreateModalComponent_Conditional_24_Template, 2, 0, "div", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div")(26, "div", 9)(27, "select", 15)(28, "option", 16);
      \u0275\u0275text(29, "Activo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "option", 17);
      \u0275\u0275text(31, "Inactivo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "label", 18);
      \u0275\u0275text(33, "Estado Inicial *");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(34, "div", 19)(35, "label", 20);
      \u0275\u0275text(36, "Roles Asignados *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "div", 21);
      \u0275\u0275repeaterCreate(38, AdminUserCreateModalComponent_For_39_Template, 7, 9, "div", 22, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(40, AdminUserCreateModalComponent_Conditional_40_Template, 2, 0, "div", 23);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(41, "div", 24)(42, "button", 25);
      \u0275\u0275text(43, "Cancelar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "button", 26);
      \u0275\u0275listener("click", function AdminUserCreateModalComponent_Template_button_click_44_listener() {
        return ctx.onSubmitCreate();
      });
      \u0275\u0275conditionalCreate(45, AdminUserCreateModalComponent_Conditional_45_Template, 2, 0)(46, AdminUserCreateModalComponent_Conditional_46_Template, 1, 1);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.isEditing ? "Editar Usuario" : "Nuevo Usuario");
      \u0275\u0275advance(5);
      \u0275\u0275property("formGroup", ctx.createUserForm);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(11, _c02, ctx.f["username"].invalid && (ctx.f["username"].dirty || ctx.f["username"].touched)));
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.f["username"].hasError("required") && ctx.f["username"].touched ? 17 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.f["username"].hasError("minlength") && ctx.f["username"].touched ? 18 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(13, _c02, ctx.f["password"].invalid && (ctx.f["password"].dirty || ctx.f["password"].touched)));
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.f["password"].invalid && ctx.f["password"].touched ? 24 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(15, _c02, ctx.f["status"].invalid && ctx.f["status"].touched));
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.rolesList);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((ctx.f["roleIds"] == null ? null : ctx.f["roleIds"].invalid) && (ctx.f["roleIds"] == null ? null : ctx.f["roleIds"].touched) ? 40 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.createUserForm.invalid || ctx.isSubmitting);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSubmitting ? 45 : 46);
    }
  }, dependencies: [CommonModule, NgClass, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminUserCreateModalComponent, [{
    type: Component,
    args: [{ selector: "app-admin-user-create-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="modal fade" id="createUserModal" tabindex="-1" aria-labelledby="createUserModalLabel" aria-hidden="true">\r
  <div class="modal-dialog modal-dialog-centered">\r
    <div class="modal-content rounded-3 border-0 shadow-lg">\r
\r
      <div class="modal-header border-bottom-0 pt-4 pb-2 px-4">\r
        <div>\r
          <h5 class="modal-title fw-bold fs-4 text-dark mb-1" id="createUserModalLabel">{{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}</h5>\r
          <p class="text-muted small mb-0">Complete las credenciales y asigne sus roles.</p>\r
        </div>\r
        <button type="button" class="btn-close mb-auto" data-bs-dismiss="modal" aria-label="Close"></button>\r
      </div>\r
\r
      <div class="modal-body px-4 py-3">\r
        <form [formGroup]="createUserForm" (ngSubmit)="onSubmitCreate()" class="d-flex flex-column gap-3">\r
\r
          <div>\r
            <div class="form-floating">\r
              <input type="text" class="form-control" id="username" formControlName="username" placeholder="admin01"\r
                    [ngClass]="{'is-invalid': f['username'].invalid && (f['username'].dirty || f['username'].touched)}">\r
              <label for="username" class="text-muted">Usuario</label>\r
            </div>\r
            @if (f['username'].hasError('required') && f['username'].touched) { <div class="text-danger mt-1 small">El usuario es obligatorio.</div> }\r
            @if (f['username'].hasError('minlength') && f['username'].touched) { <div class="text-danger mt-1 small">M\xEDnimo 4 caracteres.</div> }\r
          </div>\r
\r
          <div>\r
            <div class="form-floating">\r
              <input type="password" class="form-control" id="password" formControlName="password" placeholder="123456"\r
                  [ngClass]="{'is-invalid': f['password'].invalid && (f['password'].dirty || f['password'].touched)}">\r
              <label for="password" class="text-muted">Contrase\xF1a *</label>\r
            </div>\r
            @if (f['password'].invalid && f['password'].touched) {\r
                <div class="text-danger mt-1 small">La contrase\xF1a es obligatoria (m\xEDn. 6 caracteres).</div>\r
            }\r
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
          <div class="mt-2">\r
            <label class="text-muted fw-medium small mb-2">Roles Asignados *</label>\r
\r
            <div class="row g-2">\r
              @for (role of rolesList; track role.roleGId) {\r
                <div class="col-6">\r
\r
                  <input type="checkbox" class="d-none" [id]="'role_' + role.roleGId"\r
                        [checked]="isRoleSelected(role.roleGId)"\r
                        (change)="onRoleToggle($event, role.roleGId)">\r
\r
                  <label class="w-100 border rounded-3 p-3 transition-all"\r
                        style="cursor: pointer;"\r
                        [ngClass]="{\r
                          'border-success bg-success-subtle text-success': isRoleSelected(role.roleGId),\r
                          'border-light bg-light text-muted': !isRoleSelected(role.roleGId)\r
                        }"\r
                        [for]="'role_' + role.roleGId">\r
                    <div class="d-flex align-items-center gap-2">\r
                      <i class="bi fs-5" [ngClass]="isRoleSelected(role.roleGId) ? 'bi-check-circle-fill' : 'bi-circle'"></i>\r
                      <span class="fw-medium small">{{ role.roleG }}</span>\r
                    </div>\r
                  </label>\r
\r
                </div>\r
              }\r
            </div>\r
\r
            @if (f['roleIds']?.invalid && f['roleIds']?.touched) {\r
              <div class="text-danger mt-2 small">Debe seleccionar al menos un rol para el usuario.</div>\r
            }\r
          </div>\r
\r
        </form>\r
      </div>\r
\r
      <div class="modal-footer border-top-0 px-4 pb-4 pt-1 justify-content-end gap-2">\r
        <button type="button" class="btn btn-light rounded-3 px-4 fw-medium text-secondary" data-bs-dismiss="modal">Cancelar</button>\r
        <button type="submit" class="btn btn-success rounded-3 px-4 fw-medium shadow-sm"\r
                [disabled]="createUserForm.invalid || isSubmitting" (click)="onSubmitCreate()">\r
          @if (isSubmitting) {\r
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>\r
            Creando...\r
          } @else {\r
            {{ isEditing ? 'Guardar Cambios' : 'Crear Usuario' }}\r
          }\r
        </button>\r
      </div>\r
\r
    </div>\r
  </div>\r
</div>\r
` }]
  }], () => [], { userCreated: [{
    type: Output
  }], userIdToEdit: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminUserCreateModalComponent, { className: "AdminUserCreateModalComponent", filePath: "app/components/administration/admin-user-management/admin-user-create-modal/admin-user-create-modal.component.ts", lineNumber: 16 });
})();

// src/app/components/administration/admin-user-management/admin-user-management.component.ts
var AdminUserManagementComponent = class _AdminUserManagementComponent {
  users = [];
  selectedUserId = null;
  searchControl = new FormControl("");
  statusControl = new FormControl("");
  cdr = inject(ChangeDetectorRef);
  userService = inject(AdminUserManagementService);
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
      this.loadUsers(filterValue || "", stateParam);
    });
  }
  openModal() {
    const modalElement = document.getElementById("createUserModal");
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error("Angular no est\xE1 dibujando el componente del modal en la pantalla.");
    }
  }
  prepareEdit(user) {
    this.selectedUserId = user.idgu;
    this.openModal();
  }
  prepareCreate() {
    this.selectedUserId = null;
    this.openModal();
  }
  loadUsers(filter = "", state) {
    this.userService.getUsers(filter, void 0, state).subscribe({
      next: (data) => {
        this.users = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error cargando usuarios", err);
      }
    });
  }
  static \u0275fac = function AdminUserManagementComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminUserManagementComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminUserManagementComponent, selectors: [["app-admin-user-management"]], decls: 31, vars: 4, consts: [[1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-start", "flex-wrap", "gap-2", "mb-3"], [1, "mb-1"], [1, "text-muted", "mb-0"], ["type", "button", 1, "btn", "btn-success", "d-flex", "align-items-center", "gap-2", 3, "click"], [1, "bi", "bi-plus-lg"], [1, "card", "border-0", "shadow-sm", "mb-3"], [1, "card-body"], [1, "row", "g-2", "align-items-end"], [1, "col-12", "col-md-8"], [1, "form-label", "mb-1"], ["type", "text", "placeholder", "Buscar por usuario...", 1, "form-control", 3, "formControl"], [1, "col-12", "col-md-4"], [1, "form-select", 3, "formControl"], ["value", ""], ["value", "true"], ["value", "false"], [1, "card", "border-0", "shadow-sm"], [3, "editUser", "users"], [3, "userCreated", "userIdToEdit"]], template: function AdminUserManagementComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h3", 2);
      \u0275\u0275text(4, "Gesti\xF3n de Usuarios");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Administra las cuentas del sistema");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "button", 4);
      \u0275\u0275listener("click", function AdminUserManagementComponent_Template_button_click_7_listener() {
        return ctx.prepareCreate();
      });
      \u0275\u0275element(8, "i", 5);
      \u0275\u0275text(9, " Nuevo Usuario ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 6)(11, "div", 7)(12, "div", 8)(13, "div", 9)(14, "label", 10);
      \u0275\u0275text(15, "Buscar");
      \u0275\u0275elementEnd();
      \u0275\u0275element(16, "input", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 12)(18, "label", 10);
      \u0275\u0275text(19, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "select", 13)(21, "option", 14);
      \u0275\u0275text(22, "Todos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "option", 15);
      \u0275\u0275text(24, "Activos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "option", 16);
      \u0275\u0275text(26, "Inactivos");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(27, "div", 17)(28, "div", 7)(29, "app-admin-user-table", 18);
      \u0275\u0275listener("editUser", function AdminUserManagementComponent_Template_app_admin_user_table_editUser_29_listener($event) {
        return ctx.prepareEdit($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "app-admin-user-create-modal", 19);
      \u0275\u0275listener("userCreated", function AdminUserManagementComponent_Template_app_admin_user_create_modal_userCreated_30_listener() {
        return ctx.loadUsers();
      });
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275property("formControl", ctx.searchControl);
      \u0275\u0275advance(4);
      \u0275\u0275property("formControl", ctx.statusControl);
      \u0275\u0275advance(9);
      \u0275\u0275property("users", ctx.users);
      \u0275\u0275advance();
      \u0275\u0275property("userIdToEdit", ctx.selectedUserId);
    }
  }, dependencies: [CommonModule, AdminUseTableComponent, AdminUserCreateModalComponent, ReactiveFormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, FormControlDirective], styles: ["\n\n/*# sourceMappingURL=admin-user-management.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminUserManagementComponent, [{
    type: Component,
    args: [{ selector: "app-admin-user-management", standalone: true, imports: [CommonModule, AdminUseTableComponent, AdminUserCreateModalComponent, ReactiveFormsModule], template: '<div class="container-fluid">\r\n\r\n  <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">\r\n    <div>\r\n      <h3 class="mb-1">Gesti\xF3n de Usuarios</h3>\r\n      <p class="text-muted mb-0">Administra las cuentas del sistema</p>\r\n    </div>\r\n    <button type="button" class="btn btn-success d-flex align-items-center gap-2"\r\n            (click)="prepareCreate()">\r\n      <i class="bi bi-plus-lg"></i> Nuevo Usuario\r\n    </button>\r\n  </div>\r\n\r\n  <!-- Filtros -->\r\n  <div class="card border-0 shadow-sm mb-3">\r\n    <div class="card-body">\r\n      <div class="row g-2 align-items-end">\r\n        <div class="col-12 col-md-8">\r\n          <label class="form-label mb-1">Buscar</label>\r\n          <input type="text" class="form-control"\r\n                 placeholder="Buscar por usuario..." [formControl]="searchControl">\r\n        </div>\r\n        <div class="col-12 col-md-4">\r\n          <label class="form-label mb-1">Estado</label>\r\n          <select class="form-select" [formControl]="statusControl">\r\n            <option value="">Todos</option>\r\n            <option value="true">Activos</option>\r\n            <option value="false">Inactivos</option>\r\n          </select>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Tabla -->\r\n  <div class="card border-0 shadow-sm">\r\n    <div class="card-body">\r\n      <app-admin-user-table [users]="users" (editUser)="prepareEdit($event)"></app-admin-user-table>\r\n    </div>\r\n  </div>\r\n\r\n  <app-admin-user-create-modal [userIdToEdit]="selectedUserId"\r\n    (userCreated)="loadUsers()"></app-admin-user-create-modal>\r\n</div>\r\n', styles: ["/* src/app/components/administration/admin-user-management/admin-user-management.component.css */\n/*# sourceMappingURL=admin-user-management.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminUserManagementComponent, { className: "AdminUserManagementComponent", filePath: "app/components/administration/admin-user-management/admin-user-management.component.ts", lineNumber: 19 });
})();
export {
  AdminUserManagementComponent
};
//# sourceMappingURL=chunk-LQQ265HR.js.map
