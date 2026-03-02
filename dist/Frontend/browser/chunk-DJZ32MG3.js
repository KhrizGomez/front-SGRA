import {
  CheckboxControlValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
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
  EventEmitter,
  Injectable,
  Input,
  Output,
  environment,
  inject,
  map,
  of,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
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

// src/app/services/administration/admin-permission-management/admin-permission-management.service.ts
var AdminPermissionManagement = class _AdminPermissionManagement {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;
  getRolesForSelect() {
    return this.http.get(`${this.apiUrl}/security/role-managements/list-roles-combo`);
  }
  getMetricsByRoleId(role) {
    const metrics = role === "admin" ? { totalSchemas: 3, totalTablesWithAccess: 12, fullAccessTables: 12 } : { totalSchemas: 2, totalTablesWithAccess: 5, fullAccessTables: 1 };
    return of(metrics);
  }
  getPermissionsByRole(role) {
    let params = new HttpParams().set("role", role);
    return this.http.get(`${this.apiUrl}/security/module-managements/list-modules-permisis`, { params }).pipe(map((datosPlanos) => {
      const agrupados = datosPlanos.reduce((acumulador, tablaActual) => {
        let esquemaExistente = acumulador.find((e) => e.pesquema === tablaActual.pesquema);
        if (!esquemaExistente) {
          esquemaExistente = { pesquema: tablaActual.pesquema, tablas: [] };
          acumulador.push(esquemaExistente);
        }
        esquemaExistente.tablas.push(tablaActual);
        return acumulador;
      }, []);
      return agrupados;
    }));
  }
  savePermissions(roleId, permissions) {
    const tablasPlanas = permissions.flatMap((schema) => schema.tablas);
    const permisosLimpios = tablasPlanas.map((table) => ({
      pesquematabla: table.pesquematabla,
      ppselect: table.ppselect,
      ppinsert: table.ppinsert,
      ppupdate: table.ppupdate,
      ppdelete: table.ppdelete
    }));
    const payload = {
      roleId,
      permissions: permisosLimpios
    };
    console.log("JSON a enviar al backend:", payload);
    return this.http.put(`${this.apiUrl}/security/module-managements/update-permissions`, payload);
  }
  static \u0275fac = function AdminPermissionManagement_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminPermissionManagement)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminPermissionManagement, factory: _AdminPermissionManagement.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminPermissionManagement, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/components/administration/admin-permission-management/admin-permission-kpis/admin-permission-kpis.component.ts
function AdminPermissionKpisComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "div", 6);
  }
}
function AdminPermissionKpisComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((ctx_r0.metrics == null ? null : ctx_r0.metrics.totalSchemas) || 0);
  }
}
function AdminPermissionKpisComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "div", 6);
  }
}
function AdminPermissionKpisComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((ctx_r0.metrics == null ? null : ctx_r0.metrics.totalTablesWithAccess) || 0);
  }
}
function AdminPermissionKpisComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "div", 6);
  }
}
function AdminPermissionKpisComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((ctx_r0.metrics == null ? null : ctx_r0.metrics.fullAccessTables) || 0);
  }
}
var AdminPermissionKpisComponent = class _AdminPermissionKpisComponent {
  metrics = null;
  isLoading = false;
  static \u0275fac = function AdminPermissionKpisComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminPermissionKpisComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminPermissionKpisComponent, selectors: [["app-admin-permission-kpis"]], inputs: { metrics: "metrics", isLoading: "isLoading" }, decls: 31, vars: 3, consts: [[1, "row", "g-3", "mb-3"], [1, "col-md-4"], [1, "card", "border-0", "shadow-sm", "h-100"], [1, "card-body", "d-flex", "align-items-center", "gap-3"], [1, "bg-success-subtle", "text-success", "rounded-3", "p-2", "d-flex", "align-items-center", "justify-content-center"], [1, "bi", "bi-diagram-3-fill", "fs-4"], ["role", "status", "aria-label", "Cargando", 1, "spinner-border", "spinner-border-sm", "text-success", "mb-2"], [1, "display-6", "fw-bold", "text-dark"], [1, "text-muted"], [1, "bi", "bi-table", "fs-4"], [1, "bi", "bi-shield-lock-fill", "fs-4"]], template: function AdminPermissionKpisComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
      \u0275\u0275domElement(5, "i", 5);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "div");
      \u0275\u0275conditionalCreate(7, AdminPermissionKpisComponent_Conditional_7_Template, 1, 0, "div", 6)(8, AdminPermissionKpisComponent_Conditional_8_Template, 2, 1, "div", 7);
      \u0275\u0275domElementStart(9, "small", 8);
      \u0275\u0275text(10, "Esquemas Habilitados");
      \u0275\u0275domElementEnd()()()()();
      \u0275\u0275domElementStart(11, "div", 1)(12, "div", 2)(13, "div", 3)(14, "div", 4);
      \u0275\u0275domElement(15, "i", 9);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(16, "div");
      \u0275\u0275conditionalCreate(17, AdminPermissionKpisComponent_Conditional_17_Template, 1, 0, "div", 6)(18, AdminPermissionKpisComponent_Conditional_18_Template, 2, 1, "div", 7);
      \u0275\u0275domElementStart(19, "small", 8);
      \u0275\u0275text(20, "Tablas con Acceso");
      \u0275\u0275domElementEnd()()()()();
      \u0275\u0275domElementStart(21, "div", 1)(22, "div", 2)(23, "div", 3)(24, "div", 4);
      \u0275\u0275domElement(25, "i", 10);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(26, "div");
      \u0275\u0275conditionalCreate(27, AdminPermissionKpisComponent_Conditional_27_Template, 1, 0, "div", 6)(28, AdminPermissionKpisComponent_Conditional_28_Template, 2, 1, "div", 7);
      \u0275\u0275domElementStart(29, "small", 8);
      \u0275\u0275text(30, "Tablas con Acceso Total");
      \u0275\u0275domElementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.isLoading ? 7 : 8);
      \u0275\u0275advance(10);
      \u0275\u0275conditional(ctx.isLoading ? 17 : 18);
      \u0275\u0275advance(10);
      \u0275\u0275conditional(ctx.isLoading ? 27 : 28);
    }
  }, dependencies: [CommonModule], styles: ["\n\n/*# sourceMappingURL=admin-permission-kpis.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminPermissionKpisComponent, [{
    type: Component,
    args: [{ selector: "app-admin-permission-kpis", standalone: true, imports: [CommonModule], template: '<div class="row g-3 mb-3">\r\n\r\n  <div class="col-md-4">\r\n    <div class="card border-0 shadow-sm h-100">\r\n      <div class="card-body d-flex align-items-center gap-3">\r\n        <div class="bg-success-subtle text-success rounded-3 p-2 d-flex align-items-center justify-content-center">\r\n          <i class="bi bi-diagram-3-fill fs-4"></i>\r\n        </div>\r\n        <div>\r\n          @if (isLoading) {\r\n            <div class="spinner-border spinner-border-sm text-success mb-2" role="status"\r\n                 aria-label="Cargando"></div>\r\n          } @else {\r\n            <div class="display-6 fw-bold text-dark">{{ metrics?.totalSchemas || 0 }}</div>\r\n          }\r\n          <small class="text-muted">Esquemas Habilitados</small>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class="col-md-4">\r\n    <div class="card border-0 shadow-sm h-100">\r\n      <div class="card-body d-flex align-items-center gap-3">\r\n        <div class="bg-success-subtle text-success rounded-3 p-2 d-flex align-items-center justify-content-center">\r\n          <i class="bi bi-table fs-4"></i>\r\n        </div>\r\n        <div>\r\n          @if (isLoading) {\r\n            <div class="spinner-border spinner-border-sm text-success mb-2" role="status"\r\n                 aria-label="Cargando"></div>\r\n          } @else {\r\n            <div class="display-6 fw-bold text-dark">{{ metrics?.totalTablesWithAccess || 0 }}</div>\r\n          }\r\n          <small class="text-muted">Tablas con Acceso</small>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class="col-md-4">\r\n    <div class="card border-0 shadow-sm h-100">\r\n      <div class="card-body d-flex align-items-center gap-3">\r\n        <div class="bg-success-subtle text-success rounded-3 p-2 d-flex align-items-center justify-content-center">\r\n          <i class="bi bi-shield-lock-fill fs-4"></i>\r\n        </div>\r\n        <div>\r\n          @if (isLoading) {\r\n            <div class="spinner-border spinner-border-sm text-success mb-2" role="status"\r\n                 aria-label="Cargando"></div>\r\n          } @else {\r\n            <div class="display-6 fw-bold text-dark">{{ metrics?.fullAccessTables || 0 }}</div>\r\n          }\r\n          <small class="text-muted">Tablas con Acceso Total</small>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n', styles: ["/* src/app/components/administration/admin-permission-management/admin-permission-kpis/admin-permission-kpis.component.css */\n/*# sourceMappingURL=admin-permission-kpis.component.css.map */\n"] }]
  }], null, { metrics: [{
    type: Input
  }], isLoading: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminPermissionKpisComponent, { className: "AdminPermissionKpisComponent", filePath: "app/components/administration/admin-permission-management/admin-permission-kpis/admin-permission-kpis.component.ts", lineNumber: 12 });
})();

