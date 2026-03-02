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
  EventEmitter,
  Injectable,
  Input,
  NgClass,
  Output,
  __spreadValues,
  debounceTime,
  distinctUntilChanged,
  environment,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
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

// src/app/services/administration/admin-master-tables/admin-master-tables.service.ts
var AdminMasterTablesService = class _AdminMasterTablesService {
  constructor() {
  }
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;
  getCatalogs() {
    return this.http.get(`${this.apiUrl}/security/module-managements/list-master-tables`);
  }
  getRecordsByCatalog(pschematable, filter) {
    let params = new HttpParams();
    params = params.set("p_esquematabla", pschematable);
    if (filter) {
      params = params.set("p_filtro", filter);
    }
    return this.http.get(`${this.apiUrl}/security/module-managements/list-data-master-table`, { params });
  }
  getMetrics() {
    return this.http.get(`${this.apiUrl}/security/module-managements/master-metrics`);
  }
  createRecord(data) {
    return this.http.post(`${this.apiUrl}/security/module-managements/create-master-record`, data);
  }
  updateRecord(data) {
    return this.http.put(`${this.apiUrl}/security/module-managements/update-master-record`, data);
  }
  static \u0275fac = function AdminMasterTablesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminMasterTablesService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminMasterTablesService, factory: _AdminMasterTablesService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminMasterTablesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/components/administration/admin-master-tables/admin-master-kpis/admin-master-kpis.component.ts
var AdminMasterKpisComponent = class _AdminMasterKpisComponent {
  metrics = null;
  static \u0275fac = function AdminMasterKpisComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminMasterKpisComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminMasterKpisComponent, selectors: [["app-admin-master-kpis"]], inputs: { metrics: "metrics" }, decls: 31, vars: 3, consts: [[1, "row", "g-3", "mb-3"], [1, "col-md-4"], [1, "card", "border-0", "shadow-sm", "h-100"], [1, "card-body", "d-flex", "align-items-center", "gap-3"], [1, "bg-success-subtle", "text-primary", "rounded-3", "p-2", "d-flex", "align-items-center", "justify-content-center"], [1, "bi", "bi-collection", "fs-4"], [1, "display-6", "fw-bold", "text-dark"], [1, "text-muted"], [1, "bg-success-subtle", "text-success", "rounded-3", "p-2", "d-flex", "align-items-center", "justify-content-center"], [1, "bi", "bi-check-circle", "fs-4"], [1, "bg-secondary-subtle", "text-secondary", "rounded-3", "p-2", "d-flex", "align-items-center", "justify-content-center"], [1, "bi", "bi-list-ol", "fs-4"]], template: function AdminMasterKpisComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
      \u0275\u0275domElement(5, "i", 5);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "div")(7, "div", 6);
      \u0275\u0275text(8);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(9, "small", 7);
      \u0275\u0275text(10, "Cat\xE1logos");
      \u0275\u0275domElementEnd()()()()();
      \u0275\u0275domElementStart(11, "div", 1)(12, "div", 2)(13, "div", 3)(14, "div", 8);
      \u0275\u0275domElement(15, "i", 9);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(16, "div")(17, "div", 6);
      \u0275\u0275text(18);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(19, "small", 7);
      \u0275\u0275text(20, "Registros Activos");
      \u0275\u0275domElementEnd()()()()();
      \u0275\u0275domElementStart(21, "div", 1)(22, "div", 2)(23, "div", 3)(24, "div", 10);
      \u0275\u0275domElement(25, "i", 11);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(26, "div")(27, "div", 6);
      \u0275\u0275text(28);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(29, "small", 7);
      \u0275\u0275text(30, "Registros Totales");
      \u0275\u0275domElementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate((ctx.metrics == null ? null : ctx.metrics.totalCatalogs) || 0);
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate((ctx.metrics == null ? null : ctx.metrics.activeRecords) || 0);
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate((ctx.metrics == null ? null : ctx.metrics.totalRecords) || 0);
    }
  }, dependencies: [CommonModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminMasterKpisComponent, [{
    type: Component,
    args: [{ selector: "app-admin-master-kpis", standalone: true, imports: [CommonModule], template: '<div class="row g-3 mb-3">\r\n\r\n  <div class="col-md-4">\r\n    <div class="card border-0 shadow-sm h-100">\r\n      <div class="card-body d-flex align-items-center gap-3">\r\n        <div class="bg-success-subtle text-primary rounded-3 p-2 d-flex align-items-center justify-content-center">\r\n          <i class="bi bi-collection fs-4"></i>\r\n        </div>\r\n        <div>\r\n          <div class="display-6 fw-bold text-dark">{{ metrics?.totalCatalogs || 0 }}</div>\r\n          <small class="text-muted">Cat\xE1logos</small>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class="col-md-4">\r\n    <div class="card border-0 shadow-sm h-100">\r\n      <div class="card-body d-flex align-items-center gap-3">\r\n        <div class="bg-success-subtle text-success rounded-3 p-2 d-flex align-items-center justify-content-center">\r\n          <i class="bi bi-check-circle fs-4"></i>\r\n        </div>\r\n        <div>\r\n          <div class="display-6 fw-bold text-dark">{{ metrics?.activeRecords || 0 }}</div>\r\n          <small class="text-muted">Registros Activos</small>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class="col-md-4">\r\n    <div class="card border-0 shadow-sm h-100">\r\n      <div class="card-body d-flex align-items-center gap-3">\r\n        <div class="bg-secondary-subtle text-secondary rounded-3 p-2 d-flex align-items-center justify-content-center">\r\n          <i class="bi bi-list-ol fs-4"></i>\r\n        </div>\r\n        <div>\r\n          <div class="display-6 fw-bold text-dark">{{ metrics?.totalRecords || 0 }}</div>\r\n          <small class="text-muted">Registros Totales</small>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n' }]
  }], null, { metrics: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminMasterKpisComponent, { className: "AdminMasterKpisComponent", filePath: "app/components/administration/admin-master-tables/admin-master-kpis/admin-master-kpis.component.ts", lineNumber: 12 });
})();

