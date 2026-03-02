import {
  TeacherAvailabilityService,
  TeacherClassScheduleService
} from "./chunk-SJNSHORJ.js";
import "./chunk-MDNOZLIJ.js";
import "./chunk-OBGJFG5D.js";
import {
  AuthService
} from "./chunk-ZOQXTRIP.js";
import "./chunk-MXF362TW.js";
import {
  FormsModule
} from "./chunk-RREETWSH.js";
import "./chunk-K6SHIZGP.js";
import {
  ChangeDetectorRef,
  CommonModule,
  Component,
  NgClass,
  forkJoin,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-OENL2SFL.js";

// src/app/components/teacher/teacher-availability/teacher-availability.component.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.dayId;
var _forTrack2 = ($index, $item) => $item.timeBlockId;
function TeacherAvailabilityComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "i", 29);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "button", 30);
    \u0275\u0275listener("click", function TeacherAvailabilityComponent_Conditional_10_Template_button_click_3_listener() {
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
function TeacherAvailabilityComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "i", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "button", 30);
    \u0275\u0275listener("click", function TeacherAvailabilityComponent_Conditional_11_Template_button_click_3_listener() {
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
function TeacherAvailabilityComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 32);
    \u0275\u0275element(2, "div", 33);
    \u0275\u0275elementStart(3, "p", 6);
    \u0275\u0275text(4, "Cargando disponibilidad...");
    \u0275\u0275elementEnd()()();
  }
}
function TeacherAvailabilityComponent_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 35)(1, "button", 55);
    \u0275\u0275listener("click", function TeacherAvailabilityComponent_Conditional_13_For_2_Template_button_click_1_listener() {
      const section_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setActiveSection(section_r6.key));
    });
    \u0275\u0275element(2, "i");
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "span", 56);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const section_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.activeSection === section_r6.key);
    \u0275\u0275property("ngClass", section_r6.colorClass);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("bi ", section_r6.icon, " me-2"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", section_r6.label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.countTotalSectionSlots(section_r6.key));
  }
}
function TeacherAvailabilityComponent_Conditional_13_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 41)(1, "div", 57)(2, "span", 58);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 59);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const day_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(day_r7.dayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.countSlotsInSection(day_r7.dayId, ctx_r1.activeSection), " slots");
  }
}
function TeacherAvailabilityComponent_Conditional_13_For_14_For_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 65);
  }
}
function TeacherAvailabilityComponent_Conditional_13_For_14_For_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 66);
  }
}
function TeacherAvailabilityComponent_Conditional_13_For_14_For_7_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_22_0;
    const day_r9 = \u0275\u0275nextContext().$implicit;
    const block_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((tmp_22_0 = ctx_r1.getScheduleInfo(day_r9.dayId, block_r10.timeBlockId)) == null ? null : tmp_22_0.subjectName);
  }
}
function TeacherAvailabilityComponent_Conditional_13_For_14_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 64);
    \u0275\u0275listener("click", function TeacherAvailabilityComponent_Conditional_13_For_14_For_7_Template_td_click_0_listener() {
      const day_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const block_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleSlot(day_r9.dayId, block_r10.timeBlockId));
    });
    \u0275\u0275conditionalCreate(1, TeacherAvailabilityComponent_Conditional_13_For_14_For_7_Conditional_1_Template, 1, 0, "i", 65);
    \u0275\u0275conditionalCreate(2, TeacherAvailabilityComponent_Conditional_13_For_14_For_7_Conditional_2_Template, 1, 0, "i", 66);
    \u0275\u0275conditionalCreate(3, TeacherAvailabilityComponent_Conditional_13_For_14_For_7_Conditional_3_Template, 2, 1, "span", 67);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const day_r9 = ctx.$implicit;
    const block_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("available", ctx_r1.getStatus(day_r9.dayId, block_r10.timeBlockId) === "available")("conflict", ctx_r1.getStatus(day_r9.dayId, block_r10.timeBlockId) === "conflict")("empty", ctx_r1.getStatus(day_r9.dayId, block_r10.timeBlockId) === "empty")("scheduled", ctx_r1.getStatus(day_r9.dayId, block_r10.timeBlockId) === "scheduled");
    \u0275\u0275property("title", ctx_r1.getScheduleTooltip(day_r9.dayId, block_r10.timeBlockId));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getStatus(day_r9.dayId, block_r10.timeBlockId) === "available" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getStatus(day_r9.dayId, block_r10.timeBlockId) === "conflict" ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getStatus(day_r9.dayId, block_r10.timeBlockId) === "scheduled" ? 3 : -1);
  }
}
function TeacherAvailabilityComponent_Conditional_13_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 60)(2, "span", 61);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 62);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(6, TeacherAvailabilityComponent_Conditional_13_For_14_For_7_Template, 4, 12, "td", 63, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const block_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(block_r10.startTime);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(block_r10.endTime);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.days);
  }
}
function TeacherAvailabilityComponent_Conditional_13_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 68);
    \u0275\u0275text(1, " Guardando... ");
  }
}
function TeacherAvailabilityComponent_Conditional_13_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 69);
    \u0275\u0275text(1, " Guardar disponibilidad ");
  }
}
function TeacherAvailabilityComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ul", 34);
    \u0275\u0275repeaterCreate(1, TeacherAvailabilityComponent_Conditional_13_For_2_Template, 6, 8, "li", 35, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 36)(4, "div", 37)(5, "div", 38)(6, "table", 39)(7, "thead")(8, "tr");
    \u0275\u0275element(9, "th", 40);
    \u0275\u0275repeaterCreate(10, TeacherAvailabilityComponent_Conditional_13_For_11_Template, 6, 2, "th", 41, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275repeaterCreate(13, TeacherAvailabilityComponent_Conditional_13_For_14_Template, 8, 2, "tr", null, _forTrack2);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 42)(16, "div", 43);
    \u0275\u0275element(17, "span", 44);
    \u0275\u0275elementStart(18, "small", 45);
    \u0275\u0275text(19, "Disponible");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 43);
    \u0275\u0275element(21, "span", 46);
    \u0275\u0275elementStart(22, "small", 45);
    \u0275\u0275text(23, "Ocupado / Conflicto");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 43);
    \u0275\u0275element(25, "span", 47);
    \u0275\u0275elementStart(26, "small", 45);
    \u0275\u0275text(27, "Sin seleccionar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 43);
    \u0275\u0275element(29, "span", 48);
    \u0275\u0275elementStart(30, "small", 45);
    \u0275\u0275text(31, "Clase asignada");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(32, "div", 49)(33, "button", 50);
    \u0275\u0275conditionalCreate(34, TeacherAvailabilityComponent_Conditional_13_Conditional_34_Template, 2, 0)(35, TeacherAvailabilityComponent_Conditional_13_Conditional_35_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "button", 51);
    \u0275\u0275element(37, "i", 52);
    \u0275\u0275text(38, " Limpiar todo ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "button", 53);
    \u0275\u0275listener("click", function TeacherAvailabilityComponent_Conditional_13_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reloadGrid());
    });
    \u0275\u0275element(40, "i", 54);
    \u0275\u0275text(41, " Recargar ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.sections);
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r1.days);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.filteredTimeBlocks);
    \u0275\u0275advance(20);
    \u0275\u0275property("disabled", ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.saving ? 34 : 35);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.saving);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.saving);
  }
}
var TeacherAvailabilityComponent = class _TeacherAvailabilityComponent {
  scheduleSvc = inject(TeacherClassScheduleService);
  availabilitySvc = inject(TeacherAvailabilityService);
  authService = inject(AuthService);
  cdr = inject(ChangeDetectorRef);
  // State
  loading = true;
  saving = false;
  errorMessage = null;
  successMessage = null;
  // Class schedules
  classSchedules = [];
  loadingSchedules = false;
  scheduleError = null;
  // Schedule info per grid cell: key = "dayId-timeBlockId" => ClassScheduleDetail
  scheduleInfo = /* @__PURE__ */ new Map();
  // Data
  days = [];
  timeBlocks = [];
  // Grid state: key = "dayId-timeBlockId" => SlotStatus
  grid = /* @__PURE__ */ new Map();
  // Quick selection
  selectedDayFilter = null;
  selectedBlockFilter = null;
  // Active section tab
  activeSection = "matutina";
  /** Section definitions */
  sections = [
    { key: "matutina", label: "Matutina", icon: "bi-sunrise", range: "7:30 - 12:30", colorClass: "section-matutina" },
    { key: "vespertina", label: "Vespertina", icon: "bi-sun", range: "12:30 - 17:30", colorClass: "section-vespertina" },
    { key: "nocturna", label: "Nocturna", icon: "bi-moon-stars", range: "19:00 - 00:00", colorClass: "section-nocturna" }
  ];
  /** Default data when API is not connected */
  defaultDays = [
    { dayId: 1, dayName: "Lunes", dayFullName: "Lun" },
    { dayId: 2, dayName: "Martes", dayFullName: "Mar" },
    { dayId: 3, dayName: "Miercoles", dayFullName: "Mie" },
    { dayId: 4, dayName: "Jueves", dayFullName: "Jue" },
    { dayId: 5, dayName: "Viernes", dayFullName: "Vie" },
    { dayId: 6, dayName: "Sabado", dayFullName: "Sab" },
    { dayId: 7, dayName: "Domingo", dayFullName: "Dom" }
  ];
  // Time blocks are loaded from the API (no longer hardcoded)
  /** Day name mapping */
  dayNames = {
    1: "Lunes",
    2: "Martes",
    3: "Mi\xE9rcoles",
    4: "Jueves",
    5: "Viernes",
    6: "S\xE1bado",
    7: "Domingo"
  };
  ngOnInit() {
    this.initGrid();
    this.loadData();
  }
  /** Get the day name from its number */
  getDayName(day) {
    return this.dayNames[day] ?? `D\xEDa ${day}`;
  }
  /** Initialize the grid with days (time blocks loaded from API) */
  initGrid() {
    this.days = [...this.defaultDays];
    this.grid.clear();
  }
  /** Build the grid once time blocks are loaded */
  buildGrid() {
    this.grid.clear();
    for (const day of this.days) {
      for (const block of this.timeBlocks) {
        this.grid.set(this.key(day.dayId, block.timeBlockId), "empty");
      }
    }
  }
  /** Map API TimeSlotDTO[] → TimeBlock[] with auto-detected section */
  mapTimeSlots(slots) {
    return slots.map((s) => {
      const start = this.normalizeTime(s.startTime);
      return {
        timeBlockId: s.timeSlotId,
        startTime: start,
        endTime: this.normalizeTime(s.endTime),
        section: this.detectSection(start)
      };
    });
  }
  /** Detect section from a HH:mm start time */
  detectSection(startTime) {
    const mins = this.timeToMinutes(startTime);
    if (mins < this.timeToMinutes("12:30"))
      return "matutina";
    if (mins < this.timeToMinutes("17:30"))
      return "vespertina";
    return "nocturna";
  }
  /** Normalize time to HH:mm (strip seconds if present) */
  normalizeTime(t) {
    if (!t)
      return "";
    const parts = t.split(":");
    return `${parts[0].padStart(2, "0")}:${parts[1]}`;
  }
  /** Load time slots, then schedules + availability in parallel */
  loadData() {
    const userId = this.authService.currentUser()?.userId;
    if (!userId) {
      this.loading = false;
      return;
    }
    this.loading = true;
    this.errorMessage = null;
    this.availabilitySvc.getTimeSlots().subscribe({
      next: (slotsDTO) => {
        this.timeBlocks = this.mapTimeSlots(slotsDTO);
        this.buildGrid();
        forkJoin({
          schedules: this.scheduleSvc.getSchedulesByTeacherId(userId),
          availability: this.availabilitySvc.getAvailabilityByUser(userId)
        }).subscribe({
          next: ({ schedules, availability }) => {
            this.classSchedules = schedules;
            this.applySchedulesToGrid();
            this.applyAvailabilityToGrid(availability);
            this.loading = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.errorMessage = err.message;
            this.loading = false;
            this.cdr.detectChanges();
          }
        });
      },
      error: (err) => {
        this.errorMessage = "Error al cargar los bloques horarios: " + err.message;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  /** Apply saved availability slots to the grid */
  applyAvailabilityToGrid(items) {
    for (const item of items) {
      const k = this.key(item.dayOfWeek, item.timeSlotId);
      if (this.grid.has(k) && this.grid.get(k) !== "scheduled") {
        this.grid.set(k, "available");
      }
    }
  }
  /** Convert "HH:mm" to total minutes for range comparison */
  timeToMinutes(time) {
    const normalized = this.normalizeTime(time);
    const [hh, mm] = normalized.split(":").map(Number);
    return hh === 0 && mm === 0 ? 1440 : hh * 60 + mm;
  }
  /** Map class schedules onto the availability grid */
  applySchedulesToGrid() {
    this.scheduleInfo.clear();
    for (const schedule of this.classSchedules) {
      if (!schedule.active)
        continue;
      const schedStart = this.timeToMinutes(schedule.startTime);
      const schedEnd = this.timeToMinutes(schedule.endTime);
      const matchingBlocks = this.timeBlocks.filter((b) => {
        const blockStart = this.timeToMinutes(b.startTime);
        return blockStart >= schedStart && blockStart < schedEnd;
      });
      for (const block of matchingBlocks) {
        const k = this.key(schedule.day, block.timeBlockId);
        this.grid.set(k, "scheduled");
        this.scheduleInfo.set(k, schedule);
      }
    }
  }
  /** Get the schedule detail for a cell (if any) */
  getScheduleInfo(dayId, timeBlockId) {
    return this.scheduleInfo.get(this.key(dayId, timeBlockId));
  }
  /** Get tooltip text for a scheduled cell */
  getScheduleTooltip(dayId, timeBlockId) {
    const info = this.getScheduleInfo(dayId, timeBlockId);
    if (!info)
      return "";
    return `${info.subjectName} \u2014 ${info.section} (Sem. ${info.semester})`;
  }
  /** Reload grid: reset and re-fetch data */
  reloadGrid() {
    this.initGrid();
    this.loadData();
  }
  /** Build a map key from dayId + timeBlockId */
  key(dayId, timeBlockId) {
    return `${dayId}-${timeBlockId}`;
  }
  /** Get the status for a given cell */
  getStatus(dayId, timeBlockId) {
    return this.grid.get(this.key(dayId, timeBlockId)) || "empty";
  }
  /** Toggle a single cell */
  toggleSlot(dayId, timeBlockId) {
    const k = this.key(dayId, timeBlockId);
    const current = this.grid.get(k) || "empty";
    if (current === "conflict" || current === "scheduled")
      return;
    this.grid.set(k, current === "available" ? "empty" : "available");
  }
  /** Count available slots for a given day */
  countSlots(dayId) {
    let count = 0;
    for (const block of this.timeBlocks) {
      if (this.getStatus(dayId, block.timeBlockId) === "available")
        count++;
    }
    return count;
  }
  /** Toggle all slots for a day (quick day selection) */
  toggleDay(dayId) {
    this.selectedDayFilter = this.selectedDayFilter === dayId ? null : dayId;
    const allAvailable = this.timeBlocks.every((b) => this.getStatus(dayId, b.timeBlockId) === "available" || this.getStatus(dayId, b.timeBlockId) === "conflict" || this.getStatus(dayId, b.timeBlockId) === "scheduled");
    for (const block of this.timeBlocks) {
      const k = this.key(dayId, block.timeBlockId);
      if (this.grid.get(k) === "conflict" || this.grid.get(k) === "scheduled")
        continue;
      this.grid.set(k, allAvailable ? "empty" : "available");
    }
  }
  /** Toggle all slots for a time block across all days */
  toggleBlock(timeBlockId) {
    this.selectedBlockFilter = timeBlockId;
    const allAvailable = this.days.every((d) => this.getStatus(d.dayId, timeBlockId) === "available" || this.getStatus(d.dayId, timeBlockId) === "conflict" || this.getStatus(d.dayId, timeBlockId) === "scheduled");
    for (const day of this.days) {
      const k = this.key(day.dayId, timeBlockId);
      if (this.grid.get(k) === "conflict" || this.grid.get(k) === "scheduled")
        continue;
      this.grid.set(k, allAvailable ? "empty" : "available");
    }
  }
  /** Check if a day button is active */
  isDayActive(dayId) {
    return this.selectedDayFilter === dayId;
  }
  /** Get time blocks for the active section */
  get filteredTimeBlocks() {
    return this.timeBlocks.filter((b) => b.section === this.activeSection);
  }
  /** Count available slots for a day within a specific section */
  countSlotsInSection(dayId, section) {
    let count = 0;
    for (const block of this.timeBlocks.filter((b) => b.section === section)) {
      if (this.getStatus(dayId, block.timeBlockId) === "available")
        count++;
    }
    return count;
  }
  /** Count total available slots for a section across all days */
  countTotalSectionSlots(section) {
    let count = 0;
    for (const day of this.days) {
      count += this.countSlotsInSection(day.dayId, section);
    }
    return count;
  }
  /** Set the active section tab */
  setActiveSection(section) {
    this.activeSection = section;
  }
  /** Save availability via batch API */
  onSave() {
    const userId = this.authService.currentUser()?.userId;
    if (!userId) {
      this.errorMessage = "No se pudo identificar al usuario. Inicia sesi\xF3n nuevamente.";
      return;
    }
    const periodId = this.classSchedules.find((s) => s.active)?.periodId;
    if (!periodId) {
      this.errorMessage = "No se encontr\xF3 un periodo acad\xE9mico activo.";
      return;
    }
    this.saving = true;
    this.errorMessage = null;
    this.successMessage = null;
    const slots = [];
    this.grid.forEach((status, k) => {
      if (status === "available") {
        const [dayOfWeek, timeSlotId] = k.split("-").map(Number);
        slots.push({ dayOfWeek, timeSlotId });
      }
    });
    console.log(slots);
    this.availabilitySvc.saveAvailability({ userId, periodId, slots }).subscribe({
      next: (res) => {
        this.saving = false;
        this.successMessage = res.message || `Se guardado correctamente.`;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.successMessage = null;
          this.cdr.detectChanges();
        }, 5e3);
      },
      error: (err) => {
        this.saving = false;
        this.errorMessage = err.message;
        this.cdr.detectChanges();
      }
    });
  }
  /** Clear all selections */
  clearAll() {
    this.grid.forEach((status, k) => {
      if (status !== "conflict" && status !== "scheduled") {
        this.grid.set(k, "empty");
      }
    });
    this.selectedDayFilter = null;
    this.selectedBlockFilter = null;
  }
  static \u0275fac = function TeacherAvailabilityComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeacherAvailabilityComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeacherAvailabilityComponent, selectors: [["app-teacher-availability"]], decls: 52, vars: 4, consts: [[1, "container-fluid"], [1, "mb-4"], [1, "d-flex", "align-items-center", "gap-3"], [1, "header-icon"], [1, "bi", "bi-calendar2-week"], [1, "fw-bold", "text-dark", "mb-0"], [1, "text-muted", "mb-0"], ["role", "alert", 1, "alert", "alert-danger", "alert-dismissible", "fade", "show"], ["role", "alert", 1, "alert", "alert-success", "alert-dismissible", "fade", "show"], [1, "card", "border-0", "shadow-sm"], ["id", "confirmSaveModal", "tabindex", "-1", "aria-labelledby", "confirmSaveLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog", "modal-dialog-centered"], [1, "modal-content", "border-0", "shadow"], [1, "modal-header", "border-0", "pb-0"], [1, "rounded-circle", "bg-success-subtle", "text-success", "d-flex", "align-items-center", "justify-content-center", 2, "width", "48px", "height", "48px", "font-size", "1.3rem"], [1, "bi", "bi-check-lg"], ["id", "confirmSaveLabel", 1, "modal-title", "fw-bold"], ["type", "button", "data-bs-dismiss", "modal", "aria-label", "Cerrar", 1, "btn-close"], [1, "modal-body", "pt-2"], [1, "modal-footer", "border-0"], ["type", "button", "data-bs-dismiss", "modal", 1, "btn", "btn-outline-secondary"], ["type", "button", "data-bs-dismiss", "modal", 1, "btn", "btn-success", 3, "click"], [1, "bi", "bi-check-lg", "me-1"], ["id", "confirmClearModal", "tabindex", "-1", "aria-labelledby", "confirmClearLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "rounded-circle", "bg-warning-subtle", "text-warning", "d-flex", "align-items-center", "justify-content-center", 2, "width", "48px", "height", "48px", "font-size", "1.3rem"], [1, "bi", "bi-exclamation-triangle"], ["id", "confirmClearLabel", 1, "modal-title", "fw-bold"], ["type", "button", "data-bs-dismiss", "modal", 1, "btn", "btn-warning", 3, "click"], [1, "bi", "bi-arrow-counterclockwise", "me-1"], [1, "bi", "bi-exclamation-triangle-fill", "me-2"], ["type", "button", 1, "btn-close", 3, "click"], [1, "bi", "bi-check-circle-fill", "me-2"], [1, "card-body", "text-center", "py-5"], ["role", "status", 1, "spinner-border", "text-success", "mb-3"], [1, "nav", "nav-pills", "mb-4", "gap-2"], [1, "nav-item"], [1, "card", "border-0", "shadow-sm", "mb-4"], [1, "card-body", "p-4"], [1, "grid-wrapper"], [1, "availability-grid"], [1, "time-header"], [1, "day-header"], [1, "d-flex", "gap-4", "mt-3", "pt-3", "border-top"], [1, "d-flex", "align-items-center", "gap-2"], [1, "legend-dot", "available"], [1, "text-muted"], [1, "legend-dot", "conflict"], [1, "legend-dot", "empty"], [1, "legend-dot", "scheduled"], [1, "d-flex", "gap-2", "mb-4"], ["type", "button", "data-bs-toggle", "modal", "data-bs-target", "#confirmSaveModal", 1, "btn", "btn-success", 3, "disabled"], ["type", "button", "data-bs-toggle", "modal", "data-bs-target", "#confirmClearModal", 1, "btn", "btn-outline-secondary", 3, "disabled"], [1, "bi", "bi-arrow-counterclockwise", "me-2"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "bi", "bi-arrow-repeat", "me-2"], ["type", "button", 1, "btn", "section-tab", 3, "click", "ngClass"], [1, "badge", "bg-white", "text-dark", "ms-2"], [1, "day-header-content"], [1, "day-name"], [1, "day-slots"], [1, "time-cell"], [1, "time-start"], [1, "time-end"], [1, "slot-cell", 3, "available", "conflict", "empty", "scheduled", "title"], [1, "slot-cell", 3, "click", "title"], [1, "bi", "bi-check-lg", "slot-icon"], [1, "bi", "bi-x-lg", "slot-icon"], [1, "scheduled-label"], [1, "spinner-border", "spinner-border-sm", "me-2"], [1, "bi", "bi-check-lg", "me-2"]], template: function TeacherAvailabilityComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275element(4, "i", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div")(6, "h3", 5);
      \u0275\u0275text(7, "Disponibilidad Horaria");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 6);
      \u0275\u0275text(9, "Selecciona los bloques horarios en los que est\xE1s disponible para refuerzos acad\xE9micos ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(10, TeacherAvailabilityComponent_Conditional_10_Template, 4, 1, "div", 7);
      \u0275\u0275conditionalCreate(11, TeacherAvailabilityComponent_Conditional_11_Template, 4, 1, "div", 8);
      \u0275\u0275conditionalCreate(12, TeacherAvailabilityComponent_Conditional_12_Template, 5, 0, "div", 9);
      \u0275\u0275conditionalCreate(13, TeacherAvailabilityComponent_Conditional_13_Template, 42, 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 10)(15, "div", 11)(16, "div", 12)(17, "div", 13)(18, "div", 2)(19, "div", 14);
      \u0275\u0275element(20, "i", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "h5", 16);
      \u0275\u0275text(22, "Confirmar guardado");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(23, "button", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 18)(25, "p", 6);
      \u0275\u0275text(26, " \xBFEst\xE1s seguro de que deseas guardar tu disponibilidad horaria? Los bloques seleccionados ser\xE1n enviados al sistema. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "div", 19)(28, "button", 20);
      \u0275\u0275text(29, "Cancelar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "button", 21);
      \u0275\u0275listener("click", function TeacherAvailabilityComponent_Template_button_click_30_listener() {
        return ctx.onSave();
      });
      \u0275\u0275element(31, "i", 22);
      \u0275\u0275text(32, " S\xED, guardar ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(33, "div", 23)(34, "div", 11)(35, "div", 12)(36, "div", 13)(37, "div", 2)(38, "div", 24);
      \u0275\u0275element(39, "i", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "h5", 26);
      \u0275\u0275text(41, "Confirmar limpieza");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(42, "button", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "div", 18)(44, "p", 6);
      \u0275\u0275text(45, " \xBFEst\xE1s seguro de que deseas limpiar toda tu selecci\xF3n? Se eliminar\xE1n todos los bloques marcados como disponibles. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(46, "div", 19)(47, "button", 20);
      \u0275\u0275text(48, "Cancelar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "button", 27);
      \u0275\u0275listener("click", function TeacherAvailabilityComponent_Template_button_click_49_listener() {
        return ctx.clearAll();
      });
      \u0275\u0275element(50, "i", 28);
      \u0275\u0275text(51, " S\xED, limpiar ");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275conditional(ctx.errorMessage ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.successMessage ? 11 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading ? 13 : -1);
    }
  }, dependencies: [CommonModule, NgClass, FormsModule], styles: ['\n\n[_nghost-%COMP%] {\n  font-family:\n    "Inter",\n    "Segoe UI",\n    -apple-system,\n    BlinkMacSystemFont,\n    sans-serif;\n}\n.header-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  min-width: 48px;\n  border-radius: 14px;\n  background-color: #1B7505;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.4rem;\n  border: 1px solid #145904;\n}\n.grid-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.availability-grid[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 6px;\n  table-layout: fixed;\n}\n.time-header[_ngcontent-%COMP%] {\n  width: 70px;\n}\n.time-cell[_ngcontent-%COMP%] {\n  width: 70px;\n  padding: 8px 4px;\n  text-align: right;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.time-start[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 700;\n  font-size: 0.9rem;\n  color: #333;\n}\n.time-end[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.75rem;\n  color: #999;\n}\n.day-header[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 0;\n}\n.day-header-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background-color: #1B7505;\n  color: #fff;\n  border-radius: 8px;\n  padding: 10px 8px;\n  min-height: 56px;\n  border: 1px solid #145904;\n}\n.day-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 0.95rem;\n}\n.day-slots[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  opacity: 0.85;\n}\n.slot-cell[_ngcontent-%COMP%] {\n  text-align: center;\n  vertical-align: middle;\n  border-radius: 8px;\n  height: 44px;\n  cursor: pointer;\n  transition: all 0.15s ease-in-out;\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n}\n.slot-cell.empty[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n  border: 1px solid #e0e0e0;\n}\n.slot-cell.empty[_ngcontent-%COMP%]:hover {\n  background-color: #e8f5e9;\n  border-color: #1B7505;\n  box-shadow: 0 0 0 2px rgba(27, 117, 5, 0.2);\n}\n.slot-cell.available[_ngcontent-%COMP%] {\n  background-color: #1B7505;\n  color: #fff;\n  border: 1px solid #145904;\n}\n.slot-cell.available[_ngcontent-%COMP%]:hover {\n  background-color: #145904;\n}\n.slot-cell.conflict[_ngcontent-%COMP%] {\n  background-color: #9c27b0;\n  color: #fff;\n  cursor: not-allowed;\n  border: 1px solid #7b1fa2;\n}\n.slot-cell.scheduled[_ngcontent-%COMP%] {\n  background-color: #263238;\n  color: #fff;\n  cursor: not-allowed;\n  font-size: 0.7rem;\n  border: 1px solid #1a2327;\n}\n.slot-cell.scheduled[_ngcontent-%COMP%]:hover {\n  background-color: #1a2327;\n}\n.scheduled-label[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 600;\n  font-size: 0.65rem;\n  line-height: 1.2;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  padding: 0 4px;\n}\n.slot-icon[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n}\n.legend-dot[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  border-radius: 4px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n}\n.legend-dot.available[_ngcontent-%COMP%] {\n  background-color: #1B7505;\n  border-color: #145904;\n}\n.legend-dot.conflict[_ngcontent-%COMP%] {\n  background-color: #9c27b0;\n  border-color: #7b1fa2;\n}\n.legend-dot.empty[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n  border: 1px solid #ced4da;\n}\n.legend-dot.scheduled[_ngcontent-%COMP%] {\n  background-color: #263238;\n  border-color: #1a2327;\n}\n.section-tab[_ngcontent-%COMP%] {\n  border-radius: 10px;\n  padding: 10px 20px;\n  font-weight: 600;\n  font-size: 0.9rem;\n  border: 2px solid #e0e0e0;\n  color: #555;\n  background-color: #f5f5f5;\n  transition: all 0.2s ease;\n}\n.section-tab[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.section-tab.section-matutina.active[_ngcontent-%COMP%] {\n  background-color: #ff9800;\n  color: #fff;\n  border-color: #e65100;\n}\n.section-tab.section-matutina[_ngcontent-%COMP%]:not(.active):hover {\n  background-color: #fff3e0;\n  color: #e65100;\n  border-color: #ffcc02;\n}\n.section-tab.section-vespertina.active[_ngcontent-%COMP%] {\n  background-color: #1976d2;\n  color: #fff;\n  border-color: #0d47a1;\n}\n.section-tab.section-vespertina[_ngcontent-%COMP%]:not(.active):hover {\n  background-color: #e3f2fd;\n  color: #0d47a1;\n  border-color: #90caf9;\n}\n.section-tab.section-nocturna.active[_ngcontent-%COMP%] {\n  background-color: #303f9f;\n  color: #fff;\n  border-color: #1a237e;\n}\n.section-tab.section-nocturna[_ngcontent-%COMP%]:not(.active):hover {\n  background-color: #e8eaf6;\n  color: #1a237e;\n  border-color: #9fa8da;\n}\n.section-alert[_ngcontent-%COMP%] {\n  border-radius: 10px;\n  font-weight: 500;\n}\n.section-matutina-bg[_ngcontent-%COMP%] {\n  background-color: #fff3e0;\n  color: #e65100;\n}\n.section-vespertina-bg[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  color: #0d47a1;\n}\n.section-nocturna-bg[_ngcontent-%COMP%] {\n  background-color: #e8eaf6;\n  color: #1a237e;\n}\n/*# sourceMappingURL=teacher-availability.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeacherAvailabilityComponent, [{
    type: Component,
    args: [{ selector: "app-teacher-availability", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="container-fluid">\r
  <!-- Header -->\r
  <div class="mb-4">\r
    <div class="d-flex align-items-center gap-3">\r
      <div class="header-icon">\r
        <i class="bi bi-calendar2-week"></i>\r
      </div>\r
      <div>\r
        <h3 class="fw-bold text-dark mb-0">Disponibilidad Horaria</h3>\r
        <p class="text-muted mb-0">Selecciona los bloques horarios en los que est\xE1s disponible para refuerzos acad\xE9micos\r
        </p>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Error Alert -->\r
  @if (errorMessage) {\r
  <div class="alert alert-danger alert-dismissible fade show" role="alert">\r
    <i class="bi bi-exclamation-triangle-fill me-2"></i>\r
    {{ errorMessage }}\r
    <button type="button" class="btn-close" (click)="errorMessage = null"></button>\r
  </div>\r
  }\r
\r
  <!-- Success Alert -->\r
  @if (successMessage) {\r
  <div class="alert alert-success alert-dismissible fade show" role="alert">\r
    <i class="bi bi-check-circle-fill me-2"></i>\r
    {{ successMessage }}\r
    <button type="button" class="btn-close" (click)="successMessage = null"></button>\r
  </div>\r
  }\r
\r
  <!-- Loading State -->\r
  @if (loading) {\r
  <div class="card border-0 shadow-sm">\r
    <div class="card-body text-center py-5">\r
      <div class="spinner-border text-success mb-3" role="status"></div>\r
      <p class="text-muted mb-0">Cargando disponibilidad...</p>\r
    </div>\r
  </div>\r
  }\r
\r
  @if (!loading) {\r
  <!-- Section Tabs -->\r
  <ul class="nav nav-pills mb-4 gap-2">\r
    @for (section of sections; track section.key) {\r
    <li class="nav-item">\r
      <button type="button" class="btn section-tab" [class.active]="activeSection === section.key"\r
        [ngClass]="section.colorClass" (click)="setActiveSection(section.key)">\r
        <i class="bi {{ section.icon }} me-2"></i>\r
        {{ section.label }}\r
        <span class="badge bg-white text-dark ms-2">{{ countTotalSectionSlots(section.key) }}</span>\r
      </button>\r
    </li>\r
    }\r
  </ul>\r
\r
  <!-- Section Info -->\r
  <!--\r
    @for (section of sections; track section.key) {\r
      @if (activeSection === section.key) {\r
        <div class="alert section-alert mb-4 border-0" [ngClass]="section.colorClass + '-bg'">\r
          <i class="bi {{ section.icon }} me-2"></i>\r
          <strong>Jornada {{ section.label }}</strong> \u2014 Horario: {{ section.range }}\r
        </div>\r
      }\r
    }-->\r
\r
  <!-- Availability Grid -->\r
  <div class="card border-0 shadow-sm mb-4">\r
    <div class="card-body p-4">\r
      <div class="grid-wrapper">\r
        <table class="availability-grid">\r
          <thead>\r
            <tr>\r
              <th class="time-header"></th>\r
              @for (day of days; track day.dayId) {\r
              <th class="day-header">\r
                <div class="day-header-content">\r
                  <span class="day-name">{{ day.dayName }}</span>\r
                  <span class="day-slots">{{ countSlotsInSection(day.dayId, activeSection) }} slots</span>\r
                </div>\r
              </th>\r
              }\r
            </tr>\r
          </thead>\r
          <tbody>\r
            @for (block of filteredTimeBlocks; track block.timeBlockId) {\r
            <tr>\r
              <td class="time-cell">\r
                <span class="time-start">{{ block.startTime }}</span>\r
                <span class="time-end">{{ block.endTime }}</span>\r
              </td>\r
              @for (day of days; track day.dayId) {\r
              <td class="slot-cell" [class.available]="getStatus(day.dayId, block.timeBlockId) === 'available'"\r
                [class.conflict]="getStatus(day.dayId, block.timeBlockId) === 'conflict'"\r
                [class.empty]="getStatus(day.dayId, block.timeBlockId) === 'empty'"\r
                [class.scheduled]="getStatus(day.dayId, block.timeBlockId) === 'scheduled'"\r
                [title]="getScheduleTooltip(day.dayId, block.timeBlockId)"\r
                (click)="toggleSlot(day.dayId, block.timeBlockId)">\r
                @if (getStatus(day.dayId, block.timeBlockId) === 'available') {\r
                <i class="bi bi-check-lg slot-icon"></i>\r
                }\r
                @if (getStatus(day.dayId, block.timeBlockId) === 'conflict') {\r
                <i class="bi bi-x-lg slot-icon"></i>\r
                }\r
                @if (getStatus(day.dayId, block.timeBlockId) === 'scheduled') {\r
                <span class="scheduled-label">{{ getScheduleInfo(day.dayId, block.timeBlockId)?.subjectName }}</span>\r
                }\r
              </td>\r
              }\r
            </tr>\r
            }\r
          </tbody>\r
        </table>\r
      </div>\r
\r
      <!-- Legend -->\r
      <div class="d-flex gap-4 mt-3 pt-3 border-top">\r
        <div class="d-flex align-items-center gap-2">\r
          <span class="legend-dot available"></span>\r
          <small class="text-muted">Disponible</small>\r
        </div>\r
        <div class="d-flex align-items-center gap-2">\r
          <span class="legend-dot conflict"></span>\r
          <small class="text-muted">Ocupado / Conflicto</small>\r
        </div>\r
        <div class="d-flex align-items-center gap-2">\r
          <span class="legend-dot empty"></span>\r
          <small class="text-muted">Sin seleccionar</small>\r
        </div>\r
        <div class="d-flex align-items-center gap-2">\r
          <span class="legend-dot scheduled"></span>\r
          <small class="text-muted">Clase asignada</small>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Action Buttons -->\r
  <div class="d-flex gap-2 mb-4">\r
    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#confirmSaveModal"\r
      [disabled]="saving">\r
      @if (saving) {\r
      <span class="spinner-border spinner-border-sm me-2"></span>\r
      Guardando...\r
      } @else {\r
      <i class="bi bi-check-lg me-2"></i>\r
      Guardar disponibilidad\r
      }\r
    </button>\r
    <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#confirmClearModal"\r
      [disabled]="saving">\r
      <i class="bi bi-arrow-counterclockwise me-2"></i>\r
      Limpiar todo\r
    </button>\r
    <button type="button" class="btn btn-outline-secondary" (click)="reloadGrid()" [disabled]="saving">\r
      <i class="bi bi-arrow-repeat me-2"></i>\r
      Recargar\r
    </button>\r
  </div>\r
  }\r
\r
</div>\r
\r
<!-- Modal: Confirmar Guardar -->\r
<div class="modal fade" id="confirmSaveModal" tabindex="-1" aria-labelledby="confirmSaveLabel" aria-hidden="true">\r
  <div class="modal-dialog modal-dialog-centered">\r
    <div class="modal-content border-0 shadow">\r
      <div class="modal-header border-0 pb-0">\r
        <div class="d-flex align-items-center gap-3">\r
          <div class="rounded-circle bg-success-subtle text-success d-flex align-items-center justify-content-center"\r
            style="width: 48px; height: 48px; font-size: 1.3rem;">\r
            <i class="bi bi-check-lg"></i>\r
          </div>\r
          <h5 class="modal-title fw-bold" id="confirmSaveLabel">Confirmar guardado</h5>\r
        </div>\r
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>\r
      </div>\r
      <div class="modal-body pt-2">\r
        <p class="text-muted mb-0">\r
          \xBFEst\xE1s seguro de que deseas guardar tu disponibilidad horaria? Los bloques seleccionados ser\xE1n enviados al\r
          sistema.\r
        </p>\r
      </div>\r
      <div class="modal-footer border-0">\r
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>\r
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" (click)="onSave()">\r
          <i class="bi bi-check-lg me-1"></i> S\xED, guardar\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- Modal: Confirmar Limpiar -->\r
<div class="modal fade" id="confirmClearModal" tabindex="-1" aria-labelledby="confirmClearLabel" aria-hidden="true">\r
  <div class="modal-dialog modal-dialog-centered">\r
    <div class="modal-content border-0 shadow">\r
      <div class="modal-header border-0 pb-0">\r
        <div class="d-flex align-items-center gap-3">\r
          <div class="rounded-circle bg-warning-subtle text-warning d-flex align-items-center justify-content-center"\r
            style="width: 48px; height: 48px; font-size: 1.3rem;">\r
            <i class="bi bi-exclamation-triangle"></i>\r
          </div>\r
          <h5 class="modal-title fw-bold" id="confirmClearLabel">Confirmar limpieza</h5>\r
        </div>\r
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>\r
      </div>\r
      <div class="modal-body pt-2">\r
        <p class="text-muted mb-0">\r
          \xBFEst\xE1s seguro de que deseas limpiar toda tu selecci\xF3n? Se eliminar\xE1n todos los bloques marcados como\r
          disponibles.\r
        </p>\r
      </div>\r
      <div class="modal-footer border-0">\r
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>\r
        <button type="button" class="btn btn-warning" data-bs-dismiss="modal" (click)="clearAll()">\r
          <i class="bi bi-arrow-counterclockwise me-1"></i> S\xED, limpiar\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
</div>`, styles: ['/* src/app/components/teacher/teacher-availability/teacher-availability.component.css */\n:host {\n  font-family:\n    "Inter",\n    "Segoe UI",\n    -apple-system,\n    BlinkMacSystemFont,\n    sans-serif;\n}\n.header-icon {\n  width: 48px;\n  height: 48px;\n  min-width: 48px;\n  border-radius: 14px;\n  background-color: #1B7505;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.4rem;\n  border: 1px solid #145904;\n}\n.grid-wrapper {\n  overflow-x: auto;\n}\n.availability-grid {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 6px;\n  table-layout: fixed;\n}\n.time-header {\n  width: 70px;\n}\n.time-cell {\n  width: 70px;\n  padding: 8px 4px;\n  text-align: right;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.time-start {\n  display: block;\n  font-weight: 700;\n  font-size: 0.9rem;\n  color: #333;\n}\n.time-end {\n  display: block;\n  font-size: 0.75rem;\n  color: #999;\n}\n.day-header {\n  text-align: center;\n  padding: 0;\n}\n.day-header-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background-color: #1B7505;\n  color: #fff;\n  border-radius: 8px;\n  padding: 10px 8px;\n  min-height: 56px;\n  border: 1px solid #145904;\n}\n.day-name {\n  font-weight: 700;\n  font-size: 0.95rem;\n}\n.day-slots {\n  font-size: 0.75rem;\n  opacity: 0.85;\n}\n.slot-cell {\n  text-align: center;\n  vertical-align: middle;\n  border-radius: 8px;\n  height: 44px;\n  cursor: pointer;\n  transition: all 0.15s ease-in-out;\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n}\n.slot-cell.empty {\n  background-color: #f5f5f5;\n  border: 1px solid #e0e0e0;\n}\n.slot-cell.empty:hover {\n  background-color: #e8f5e9;\n  border-color: #1B7505;\n  box-shadow: 0 0 0 2px rgba(27, 117, 5, 0.2);\n}\n.slot-cell.available {\n  background-color: #1B7505;\n  color: #fff;\n  border: 1px solid #145904;\n}\n.slot-cell.available:hover {\n  background-color: #145904;\n}\n.slot-cell.conflict {\n  background-color: #9c27b0;\n  color: #fff;\n  cursor: not-allowed;\n  border: 1px solid #7b1fa2;\n}\n.slot-cell.scheduled {\n  background-color: #263238;\n  color: #fff;\n  cursor: not-allowed;\n  font-size: 0.7rem;\n  border: 1px solid #1a2327;\n}\n.slot-cell.scheduled:hover {\n  background-color: #1a2327;\n}\n.scheduled-label {\n  display: block;\n  font-weight: 600;\n  font-size: 0.65rem;\n  line-height: 1.2;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  padding: 0 4px;\n}\n.slot-icon {\n  font-size: 1.1rem;\n  font-weight: 700;\n}\n.legend-dot {\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  border-radius: 4px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n}\n.legend-dot.available {\n  background-color: #1B7505;\n  border-color: #145904;\n}\n.legend-dot.conflict {\n  background-color: #9c27b0;\n  border-color: #7b1fa2;\n}\n.legend-dot.empty {\n  background-color: #f5f5f5;\n  border: 1px solid #ced4da;\n}\n.legend-dot.scheduled {\n  background-color: #263238;\n  border-color: #1a2327;\n}\n.section-tab {\n  border-radius: 10px;\n  padding: 10px 20px;\n  font-weight: 600;\n  font-size: 0.9rem;\n  border: 2px solid #e0e0e0;\n  color: #555;\n  background-color: #f5f5f5;\n  transition: all 0.2s ease;\n}\n.section-tab:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.section-tab.section-matutina.active {\n  background-color: #ff9800;\n  color: #fff;\n  border-color: #e65100;\n}\n.section-tab.section-matutina:not(.active):hover {\n  background-color: #fff3e0;\n  color: #e65100;\n  border-color: #ffcc02;\n}\n.section-tab.section-vespertina.active {\n  background-color: #1976d2;\n  color: #fff;\n  border-color: #0d47a1;\n}\n.section-tab.section-vespertina:not(.active):hover {\n  background-color: #e3f2fd;\n  color: #0d47a1;\n  border-color: #90caf9;\n}\n.section-tab.section-nocturna.active {\n  background-color: #303f9f;\n  color: #fff;\n  border-color: #1a237e;\n}\n.section-tab.section-nocturna:not(.active):hover {\n  background-color: #e8eaf6;\n  color: #1a237e;\n  border-color: #9fa8da;\n}\n.section-alert {\n  border-radius: 10px;\n  font-weight: 500;\n}\n.section-matutina-bg {\n  background-color: #fff3e0;\n  color: #e65100;\n}\n.section-vespertina-bg {\n  background-color: #e3f2fd;\n  color: #0d47a1;\n}\n.section-nocturna-bg {\n  background-color: #e8eaf6;\n  color: #1a237e;\n}\n/*# sourceMappingURL=teacher-availability.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeacherAvailabilityComponent, { className: "TeacherAvailabilityComponent", filePath: "app/components/teacher/teacher-availability/teacher-availability.component.ts", lineNumber: 25 });
})();
export {
  TeacherAvailabilityComponent
};
//# sourceMappingURL=chunk-HXDUFNWR.js.map