// src/app/components/administration/admin-permission-management/admin-permission-matrix/admin-permission-matrix.component.ts
var _forTrack0 = ($index, $item) => $item.pesquema;
var _forTrack1 = ($index, $item) => $item.pnombre;
function AdminPermissionMatrixComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "i", 2);
    \u0275\u0275text(2, " Seleccione un rol para ver sus permisos. ");
    \u0275\u0275elementEnd();
  }
}
function AdminPermissionMatrixComponent_Conditional_1_For_2_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 11)(2, "div", 12)(3, "h6", 13);
    \u0275\u0275element(4, "i", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 15);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 16)(9, "div", 17)(10, "div", 18)(11, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPermissionMatrixComponent_Conditional_1_For_2_For_9_Template_input_ngModelChange_11_listener($event) {
      const table_r2 = \u0275\u0275restoreView(_r1).$implicit;
      \u0275\u0275twoWayBindingSet(table_r2.ppselect, $event) || (table_r2.ppselect = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function AdminPermissionMatrixComponent_Conditional_1_For_2_For_9_Template_input_ngModelChange_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onToggleChange());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "label", 20);
    \u0275\u0275text(13, "Ver");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 18)(15, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPermissionMatrixComponent_Conditional_1_For_2_For_9_Template_input_ngModelChange_15_listener($event) {
      const table_r2 = \u0275\u0275restoreView(_r1).$implicit;
      \u0275\u0275twoWayBindingSet(table_r2.ppinsert, $event) || (table_r2.ppinsert = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function AdminPermissionMatrixComponent_Conditional_1_For_2_For_9_Template_input_ngModelChange_15_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onToggleChange());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "label", 20);
    \u0275\u0275text(17, "Crear");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 18)(19, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPermissionMatrixComponent_Conditional_1_For_2_For_9_Template_input_ngModelChange_19_listener($event) {
      const table_r2 = \u0275\u0275restoreView(_r1).$implicit;
      \u0275\u0275twoWayBindingSet(table_r2.ppupdate, $event) || (table_r2.ppupdate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function AdminPermissionMatrixComponent_Conditional_1_For_2_For_9_Template_input_ngModelChange_19_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onToggleChange());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "label", 20);
    \u0275\u0275text(21, "Editar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 18)(23, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPermissionMatrixComponent_Conditional_1_For_2_For_9_Template_input_ngModelChange_23_listener($event) {
      const table_r2 = \u0275\u0275restoreView(_r1).$implicit;
      \u0275\u0275twoWayBindingSet(table_r2.ppdelete, $event) || (table_r2.ppdelete = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function AdminPermissionMatrixComponent_Conditional_1_For_2_For_9_Template_input_ngModelChange_23_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onToggleChange());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "label", 21);
    \u0275\u0275text(25, "Eliminar");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const table_r2 = ctx.$implicit;
    const schema_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", table_r2.pnombre, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(table_r2.pdescripcion);
    \u0275\u0275advance(4);
    \u0275\u0275property("id", "read-" + schema_r4.pesquema + "-" + table_r2.ptabla);
    \u0275\u0275twoWayProperty("ngModel", table_r2.ppselect);
    \u0275\u0275advance();
    \u0275\u0275property("for", "read-" + schema_r4.pesquema + "-" + table_r2.ptabla);
    \u0275\u0275advance(3);
    \u0275\u0275property("id", "create-" + schema_r4.pesquema + "-" + table_r2.ptabla);
    \u0275\u0275twoWayProperty("ngModel", table_r2.ppinsert);
    \u0275\u0275advance();
    \u0275\u0275property("for", "create-" + schema_r4.pesquema + "-" + table_r2.ptabla);
    \u0275\u0275advance(3);
    \u0275\u0275property("id", "update-" + schema_r4.pesquema + "-" + table_r2.ptabla);
    \u0275\u0275twoWayProperty("ngModel", table_r2.ppupdate);
    \u0275\u0275advance();
    \u0275\u0275property("for", "update-" + schema_r4.pesquema + "-" + table_r2.ptabla);
    \u0275\u0275advance(3);
    \u0275\u0275property("id", "delete-" + schema_r4.pesquema + "-" + table_r2.ptabla);
    \u0275\u0275twoWayProperty("ngModel", table_r2.ppdelete);
    \u0275\u0275advance();
    \u0275\u0275property("for", "delete-" + schema_r4.pesquema + "-" + table_r2.ptabla);
  }
}
function AdminPermissionMatrixComponent_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "h2", 4)(2, "button", 5);
    \u0275\u0275element(3, "i", 6);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 7)(6, "div", 8)(7, "div", 9);
    \u0275\u0275repeaterCreate(8, AdminPermissionMatrixComponent_Conditional_1_For_2_For_9_Template, 26, 14, "div", 10, _forTrack1);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const schema_r4 = ctx.$implicit;
    const \u0275$index_10_r5 = ctx.$index;
    \u0275\u0275advance();
    \u0275\u0275property("id", "heading-" + \u0275$index_10_r5);
    \u0275\u0275advance();
    \u0275\u0275attribute("data-bs-target", "#collapse-" + \u0275$index_10_r5)("aria-controls", "collapse-" + \u0275$index_10_r5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Esquema: ", schema_r4.pesquema, " ");
    \u0275\u0275advance();
    \u0275\u0275property("id", "collapse-" + \u0275$index_10_r5);
    \u0275\u0275attribute("aria-labelledby", "heading-" + \u0275$index_10_r5);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(schema_r4.tablas);
  }
}
function AdminPermissionMatrixComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275repeaterCreate(1, AdminPermissionMatrixComponent_Conditional_1_For_2_Template, 10, 6, "div", 3, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.schemas);
  }
}
var AdminPermissionMatrixComponent = class _AdminPermissionMatrixComponent {
  schemas = [];
  permissionChanged = new EventEmitter();
  onToggleChange() {
    this.permissionChanged.emit();
  }
  static \u0275fac = function AdminPermissionMatrixComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminPermissionMatrixComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminPermissionMatrixComponent, selectors: [["app-admin-permission-matrix"]], inputs: { schemas: "schemas" }, outputs: { permissionChanged: "permissionChanged" }, decls: 2, vars: 1, consts: [[1, "text-center", "py-5", "text-muted", "border", "rounded-3", "bg-light"], ["id", "permissionsAccordion", 1, "accordion"], [1, "bi", "bi-shield-lock", "fs-1", "d-block", "mb-2", "opacity-50"], [1, "accordion-item", "border-0", "mb-2"], [1, "accordion-header", 3, "id"], ["type", "button", "data-bs-toggle", "collapse", "aria-expanded", "true", 1, "accordion-button", "fw-semibold", "text-dark", "bg-light"], [1, "bi", "bi-diagram-2-fill", "text-success", "me-2"], [1, "accordion-collapse", "collapse", 3, "id"], [1, "accordion-body", "p-0"], [1, "list-group", "list-group-flush"], [1, "list-group-item", "py-3", "px-4"], [1, "row", "align-items-center"], [1, "col-md-5", "mb-2", "mb-md-0"], [1, "fw-semibold", "mb-1", "text-dark", "d-flex", "align-items-center"], [1, "bi", "bi-table", "text-secondary", "me-2"], [1, "text-muted", "small", "mb-0", "ms-4"], [1, "col-md-7"], [1, "d-flex", "flex-wrap", "gap-4", "justify-content-md-end"], [1, "form-check", "form-switch"], ["type", "checkbox", "role", "switch", 1, "form-check-input", 3, "ngModelChange", "id", "ngModel"], [1, "form-check-label", "small", "text-muted", 3, "for"], [1, "form-check-label", "small", "text-danger", 3, "for"]], template: function AdminPermissionMatrixComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, AdminPermissionMatrixComponent_Conditional_0_Template, 3, 0, "div", 0)(1, AdminPermissionMatrixComponent_Conditional_1_Template, 3, 0, "div", 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.schemas.length === 0 ? 0 : 1);
    }
  }, dependencies: [CommonModule, FormsModule, CheckboxControlValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminPermissionMatrixComponent, [{
    type: Component,
    args: [{ selector: "app-admin-permission-matrix", standalone: true, imports: [CommonModule, FormsModule], template: `@if (schemas.length === 0) {\r
  <div class="text-center py-5 text-muted border rounded-3 bg-light">\r
    <i class="bi bi-shield-lock fs-1 d-block mb-2 opacity-50"></i>\r
    Seleccione un rol para ver sus permisos.\r
  </div>\r
} @else {\r
  <div class="accordion" id="permissionsAccordion">\r
    @for (schema of schemas; track schema.pesquema; let i = $index) {\r
      <div class="accordion-item border-0 mb-2">\r
\r
        <h2 class="accordion-header" [id]="'heading-' + i">\r
          <button class="accordion-button fw-semibold text-dark bg-light" type="button"\r
                  data-bs-toggle="collapse" [attr.data-bs-target]="'#collapse-' + i"\r
                  aria-expanded="true" [attr.aria-controls]="'collapse-' + i">\r
            <i class="bi bi-diagram-2-fill text-success me-2"></i> Esquema: {{ schema.pesquema }}\r
          </button>\r
        </h2>\r
\r
        <div [id]="'collapse-' + i" class="accordion-collapse collapse" [attr.aria-labelledby]="'heading-' + i">\r
          <div class="accordion-body p-0">\r
            <div class="list-group list-group-flush">\r
              @for (table of schema.tablas; track table.pnombre) {\r
                <div class="list-group-item py-3 px-4">\r
                  <div class="row align-items-center">\r
\r
                    <div class="col-md-5 mb-2 mb-md-0">\r
                      <h6 class="fw-semibold mb-1 text-dark d-flex align-items-center">\r
                        <i class="bi bi-table text-secondary me-2"></i> {{ table.pnombre }}\r
                      </h6>\r
                      <p class="text-muted small mb-0 ms-4">{{ table.pdescripcion }}</p>\r
                    </div>\r
\r
                    <div class="col-md-7">\r
                      <div class="d-flex flex-wrap gap-4 justify-content-md-end">\r
                        <div class="form-check form-switch">\r
                          <input class="form-check-input" type="checkbox" role="switch"\r
                                 [id]="'read-' + schema.pesquema + '-' + table.ptabla"\r
                                 [(ngModel)]="table.ppselect" (ngModelChange)="onToggleChange()">\r
                          <label class="form-check-label small text-muted"\r
                                 [for]="'read-' + schema.pesquema + '-' + table.ptabla">Ver</label>\r
                        </div>\r
                        <div class="form-check form-switch">\r
                          <input class="form-check-input" type="checkbox" role="switch"\r
                                 [id]="'create-' + schema.pesquema + '-' + table.ptabla"\r
                                 [(ngModel)]="table.ppinsert" (ngModelChange)="onToggleChange()">\r
                          <label class="form-check-label small text-muted"\r
                                 [for]="'create-' + schema.pesquema + '-' + table.ptabla">Crear</label>\r
                        </div>\r
                        <div class="form-check form-switch">\r
                          <input class="form-check-input" type="checkbox" role="switch"\r
                                 [id]="'update-' + schema.pesquema + '-' + table.ptabla"\r
                                 [(ngModel)]="table.ppupdate" (ngModelChange)="onToggleChange()">\r
                          <label class="form-check-label small text-muted"\r
                                 [for]="'update-' + schema.pesquema + '-' + table.ptabla">Editar</label>\r
                        </div>\r
                        <div class="form-check form-switch">\r
                          <input class="form-check-input" type="checkbox" role="switch"\r
                                 [id]="'delete-' + schema.pesquema + '-' + table.ptabla"\r
                                 [(ngModel)]="table.ppdelete" (ngModelChange)="onToggleChange()">\r
                          <label class="form-check-label small text-danger"\r
                                 [for]="'delete-' + schema.pesquema + '-' + table.ptabla">Eliminar</label>\r
                        </div>\r
                      </div>\r
                    </div>\r
\r
                  </div>\r
                </div>\r
              }\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    }\r
  </div>\r
}\r
` }]
  }], null, { schemas: [{
    type: Input
  }], permissionChanged: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminPermissionMatrixComponent, { className: "AdminPermissionMatrixComponent", filePath: "app/components/administration/admin-permission-management/admin-permission-matrix/admin-permission-matrix.component.ts", lineNumber: 13 });
})();