// src/app/components/administration/admin-master-tables/admin-master-siderbar-tables/admin-master-siderbar-tables.component.ts
var _forTrack0 = ($index, $item) => $item.pesquematabla;
function AdminMasterSiderbarTablesComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function AdminMasterSiderbarTablesComponent_For_7_Template_button_click_0_listener() {
      const cat_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectCatalog(cat_r2.pesquematabla));
    });
    \u0275\u0275elementStart(1, "div", 7);
    \u0275\u0275element(2, "i", 8);
    \u0275\u0275elementStart(3, "span", 9);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const cat_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", cat_r2.pesquematabla === ctx_r2.selectedCatalogSchema);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", cat_r2.pesquematabla === ctx_r2.selectedCatalogSchema ? "text-success" : "text-muted");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", cat_r2.pesquematabla === ctx_r2.selectedCatalogSchema ? "text-dark" : "text-secondary");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cat_r2.pnombre, " ");
  }
}
var AdminMasterSiderbarTablesComponent = class _AdminMasterSiderbarTablesComponent {
  catalogs = [];
  selectedCatalogSchema = null;
  catalogSelected = new EventEmitter();
  selectCatalog(schema) {
    this.catalogSelected.emit(schema);
  }
  static \u0275fac = function AdminMasterSiderbarTablesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminMasterSiderbarTablesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminMasterSiderbarTablesComponent, selectors: [["app-admin-master-siderbar-tables"]], inputs: { catalogs: "catalogs", selectedCatalogSchema: "selectedCatalogSchema" }, outputs: { catalogSelected: "catalogSelected" }, decls: 8, vars: 0, consts: [[1, "card", "border-0", "shadow-sm", "h-100"], [1, "card-header", "bg-white", "border-bottom-0", "pt-3", "pb-2", "px-3"], [1, "fw-semibold", "text-muted", "small", "text-uppercase", "mb-0"], [1, "card-body", "p-0"], [1, "list-group", "list-group-flush", "pb-3"], ["type", "button", 1, "list-group-item", "list-group-item-action", "d-flex", "justify-content-between", "align-items-center", "px-4", "py-3", "border-0", 3, "active"], ["type", "button", 1, "list-group-item", "list-group-item-action", "d-flex", "justify-content-between", "align-items-center", "px-4", "py-3", "border-0", 3, "click"], [1, "d-flex", "align-items-center"], [1, "bi", "me-3", "fs-5", 3, "ngClass"], [1, "fw-medium", 3, "ngClass"]], template: function AdminMasterSiderbarTablesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h6", 2);
      \u0275\u0275text(3, "Cat\xE1logos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 3)(5, "div", 4);
      \u0275\u0275repeaterCreate(6, AdminMasterSiderbarTablesComponent_For_7_Template, 5, 5, "button", 5, _forTrack0);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.catalogs);
    }
  }, dependencies: [CommonModule, NgClass], styles: ["\n\n.list-group-item.active[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  color: #114e21;\n  border-color: #f8f9fa;\n  border-left: 4px solid #114e21;\n}\n.list-group-item[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: all 0.2s ease;\n  border-left: 4px solid transparent;\n}\n.list-group-item[_ngcontent-%COMP%]:hover:not(.active) {\n  background-color: #f8f9fa;\n}\n/*# sourceMappingURL=admin-master-siderbar-tables.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminMasterSiderbarTablesComponent, [{
    type: Component,
    args: [{ selector: "app-admin-master-siderbar-tables", standalone: true, imports: [CommonModule], template: `<div class="card border-0 shadow-sm h-100">\r
  <div class="card-header bg-white border-bottom-0 pt-3 pb-2 px-3">\r
    <h6 class="fw-semibold text-muted small text-uppercase mb-0">Cat\xE1logos</h6>\r
  </div>\r
  <div class="card-body p-0">\r
    <div class="list-group list-group-flush pb-3">\r
        @for (cat of catalogs; track cat.pesquematabla) {\r
          <button type="button"\r
                  class="list-group-item list-group-item-action d-flex justify-content-between align-items-center px-4 py-3 border-0"\r
                  [class.active]="cat.pesquematabla === selectedCatalogSchema"\r
                  (click)="selectCatalog(cat.pesquematabla)">\r
\r
            <div class="d-flex align-items-center">\r
              <i class="bi me-3 fs-5"\r
                [ngClass]="cat.pesquematabla === selectedCatalogSchema ? 'text-success' : 'text-muted'"></i>\r
              <span class="fw-medium" [ngClass]="cat.pesquematabla === selectedCatalogSchema ? 'text-dark' : 'text-secondary'">\r
                {{ cat.pnombre }}\r
              </span>\r
            </div>\r
          </button>\r
        }\r
      </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/components/administration/admin-master-tables/admin-master-siderbar-tables/admin-master-siderbar-tables.component.css */\n.list-group-item.active {\n  background-color: #f8f9fa;\n  color: #114e21;\n  border-color: #f8f9fa;\n  border-left: 4px solid #114e21;\n}\n.list-group-item {\n  cursor: pointer;\n  transition: all 0.2s ease;\n  border-left: 4px solid transparent;\n}\n.list-group-item:hover:not(.active) {\n  background-color: #f8f9fa;\n}\n/*# sourceMappingURL=admin-master-siderbar-tables.component.css.map */\n"] }]
  }], null, { catalogs: [{
    type: Input
  }], selectedCatalogSchema: [{
    type: Input
  }], catalogSelected: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminMasterSiderbarTablesComponent, { className: "AdminMasterSiderbarTablesComponent", filePath: "app/components/administration/admin-master-tables/admin-master-siderbar-tables/admin-master-siderbar-tables.component.ts", lineNumber: 12 });
})();

// src/app/components/administration/admin-master-tables/admin-master-table-list/admin-master-table-list.component.ts
var _c0 = (a0, a1) => ({ "bg-success-subtle text-success": a0, "bg-danger-subtle text-danger": a1 });
var _forTrack02 = ($index, $item) => $item.mid;
function AdminMasterTableListComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 18);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "span", 19);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td", 20)(9, "button", 21);
    \u0275\u0275listener("click", function AdminMasterTableListComponent_For_28_Template_button_click_9_listener() {
      const record_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onEditClick(record_r3));
    });
    \u0275\u0275element(10, "i", 22);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const record_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(record_r3.mid);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(record_r3.mnombre);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(4, _c0, record_r3.mestado === "activo", record_r3.mestado === "inactivo"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", record_r3.mestado, " ");
  }
}
function AdminMasterTableListComponent_ForEmpty_29_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 23);
    \u0275\u0275element(2, "i", 24);
    \u0275\u0275text(3, " No hay registros en este cat\xE1logo. ");
    \u0275\u0275elementEnd()();
  }
}
function AdminMasterTableListComponent_ForEmpty_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AdminMasterTableListComponent_ForEmpty_29_Conditional_0_Template, 4, 0, "tr");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r0.isLoading ? 0 : -1);
  }
}
var AdminMasterTableListComponent = class _AdminMasterTableListComponent {
  records = [];
  catalogName = "Seleccione un cat\xE1logo";
  isLoading = false;
  search = new EventEmitter();
  editRecord = new EventEmitter();
  createRecord = new EventEmitter();
  searchControl = new FormControl("");
  ngOnInit() {
    this.searchControl.valueChanges.pipe(debounceTime(200), distinctUntilChanged()).subscribe((text) => {
      this.search.emit(text || "");
    });
  }
  onEditClick(record) {
    this.editRecord.emit(record);
  }
  onCreateClick() {
    this.createRecord.emit();
  }
  static \u0275fac = function AdminMasterTableListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminMasterTableListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminMasterTableListComponent, selectors: [["app-admin-master-table-list"]], inputs: { records: "records", catalogName: "catalogName", isLoading: "isLoading" }, outputs: { search: "search", editRecord: "editRecord", createRecord: "createRecord" }, decls: 30, vars: 3, consts: [[1, "card", "border-0", "shadow-sm", "h-100"], [1, "card-header", "bg-white", "border-bottom-0", "pt-3", "pb-2", "px-3", "d-flex", "justify-content-between", "align-items-center", "flex-wrap", "gap-3"], [1, "fw-semibold", "text-dark", "d-flex", "align-items-center", "gap-2", "mb-1"], [1, "bi", "bi-book", "text-muted"], [1, "text-muted", "small", "mb-0"], [1, "btn", "btn-success", "d-flex", "align-items-center", "gap-2", 3, "click"], [1, "bi", "bi-plus-lg"], [1, "card-body", "px-3", "pb-3"], [1, "mb-3"], ["type", "text", "placeholder", "Buscar registro...", 1, "form-control", 3, "formControl"], [1, "table-responsive"], [1, "table", "table-hover", "align-middle"], [1, "table-light"], ["scope", "col", 1, "col-1", "text-center"], ["scope", "col", 1, "col-4"], ["scope", "col", 1, "col-1"], ["scope", "col", 1, "col-2", "text-md-end"], [1, "text-center", "text-muted"], [1, "fw-semibold", "text-dark"], [1, "badge", "rounded-pill", 3, "ngClass"], [1, "text-end"], ["aria-label", "Editar registro", 1, "btn", "btn-sm", "btn-outline-success", 3, "click"], [1, "bi", "bi-pencil"], ["colspan", "4", 1, "text-center", "py-5", "text-muted"], [1, "bi", "bi-inbox", "fs-1", "d-block", "mb-2", "opacity-50"]], template: function AdminMasterTableListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h5", 2);
      \u0275\u0275element(4, "i", 3);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7, "Gesti\xF3n de registros vinculados al cat\xE1logo seleccionado.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "button", 5);
      \u0275\u0275listener("click", function AdminMasterTableListComponent_Template_button_click_8_listener() {
        return ctx.onCreateClick();
      });
      \u0275\u0275element(9, "i", 6);
      \u0275\u0275text(10, " Nuevo registro ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 7)(12, "div", 8);
      \u0275\u0275element(13, "input", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 10)(15, "table", 11)(16, "thead", 12)(17, "tr")(18, "th", 13);
      \u0275\u0275text(19, "ID");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "th", 14);
      \u0275\u0275text(21, "Nombre");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "th", 15);
      \u0275\u0275text(23, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "th", 16);
      \u0275\u0275text(25, "Acciones");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "tbody");
      \u0275\u0275repeaterCreate(27, AdminMasterTableListComponent_For_28_Template, 11, 7, "tr", null, _forTrack02, false, AdminMasterTableListComponent_ForEmpty_29_Template, 1, 1);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.catalogName, " ");
      \u0275\u0275advance(8);
      \u0275\u0275property("formControl", ctx.searchControl);
      \u0275\u0275advance(14);
      \u0275\u0275repeater(ctx.records);
    }
  }, dependencies: [CommonModule, NgClass, ReactiveFormsModule, DefaultValueAccessor, NgControlStatus, FormControlDirective], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminMasterTableListComponent, [{
    type: Component,
    args: [{ selector: "app-admin-master-table-list", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="card border-0 shadow-sm h-100">\r
\r
  <div class="card-header bg-white border-bottom-0 pt-3 pb-2 px-3 d-flex justify-content-between align-items-center flex-wrap gap-3">\r
    <div>\r
      <h5 class="fw-semibold text-dark d-flex align-items-center gap-2 mb-1">\r
        <i class="bi bi-book text-muted"></i> {{ catalogName }}\r
      </h5>\r
      <p class="text-muted small mb-0">Gesti\xF3n de registros vinculados al cat\xE1logo seleccionado.</p>\r
    </div>\r
    <button class="btn btn-success d-flex align-items-center gap-2" (click)="onCreateClick()">\r
      <i class="bi bi-plus-lg"></i> Nuevo registro\r
    </button>\r
  </div>\r
\r
  <div class="card-body px-3 pb-3">\r
\r
    <div class="mb-3">\r
      <input type="text" class="form-control" placeholder="Buscar registro..." [formControl]="searchControl">\r
    </div>\r
\r
    <div class="table-responsive">\r
      <table class="table table-hover align-middle">\r
        <thead class="table-light">\r
          <tr>\r
            <th scope="col" class="col-1 text-center">ID</th>\r
            <th scope="col" class="col-4">Nombre</th>\r
            <th scope="col" class="col-1">Estado</th>\r
            <th scope="col" class="col-2 text-md-end">Acciones</th>\r
          </tr>\r
        </thead>\r
        <tbody>\r
\r
          @for (record of records; track record.mid) {\r
            <tr>\r
              <td class="text-center text-muted">{{ record.mid }}</td>\r
              <td class="fw-semibold text-dark">{{ record.mnombre }}</td>\r
              <td>\r
                <span class="badge rounded-pill"\r
                      [ngClass]="{\r
                        'bg-success-subtle text-success': record.mestado === 'activo',\r
                        'bg-danger-subtle text-danger': record.mestado === 'inactivo'\r
                      }">\r
                  {{ record.mestado }}\r
                </span>\r
              </td>\r
              <td class="text-end">\r
                <button class="btn btn-sm btn-outline-success" (click)="onEditClick(record)"\r
                        aria-label="Editar registro">\r
                  <i class="bi bi-pencil"></i>\r
                </button>\r
              </td>\r
            </tr>\r
          } @empty {\r
            @if (!isLoading) {\r
              <tr>\r
                <td colspan="4" class="text-center py-5 text-muted">\r
                  <i class="bi bi-inbox fs-1 d-block mb-2 opacity-50"></i>\r
                  No hay registros en este cat\xE1logo.\r
                </td>\r
              </tr>\r
            }\r
          }\r
        </tbody>\r
      </table>\r
    </div>\r
\r
  </div>\r
</div>\r
` }]
  }], null, { records: [{
    type: Input
  }], catalogName: [{
    type: Input
  }], isLoading: [{
    type: Input
  }], search: [{
    type: Output
  }], editRecord: [{
    type: Output
  }], createRecord: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminMasterTableListComponent, { className: "AdminMasterTableListComponent", filePath: "app/components/administration/admin-master-tables/admin-master-table-list/admin-master-table-list.component.ts", lineNumber: 14 });
})();

