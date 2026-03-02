import {
  FormsModule
} from "./chunk-RREETWSH.js";
import {
  CommonModule,
  Component,
  Injectable,
  __spreadProps,
  __spreadValues,
  environment,
  of,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵtext
} from "./chunk-OENL2SFL.js";

// src/app/services/coordination/coord-physicalspaces/coord-physicalspaces.service.ts
var CoordPhysicalspacesService = class _CoordPhysicalspacesService {
  apiUrl = `${environment.apiUrl}/coordination/physicalspaces`;
  constructor() {
  }
  // ============================================
  // MÉTODOS PARA ESPACIOS FÍSICOS
  // ============================================
  /**
   * Obtiene todos los espacios físicos
   */
  getSpaces() {
    return of(this.getMockSpaces());
  }
  /**
   * Obtiene un espacio por su ID
   */
  getSpaceById(id) {
    const spaces = this.getMockSpaces();
    const space = spaces.find((s) => s.id === id);
    return of(space || null);
  }
  /**
   * Busca espacios con filtros
   */
  searchSpaces(filters) {
    let spaces = this.getMockSpaces();
    if (filters.tipo) {
      spaces = spaces.filter((s) => s.tipo === filters.tipo);
    }
    if (filters.edificioId) {
      spaces = spaces.filter((s) => s.edificioId === filters.edificioId);
    }
    if (filters.capacidadMinima) {
      spaces = spaces.filter((s) => s.capacidad >= filters.capacidadMinima);
    }
    if (filters.estado) {
      spaces = spaces.filter((s) => s.estado === filters.estado);
    }
    return of(spaces);
  }
  /**
   * Crea un nuevo espacio físico
   */
  createSpace(spaceData) {
    console.log("Creando espacio:", spaceData);
    const newSpace = __spreadProps(__spreadValues({
      id: Date.now()
    }, spaceData), {
      estado: "disponible",
      recursos: spaceData.recursos || []
    });
    return of(newSpace);
  }
  /**
   * Actualiza un espacio físico existente
   */
  updateSpace(id, spaceData) {
    console.log("Actualizando espacio:", id, spaceData);
    const space = this.getMockSpaces().find((s) => s.id === id);
    return of(__spreadValues(__spreadValues({}, space), spaceData));
  }
  /**
   * Elimina un espacio físico
   */
  deleteSpace(id) {
    console.log("Eliminando espacio:", id);
    return of(true);
  }
  /**
   * Cambia el estado de un espacio
   */
  changeSpaceStatus(id, estado) {
    console.log("Cambiando estado del espacio:", id, "a", estado);
    return of(true);
  }
  /**
   * Obtiene los tipos de espacio disponibles
   */
  getSpaceTypes() {
    return of([
      { value: "aula", label: "Aula" },
      { value: "laboratorio", label: "Laboratorio" },
      { value: "auditorio", label: "Auditorio" },
      { value: "sala_reuniones", label: "Sala de Reuniones" },
      { value: "biblioteca", label: "Biblioteca" },
      { value: "cancha", label: "Cancha" },
      { value: "oficina", label: "Oficina" },
      { value: "otro", label: "Otro" }
    ]);
  }
  // ============================================
  // MÉTODOS PARA EDIFICIOS
  // ============================================
  /**
   * Obtiene todos los edificios
   */
  getBuildings() {
    return of(this.getMockBuildings());
  }
  /**
   * Obtiene edificios para select/dropdown
   */
  getBuildingsForSelect() {
    return of([
      { id: 1, nombre: "Edificio Principal", codigo: "EP" },
      { id: 2, nombre: "Edificio de Ciencias", codigo: "EC" },
      { id: 3, nombre: "Edificio de Ingenier\xEDas", codigo: "EI" },
      { id: 4, nombre: "Centro de Convenciones", codigo: "CC" }
    ]);
  }
  /**
   * Obtiene un edificio por su ID
   */
  getBuildingById(id) {
    const buildings = this.getMockBuildings();
    const building = buildings.find((b) => b.id === id);
    return of(building || null);
  }
  /**
   * Crea un nuevo edificio
   */
  createBuilding(buildingData) {
    console.log("Creando edificio:", buildingData);
    const newBuilding = __spreadProps(__spreadValues({
      id: Date.now()
    }, buildingData), {
      totalEspacios: 0,
      estado: "activo"
    });
    return of(newBuilding);
  }
  /**
   * Actualiza un edificio existente
   */
  updateBuilding(id, buildingData) {
    console.log("Actualizando edificio:", id, buildingData);
    const building = this.getMockBuildings().find((b) => b.id === id);
    return of(__spreadValues(__spreadValues({}, building), buildingData));
  }
  /**
   * Elimina un edificio
   */
  deleteBuilding(id) {
    console.log("Eliminando edificio:", id);
    return of(true);
  }
  // ============================================
  // DISPONIBILIDAD
  // ============================================
  /**
   * Verifica la disponibilidad de un espacio en una fecha y hora
   */
  checkAvailability(spaceId, fecha, horaInicio, horaFin) {
    return of(Math.random() > 0.2);
  }
  /**
   * Obtiene espacios disponibles en un rango de tiempo
   */
  getAvailableSpaces(fecha, horaInicio, horaFin, tipo) {
    let spaces = this.getMockSpaces().filter((s) => s.estado === "disponible");
    if (tipo) {
      spaces = spaces.filter((s) => s.tipo === tipo);
    }
    return of(spaces);
  }
  // ============================================
  // DATOS MOCK PARA DESARROLLO
  // ============================================
  getMockSpaces() {
    return [
      {
        id: 1,
        codigo: "A101",
        nombre: "Aula 101",
        tipo: "aula",
        edificioId: 1,
        edificioNombre: "Edificio Principal",
        piso: 1,
        capacidad: 40,
        estado: "disponible",
        recursos: [
          { id: 1, nombre: "Proyector", cantidad: 1, estado: "funcionando" },
          { id: 2, nombre: "Pizarra", cantidad: 1, estado: "funcionando" }
        ],
        descripcion: "Aula est\xE1ndar con proyector"
      },
      {
        id: 2,
        codigo: "LAB-A",
        nombre: "Laboratorio de Computaci\xF3n A",
        tipo: "laboratorio",
        edificioId: 2,
        edificioNombre: "Edificio de Ciencias",
        piso: 2,
        capacidad: 30,
        estado: "disponible",
        recursos: [
          { id: 3, nombre: "Computador", cantidad: 30, estado: "funcionando" },
          { id: 4, nombre: "Proyector", cantidad: 1, estado: "funcionando" }
        ],
        descripcion: "Laboratorio con 30 equipos de c\xF3mputo"
      },
      {
        id: 3,
        codigo: "AUD-01",
        nombre: "Auditorio Principal",
        tipo: "auditorio",
        edificioId: 4,
        edificioNombre: "Centro de Convenciones",
        piso: 1,
        capacidad: 200,
        estado: "disponible",
        recursos: [
          { id: 5, nombre: "Sistema de Sonido", cantidad: 1, estado: "funcionando" },
          { id: 6, nombre: "Pantalla LED", cantidad: 1, estado: "funcionando" }
        ],
        descripcion: "Auditorio para eventos grandes"
      },
      {
        id: 4,
        codigo: "SR-201",
        nombre: "Sala de Reuniones 201",
        tipo: "sala_reuniones",
        edificioId: 1,
        edificioNombre: "Edificio Principal",
        piso: 2,
        capacidad: 12,
        estado: "ocupado",
        recursos: [
          { id: 7, nombre: "TV Smart", cantidad: 1, estado: "funcionando" },
          { id: 8, nombre: "Videoconferencia", cantidad: 1, estado: "funcionando" }
        ],
        descripcion: "Sala para reuniones ejecutivas"
      },
      {
        id: 5,
        codigo: "A302",
        nombre: "Aula 302",
        tipo: "aula",
        edificioId: 3,
        edificioNombre: "Edificio de Ingenier\xEDas",
        piso: 3,
        capacidad: 35,
        estado: "mantenimiento",
        recursos: [
          { id: 9, nombre: "Proyector", cantidad: 1, estado: "en_reparacion" }
        ],
        descripcion: "Aula en mantenimiento"
      }
    ];
  }
  getMockBuildings() {
    return [
      { id: 1, codigo: "EP", nombre: "Edificio Principal", direccion: "Campus Central", numeroPisos: 4, totalEspacios: 25, estado: "activo" },
      { id: 2, codigo: "EC", nombre: "Edificio de Ciencias", direccion: "Campus Norte", numeroPisos: 3, totalEspacios: 18, estado: "activo" },
      { id: 3, codigo: "EI", nombre: "Edificio de Ingenier\xEDas", direccion: "Campus Este", numeroPisos: 5, totalEspacios: 30, estado: "activo" },
      { id: 4, codigo: "CC", nombre: "Centro de Convenciones", direccion: "Campus Central", numeroPisos: 2, totalEspacios: 8, estado: "activo" }
    ];
  }
  static \u0275fac = function CoordPhysicalspacesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CoordPhysicalspacesService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CoordPhysicalspacesService, factory: _CoordPhysicalspacesService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CoordPhysicalspacesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/components/coordination/coord-physicalspaces/coord-physicalspaces.component.ts
var CoordPhysicalspacesComponent = class _CoordPhysicalspacesComponent {
  spacesService;
  // Lista de espacios
  spaces = [];
  filteredSpaces = [];
  // Opciones para filtros
  buildings = [];
  spaceTypes = [];
  // Filtros activos
  filters = {};
  searchTerm = "";
  // Estado de carga
  isLoading = false;
  constructor(spacesService) {
    this.spacesService = spacesService;
  }
  ngOnInit() {
    this.loadInitialData();
  }
  loadInitialData() {
    this.isLoading = true;
    this.spacesService.getSpaces().subscribe((spaces) => {
      this.spaces = spaces;
      this.filteredSpaces = spaces;
      this.isLoading = false;
    });
    this.spacesService.getBuildingsForSelect().subscribe((buildings) => {
      this.buildings = buildings;
    });
    this.spacesService.getSpaceTypes().subscribe((types) => {
      this.spaceTypes = types;
    });
  }
  applyFilters() {
    this.spacesService.searchSpaces(this.filters).subscribe((spaces) => {
      this.filteredSpaces = spaces.filter((space) => space.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) || space.codigo.toLowerCase().includes(this.searchTerm.toLowerCase()));
    });
  }
  clearFilters() {
    this.filters = {};
    this.searchTerm = "";
    this.filteredSpaces = this.spaces;
  }
  changeStatus(spaceId, newStatus) {
    this.spacesService.changeSpaceStatus(spaceId, newStatus).subscribe(() => {
      const space = this.spaces.find((s) => s.id === spaceId);
      if (space) {
        space.estado = newStatus;
      }
    });
  }
  getStatusBadgeClass(estado) {
    const classes = {
      disponible: "bg-success",
      ocupado: "bg-danger",
      mantenimiento: "bg-warning",
      inactivo: "bg-secondary"
    };
    return classes[estado] || "bg-secondary";
  }
  static \u0275fac = function CoordPhysicalspacesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CoordPhysicalspacesComponent)(\u0275\u0275directiveInject(CoordPhysicalspacesService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CoordPhysicalspacesComponent, selectors: [["app-coord-physicalspaces"]], decls: 140, vars: 0, consts: [[1, "container-fluid"], [1, "mb-4", "fw-bold", "text-dark"], [1, "row", "mb-4"], [1, "col-md-8"], [1, "input-group"], ["type", "text", "placeholder", "Buscar espacios por nombre, c\xF3digo...", 1, "form-control"], ["type", "button", 1, "btn", "btn-outline-success"], [1, "bi", "bi-search"], [1, "col-md-4", "text-end"], [1, "btn", "btn-success", "fw-bold"], [1, "bi", "bi-plus-circle", "me-2"], [1, "row"], [1, "col-12"], [1, "card", "border-0", "shadow-sm"], [1, "card-header", "bg-light", "border-bottom"], [1, "mb-0", "fw-bold"], [1, "bi", "bi-building", "me-2"], [1, "card-body", "p-0"], [1, "table-responsive"], [1, "table", "table-hover", "mb-0"], [1, "table-light"], [1, "badge", "bg-primary"], [1, "badge", "bg-success"], ["title", "Editar", 1, "btn", "btn-sm", "btn-outline-primary"], [1, "bi", "bi-pencil"], ["title", "Eliminar", 1, "btn", "btn-sm", "btn-outline-danger"], [1, "bi", "bi-trash"], [1, "badge", "bg-info"], [1, "badge", "bg-warning"], [1, "badge", "bg-secondary"], [1, "card-footer", "bg-light", "border-top"], ["aria-label", "Paginaci\xF3n"], [1, "pagination", "pagination-sm", "mb-0"], [1, "page-item"], ["href", "#", 1, "page-link"], [1, "page-item", "active"]], template: function CoordPhysicalspacesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "h1", 1);
      \u0275\u0275text(2, "Espacios F\xEDsicos");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "div", 2)(4, "div", 3)(5, "div", 4);
      \u0275\u0275domElement(6, "input", 5);
      \u0275\u0275domElementStart(7, "button", 6);
      \u0275\u0275domElement(8, "i", 7);
      \u0275\u0275text(9, " Buscar ");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(10, "div", 8)(11, "button", 9);
      \u0275\u0275domElement(12, "i", 10);
      \u0275\u0275text(13, "Agregar Espacio ");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(14, "div", 11)(15, "div", 12)(16, "div", 13)(17, "div", 14)(18, "h5", 15);
      \u0275\u0275domElement(19, "i", 16);
      \u0275\u0275text(20, "Listado de Espacios Registrados ");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(21, "div", 17)(22, "div", 18)(23, "table", 19)(24, "thead", 20)(25, "tr")(26, "th");
      \u0275\u0275text(27, "C\xF3digo");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(28, "th");
      \u0275\u0275text(29, "Nombre");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(30, "th");
      \u0275\u0275text(31, "Capacidad");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(32, "th");
      \u0275\u0275text(33, "Tipo");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(34, "th");
      \u0275\u0275text(35, "Bloque");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(36, "th");
      \u0275\u0275text(37, "Estado");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(38, "th");
      \u0275\u0275text(39, "Acciones");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(40, "tbody")(41, "tr")(42, "td")(43, "strong");
      \u0275\u0275text(44, "A-101");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(45, "td");
      \u0275\u0275text(46, "Aula de Sistemas");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(47, "td");
      \u0275\u0275text(48, "30");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(49, "td")(50, "span", 21);
      \u0275\u0275text(51, "Aula");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(52, "td");
      \u0275\u0275text(53, "A");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(54, "td")(55, "span", 22);
      \u0275\u0275text(56, "Disponible");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(57, "td")(58, "button", 23);
      \u0275\u0275domElement(59, "i", 24);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(60, "button", 25);
      \u0275\u0275domElement(61, "i", 26);
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(62, "tr")(63, "td")(64, "strong");
      \u0275\u0275text(65, "B-205");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(66, "td");
      \u0275\u0275text(67, "Laboratorio de Redes");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(68, "td");
      \u0275\u0275text(69, "20");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(70, "td")(71, "span", 27);
      \u0275\u0275text(72, "Laboratorio");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(73, "td");
      \u0275\u0275text(74, "B");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(75, "td")(76, "span", 22);
      \u0275\u0275text(77, "Disponible");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(78, "td")(79, "button", 23);
      \u0275\u0275domElement(80, "i", 24);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(81, "button", 25);
      \u0275\u0275domElement(82, "i", 26);
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(83, "tr")(84, "td")(85, "strong");
      \u0275\u0275text(86, "C-301");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(87, "td");
      \u0275\u0275text(88, "Aula de Ingl\xE9s");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(89, "td");
      \u0275\u0275text(90, "25");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(91, "td")(92, "span", 21);
      \u0275\u0275text(93, "Aula");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(94, "td");
      \u0275\u0275text(95, "C");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(96, "td")(97, "span", 28);
      \u0275\u0275text(98, "Mantenimiento");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(99, "td")(100, "button", 23);
      \u0275\u0275domElement(101, "i", 24);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(102, "button", 25);
      \u0275\u0275domElement(103, "i", 26);
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(104, "tr")(105, "td")(106, "strong");
      \u0275\u0275text(107, "D-102");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(108, "td");
      \u0275\u0275text(109, "Sala de Conferencias");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(110, "td");
      \u0275\u0275text(111, "50");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(112, "td")(113, "span", 29);
      \u0275\u0275text(114, "Sala Especial");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(115, "td");
      \u0275\u0275text(116, "D");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(117, "td")(118, "span", 22);
      \u0275\u0275text(119, "Disponible");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(120, "td")(121, "button", 23);
      \u0275\u0275domElement(122, "i", 24);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(123, "button", 25);
      \u0275\u0275domElement(124, "i", 26);
      \u0275\u0275domElementEnd()()()()()()();
      \u0275\u0275domElementStart(125, "div", 30)(126, "nav", 31)(127, "ul", 32)(128, "li", 33)(129, "a", 34);
      \u0275\u0275text(130, "Anterior");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(131, "li", 35)(132, "a", 34);
      \u0275\u0275text(133, "1");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(134, "li", 33)(135, "a", 34);
      \u0275\u0275text(136, "2");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(137, "li", 33)(138, "a", 34);
      \u0275\u0275text(139, "Siguiente");
      \u0275\u0275domElementEnd()()()()()()()()();
    }
  }, dependencies: [CommonModule, FormsModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CoordPhysicalspacesComponent, [{
    type: Component,
    args: [{ selector: "app-coord-physicalspaces", standalone: true, imports: [CommonModule, FormsModule], template: '<div class="container-fluid">\r\n  <h1 class="mb-4 fw-bold text-dark">Espacios F\xEDsicos</h1>\r\n\r\n  <!-- Controles y Filtros -->\r\n  <div class="row mb-4">\r\n    <div class="col-md-8">\r\n      <div class="input-group">\r\n        <input type="text" class="form-control" placeholder="Buscar espacios por nombre, c\xF3digo...">\r\n        <button class="btn btn-outline-success" type="button">\r\n          <i class="bi bi-search"></i> Buscar\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <div class="col-md-4 text-end">\r\n      <button class="btn btn-success fw-bold">\r\n        <i class="bi bi-plus-circle me-2"></i>Agregar Espacio\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Tabla de Espacios F\xEDsicos -->\r\n  <div class="row">\r\n    <div class="col-12">\r\n      <div class="card border-0 shadow-sm">\r\n        <div class="card-header bg-light border-bottom">\r\n          <h5 class="mb-0 fw-bold">\r\n            <i class="bi bi-building me-2"></i>Listado de Espacios Registrados\r\n          </h5>\r\n        </div>\r\n        <div class="card-body p-0">\r\n          <div class="table-responsive">\r\n            <table class="table table-hover mb-0">\r\n              <thead class="table-light">\r\n                <tr>\r\n                  <th>C\xF3digo</th>\r\n                  <th>Nombre</th>\r\n                  <th>Capacidad</th>\r\n                  <th>Tipo</th>\r\n                  <th>Bloque</th>\r\n                  <th>Estado</th>\r\n                  <th>Acciones</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr>\r\n                  <td><strong>A-101</strong></td>\r\n                  <td>Aula de Sistemas</td>\r\n                  <td>30</td>\r\n                  <td><span class="badge bg-primary">Aula</span></td>\r\n                  <td>A</td>\r\n                  <td><span class="badge bg-success">Disponible</span></td>\r\n                  <td>\r\n                    <button class="btn btn-sm btn-outline-primary" title="Editar">\r\n                      <i class="bi bi-pencil"></i>\r\n                    </button>\r\n                    <button class="btn btn-sm btn-outline-danger" title="Eliminar">\r\n                      <i class="bi bi-trash"></i>\r\n                    </button>\r\n                  </td>\r\n                </tr>\r\n                <tr>\r\n                  <td><strong>B-205</strong></td>\r\n                  <td>Laboratorio de Redes</td>\r\n                  <td>20</td>\r\n                  <td><span class="badge bg-info">Laboratorio</span></td>\r\n                  <td>B</td>\r\n                  <td><span class="badge bg-success">Disponible</span></td>\r\n                  <td>\r\n                    <button class="btn btn-sm btn-outline-primary" title="Editar">\r\n                      <i class="bi bi-pencil"></i>\r\n                    </button>\r\n                    <button class="btn btn-sm btn-outline-danger" title="Eliminar">\r\n                      <i class="bi bi-trash"></i>\r\n                    </button>\r\n                  </td>\r\n                </tr>\r\n                <tr>\r\n                  <td><strong>C-301</strong></td>\r\n                  <td>Aula de Ingl\xE9s</td>\r\n                  <td>25</td>\r\n                  <td><span class="badge bg-primary">Aula</span></td>\r\n                  <td>C</td>\r\n                  <td><span class="badge bg-warning">Mantenimiento</span></td>\r\n                  <td>\r\n                    <button class="btn btn-sm btn-outline-primary" title="Editar">\r\n                      <i class="bi bi-pencil"></i>\r\n                    </button>\r\n                    <button class="btn btn-sm btn-outline-danger" title="Eliminar">\r\n                      <i class="bi bi-trash"></i>\r\n                    </button>\r\n                  </td>\r\n                </tr>\r\n                <tr>\r\n                  <td><strong>D-102</strong></td>\r\n                  <td>Sala de Conferencias</td>\r\n                  <td>50</td>\r\n                  <td><span class="badge bg-secondary">Sala Especial</span></td>\r\n                  <td>D</td>\r\n                  <td><span class="badge bg-success">Disponible</span></td>\r\n                  <td>\r\n                    <button class="btn btn-sm btn-outline-primary" title="Editar">\r\n                      <i class="bi bi-pencil"></i>\r\n                    </button>\r\n                    <button class="btn btn-sm btn-outline-danger" title="Eliminar">\r\n                      <i class="bi bi-trash"></i>\r\n                    </button>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n        </div>\r\n        <div class="card-footer bg-light border-top">\r\n          <nav aria-label="Paginaci\xF3n">\r\n            <ul class="pagination pagination-sm mb-0">\r\n              <li class="page-item"><a class="page-link" href="#">Anterior</a></li>\r\n              <li class="page-item active"><a class="page-link" href="#">1</a></li>\r\n              <li class="page-item"><a class="page-link" href="#">2</a></li>\r\n              <li class="page-item"><a class="page-link" href="#">Siguiente</a></li>\r\n            </ul>\r\n          </nav>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n' }]
  }], () => [{ type: CoordPhysicalspacesService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CoordPhysicalspacesComponent, { className: "CoordPhysicalspacesComponent", filePath: "app/components/coordination/coord-physicalspaces/coord-physicalspaces.component.ts", lineNumber: 15 });
})();
export {
  CoordPhysicalspacesComponent
};
//# sourceMappingURL=chunk-X6YNWGPA.js.map