// src/app/components/administration/admin-permission-management/admin-permission-management.component.ts
var _forTrack02 = ($index, $item) => $item.roleGId;
function AdminPermissionManagementComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r1 = ctx.$implicit;
    \u0275\u0275property("value", role_r1.roleGId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(role_r1.roleG);
  }
}
function AdminPermissionManagementComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 13);
    \u0275\u0275text(1, " Guardando... ");
  }
}
function AdminPermissionManagementComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 14);
    \u0275\u0275text(1, " Guardar Cambios ");
  }
}
var AdminPermissionManagementComponent = class _AdminPermissionManagementComponent {
  rolesList = [];
  selectedRole = null;
  selectedRoleId = null;
  metrics = null;
  schemas = [];
  isSaving = false;
  cdr = inject(ChangeDetectorRef);
  permissionService = inject(AdminPermissionManagement);
  ngOnInit() {
    this.permissionService.getRolesForSelect().subscribe((roles) => {
      this.rolesList = roles;
      this.cdr.detectChanges();
    });
  }
  onRoleChange(event) {
    const idselect = Number(event.target.value);
    const roleFound = this.rolesList.find((role2) => role2.roleGId === idselect);
    const role = roleFound?.roleG;
    if (!role)
      return;
    this.selectedRoleId = roleFound.roleGId;
    this.selectedRole = roleFound.roleG;
    this.permissionService.getPermissionsByRole(role).subscribe((data) => {
      this.schemas = data;
      this.cdr.detectChanges();
      this.calculateMetrics();
    });
  }
  calculateMetrics() {
    let schemasCount = 0;
    let tablesWithAccess = 0;
    let fullAccess = 0;
    this.schemas.forEach((schema) => {
      let schemaHasAccess = false;
      schema.tablas.forEach((table) => {
        const hasAny = table.ppselect || table.ppinsert || table.ppupdate || table.ppdelete;
        const hasAll = table.ppselect && table.ppinsert && table.ppupdate && table.ppdelete;
        if (hasAny) {
          schemaHasAccess = true;
          tablesWithAccess++;
        }
        if (hasAll) {
          fullAccess++;
        }
      });
      if (schemaHasAccess) {
        schemasCount++;
      }
    });
    this.metrics = {
      totalSchemas: schemasCount,
      totalTablesWithAccess: tablesWithAccess,
      fullAccessTables: fullAccess
    };
    this.cdr.detectChanges();
  }
  saveConfiguration() {
    if (!this.selectedRole || !this.selectedRoleId)
      return;
    this.permissionService.savePermissions(this.selectedRoleId, this.schemas).subscribe({
      next: () => {
        alert("Permisos guardados con \xE9xito");
        this.cdr.detectChanges();
      },
      error: () => {
        alert("Error al guardar los permisos.");
        this.cdr.detectChanges();
      }
    });
  }
  static \u0275fac = function AdminPermissionManagementComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminPermissionManagementComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminPermissionManagementComponent, selectors: [["app-admin-permission-management"]], decls: 20, vars: 4, consts: [[1, "container-fluid"], [1, "d-flex", "flex-column", "flex-md-row", "justify-content-between", "align-items-md-center", "mb-3", "gap-3"], [1, "mb-1"], [1, "text-muted", "mb-0"], [1, "d-flex", "flex-wrap", "align-items-center", "gap-2"], ["id", "roleSelector", "aria-label", "Seleccionar rol", 1, "form-select", 3, "change"], ["value", "", "selected", "", "disabled", ""], [3, "value"], ["type", "button", 1, "btn", "btn-success", "d-flex", "align-items-center", "gap-2", 3, "click", "disabled"], [3, "metrics"], [1, "card", "border-0", "shadow-sm"], [1, "card-body", "p-0"], [3, "permissionChanged", "schemas"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm"], [1, "bi", "bi-floppy-fill"]], template: function AdminPermissionManagementComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h3", 2);
      \u0275\u0275text(4, "Gesti\xF3n de Permisos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Configura qu\xE9 puede ver o modificar cada rol en las tablas del sistema.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 4)(8, "select", 5);
      \u0275\u0275listener("change", function AdminPermissionManagementComponent_Template_select_change_8_listener($event) {
        return ctx.onRoleChange($event);
      });
      \u0275\u0275elementStart(9, "option", 6);
      \u0275\u0275text(10, "Seleccione un rol...");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(11, AdminPermissionManagementComponent_For_12_Template, 2, 2, "option", 7, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "button", 8);
      \u0275\u0275listener("click", function AdminPermissionManagementComponent_Template_button_click_13_listener() {
        return ctx.saveConfiguration();
      });
      \u0275\u0275conditionalCreate(14, AdminPermissionManagementComponent_Conditional_14_Template, 2, 0)(15, AdminPermissionManagementComponent_Conditional_15_Template, 2, 0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(16, "app-admin-permission-kpis", 9);
      \u0275\u0275elementStart(17, "div", 10)(18, "div", 11)(19, "app-admin-permission-matrix", 12);
      \u0275\u0275listener("permissionChanged", function AdminPermissionManagementComponent_Template_app_admin_permission_matrix_permissionChanged_19_listener() {
        return ctx.calculateMetrics();
      });
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.rolesList);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.selectedRole || ctx.isSaving);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSaving ? 14 : 15);
      \u0275\u0275advance(2);
      \u0275\u0275property("metrics", ctx.metrics);
      \u0275\u0275advance(3);
      \u0275\u0275property("schemas", ctx.schemas);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, AdminPermissionKpisComponent, AdminPermissionMatrixComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminPermissionManagementComponent, [{
    type: Component,
    args: [{ selector: "app-admin-permission-management", standalone: true, imports: [CommonModule, FormsModule, AdminPermissionKpisComponent, AdminPermissionMatrixComponent], template: '<div class="container-fluid">\r\n\r\n  <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-3">\r\n    <div>\r\n      <h3 class="mb-1">Gesti\xF3n de Permisos</h3>\r\n      <p class="text-muted mb-0">Configura qu\xE9 puede ver o modificar cada rol en las tablas del sistema.</p>\r\n    </div>\r\n\r\n    <div class="d-flex flex-wrap align-items-center gap-2">\r\n      <select class="form-select" id="roleSelector" (change)="onRoleChange($event)"\r\n              aria-label="Seleccionar rol">\r\n        <option value="" selected disabled>Seleccione un rol...</option>\r\n        @for (role of rolesList; track role.roleGId) {\r\n          <option [value]="role.roleGId">{{ role.roleG }}</option>\r\n        }\r\n      </select>\r\n\r\n      <button type="button" class="btn btn-success d-flex align-items-center gap-2"\r\n              [disabled]="!selectedRole || isSaving" (click)="saveConfiguration()">\r\n        @if (isSaving) {\r\n          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>\r\n          Guardando...\r\n        } @else {\r\n          <i class="bi bi-floppy-fill"></i> Guardar Cambios\r\n        }\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <app-admin-permission-kpis [metrics]="metrics"></app-admin-permission-kpis>\r\n\r\n  <div class="card border-0 shadow-sm">\r\n    <div class="card-body p-0">\r\n      <app-admin-permission-matrix [schemas]="schemas" (permissionChanged)="calculateMetrics()"></app-admin-permission-matrix>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminPermissionManagementComponent, { className: "AdminPermissionManagementComponent", filePath: "app/components/administration/admin-permission-management/admin-permission-management.component.ts", lineNumber: 18 });
})();
export {
  AdminPermissionManagementComponent
};
//# sourceMappingURL=chunk-DJZ32MG3.js.map