// src/app/components/administration/admin-master-tables/admin-master-create-modal/admin-master-create-modal.component.ts
var _c02 = (a0) => ({ "is-invalid": a0 });
function AdminMasterCreateModalComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, "El nombre es obligatorio.");
    \u0275\u0275elementEnd();
  }
}
function AdminMasterCreateModalComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 20);
    \u0275\u0275text(1, " Guardando... ");
  }
}
function AdminMasterCreateModalComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isEditing ? "Guardar Cambios" : "Crear Registro", " ");
  }
}
var AdminMasterCreateModalComponent = class _AdminMasterCreateModalComponent {
  recordSaved = new EventEmitter();
  currentSchema = null;
  masterForm;
  isSubmitting = false;
  isEditing = false;
  currentRecordId = null;
  fb = inject(FormBuilder);
  masterService = inject(AdminMasterTablesService);
  constructor() {
    this.masterForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      status: ["activo", Validators.required]
    });
  }
  set recordToEdit(record) {
    if (record) {
      this.isEditing = true;
      this.currentRecordId = record.mid;
      this.masterForm.patchValue({
        name: record.mnombre,
        status: record.mestado.toLowerCase() === "activo" ? "activo" : "inactivo"
      });
    } else {
      this.isEditing = false;
      this.currentRecordId = null;
      this.masterForm.reset({ status: "activo" });
    }
  }
  onSubmitSave() {
    if (this.masterForm.invalid || !this.currentSchema) {
      this.masterForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const formValues = this.masterForm.value;
    const requestPayload = {
      esquematabla: this.currentSchema,
      id: this.isEditing ? this.currentRecordId ?? void 0 : void 0,
      nombre: formValues.name,
      estado: formValues.status === "activo"
    };
    const request$ = this.isEditing ? this.masterService.updateRecord(requestPayload) : this.masterService.createRecord(requestPayload);
    console.log(requestPayload);
    request$.subscribe({
      next: (response) => {
        if (response.success) {
          alert(response.message);
          const modalElement = document.getElementById("createMasterModal");
          if (modalElement)
            bootstrap.Modal.getInstance(modalElement)?.hide();
          this.masterForm.reset({ status: "activo" });
          this.recordSaved.emit();
        } else {
          alert(response.message);
        }
        this.isSubmitting = false;
      },
      error: (err) => {
        this.isSubmitting = false;
        alert("Error al guardar el registro.");
      }
    });
  }
  get f() {
    return this.masterForm.controls;
  }
  static \u0275fac = function AdminMasterCreateModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminMasterCreateModalComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminMasterCreateModalComponent, selectors: [["app-admin-master-create-modal"]], inputs: { currentSchema: "currentSchema", recordToEdit: "recordToEdit" }, outputs: { recordSaved: "recordSaved" }, decls: 33, vars: 8, consts: [["id", "createMasterModal", "tabindex", "-1", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog", "modal-dialog-centered"], [1, "modal-content", "rounded-3", "border-0", "shadow-lg"], [1, "modal-header", "border-bottom-0", "pt-4", "pb-2", "px-4"], [1, "modal-title", "fw-bold", "fs-4", "text-dark", "mb-1"], [1, "text-muted", "small", "mb-0"], ["type", "button", "data-bs-dismiss", "modal", "aria-label", "Close", 1, "btn-close", "mb-auto"], [1, "modal-body", "px-4", "py-3"], [1, "d-flex", "flex-column", "gap-3", 3, "ngSubmit", "formGroup"], [1, "form-floating"], ["type", "text", "id", "name", "formControlName", "name", "placeholder", "Nombre", 1, "form-control", 3, "ngClass"], ["for", "name", 1, "text-muted"], [1, "text-danger", "mt-1", "small"], ["id", "status", "formControlName", "status", 1, "form-select"], ["value", "activo"], ["value", "inactivo"], ["for", "status", 1, "text-muted"], [1, "modal-footer", "border-top-0", "px-4", "pb-4", "pt-1", "justify-content-end", "gap-2"], ["type", "button", "data-bs-dismiss", "modal", 1, "btn", "btn-light", "rounded-3", "px-4", "fw-medium", "text-secondary"], ["type", "submit", 1, "btn", "btn-success", "rounded-3", "px-4", "fw-medium", "shadow-sm", 3, "click", "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"]], template: function AdminMasterCreateModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div")(5, "h5", 4);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 5);
      \u0275\u0275text(8, "Gestione los datos del cat\xE1logo seleccionado.");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(9, "button", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 7)(11, "form", 8);
      \u0275\u0275listener("ngSubmit", function AdminMasterCreateModalComponent_Template_form_ngSubmit_11_listener() {
        return ctx.onSubmitSave();
      });
      \u0275\u0275elementStart(12, "div")(13, "div", 9);
      \u0275\u0275element(14, "input", 10);
      \u0275\u0275elementStart(15, "label", 11);
      \u0275\u0275text(16, "Nombre *");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(17, AdminMasterCreateModalComponent_Conditional_17_Template, 2, 0, "div", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div")(19, "div", 9)(20, "select", 13)(21, "option", 14);
      \u0275\u0275text(22, "Activo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "option", 15);
      \u0275\u0275text(24, "Inactivo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "label", 16);
      \u0275\u0275text(26, "Estado Inicial *");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(27, "div", 17)(28, "button", 18);
      \u0275\u0275text(29, "Cancelar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "button", 19);
      \u0275\u0275listener("click", function AdminMasterCreateModalComponent_Template_button_click_30_listener() {
        return ctx.onSubmitSave();
      });
      \u0275\u0275conditionalCreate(31, AdminMasterCreateModalComponent_Conditional_31_Template, 2, 0)(32, AdminMasterCreateModalComponent_Conditional_32_Template, 1, 1);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", ctx.isEditing ? "Editar Registro" : "Nuevo Registro", " ");
      \u0275\u0275advance(5);
      \u0275\u0275property("formGroup", ctx.masterForm);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(6, _c02, ctx.f["name"].invalid && (ctx.f["name"].dirty || ctx.f["name"].touched)));
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.f["name"].hasError("required") && ctx.f["name"].touched ? 17 : -1);
      \u0275\u0275advance(13);
      \u0275\u0275property("disabled", ctx.masterForm.invalid || ctx.isSubmitting);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSubmitting ? 31 : 32);
    }
  }, dependencies: [CommonModule, NgClass, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminMasterCreateModalComponent, [{
    type: Component,
    args: [{ selector: "app-admin-master-create-modal", imports: [CommonModule, ReactiveFormsModule], template: `<div class="modal fade" id="createMasterModal" tabindex="-1" aria-hidden="true">\r
  <div class="modal-dialog modal-dialog-centered">\r
    <div class="modal-content rounded-3 border-0 shadow-lg">\r
\r
      <div class="modal-header border-bottom-0 pt-4 pb-2 px-4">\r
        <div>\r
          <h5 class="modal-title fw-bold fs-4 text-dark mb-1">\r
            {{ isEditing ? 'Editar Registro' : 'Nuevo Registro' }}\r
          </h5>\r
          <p class="text-muted small mb-0">Gestione los datos del cat\xE1logo seleccionado.</p>\r
        </div>\r
        <button type="button" class="btn-close mb-auto" data-bs-dismiss="modal" aria-label="Close"></button>\r
      </div>\r
\r
      <div class="modal-body px-4 py-3">\r
        <form [formGroup]="masterForm" (ngSubmit)="onSubmitSave()" class="d-flex flex-column gap-3">\r
\r
          <div>\r
            <div class="form-floating">\r
              <input type="text" class="form-control" id="name" formControlName="name" placeholder="Nombre"\r
                    [ngClass]="{'is-invalid': f['name'].invalid && (f['name'].dirty || f['name'].touched)}">\r
              <label for="name" class="text-muted">Nombre *</label>\r
            </div>\r
            @if (f['name'].hasError('required') && f['name'].touched) { <div class="text-danger mt-1 small">El nombre es obligatorio.</div> }\r
          </div>\r
\r
          <div>\r
            <div class="form-floating">\r
              <select class="form-select" id="status" formControlName="status">\r
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
                [disabled]="masterForm.invalid || isSubmitting" (click)="onSubmitSave()">\r
          @if (isSubmitting) {\r
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>\r
            Guardando...\r
          } @else {\r
            {{ isEditing ? 'Guardar Cambios' : 'Crear Registro' }}\r
          }\r
        </button>\r
      </div>\r
\r
    </div>\r
  </div>\r
</div>\r
` }]
  }], () => [], { recordSaved: [{
    type: Output
  }], currentSchema: [{
    type: Input
  }], recordToEdit: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminMasterCreateModalComponent, { className: "AdminMasterCreateModalComponent", filePath: "app/components/administration/admin-master-tables/admin-master-create-modal/admin-master-create-modal.component.ts", lineNumber: 16 });
})();

// src/app/components/administration/admin-master-tables/admin-master-tables.component.ts
var AdminMasterTablesComponent = class _AdminMasterTablesComponent {
  selectedRecordToEdit = null;
  catalogs = [];
  metrics = { totalCatalogs: 0, activeRecords: 0, totalRecords: 0 };
  currentFilter = "";
  currentRecords = [];
  selectedCatalogSchema = null;
  selectedCatalogName = "Seleccione un cat\xE1logo";
  isLoadingCatalogs = true;
  isLoadingRecords = false;
  catalogService = inject(AdminMasterTablesService);
  cdr = inject(ChangeDetectorRef);
  ngOnInit() {
    this.loadGlobalMetrics();
    this.catalogService.getCatalogs().subscribe((data) => {
      this.catalogs = data;
      this.isLoadingCatalogs = false;
      this.metrics.totalCatalogs = this.catalogs.length;
      this.cdr.detectChanges();
      if (this.catalogs.length > 0) {
        this.onCatalogSelected(this.catalogs[0].pesquematabla);
      }
    });
  }
  onSearch(text) {
    this.currentFilter = text;
    if (this.selectedCatalogSchema) {
      this.loadRecords(this.selectedCatalogSchema, this.currentFilter);
    }
  }
  loadRecords(schema, filter) {
    this.isLoadingRecords = true;
    this.catalogService.getRecordsByCatalog(schema, filter).subscribe((data) => {
      this.currentRecords = data;
      this.isLoadingRecords = false;
      this.cdr.detectChanges();
    });
  }
  loadGlobalMetrics() {
    this.catalogService.getMetrics().subscribe((data) => {
      if (data) {
        this.metrics.activeRecords = data.activeRecords;
        this.metrics.totalRecords = data.totalRecords;
        this.cdr.detectChanges();
      }
    });
  }
  onCatalogSelected(pschematable) {
    if (this.selectedCatalogSchema === pschematable)
      return;
    this.selectedCatalogSchema = pschematable;
    this.currentRecords = [];
    this.currentFilter = "";
    this.isLoadingRecords = true;
    const found = this.catalogs.find((c) => c.pesquematabla === pschematable);
    this.selectedCatalogName = found ? found.pnombre : "Cat\xE1logo";
    this.loadRecords(pschematable, "");
    this.catalogService.getRecordsByCatalog(pschematable).subscribe((data) => {
      this.currentRecords = data;
      this.isLoadingRecords = false;
      this.cdr.detectChanges();
    });
  }
  prepareCreate() {
    this.selectedRecordToEdit = null;
    this.openModal();
  }
  prepareEdit(record) {
    this.selectedRecordToEdit = __spreadValues({}, record);
    this.openModal();
  }
  openModal() {
    const modalElement = document.getElementById("createMasterModal");
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  reloadCurrentCatalog() {
    if (!this.selectedCatalogSchema)
      return;
    this.catalogService.getRecordsByCatalog(this.selectedCatalogSchema).subscribe({
      next: (data) => {
        this.currentRecords = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error recargando la tabla", err);
      }
    });
    this.loadGlobalMetrics();
  }
  static \u0275fac = function AdminMasterTablesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminMasterTablesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminMasterTablesComponent, selectors: [["app-admin-master-tables"]], decls: 13, vars: 8, consts: [[1, "container-fluid"], [1, "mb-3"], [1, "mb-1"], [1, "text-muted", "mb-0"], [3, "metrics"], [1, "row", "g-3"], [1, "col-lg-3", "col-md-4"], [3, "catalogSelected", "catalogs", "selectedCatalogSchema"], [1, "col-lg-9", "col-md-8"], [3, "editRecord", "createRecord", "search", "records", "catalogName", "isLoading"], [3, "recordSaved", "currentSchema", "recordToEdit"]], template: function AdminMasterTablesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h3", 2);
      \u0275\u0275text(3, "Gesti\xF3n de Tablas Maestras");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 3);
      \u0275\u0275text(5, "Gestiona los cat\xE1logos base del sistema: instituciones, \xE1reas, periodos y m\xE1s.");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(6, "app-admin-master-kpis", 4);
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "app-admin-master-siderbar-tables", 7);
      \u0275\u0275listener("catalogSelected", function AdminMasterTablesComponent_Template_app_admin_master_siderbar_tables_catalogSelected_9_listener($event) {
        return ctx.onCatalogSelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 8)(11, "app-admin-master-table-list", 9);
      \u0275\u0275listener("editRecord", function AdminMasterTablesComponent_Template_app_admin_master_table_list_editRecord_11_listener($event) {
        return ctx.prepareEdit($event);
      })("createRecord", function AdminMasterTablesComponent_Template_app_admin_master_table_list_createRecord_11_listener() {
        return ctx.prepareCreate();
      })("search", function AdminMasterTablesComponent_Template_app_admin_master_table_list_search_11_listener($event) {
        return ctx.onSearch($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "app-admin-master-create-modal", 10);
      \u0275\u0275listener("recordSaved", function AdminMasterTablesComponent_Template_app_admin_master_create_modal_recordSaved_12_listener() {
        return ctx.reloadCurrentCatalog();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275property("metrics", ctx.metrics);
      \u0275\u0275advance(3);
      \u0275\u0275property("catalogs", ctx.catalogs)("selectedCatalogSchema", ctx.selectedCatalogSchema);
      \u0275\u0275advance(2);
      \u0275\u0275property("records", ctx.currentRecords)("catalogName", ctx.selectedCatalogName)("isLoading", ctx.isLoadingRecords);
      \u0275\u0275advance();
      \u0275\u0275property("currentSchema", ctx.selectedCatalogSchema)("recordToEdit", ctx.selectedRecordToEdit);
    }
  }, dependencies: [CommonModule, AdminMasterKpisComponent, AdminMasterSiderbarTablesComponent, AdminMasterTableListComponent, AdminMasterCreateModalComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminMasterTablesComponent, [{
    type: Component,
    args: [{ selector: "app-admin-master-tables", standalone: true, imports: [CommonModule, AdminMasterKpisComponent, AdminMasterSiderbarTablesComponent, AdminMasterTableListComponent, AdminMasterCreateModalComponent], template: '<div class="container-fluid">\r\n\r\n  <div class="mb-3">\r\n    <h3 class="mb-1">Gesti\xF3n de Tablas Maestras</h3>\r\n    <p class="text-muted mb-0">Gestiona los cat\xE1logos base del sistema: instituciones, \xE1reas, periodos y m\xE1s.</p>\r\n  </div>\r\n\r\n  <app-admin-master-kpis [metrics]="metrics"></app-admin-master-kpis>\r\n\r\n  <div class="row g-3">\r\n\r\n    <div class="col-lg-3 col-md-4">\r\n      <app-admin-master-siderbar-tables\r\n        [catalogs]="catalogs"\r\n        [selectedCatalogSchema]="selectedCatalogSchema"\r\n        (catalogSelected)="onCatalogSelected($event)">\r\n      </app-admin-master-siderbar-tables>\r\n    </div>\r\n\r\n    <div class="col-lg-9 col-md-8">\r\n      <app-admin-master-table-list\r\n        [records]="currentRecords"\r\n        [catalogName]="selectedCatalogName"\r\n        [isLoading]="isLoadingRecords"\r\n        (editRecord)="prepareEdit($event)"\r\n        (createRecord)="prepareCreate()"\r\n        (search)="onSearch($event)">\r\n      </app-admin-master-table-list>\r\n    </div>\r\n\r\n    <app-admin-master-create-modal [currentSchema]="selectedCatalogSchema" [recordToEdit]="selectedRecordToEdit"\r\n      (recordSaved)="reloadCurrentCatalog()">\r\n    </app-admin-master-create-modal>\r\n\r\n  </div>\r\n\r\n</div>\r\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminMasterTablesComponent, { className: "AdminMasterTablesComponent", filePath: "app/components/administration/admin-master-tables/admin-master-tables.component.ts", lineNumber: 21 });
})();
export {
  AdminMasterTablesComponent
};
//# sourceMappingURL=chunk-2IX5HR5D.js.map
