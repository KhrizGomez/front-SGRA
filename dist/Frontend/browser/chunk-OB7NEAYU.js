import {
  TeacherRequestsService
} from "./chunk-MDNOZLIJ.js";
import {
  TeacherSessionsService
} from "./chunk-OBGJFG5D.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-RREETWSH.js";
import "./chunk-K6SHIZGP.js";
import {
  ChangeDetectorRef,
  CommonModule,
  Component,
  DatePipe,
  NgClass,
  __spreadValues,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-OENL2SFL.js";

// src/app/components/teacher/teacher-requests/teacher-requests.component.ts
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.requestId;
var _forTrack2 = ($index, $item) => $item.name;
function TeacherRequestsComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "i", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "button", 27);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_10_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.errorMsg = null);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.errorMsg, " ");
  }
}
function TeacherRequestsComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "i", 28);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "button", 27);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_11_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.successMsg = null);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.successMsg, " ");
  }
}
function TeacherRequestsComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 29)(2, "div")(3, "div", 30);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 31);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 32);
    \u0275\u0275element(8, "i", 33);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const chip_r4 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(chip_r4.label);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", chip_r4.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(chip_r4.value);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background-color", chip_r4.bg);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", chip_r4.color);
    \u0275\u0275property("ngClass", chip_r4.icon);
  }
}
function TeacherRequestsComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275element(1, "div", 34);
    \u0275\u0275elementStart(2, "p", 35);
    \u0275\u0275text(3, "Cargando solicitudes...");
    \u0275\u0275elementEnd()();
  }
}
function TeacherRequestsComponent_Conditional_42_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 46);
    \u0275\u0275element(2, "i", 47);
    \u0275\u0275text(3, " Sin solicitudes para mostrar. ");
    \u0275\u0275elementEnd()();
  }
}
function TeacherRequestsComponent_Conditional_42_For_23_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 57);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_42_For_23_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const r_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openAccept(r_r7));
    });
    \u0275\u0275element(1, "i", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 59);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_42_For_23_Conditional_21_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r8);
      const r_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openReject(r_r7));
    });
    \u0275\u0275element(3, "i", 60);
    \u0275\u0275elementEnd();
  }
}
function TeacherRequestsComponent_Conditional_42_For_23_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 61);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_42_For_23_Conditional_22_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const r_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openReschedule(r_r7));
    });
    \u0275\u0275element(1, "i", 62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 63);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_42_For_23_Conditional_22_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r9);
      const r_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openCancel(r_r7));
    });
    \u0275\u0275element(3, "i", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 65);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_42_For_23_Conditional_22_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r9);
      const r_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openVirtualLink(r_r7));
    });
    \u0275\u0275element(5, "i", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 67);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_42_For_23_Conditional_22_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r9);
      const r_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openPerformed(r_r7));
    });
    \u0275\u0275element(7, "i", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 69);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_42_For_23_Conditional_22_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r9);
      const r_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openAttendance(r_r7));
    });
    \u0275\u0275element(9, "i", 70);
    \u0275\u0275elementEnd();
  }
}
function TeacherRequestsComponent_Conditional_42_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 48);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_42_For_23_Template_tr_click_0_listener() {
      const r_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openDetail(r_r7));
    });
    \u0275\u0275elementStart(1, "td", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td")(8, "span", 50);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td", 51);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 52);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td")(16, "span", 53);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td", 54);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_42_For_23_Template_td_click_18_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(19, "button", 55);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_42_For_23_Template_button_click_19_listener() {
      const r_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openDetail(r_r7));
    });
    \u0275\u0275element(20, "i", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(21, TeacherRequestsComponent_Conditional_42_For_23_Conditional_21_Template, 4, 0);
    \u0275\u0275conditionalCreate(22, TeacherRequestsComponent_Conditional_42_For_23_Conditional_22_Template, 10, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", r_r7.requestId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r7.studentName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r7.subjectName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r7.sessionType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r7.reason);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 10, r_r7.createdAt, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r1.statusBadge(r_r7.statusId));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r7.statusName);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(r_r7.statusId === 1 ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(r_r7.statusId === 2 ? 22 : -1);
  }
}
function TeacherRequestsComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36)(1, "table", 37)(2, "thead", 38)(3, "tr")(4, "th");
    \u0275\u0275text(5, "ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "ESTUDIANTE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "ASIGNATURA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "TIPO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "MOTIVO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "FECHA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "ESTADO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 39);
    \u0275\u0275text(19, "ACCIONES");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "tbody");
    \u0275\u0275conditionalCreate(21, TeacherRequestsComponent_Conditional_42_Conditional_21_Template, 4, 0, "tr");
    \u0275\u0275repeaterCreate(22, TeacherRequestsComponent_Conditional_42_For_23_Template, 23, 13, "tr", 40, _forTrack1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 41)(25, "div", 30);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 42)(28, "button", 43);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_42_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goTo(ctx_r1.page - 1));
    });
    \u0275\u0275element(29, "i", 44);
    \u0275\u0275text(30, " Anterior ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "button", 43);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_42_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goTo(ctx_r1.page + 1));
    });
    \u0275\u0275text(32, " Siguiente ");
    \u0275\u0275element(33, "i", 45);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(21);
    \u0275\u0275conditional(ctx_r1.rows.length === 0 ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.rows);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate3("P\xE1gina ", ctx_r1.page, " de ", ctx_r1.totalPages, " \xB7 Total: ", ctx_r1.totalCount);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.page <= 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.page >= ctx_r1.totalPages);
  }
}
function TeacherRequestsComponent_Conditional_43_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 85);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_43_Conditional_47_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openReject(ctx_r1.selected));
    });
    \u0275\u0275element(1, "i", 86);
    \u0275\u0275text(2, "Rechazar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 87);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_43_Conditional_47_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openAccept(ctx_r1.selected));
    });
    \u0275\u0275element(4, "i", 88);
    \u0275\u0275text(5, "Aceptar");
    \u0275\u0275elementEnd();
  }
}
function TeacherRequestsComponent_Conditional_43_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 89);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_43_Conditional_48_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openCancel(ctx_r1.selected));
    });
    \u0275\u0275element(1, "i", 90);
    \u0275\u0275text(2, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 91);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_43_Conditional_48_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openReschedule(ctx_r1.selected));
    });
    \u0275\u0275element(4, "i", 92);
    \u0275\u0275text(5, "Reprogramar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 93);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_43_Conditional_48_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openVirtualLink(ctx_r1.selected));
    });
    \u0275\u0275element(7, "i", 94);
    \u0275\u0275text(8, "Enlace virtual");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 95);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_43_Conditional_48_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openPerformed(ctx_r1.selected));
    });
    \u0275\u0275element(10, "i", 96);
    \u0275\u0275text(11, "Resultado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 97);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_43_Conditional_48_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openAttendance(ctx_r1.selected));
    });
    \u0275\u0275element(13, "i", 98);
    \u0275\u0275text(14, "Asistencia");
    \u0275\u0275elementEnd();
  }
}
function TeacherRequestsComponent_Conditional_43_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 99);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_43_Conditional_49_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(1, "Cerrar");
    \u0275\u0275elementEnd();
  }
}
function TeacherRequestsComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 71)(2, "div", 72)(3, "div", 73)(4, "h5", 74);
    \u0275\u0275element(5, "i", 75);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 76);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_43_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 77)(9, "div", 78)(10, "div", 79)(11, "span", 80);
    \u0275\u0275text(12, "Estudiante");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "strong", 81);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 79)(16, "span", 80);
    \u0275\u0275text(17, "Asignatura");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "strong", 81);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 79)(21, "span", 80);
    \u0275\u0275text(22, "Tipo de sesi\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "strong", 81);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 79)(26, "span", 80);
    \u0275\u0275text(27, "Participantes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "strong", 81);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 82)(31, "span", 80);
    \u0275\u0275text(32, "Motivo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "strong", 81);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 79)(36, "span", 80);
    \u0275\u0275text(37, "Fecha solicitud");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "strong", 81);
    \u0275\u0275text(39);
    \u0275\u0275pipe(40, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 79)(42, "span", 80);
    \u0275\u0275text(43, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span", 53);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(46, "div", 83);
    \u0275\u0275conditionalCreate(47, TeacherRequestsComponent_Conditional_43_Conditional_47_Template, 6, 0);
    \u0275\u0275conditionalCreate(48, TeacherRequestsComponent_Conditional_43_Conditional_48_Template, 15, 0);
    \u0275\u0275conditionalCreate(49, TeacherRequestsComponent_Conditional_43_Conditional_49_Template, 2, 0, "button", 84);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Solicitud #", ctx_r1.selected.requestId);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.selected.studentName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selected.subjectName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selected.sessionType);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selected.participantCount);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selected.reason);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(40, 12, ctx_r1.selected.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", ctx_r1.statusBadge(ctx_r1.selected.statusId));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.selected.statusName);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.selected.statusId === 1 ? 47 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selected.statusId === 2 ? 48 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selected.statusId !== 1 && ctx_r1.selected.statusId !== 2 ? 49 : -1);
  }
}
function TeacherRequestsComponent_Conditional_44_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 107)(1, "label", 108);
    \u0275\u0275text(2, "ID \xC1rea de trabajo ");
    \u0275\u0275elementStart(3, "span", 109);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "input", 121);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherRequestsComponent_Conditional_44_Conditional_46_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.scheduleForm.workAreaId, $event) || (ctx_r1.scheduleForm.workAreaId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 112);
    \u0275\u0275text(7, "Requerido para sesiones presenciales.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.scheduleForm.workAreaId);
  }
}
function TeacherRequestsComponent_Conditional_44_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 119);
  }
}
function TeacherRequestsComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 100)(2, "div", 72)(3, "div", 73)(4, "div", 2)(5, "div", 101);
    \u0275\u0275element(6, "i", 102);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h5", 103);
    \u0275\u0275text(8);
    \u0275\u0275elementStart(9, "span", 104);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "button", 105);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_44_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 77)(13, "p", 106);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 78)(16, "div", 107)(17, "label", 108);
    \u0275\u0275text(18, "Fecha programada ");
    \u0275\u0275elementStart(19, "span", 109);
    \u0275\u0275text(20, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "input", 110);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherRequestsComponent_Conditional_44_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.scheduleForm.scheduledDate, $event) || (ctx_r1.scheduleForm.scheduledDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 107)(23, "label", 108);
    \u0275\u0275text(24, "ID Franja horaria ");
    \u0275\u0275elementStart(25, "span", 109);
    \u0275\u0275text(26, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "input", 111);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherRequestsComponent_Conditional_44_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.scheduleForm.timeSlotId, $event) || (ctx_r1.scheduleForm.timeSlotId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 112);
    \u0275\u0275text(29, "Identificador del bloque horario institucional.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 107)(31, "label", 108);
    \u0275\u0275text(32, "Modalidad ");
    \u0275\u0275elementStart(33, "span", 109);
    \u0275\u0275text(34, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "select", 113);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherRequestsComponent_Conditional_44_Template_select_ngModelChange_35_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.scheduleForm.modalityId, $event) || (ctx_r1.scheduleForm.modalityId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function TeacherRequestsComponent_Conditional_44_Template_select_ngModelChange_35_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onModalityChange());
    });
    \u0275\u0275elementStart(36, "option", 18);
    \u0275\u0275text(37, "Virtual");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "option", 18);
    \u0275\u0275text(39, "Presencial");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "div", 107)(41, "label", 108);
    \u0275\u0275text(42, "Duraci\xF3n estimada ");
    \u0275\u0275elementStart(43, "span", 109);
    \u0275\u0275text(44, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "input", 114);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherRequestsComponent_Conditional_44_Template_input_ngModelChange_45_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.scheduleForm.estimatedDuration, $event) || (ctx_r1.scheduleForm.estimatedDuration = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(46, TeacherRequestsComponent_Conditional_44_Conditional_46_Template, 8, 1, "div", 107);
    \u0275\u0275elementStart(47, "div", 82)(48, "label", 108);
    \u0275\u0275text(49, "Observaci\xF3n ");
    \u0275\u0275elementStart(50, "span", 115);
    \u0275\u0275text(51, "(opcional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "textarea", 116);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherRequestsComponent_Conditional_44_Template_textarea_ngModelChange_52_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.scheduleForm.reason, $event) || (ctx_r1.scheduleForm.reason = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(53, "div", 83)(54, "button", 117);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_44_Template_button_click_54_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(55, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "button", 118);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_44_Template_button_click_56_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitSchedule());
    });
    \u0275\u0275conditionalCreate(57, TeacherRequestsComponent_Conditional_44_Conditional_57_Template, 1, 0, "span", 119);
    \u0275\u0275element(58, "i", 120);
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r1.activeModal === "accept" ? "Aceptar solicitud" : "Reprogramar sesi\xF3n", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", ctx_r1.selected.requestId);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.busy);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.activeModal === "accept" ? "Define fecha, franja horaria, modalidad y duraci\xF3n para programar la sesi\xF3n de refuerzo." : "Actualiza los datos de programaci\xF3n. Solo disponible para solicitudes Aceptadas.", " ");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.scheduleForm.scheduledDate);
    \u0275\u0275property("min", ctx_r1.todayStr);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.scheduleForm.timeSlotId);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.scheduleForm.modalityId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 2);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.scheduleForm.estimatedDuration);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.scheduleForm.modalityId === 2 ? 46 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.scheduleForm.reason);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.busy);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.busy || !ctx_r1.scheduleFormValid());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.busy ? 57 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.activeModal === "accept" ? "Aceptar y programar" : "Confirmar reprogramaci\xF3n", " ");
  }
}
function TeacherRequestsComponent_Conditional_45_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 119);
  }
}
function TeacherRequestsComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 71)(2, "div", 72)(3, "div", 73)(4, "div", 2)(5, "div", 122);
    \u0275\u0275element(6, "i", 60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h5", 103);
    \u0275\u0275text(8, "Rechazar solicitud ");
    \u0275\u0275elementStart(9, "span", 104);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "button", 105);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_45_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 77)(13, "p", 106);
    \u0275\u0275text(14, "Puedes registrar un motivo de rechazo (opcional).");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "label", 108);
    \u0275\u0275text(16, "Motivo ");
    \u0275\u0275elementStart(17, "span", 115);
    \u0275\u0275text(18, "(opcional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "textarea", 123);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherRequestsComponent_Conditional_45_Template_textarea_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.reasonText, $event) || (ctx_r1.reasonText = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 83)(21, "button", 117);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_45_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(22, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 124);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_45_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitReject());
    });
    \u0275\u0275conditionalCreate(24, TeacherRequestsComponent_Conditional_45_Conditional_24_Template, 1, 0, "span", 119);
    \u0275\u0275element(25, "i", 86);
    \u0275\u0275text(26, "Confirmar rechazo ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("#", ctx_r1.selected.requestId);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.busy);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.reasonText);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.busy);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.busy);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.busy ? 24 : -1);
  }
}
function TeacherRequestsComponent_Conditional_46_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 119);
  }
}
function TeacherRequestsComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 71)(2, "div", 72)(3, "div", 73)(4, "div", 2)(5, "div", 122);
    \u0275\u0275element(6, "i", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h5", 103);
    \u0275\u0275text(8, "Cancelar sesi\xF3n ");
    \u0275\u0275elementStart(9, "span", 104);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "button", 105);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_46_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 77)(13, "p", 106);
    \u0275\u0275text(14, " Esta acci\xF3n cancelar\xE1 la sesi\xF3n programada. Puedes registrar un motivo (opcional). ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "label", 108);
    \u0275\u0275text(16, "Motivo ");
    \u0275\u0275elementStart(17, "span", 115);
    \u0275\u0275text(18, "(opcional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "textarea", 125);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherRequestsComponent_Conditional_46_Template_textarea_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.reasonText, $event) || (ctx_r1.reasonText = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 83)(21, "button", 117);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_46_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(22, "No cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 124);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_46_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitCancel());
    });
    \u0275\u0275conditionalCreate(24, TeacherRequestsComponent_Conditional_46_Conditional_24_Template, 1, 0, "span", 119);
    \u0275\u0275element(25, "i", 90);
    \u0275\u0275text(26, "S\xED, cancelar sesi\xF3n ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("#", ctx_r1.selected.requestId);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.busy);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.reasonText);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.busy);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.busy);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.busy ? 24 : -1);
  }
}
function TeacherRequestsComponent_Conditional_47_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 128);
    \u0275\u0275element(1, "i", 131);
    \u0275\u0275text(2, "Ingresa una URL v\xE1lida (debe comenzar con https://). ");
    \u0275\u0275elementEnd();
  }
}
function TeacherRequestsComponent_Conditional_47_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 119);
  }
}
function TeacherRequestsComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 71)(2, "div", 72)(3, "div", 73)(4, "div", 2)(5, "div", 126);
    \u0275\u0275element(6, "i", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h5", 103);
    \u0275\u0275text(8, "Enlace virtual ");
    \u0275\u0275elementStart(9, "span", 104);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "button", 105);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_47_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 77)(13, "p", 106);
    \u0275\u0275text(14, "Registra o actualiza el enlace de la reuni\xF3n virtual para esta sesi\xF3n.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "label", 108);
    \u0275\u0275text(16, "URL de la reuni\xF3n ");
    \u0275\u0275elementStart(17, "span", 109);
    \u0275\u0275text(18, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "input", 127);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherRequestsComponent_Conditional_47_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.virtualLinkUrl, $event) || (ctx_r1.virtualLinkUrl = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(20, TeacherRequestsComponent_Conditional_47_Conditional_20_Template, 3, 0, "div", 128);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 83)(22, "button", 117);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_47_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(23, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 129);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_47_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitVirtualLink());
    });
    \u0275\u0275conditionalCreate(25, TeacherRequestsComponent_Conditional_47_Conditional_25_Template, 1, 0, "span", 119);
    \u0275\u0275element(26, "i", 130);
    \u0275\u0275text(27, "Guardar enlace ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("#", ctx_r1.selected.requestId);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.busy);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.virtualLinkUrl);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.virtualLinkUrl && !ctx_r1.isValidUrl(ctx_r1.virtualLinkUrl) ? 20 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.busy);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.busy || !ctx_r1.virtualLinkUrl || !ctx_r1.isValidUrl(ctx_r1.virtualLinkUrl));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.busy ? 25 : -1);
  }
}
function TeacherRequestsComponent_Conditional_48_For_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 139)(1, "div", 141)(2, "input", 142);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherRequestsComponent_Conditional_48_For_29_Template_input_ngModelChange_2_listener($event) {
      const entry_r21 = \u0275\u0275restoreView(_r20).$implicit;
      \u0275\u0275twoWayBindingSet(entry_r21.participantId, $event) || (entry_r21.participantId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "div", 141)(4, "div", 143)(5, "input", 144);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherRequestsComponent_Conditional_48_For_29_Template_input_ngModelChange_5_listener($event) {
      const entry_r21 = \u0275\u0275restoreView(_r20).$implicit;
      \u0275\u0275twoWayBindingSet(entry_r21.attended, $event) || (entry_r21.attended = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "label", 145);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 146)(9, "button", 147);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_48_For_29_Template_button_click_9_listener() {
      const \u0275$index_670_r22 = \u0275\u0275restoreView(_r20).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeAttendanceRow(\u0275$index_670_r22));
    });
    \u0275\u0275element(10, "i", 148);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const entry_r21 = ctx.$implicit;
    const \u0275$index_670_r22 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", entry_r21.participantId);
    \u0275\u0275advance(3);
    \u0275\u0275property("id", "att-" + \u0275$index_670_r22);
    \u0275\u0275twoWayProperty("ngModel", entry_r21.attended);
    \u0275\u0275advance();
    \u0275\u0275property("for", "att-" + \u0275$index_670_r22);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(entry_r21.attended ? "Asisti\xF3" : "No asisti\xF3");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.attendanceList.length === 1);
  }
}
function TeacherRequestsComponent_Conditional_48_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 119);
  }
}
function TeacherRequestsComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 100)(2, "div", 72)(3, "div", 73)(4, "div", 2)(5, "div", 132);
    \u0275\u0275element(6, "i", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h5", 103);
    \u0275\u0275text(8, "Marcar asistencia ");
    \u0275\u0275elementStart(9, "span", 104);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "button", 105);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_48_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 77)(13, "div", 133)(14, "div", 107)(15, "label", 108);
    \u0275\u0275text(16, "ID Sesi\xF3n realizada (performedId) ");
    \u0275\u0275elementStart(17, "span", 109);
    \u0275\u0275text(18, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "input", 134);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherRequestsComponent_Conditional_48_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.attendancePerformedId, $event) || (ctx_r1.attendancePerformedId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 112);
    \u0275\u0275text(21, "Obtenido al registrar el resultado de la sesi\xF3n.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 135)(23, "label", 136);
    \u0275\u0275text(24, "Participantes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 137);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_48_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addAttendanceRow());
    });
    \u0275\u0275element(26, "i", 138);
    \u0275\u0275text(27, "Agregar fila ");
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(28, TeacherRequestsComponent_Conditional_48_For_29_Template, 11, 6, "div", 139, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 83)(31, "button", 117);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_48_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(32, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 140);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_48_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitAttendance());
    });
    \u0275\u0275conditionalCreate(34, TeacherRequestsComponent_Conditional_48_Conditional_34_Template, 1, 0, "span", 119);
    \u0275\u0275element(35, "i", 98);
    \u0275\u0275text(36, "Registrar asistencia ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("#", ctx_r1.selected.requestId);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.busy);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.attendancePerformedId);
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r1.attendanceList);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.busy);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.busy || !ctx_r1.attendancePerformedId || ctx_r1.attendanceList.length === 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.busy ? 34 : -1);
  }
}
function TeacherRequestsComponent_Conditional_49_Conditional_32_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 153);
    \u0275\u0275element(1, "i", 154);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r24 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r24.name);
  }
}
function TeacherRequestsComponent_Conditional_49_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 152);
    \u0275\u0275repeaterCreate(1, TeacherRequestsComponent_Conditional_49_Conditional_32_For_2_Template, 3, 1, "li", 153, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.performedFiles);
  }
}
function TeacherRequestsComponent_Conditional_49_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 119);
  }
}
function TeacherRequestsComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 100)(2, "div", 72)(3, "div", 73)(4, "div", 2)(5, "div", 101);
    \u0275\u0275element(6, "i", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h5", 103);
    \u0275\u0275text(8, "Registrar resultado ");
    \u0275\u0275elementStart(9, "span", 104);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "button", 105);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_49_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 77)(13, "div", 78)(14, "div", 82)(15, "label", 108);
    \u0275\u0275text(16, "Observaciones / Resultado ");
    \u0275\u0275elementStart(17, "span", 109);
    \u0275\u0275text(18, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "textarea", 149);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherRequestsComponent_Conditional_49_Template_textarea_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.performedObservation, $event) || (ctx_r1.performedObservation = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 107)(21, "label", 108);
    \u0275\u0275text(22, "Duraci\xF3n real ");
    \u0275\u0275elementStart(23, "span", 109);
    \u0275\u0275text(24, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "input", 150);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherRequestsComponent_Conditional_49_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.performedDuration, $event) || (ctx_r1.performedDuration = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 82)(27, "label", 108);
    \u0275\u0275text(28, "Recursos adjuntos ");
    \u0275\u0275elementStart(29, "span", 115);
    \u0275\u0275text(30, "(opcional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "input", 151);
    \u0275\u0275listener("change", function TeacherRequestsComponent_Conditional_49_Template_input_change_31_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFilesSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(32, TeacherRequestsComponent_Conditional_49_Conditional_32_Template, 3, 0, "ul", 152);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "div", 83)(34, "button", 117);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_49_Template_button_click_34_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(35, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "button", 118);
    \u0275\u0275listener("click", function TeacherRequestsComponent_Conditional_49_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitPerformed());
    });
    \u0275\u0275conditionalCreate(37, TeacherRequestsComponent_Conditional_49_Conditional_37_Template, 1, 0, "span", 119);
    \u0275\u0275element(38, "i", 96);
    \u0275\u0275text(39, "Registrar resultado ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("#", ctx_r1.selected.requestId);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.busy);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.performedObservation);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.performedDuration);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r1.performedFiles.length > 0 ? 32 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.busy);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.busy || !ctx_r1.performedObservation.trim() || !ctx_r1.performedDuration.trim());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.busy ? 37 : -1);
  }
}
var STATUS_ID = { PENDING: 1, ACCEPTED: 2, REJECTED: 3, CANCELLED: 4, COMPLETED: 5 };
var MODALITY = { VIRTUAL: 1, PRESENCIAL: 2 };
var STATUS_META = {
  1: { badge: "bg-warning text-dark" },
  2: { badge: "bg-success" },
  3: { badge: "bg-danger" },
  4: { badge: "bg-secondary" },
  5: { badge: "bg-primary" }
};
var TeacherRequestsComponent = class _TeacherRequestsComponent {
  reqSvc = inject(TeacherRequestsService);
  sessSvc = inject(TeacherSessionsService);
  cdr = inject(ChangeDetectorRef);
  loading = false;
  busy = false;
  errorMsg = null;
  successMsg = null;
  rows = [];
  totalCount = 0;
  page = 1;
  size = 10;
  totalPages = 1;
  filters = { statusId: null };
  summaryChips = [
    { label: "Pendientes", value: 0, icon: "bi-clock-history", color: "#ed6c02", bg: "#fff3e0" },
    { label: "Aceptadas", value: 0, icon: "bi-check-circle", color: "#1B7505", bg: "#e8f5e9" },
    { label: "Rechazadas", value: 0, icon: "bi-x-circle", color: "#d32f2f", bg: "#ffebee" }
  ];
  // Modal
  activeModal = "none";
  selected = null;
  // Accept/Reschedule form
  scheduleForm = { scheduledDate: "", timeSlotId: 0, modalityId: 1, estimatedDuration: "", reason: "", workAreaId: void 0 };
  todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  // Reject/Cancel
  reasonText = "";
  // Virtual link
  virtualLinkUrl = "";
  // Attendance
  attendancePerformedId = null;
  attendanceList = [{ participantId: 0, attended: true }];
  // Performed
  performedObservation = "";
  performedDuration = "";
  performedFiles = [];
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this.errorMsg = null;
    this.reqSvc.getRequests({ statusId: this.filters.statusId, page: this.page, size: this.size }).subscribe({
      next: (d) => {
        this.rows = d.items ?? [];
        this.totalCount = d.totalCount;
        this.totalPages = d.totalPages ?? Math.max(1, Math.ceil(d.totalCount / this.size));
        this.page = d.page;
        this.updateChips();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err?.message || "Error al cargar solicitudes";
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  clearFilters() {
    this.filters = { statusId: null };
    this.page = 1;
    this.load();
  }
  goTo(p) {
    this.page = p;
    this.load();
  }
  updateChips() {
    if (this.filters.statusId === null) {
      const m = /* @__PURE__ */ new Map();
      this.rows.forEach((r) => m.set(r.statusId, (m.get(r.statusId) ?? 0) + 1));
      this.summaryChips[0].value = m.get(STATUS_ID.PENDING) ?? 0;
      this.summaryChips[1].value = m.get(STATUS_ID.ACCEPTED) ?? 0;
      this.summaryChips[2].value = m.get(STATUS_ID.REJECTED) ?? 0;
    }
  }
  openDetail(r) {
    this.selected = r;
    this.activeModal = "detail";
  }
  openReject(r) {
    this.selected = r;
    this.reasonText = "";
    this.activeModal = "reject";
  }
  openCancel(r) {
    this.selected = r;
    this.reasonText = "";
    this.activeModal = "cancel";
  }
  openVirtualLink(r) {
    this.selected = r;
    this.virtualLinkUrl = "";
    this.activeModal = "virtualLink";
  }
  openAccept(r) {
    this.selected = r;
    this.scheduleForm = { scheduledDate: "", timeSlotId: 0, modalityId: 1, estimatedDuration: "", reason: "", workAreaId: void 0 };
    this.activeModal = "accept";
  }
  openReschedule(r) {
    this.selected = r;
    this.scheduleForm = { scheduledDate: "", timeSlotId: 0, modalityId: 1, estimatedDuration: "", reason: "", workAreaId: void 0 };
    this.activeModal = "reschedule";
  }
  openAttendance(r) {
    this.selected = r;
    this.attendancePerformedId = null;
    this.attendanceList = Array.from({ length: r.participantCount || 1 }, () => ({ participantId: 0, attended: true }));
    this.activeModal = "attendance";
  }
  openPerformed(r) {
    this.selected = r;
    this.performedObservation = "";
    this.performedDuration = "";
    this.performedFiles = [];
    this.activeModal = "performed";
  }
  closeModal() {
    this.activeModal = "none";
    this.selected = null;
  }
  onModalityChange() {
    if (this.scheduleForm.modalityId !== MODALITY.PRESENCIAL) {
      this.scheduleForm.workAreaId = void 0;
    }
  }
  scheduleFormValid() {
    const f = this.scheduleForm;
    const base = !!f.scheduledDate && f.timeSlotId > 0 && f.modalityId > 0 && !!f.estimatedDuration.trim();
    const pres = f.modalityId !== MODALITY.PRESENCIAL || !!f.workAreaId && f.workAreaId > 0;
    return base && pres;
  }
  isValidUrl(url) {
    try {
      return new URL(url).protocol.startsWith("https");
    } catch {
      return false;
    }
  }
  addAttendanceRow() {
    this.attendanceList.push({ participantId: 0, attended: true });
  }
  removeAttendanceRow(i) {
    this.attendanceList.splice(i, 1);
  }
  onFilesSelected(ev) {
    const inp = ev.target;
    this.performedFiles = inp.files ? Array.from(inp.files) : [];
  }
  // Submit: Accept/Reschedule (RF10, RF11)
  submitSchedule() {
    if (!this.selected)
      return;
    this.busy = true;
    const id = this.selected.requestId;
    const obs = this.activeModal === "accept" ? this.reqSvc.acceptRequest(id, __spreadValues({}, this.scheduleForm)) : this.reqSvc.rescheduleRequest(id, __spreadValues({}, this.scheduleForm));
    const label = this.activeModal === "accept" ? "aceptada y programada" : "reprogramada";
    obs.subscribe({
      next: (res) => {
        this.busy = false;
        this.showSuccess(`Solicitud #${id} ${label}. ${res.message}`);
        this.closeModal();
        this.load();
      },
      error: (err) => {
        this.busy = false;
        this.errorMsg = err?.message;
        this.cdr.detectChanges();
      }
    });
  }
  // Submit: Reject (RF10)
  submitReject() {
    if (!this.selected)
      return;
    this.busy = true;
    this.reqSvc.rejectRequest(this.selected.requestId, { reason: this.reasonText || void 0 }).subscribe({
      next: (res) => {
        this.busy = false;
        this.showSuccess(`Solicitud rechazada. ${res.message}`);
        this.closeModal();
        this.load();
      },
      error: (err) => {
        this.busy = false;
        this.errorMsg = err?.message;
        this.cdr.detectChanges();
      }
    });
  }
  // Submit: Cancel (RF15)
  submitCancel() {
    if (!this.selected)
      return;
    this.busy = true;
    this.reqSvc.cancelRequest(this.selected.requestId, { reason: this.reasonText || void 0 }).subscribe({
      next: (res) => {
        this.busy = false;
        this.showSuccess(`Sesi\xF3n cancelada. ${res.message}`);
        this.closeModal();
        this.load();
      },
      error: (err) => {
        this.busy = false;
        this.errorMsg = err?.message;
        this.cdr.detectChanges();
      }
    });
  }
  // Submit: Virtual link (RF13)
  submitVirtualLink() {
    if (!this.selected)
      return;
    this.busy = true;
    this.sessSvc.setVirtualLink(this.selected.requestId, { url: this.virtualLinkUrl }).subscribe({
      next: (res) => {
        this.busy = false;
        this.showSuccess(`Enlace virtual registrado. ${res.message}`);
        this.closeModal();
      },
      error: (err) => {
        this.busy = false;
        this.errorMsg = err?.message;
        this.cdr.detectChanges();
      }
    });
  }
  // Submit: Attendance (RF16)
  submitAttendance() {
    if (!this.selected || !this.attendancePerformedId)
      return;
    this.busy = true;
    this.sessSvc.registerAttendance(this.selected.requestId, {
      performedId: this.attendancePerformedId,
      attendances: this.attendanceList
    }).subscribe({
      next: (res) => {
        this.busy = false;
        this.showSuccess(`Asistencia registrada. ${res.message}`);
        this.closeModal();
      },
      error: (err) => {
        this.busy = false;
        this.errorMsg = err?.message;
        this.cdr.detectChanges();
      }
    });
  }
  // Submit: Performed (RF17)
  submitPerformed() {
    if (!this.selected)
      return;
    this.busy = true;
    this.sessSvc.registerPerformed(this.selected.requestId, this.performedObservation, this.performedDuration, this.performedFiles).subscribe({
      next: (res) => {
        this.busy = false;
        this.showSuccess(`Resultado registrado. ${res.message}`);
        this.closeModal();
        this.load();
      },
      error: (err) => {
        this.busy = false;
        this.errorMsg = err?.message;
        this.cdr.detectChanges();
      }
    });
  }
  statusBadge(statusId) {
    return STATUS_META[statusId]?.badge ?? "bg-secondary";
  }
  showSuccess(msg) {
    this.successMsg = msg;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.successMsg = null;
      this.cdr.detectChanges();
    }, 6e3);
  }
  static \u0275fac = function TeacherRequestsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeacherRequestsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeacherRequestsComponent, selectors: [["app-teacher-requests"]], decls: 50, vars: 17, consts: [[1, "container-fluid"], [1, "mb-4"], [1, "d-flex", "align-items-center", "gap-3"], [1, "header-icon"], [1, "bi", "bi-inbox"], [1, "fw-bold", "text-dark", "mb-0"], [1, "text-muted", "mb-0"], ["role", "alert", 1, "alert", "alert-danger", "alert-dismissible", "fade", "show", "border"], ["role", "alert", 1, "alert", "alert-success", "alert-dismissible", "fade", "show", "border"], [1, "row", "g-2", "mb-3"], [1, "col-6", "col-lg-4"], [1, "card", "border", "shadow-sm", "mb-3"], [1, "card-body", "py-2"], [1, "row", "g-2", "align-items-end"], [1, "col-6", "col-lg-3"], [1, "form-label", "mb-1", "small", "fw-semibold"], [1, "bi", "bi-funnel", "me-1"], [1, "form-select", "border", 3, "ngModelChange", "change", "ngModel"], [3, "ngValue"], [1, "col-6", "col-lg-3", "d-flex", "gap-2", "align-items-end"], [1, "btn", "btn-outline-secondary", "border", "w-100", 3, "click"], [1, "bi", "bi-arrow-counterclockwise", "me-1"], [1, "card", "border", "shadow-sm"], [1, "card-body"], [1, "text-center", "py-5"], ["tabindex", "-1", 1, "modal", "fade", "show", "d-block", 2, "background", "rgba(0,0,0,.5)"], [1, "bi", "bi-exclamation-triangle-fill", "me-2"], ["type", "button", 1, "btn-close", 3, "click"], [1, "bi", "bi-check-circle-fill", "me-2"], [1, "chip-box", "bg-white", "shadow-sm", "rounded-3", "p-3", "d-flex", "justify-content-between", "align-items-center"], [1, "text-muted", "small"], [1, "fw-bold", "fs-4"], [1, "chip-icon", "d-flex", "align-items-center", "justify-content-center", "rounded-circle"], [1, "bi", 3, "ngClass"], ["role", "status", 1, "spinner-border", "text-success"], [1, "text-muted", "mt-2", "mb-0"], [1, "table-responsive"], [1, "table", "align-middle", "mb-0"], [1, "table-light"], [1, "text-end"], [1, "clickable-row"], [1, "d-flex", "justify-content-between", "align-items-center", "mt-3", "flex-wrap", "gap-2"], [1, "d-flex", "gap-2"], [1, "btn", "btn-outline-secondary", "btn-sm", "border", 3, "click", "disabled"], [1, "bi", "bi-chevron-left"], [1, "bi", "bi-chevron-right"], ["colspan", "8", 1, "text-center", "py-5", "text-muted"], [1, "bi", "bi-inbox", "display-4", "d-block", "mb-2", "opacity-25"], [1, "clickable-row", 3, "click"], [1, "fw-semibold", "text-muted"], [1, "badge", "bg-light", "text-dark", "border"], [1, "text-truncate", 2, "max-width", "160px"], [1, "text-nowrap"], [1, "badge", "rounded-pill", 3, "ngClass"], [1, "text-end", 3, "click"], ["title", "Ver detalle", 1, "btn", "btn-sm", "btn-outline-success", "border", "me-1", 3, "click"], [1, "bi", "bi-eye"], ["title", "Aceptar", 1, "btn", "btn-sm", "btn-success", "me-1", 3, "click"], [1, "bi", "bi-check-circle"], ["title", "Rechazar", 1, "btn", "btn-sm", "btn-outline-danger", "border", 3, "click"], [1, "bi", "bi-x-circle"], ["title", "Reprogramar", 1, "btn", "btn-sm", "btn-outline-warning", "border", "me-1", 3, "click"], [1, "bi", "bi-calendar2-event"], ["title", "Cancelar", 1, "btn", "btn-sm", "btn-outline-danger", "border", "me-1", 3, "click"], [1, "bi", "bi-slash-circle"], ["title", "Enlace virtual", 1, "btn", "btn-sm", "btn-outline-info", "border", "me-1", 3, "click"], [1, "bi", "bi-camera-video"], ["title", "Registrar resultado", 1, "btn", "btn-sm", "btn-outline-success", "border", "me-1", 3, "click"], [1, "bi", "bi-journal-check"], ["title", "Marcar asistencia", 1, "btn", "btn-sm", "btn-outline-primary", "border", 3, "click"], [1, "bi", "bi-person-check"], [1, "modal-dialog", "modal-dialog-centered"], [1, "modal-content", "border"], [1, "modal-header", "border-bottom"], [1, "modal-title", "fw-bold"], [1, "bi", "bi-file-earmark-text", "me-2"], [1, "btn-close", 3, "click"], [1, "modal-body"], [1, "row", "g-3"], [1, "col-6"], [1, "label"], [1, "d-block"], [1, "col-12"], [1, "modal-footer", "border-top"], [1, "btn", "btn-secondary"], [1, "btn", "btn-outline-danger", 3, "click"], [1, "bi", "bi-x-circle", "me-1"], [1, "btn", "btn-success", 3, "click"], [1, "bi", "bi-check-circle", "me-1"], [1, "btn", "btn-outline-danger", "me-auto", 3, "click"], [1, "bi", "bi-slash-circle", "me-1"], [1, "btn", "btn-outline-warning", 3, "click"], [1, "bi", "bi-calendar2-event", "me-1"], [1, "btn", "btn-outline-info", 3, "click"], [1, "bi", "bi-camera-video", "me-1"], [1, "btn", "btn-outline-success", 3, "click"], [1, "bi", "bi-journal-check", "me-1"], [1, "btn", "btn-outline-primary", 3, "click"], [1, "bi", "bi-person-check", "me-1"], [1, "btn", "btn-secondary", 3, "click"], [1, "modal-dialog", "modal-dialog-centered", "modal-lg"], [1, "modal-icon", "bg-success-subtle", "text-success"], [1, "bi", "bi-calendar-check"], [1, "modal-title", "fw-bold", "mb-0"], [1, "text-muted", "fw-normal", "fs-6", "ms-2"], [1, "btn-close", 3, "click", "disabled"], [1, "text-muted", "small", "mb-3"], [1, "col-md-6"], [1, "form-label", "fw-semibold", "small"], [1, "text-danger"], ["type", "date", 1, "form-control", "border", 3, "ngModelChange", "ngModel", "min"], ["type", "number", "min", "1", "placeholder", "Ej: 3", 1, "form-control", "border", 3, "ngModelChange", "ngModel"], [1, "form-text"], [1, "form-select", "border", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "HH:mm  (ej: 01:30)", 1, "form-control", "border", 3, "ngModelChange", "ngModel"], [1, "text-muted", "fw-normal"], ["rows", "2", "placeholder", "Notas adicionales o motivo de la programaci\xF3n", 1, "form-control", "border", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "btn", "btn-success", 3, "click", "disabled"], [1, "spinner-border", "spinner-border-sm", "me-2"], [1, "bi", "bi-calendar-check", "me-1"], ["type", "number", "min", "1", "placeholder", "Ej: 2", 1, "form-control", "border", 3, "ngModelChange", "ngModel"], [1, "modal-icon", "bg-danger-subtle", "text-danger"], ["rows", "3", "placeholder", "Ej: No tengo disponibilidad en ese horario", 1, "form-control", "border", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-danger", 3, "click", "disabled"], ["rows", "3", "placeholder", "Ej: El docente no puede asistir", 1, "form-control", "border", 3, "ngModelChange", "ngModel"], [1, "modal-icon", "bg-info-subtle", "text-info"], ["type", "url", "placeholder", "https://meet.google.com/...", 1, "form-control", "border", 3, "ngModelChange", "ngModel"], [1, "text-danger", "small", "mt-1"], [1, "btn", "btn-info", "text-white", 3, "click", "disabled"], [1, "bi", "bi-link-45deg", "me-1"], [1, "bi", "bi-exclamation-triangle", "me-1"], [1, "modal-icon", "bg-primary-subtle", "text-primary"], [1, "row", "g-3", "mb-3"], ["type", "number", "min", "1", "placeholder", "Ej: 12", 1, "form-control", "border", 3, "ngModelChange", "ngModel"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-2"], [1, "form-label", "fw-semibold", "small", "mb-0"], ["type", "button", 1, "btn", "btn-outline-success", "btn-sm", "border", 3, "click"], [1, "bi", "bi-plus", "me-1"], [1, "row", "g-2", "mb-2", "align-items-center"], [1, "btn", "btn-primary", 3, "click", "disabled"], [1, "col-5"], ["type", "number", "min", "1", "placeholder", "ID participante", 1, "form-control", "border", "form-control-sm", 3, "ngModelChange", "ngModel"], [1, "form-check", "mt-1"], ["type", "checkbox", 1, "form-check-input", 3, "ngModelChange", "id", "ngModel"], [1, "form-check-label", 3, "for"], [1, "col-2", "text-end"], ["type", "button", 1, "btn", "btn-outline-danger", "btn-sm", "border", 3, "click", "disabled"], [1, "bi", "bi-trash"], ["rows", "4", "placeholder", "Describe los temas abordados, resultados y cualquier observaci\xF3n relevante.", 1, "form-control", "border", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "HH:mm  (ej: 01:15)", 1, "form-control", "border", 3, "ngModelChange", "ngModel"], ["type", "file", "multiple", "", 1, "form-control", "border", 3, "change"], [1, "list-unstyled", "mt-2", "mb-0"], [1, "small", "text-muted"], [1, "bi", "bi-paperclip", "me-1"]], template: function TeacherRequestsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275element(4, "i", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div")(6, "h3", 5);
      \u0275\u0275text(7, "Solicitudes de Refuerzo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 6);
      \u0275\u0275text(9, "Revisa y gestiona las solicitudes de refuerzo acad\xE9mico recibidas");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(10, TeacherRequestsComponent_Conditional_10_Template, 4, 1, "div", 7);
      \u0275\u0275conditionalCreate(11, TeacherRequestsComponent_Conditional_11_Template, 4, 1, "div", 8);
      \u0275\u0275elementStart(12, "div", 9);
      \u0275\u0275repeaterCreate(13, TeacherRequestsComponent_For_14_Template, 9, 9, "div", 10, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 11)(16, "div", 12)(17, "div", 13)(18, "div", 14)(19, "label", 15);
      \u0275\u0275element(20, "i", 16);
      \u0275\u0275text(21, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "select", 17);
      \u0275\u0275twoWayListener("ngModelChange", function TeacherRequestsComponent_Template_select_ngModelChange_22_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filters.statusId, $event) || (ctx.filters.statusId = $event);
        return $event;
      });
      \u0275\u0275listener("change", function TeacherRequestsComponent_Template_select_change_22_listener() {
        return ctx.load();
      });
      \u0275\u0275elementStart(23, "option", 18);
      \u0275\u0275text(24, "Todos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "option", 18);
      \u0275\u0275text(26, "Pendiente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "option", 18);
      \u0275\u0275text(28, "Aceptada");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "option", 18);
      \u0275\u0275text(30, "Rechazada");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "option", 18);
      \u0275\u0275text(32, "Cancelada");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "option", 18);
      \u0275\u0275text(34, "Finalizada");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(35, "div", 19)(36, "button", 20);
      \u0275\u0275listener("click", function TeacherRequestsComponent_Template_button_click_36_listener() {
        return ctx.clearFilters();
      });
      \u0275\u0275element(37, "i", 21);
      \u0275\u0275text(38, "Limpiar ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(39, "div", 22)(40, "div", 23);
      \u0275\u0275conditionalCreate(41, TeacherRequestsComponent_Conditional_41_Template, 4, 0, "div", 24)(42, TeacherRequestsComponent_Conditional_42_Template, 34, 6);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(43, TeacherRequestsComponent_Conditional_43_Template, 50, 15, "div", 25);
      \u0275\u0275conditionalCreate(44, TeacherRequestsComponent_Conditional_44_Template, 60, 17, "div", 25);
      \u0275\u0275conditionalCreate(45, TeacherRequestsComponent_Conditional_45_Template, 27, 6, "div", 25);
      \u0275\u0275conditionalCreate(46, TeacherRequestsComponent_Conditional_46_Template, 27, 6, "div", 25);
      \u0275\u0275conditionalCreate(47, TeacherRequestsComponent_Conditional_47_Template, 28, 7, "div", 25);
      \u0275\u0275conditionalCreate(48, TeacherRequestsComponent_Conditional_48_Template, 37, 6, "div", 25);
      \u0275\u0275conditionalCreate(49, TeacherRequestsComponent_Conditional_49_Template, 40, 8, "div", 25);
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275conditional(ctx.errorMsg ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.successMsg ? 11 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.summaryChips);
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.filters.statusId);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngValue", 1);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngValue", 2);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngValue", 3);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngValue", 4);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngValue", 5);
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.loading ? 41 : 42);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.activeModal === "detail" && ctx.selected ? 43 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.activeModal === "accept" || ctx.activeModal === "reschedule") && ctx.selected ? 44 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeModal === "reject" && ctx.selected ? 45 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeModal === "cancel" && ctx.selected ? 46 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeModal === "virtualLink" && ctx.selected ? 47 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeModal === "attendance" && ctx.selected ? 48 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeModal === "performed" && ctx.selected ? 49 : -1);
    }
  }, dependencies: [CommonModule, NgClass, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, DatePipe], styles: ['\n\n[_nghost-%COMP%] {\n  font-family:\n    "Inter",\n    "Segoe UI",\n    -apple-system,\n    BlinkMacSystemFont,\n    sans-serif;\n}\n.header-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  min-width: 48px;\n  border-radius: 14px;\n  background: #1B7505;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.4rem;\n  border: 1px solid #145904;\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  min-width: 48px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.3rem;\n}\n.chip-box[_ngcontent-%COMP%] {\n  min-height: 72px;\n  border: 1px solid #e0e0e0 !important;\n}\n.chip-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  min-width: 40px;\n  font-size: 1.1rem;\n}\n.label[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-size: .8rem;\n  display: block;\n  margin-bottom: 2px;\n}\nth[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  font-size: .85rem;\n  letter-spacing: .02em;\n}\ntd[_ngcontent-%COMP%] {\n  vertical-align: middle;\n}\n.table[_ngcontent-%COMP%] {\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  border-bottom: 2px solid #e0e0e0;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #f0f0f0;\n}\n.clickable-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color .15s;\n}\n.clickable-row[_ngcontent-%COMP%]:hover {\n  background-color: #edf7e8 !important;\n}\n/*# sourceMappingURL=teacher-requests.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeacherRequestsComponent, [{
    type: Component,
    args: [{ selector: "app-teacher-requests", standalone: true, imports: [CommonModule, FormsModule], template: `\r
<div class="container-fluid">\r
\r
  <!-- Header -->\r
  <div class="mb-4">\r
    <div class="d-flex align-items-center gap-3">\r
      <div class="header-icon"><i class="bi bi-inbox"></i></div>\r
      <div>\r
        <h3 class="fw-bold text-dark mb-0">Solicitudes de Refuerzo</h3>\r
        <p class="text-muted mb-0">Revisa y gestiona las solicitudes de refuerzo acad\xE9mico recibidas</p>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Alerts -->\r
  @if (errorMsg) {\r
    <div class="alert alert-danger alert-dismissible fade show border" role="alert">\r
      <i class="bi bi-exclamation-triangle-fill me-2"></i>{{ errorMsg }}\r
      <button type="button" class="btn-close" (click)="errorMsg = null"></button>\r
    </div>\r
  }\r
  @if (successMsg) {\r
    <div class="alert alert-success alert-dismissible fade show border" role="alert">\r
      <i class="bi bi-check-circle-fill me-2"></i>{{ successMsg }}\r
      <button type="button" class="btn-close" (click)="successMsg = null"></button>\r
    </div>\r
  }\r
\r
  <!-- Summary chips -->\r
  <div class="row g-2 mb-3">\r
    @for (chip of summaryChips; track chip.label) {\r
      <div class="col-6 col-lg-4">\r
        <div class="chip-box bg-white shadow-sm rounded-3 p-3 d-flex justify-content-between align-items-center">\r
          <div>\r
            <div class="text-muted small">{{ chip.label }}</div>\r
            <div class="fw-bold fs-4" [style.color]="chip.color">{{ chip.value }}</div>\r
          </div>\r
          <div class="chip-icon d-flex align-items-center justify-content-center rounded-circle"\r
               [style.background-color]="chip.bg">\r
            <i class="bi" [ngClass]="chip.icon" [style.color]="chip.color"></i>\r
          </div>\r
        </div>\r
      </div>\r
    }\r
  </div>\r
\r
  <!-- Filters -->\r
  <div class="card border shadow-sm mb-3">\r
    <div class="card-body py-2">\r
      <div class="row g-2 align-items-end">\r
        <div class="col-6 col-lg-3">\r
          <label class="form-label mb-1 small fw-semibold"><i class="bi bi-funnel me-1"></i>Estado</label>\r
          <select class="form-select border" [(ngModel)]="filters.statusId" (change)="load()">\r
            <option [ngValue]="null">Todos</option>\r
            <option [ngValue]="1">Pendiente</option>\r
            <option [ngValue]="2">Aceptada</option>\r
            <option [ngValue]="3">Rechazada</option>\r
            <option [ngValue]="4">Cancelada</option>\r
            <option [ngValue]="5">Finalizada</option>\r
          </select>\r
        </div>\r
        <div class="col-6 col-lg-3 d-flex gap-2 align-items-end">\r
          <button class="btn btn-outline-secondary border w-100" (click)="clearFilters()">\r
            <i class="bi bi-arrow-counterclockwise me-1"></i>Limpiar\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Table -->\r
  <div class="card border shadow-sm">\r
    <div class="card-body">\r
      @if (loading) {\r
        <div class="text-center py-5">\r
          <div class="spinner-border text-success" role="status"></div>\r
          <p class="text-muted mt-2 mb-0">Cargando solicitudes...</p>\r
        </div>\r
      } @else {\r
        <div class="table-responsive">\r
          <table class="table align-middle mb-0">\r
            <thead class="table-light">\r
              <tr>\r
                <th>ID</th><th>ESTUDIANTE</th><th>ASIGNATURA</th><th>TIPO</th>\r
                <th>MOTIVO</th><th>FECHA</th><th>ESTADO</th>\r
                <th class="text-end">ACCIONES</th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              @if (rows.length === 0) {\r
                <tr>\r
                  <td colspan="8" class="text-center py-5 text-muted">\r
                    <i class="bi bi-inbox display-4 d-block mb-2 opacity-25"></i>\r
                    Sin solicitudes para mostrar.\r
                  </td>\r
                </tr>\r
              }\r
              @for (r of rows; track r.requestId) {\r
                <tr class="clickable-row" (click)="openDetail(r)">\r
                  <td class="fw-semibold text-muted">#{{ r.requestId }}</td>\r
                  <td>{{ r.studentName }}</td>\r
                  <td>{{ r.subjectName }}</td>\r
                  <td><span class="badge bg-light text-dark border">{{ r.sessionType }}</span></td>\r
                  <td class="text-truncate" style="max-width:160px">{{ r.reason }}</td>\r
                  <td class="text-nowrap">{{ r.createdAt | date:'dd/MM/yyyy' }}</td>\r
                  <td>\r
                    <span class="badge rounded-pill" [ngClass]="statusBadge(r.statusId)">{{ r.statusName }}</span>\r
                  </td>\r
                  <td class="text-end" (click)="$event.stopPropagation()">\r
                    <button class="btn btn-sm btn-outline-success border me-1" title="Ver detalle" (click)="openDetail(r)">\r
                      <i class="bi bi-eye"></i>\r
                    </button>\r
                    @if (r.statusId === 1) {\r
                      <button class="btn btn-sm btn-success me-1" title="Aceptar" (click)="openAccept(r)">\r
                        <i class="bi bi-check-circle"></i>\r
                      </button>\r
                      <button class="btn btn-sm btn-outline-danger border" title="Rechazar" (click)="openReject(r)">\r
                        <i class="bi bi-x-circle"></i>\r
                      </button>\r
                    }\r
                    @if (r.statusId === 2) {\r
                      <button class="btn btn-sm btn-outline-warning border me-1" title="Reprogramar" (click)="openReschedule(r)">\r
                        <i class="bi bi-calendar2-event"></i>\r
                      </button>\r
                      <button class="btn btn-sm btn-outline-danger border me-1" title="Cancelar" (click)="openCancel(r)">\r
                        <i class="bi bi-slash-circle"></i>\r
                      </button>\r
                      <button class="btn btn-sm btn-outline-info border me-1" title="Enlace virtual" (click)="openVirtualLink(r)">\r
                        <i class="bi bi-camera-video"></i>\r
                      </button>\r
                      <button class="btn btn-sm btn-outline-success border me-1" title="Registrar resultado" (click)="openPerformed(r)">\r
                        <i class="bi bi-journal-check"></i>\r
                      </button>\r
                      <button class="btn btn-sm btn-outline-primary border" title="Marcar asistencia" (click)="openAttendance(r)">\r
                        <i class="bi bi-person-check"></i>\r
                      </button>\r
                    }\r
                  </td>\r
                </tr>\r
              }\r
            </tbody>\r
          </table>\r
        </div>\r
        <!-- Pagination -->\r
        <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">\r
          <div class="text-muted small">P\xE1gina {{ page }} de {{ totalPages }} \xB7 Total: {{ totalCount }}</div>\r
          <div class="d-flex gap-2">\r
            <button class="btn btn-outline-secondary btn-sm border" [disabled]="page <= 1" (click)="goTo(page - 1)">\r
              <i class="bi bi-chevron-left"></i> Anterior\r
            </button>\r
            <button class="btn btn-outline-secondary btn-sm border" [disabled]="page >= totalPages" (click)="goTo(page + 1)">\r
              Siguiente <i class="bi bi-chevron-right"></i>\r
            </button>\r
          </div>\r
        </div>\r
      }\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- MODAL: Detail -->\r
@if (activeModal === 'detail' && selected) {\r
  <div class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,.5)">\r
    <div class="modal-dialog modal-dialog-centered">\r
      <div class="modal-content border">\r
        <div class="modal-header border-bottom">\r
          <h5 class="modal-title fw-bold"><i class="bi bi-file-earmark-text me-2"></i>Solicitud #{{ selected.requestId }}</h5>\r
          <button class="btn-close" (click)="closeModal()"></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="row g-3">\r
            <div class="col-6"><span class="label">Estudiante</span><strong class="d-block">{{ selected.studentName }}</strong></div>\r
            <div class="col-6"><span class="label">Asignatura</span><strong class="d-block">{{ selected.subjectName }}</strong></div>\r
            <div class="col-6"><span class="label">Tipo de sesi\xF3n</span><strong class="d-block">{{ selected.sessionType }}</strong></div>\r
            <div class="col-6"><span class="label">Participantes</span><strong class="d-block">{{ selected.participantCount }}</strong></div>\r
            <div class="col-12"><span class="label">Motivo</span><strong class="d-block">{{ selected.reason }}</strong></div>\r
            <div class="col-6"><span class="label">Fecha solicitud</span><strong class="d-block">{{ selected.createdAt | date:'dd/MM/yyyy HH:mm' }}</strong></div>\r
            <div class="col-6">\r
              <span class="label">Estado</span>\r
              <span class="badge rounded-pill" [ngClass]="statusBadge(selected.statusId)">{{ selected.statusName }}</span>\r
            </div>\r
          </div>\r
        </div>\r
        <div class="modal-footer border-top">\r
          @if (selected.statusId === 1) {\r
            <button class="btn btn-outline-danger" (click)="openReject(selected)"><i class="bi bi-x-circle me-1"></i>Rechazar</button>\r
            <button class="btn btn-success" (click)="openAccept(selected)"><i class="bi bi-check-circle me-1"></i>Aceptar</button>\r
          }\r
          @if (selected.statusId === 2) {\r
            <button class="btn btn-outline-danger me-auto" (click)="openCancel(selected)"><i class="bi bi-slash-circle me-1"></i>Cancelar</button>\r
            <button class="btn btn-outline-warning" (click)="openReschedule(selected)"><i class="bi bi-calendar2-event me-1"></i>Reprogramar</button>\r
            <button class="btn btn-outline-info" (click)="openVirtualLink(selected)"><i class="bi bi-camera-video me-1"></i>Enlace virtual</button>\r
            <button class="btn btn-outline-success" (click)="openPerformed(selected)"><i class="bi bi-journal-check me-1"></i>Resultado</button>\r
            <button class="btn btn-outline-primary" (click)="openAttendance(selected)"><i class="bi bi-person-check me-1"></i>Asistencia</button>\r
          }\r
          @if (selected.statusId !== 1 && selected.statusId !== 2) {\r
            <button class="btn btn-secondary" (click)="closeModal()">Cerrar</button>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
}\r
\r
<!-- MODAL: Accept / Reschedule (RF10, RF11) -->\r
@if ((activeModal === 'accept' || activeModal === 'reschedule') && selected) {\r
  <div class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,.5)">\r
    <div class="modal-dialog modal-dialog-centered modal-lg">\r
      <div class="modal-content border">\r
        <div class="modal-header border-bottom">\r
          <div class="d-flex align-items-center gap-3">\r
            <div class="modal-icon bg-success-subtle text-success"><i class="bi bi-calendar-check"></i></div>\r
            <h5 class="modal-title fw-bold mb-0">\r
              {{ activeModal === 'accept' ? 'Aceptar solicitud' : 'Reprogramar sesi\xF3n' }}\r
              <span class="text-muted fw-normal fs-6 ms-2">#{{ selected.requestId }}</span>\r
            </h5>\r
          </div>\r
          <button class="btn-close" (click)="closeModal()" [disabled]="busy"></button>\r
        </div>\r
        <div class="modal-body">\r
          <p class="text-muted small mb-3">\r
            {{ activeModal === 'accept'\r
              ? 'Define fecha, franja horaria, modalidad y duraci\xF3n para programar la sesi\xF3n de refuerzo.'\r
              : 'Actualiza los datos de programaci\xF3n. Solo disponible para solicitudes Aceptadas.' }}\r
          </p>\r
          <div class="row g-3">\r
            <div class="col-md-6">\r
              <label class="form-label fw-semibold small">Fecha programada <span class="text-danger">*</span></label>\r
              <input type="date" class="form-control border" [(ngModel)]="scheduleForm.scheduledDate" [min]="todayStr" />\r
            </div>\r
            <div class="col-md-6">\r
              <label class="form-label fw-semibold small">ID Franja horaria <span class="text-danger">*</span></label>\r
              <input type="number" class="form-control border" min="1" [(ngModel)]="scheduleForm.timeSlotId" placeholder="Ej: 3" />\r
              <div class="form-text">Identificador del bloque horario institucional.</div>\r
            </div>\r
            <div class="col-md-6">\r
              <label class="form-label fw-semibold small">Modalidad <span class="text-danger">*</span></label>\r
              <select class="form-select border" [(ngModel)]="scheduleForm.modalityId" (ngModelChange)="onModalityChange()">\r
                <option [ngValue]="1">Virtual</option>\r
                <option [ngValue]="2">Presencial</option>\r
              </select>\r
            </div>\r
            <div class="col-md-6">\r
              <label class="form-label fw-semibold small">Duraci\xF3n estimada <span class="text-danger">*</span></label>\r
              <input type="text" class="form-control border" [(ngModel)]="scheduleForm.estimatedDuration"\r
                     placeholder="HH:mm  (ej: 01:30)" />\r
            </div>\r
            @if (scheduleForm.modalityId === 2) {\r
              <div class="col-md-6">\r
                <label class="form-label fw-semibold small">ID \xC1rea de trabajo <span class="text-danger">*</span></label>\r
                <input type="number" class="form-control border" min="1" [(ngModel)]="scheduleForm.workAreaId" placeholder="Ej: 2" />\r
                <div class="form-text">Requerido para sesiones presenciales.</div>\r
              </div>\r
            }\r
            <div class="col-12">\r
              <label class="form-label fw-semibold small">Observaci\xF3n <span class="text-muted fw-normal">(opcional)</span></label>\r
              <textarea class="form-control border" rows="2" [(ngModel)]="scheduleForm.reason"\r
                        placeholder="Notas adicionales o motivo de la programaci\xF3n"></textarea>\r
            </div>\r
          </div>\r
        </div>\r
        <div class="modal-footer border-top">\r
          <button class="btn btn-outline-secondary" (click)="closeModal()" [disabled]="busy">Cancelar</button>\r
          <button class="btn btn-success" (click)="submitSchedule()" [disabled]="busy || !scheduleFormValid()">\r
            @if (busy) { <span class="spinner-border spinner-border-sm me-2"></span> }\r
            <i class="bi bi-calendar-check me-1"></i>\r
            {{ activeModal === 'accept' ? 'Aceptar y programar' : 'Confirmar reprogramaci\xF3n' }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
}\r
\r
<!-- MODAL: Reject (RF10) -->\r
@if (activeModal === 'reject' && selected) {\r
  <div class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,.5)">\r
    <div class="modal-dialog modal-dialog-centered">\r
      <div class="modal-content border">\r
        <div class="modal-header border-bottom">\r
          <div class="d-flex align-items-center gap-3">\r
            <div class="modal-icon bg-danger-subtle text-danger"><i class="bi bi-x-circle"></i></div>\r
            <h5 class="modal-title fw-bold mb-0">Rechazar solicitud <span class="text-muted fw-normal fs-6 ms-2">#{{ selected.requestId }}</span></h5>\r
          </div>\r
          <button class="btn-close" (click)="closeModal()" [disabled]="busy"></button>\r
        </div>\r
        <div class="modal-body">\r
          <p class="text-muted small mb-3">Puedes registrar un motivo de rechazo (opcional).</p>\r
          <label class="form-label fw-semibold small">Motivo <span class="text-muted fw-normal">(opcional)</span></label>\r
          <textarea class="form-control border" rows="3" [(ngModel)]="reasonText"\r
                    placeholder="Ej: No tengo disponibilidad en ese horario"></textarea>\r
        </div>\r
        <div class="modal-footer border-top">\r
          <button class="btn btn-outline-secondary" (click)="closeModal()" [disabled]="busy">Cancelar</button>\r
          <button class="btn btn-danger" (click)="submitReject()" [disabled]="busy">\r
            @if (busy) { <span class="spinner-border spinner-border-sm me-2"></span> }\r
            <i class="bi bi-x-circle me-1"></i>Confirmar rechazo\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
}\r
\r
<!-- MODAL: Cancel (RF15) -->\r
@if (activeModal === 'cancel' && selected) {\r
  <div class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,.5)">\r
    <div class="modal-dialog modal-dialog-centered">\r
      <div class="modal-content border">\r
        <div class="modal-header border-bottom">\r
          <div class="d-flex align-items-center gap-3">\r
            <div class="modal-icon bg-danger-subtle text-danger"><i class="bi bi-slash-circle"></i></div>\r
            <h5 class="modal-title fw-bold mb-0">Cancelar sesi\xF3n <span class="text-muted fw-normal fs-6 ms-2">#{{ selected.requestId }}</span></h5>\r
          </div>\r
          <button class="btn-close" (click)="closeModal()" [disabled]="busy"></button>\r
        </div>\r
        <div class="modal-body">\r
          <p class="text-muted small mb-3">\r
            Esta acci\xF3n cancelar\xE1 la sesi\xF3n programada. Puedes registrar un motivo (opcional).\r
          </p>\r
          <label class="form-label fw-semibold small">Motivo <span class="text-muted fw-normal">(opcional)</span></label>\r
          <textarea class="form-control border" rows="3" [(ngModel)]="reasonText"\r
                    placeholder="Ej: El docente no puede asistir"></textarea>\r
        </div>\r
        <div class="modal-footer border-top">\r
          <button class="btn btn-outline-secondary" (click)="closeModal()" [disabled]="busy">No cancelar</button>\r
          <button class="btn btn-danger" (click)="submitCancel()" [disabled]="busy">\r
            @if (busy) { <span class="spinner-border spinner-border-sm me-2"></span> }\r
            <i class="bi bi-slash-circle me-1"></i>S\xED, cancelar sesi\xF3n\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
}\r
\r
<!-- MODAL: Virtual Link (RF13) -->\r
@if (activeModal === 'virtualLink' && selected) {\r
  <div class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,.5)">\r
    <div class="modal-dialog modal-dialog-centered">\r
      <div class="modal-content border">\r
        <div class="modal-header border-bottom">\r
          <div class="d-flex align-items-center gap-3">\r
            <div class="modal-icon bg-info-subtle text-info"><i class="bi bi-camera-video"></i></div>\r
            <h5 class="modal-title fw-bold mb-0">Enlace virtual <span class="text-muted fw-normal fs-6 ms-2">#{{ selected.requestId }}</span></h5>\r
          </div>\r
          <button class="btn-close" (click)="closeModal()" [disabled]="busy"></button>\r
        </div>\r
        <div class="modal-body">\r
          <p class="text-muted small mb-3">Registra o actualiza el enlace de la reuni\xF3n virtual para esta sesi\xF3n.</p>\r
          <label class="form-label fw-semibold small">URL de la reuni\xF3n <span class="text-danger">*</span></label>\r
          <input type="url" class="form-control border" [(ngModel)]="virtualLinkUrl"\r
                 placeholder="https://meet.google.com/..." />\r
          @if (virtualLinkUrl && !isValidUrl(virtualLinkUrl)) {\r
            <div class="text-danger small mt-1">\r
              <i class="bi bi-exclamation-triangle me-1"></i>Ingresa una URL v\xE1lida (debe comenzar con https://).\r
            </div>\r
          }\r
        </div>\r
        <div class="modal-footer border-top">\r
          <button class="btn btn-outline-secondary" (click)="closeModal()" [disabled]="busy">Cancelar</button>\r
          <button class="btn btn-info text-white" (click)="submitVirtualLink()"\r
                  [disabled]="busy || !virtualLinkUrl || !isValidUrl(virtualLinkUrl)">\r
            @if (busy) { <span class="spinner-border spinner-border-sm me-2"></span> }\r
            <i class="bi bi-link-45deg me-1"></i>Guardar enlace\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
}\r
\r
<!-- MODAL: Attendance (RF16) -->\r
@if (activeModal === 'attendance' && selected) {\r
  <div class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,.5)">\r
    <div class="modal-dialog modal-dialog-centered modal-lg">\r
      <div class="modal-content border">\r
        <div class="modal-header border-bottom">\r
          <div class="d-flex align-items-center gap-3">\r
            <div class="modal-icon bg-primary-subtle text-primary"><i class="bi bi-person-check"></i></div>\r
            <h5 class="modal-title fw-bold mb-0">Marcar asistencia <span class="text-muted fw-normal fs-6 ms-2">#{{ selected.requestId }}</span></h5>\r
          </div>\r
          <button class="btn-close" (click)="closeModal()" [disabled]="busy"></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="row g-3 mb-3">\r
            <div class="col-md-6">\r
              <label class="form-label fw-semibold small">ID Sesi\xF3n realizada (performedId) <span class="text-danger">*</span></label>\r
              <input type="number" class="form-control border" min="1" [(ngModel)]="attendancePerformedId" placeholder="Ej: 12" />\r
              <div class="form-text">Obtenido al registrar el resultado de la sesi\xF3n.</div>\r
            </div>\r
          </div>\r
          <div class="d-flex justify-content-between align-items-center mb-2">\r
            <label class="form-label fw-semibold small mb-0">Participantes</label>\r
            <button type="button" class="btn btn-outline-success btn-sm border" (click)="addAttendanceRow()">\r
              <i class="bi bi-plus me-1"></i>Agregar fila\r
            </button>\r
          </div>\r
          @for (entry of attendanceList; track $index; let i = $index) {\r
            <div class="row g-2 mb-2 align-items-center">\r
              <div class="col-5">\r
                <input type="number" class="form-control border form-control-sm" min="1"\r
                       [(ngModel)]="entry.participantId" placeholder="ID participante" />\r
              </div>\r
              <div class="col-5">\r
                <div class="form-check mt-1">\r
                  <input class="form-check-input" type="checkbox" [id]="'att-' + i" [(ngModel)]="entry.attended" />\r
                  <label class="form-check-label" [for]="'att-' + i">{{ entry.attended ? 'Asisti\xF3' : 'No asisti\xF3' }}</label>\r
                </div>\r
              </div>\r
              <div class="col-2 text-end">\r
                <button type="button" class="btn btn-outline-danger btn-sm border"\r
                        (click)="removeAttendanceRow(i)" [disabled]="attendanceList.length === 1">\r
                  <i class="bi bi-trash"></i>\r
                </button>\r
              </div>\r
            </div>\r
          }\r
        </div>\r
        <div class="modal-footer border-top">\r
          <button class="btn btn-outline-secondary" (click)="closeModal()" [disabled]="busy">Cancelar</button>\r
          <button class="btn btn-primary" (click)="submitAttendance()"\r
                  [disabled]="busy || !attendancePerformedId || attendanceList.length === 0">\r
            @if (busy) { <span class="spinner-border spinner-border-sm me-2"></span> }\r
            <i class="bi bi-person-check me-1"></i>Registrar asistencia\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
}\r
\r
<!-- MODAL: Register Performed (RF17) -->\r
@if (activeModal === 'performed' && selected) {\r
  <div class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,.5)">\r
    <div class="modal-dialog modal-dialog-centered modal-lg">\r
      <div class="modal-content border">\r
        <div class="modal-header border-bottom">\r
          <div class="d-flex align-items-center gap-3">\r
            <div class="modal-icon bg-success-subtle text-success"><i class="bi bi-journal-check"></i></div>\r
            <h5 class="modal-title fw-bold mb-0">Registrar resultado <span class="text-muted fw-normal fs-6 ms-2">#{{ selected.requestId }}</span></h5>\r
          </div>\r
          <button class="btn-close" (click)="closeModal()" [disabled]="busy"></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="row g-3">\r
            <div class="col-12">\r
              <label class="form-label fw-semibold small">Observaciones / Resultado <span class="text-danger">*</span></label>\r
              <textarea class="form-control border" rows="4" [(ngModel)]="performedObservation"\r
                        placeholder="Describe los temas abordados, resultados y cualquier observaci\xF3n relevante."></textarea>\r
            </div>\r
            <div class="col-md-6">\r
              <label class="form-label fw-semibold small">Duraci\xF3n real <span class="text-danger">*</span></label>\r
              <input type="text" class="form-control border" [(ngModel)]="performedDuration"\r
                     placeholder="HH:mm  (ej: 01:15)" />\r
            </div>\r
            <div class="col-12">\r
              <label class="form-label fw-semibold small">Recursos adjuntos <span class="text-muted fw-normal">(opcional)</span></label>\r
              <input type="file" class="form-control border" multiple (change)="onFilesSelected($event)" />\r
              @if (performedFiles.length > 0) {\r
                <ul class="list-unstyled mt-2 mb-0">\r
                  @for (f of performedFiles; track f.name) {\r
                    <li class="small text-muted"><i class="bi bi-paperclip me-1"></i>{{ f.name }}</li>\r
                  }\r
                </ul>\r
              }\r
            </div>\r
          </div>\r
        </div>\r
        <div class="modal-footer border-top">\r
          <button class="btn btn-outline-secondary" (click)="closeModal()" [disabled]="busy">Cancelar</button>\r
          <button class="btn btn-success" (click)="submitPerformed()"\r
                  [disabled]="busy || !performedObservation.trim() || !performedDuration.trim()">\r
            @if (busy) { <span class="spinner-border spinner-border-sm me-2"></span> }\r
            <i class="bi bi-journal-check me-1"></i>Registrar resultado\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
}\r
`, styles: ['/* src/app/components/teacher/teacher-requests/teacher-requests.component.css */\n:host {\n  font-family:\n    "Inter",\n    "Segoe UI",\n    -apple-system,\n    BlinkMacSystemFont,\n    sans-serif;\n}\n.header-icon {\n  width: 48px;\n  height: 48px;\n  min-width: 48px;\n  border-radius: 14px;\n  background: #1B7505;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.4rem;\n  border: 1px solid #145904;\n}\n.modal-icon {\n  width: 48px;\n  height: 48px;\n  min-width: 48px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.3rem;\n}\n.chip-box {\n  min-height: 72px;\n  border: 1px solid #e0e0e0 !important;\n}\n.chip-icon {\n  width: 40px;\n  height: 40px;\n  min-width: 40px;\n  font-size: 1.1rem;\n}\n.label {\n  color: #6c757d;\n  font-size: .8rem;\n  display: block;\n  margin-bottom: 2px;\n}\nth {\n  white-space: nowrap;\n  font-size: .85rem;\n  letter-spacing: .02em;\n}\ntd {\n  vertical-align: middle;\n}\n.table {\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.table thead th {\n  border-bottom: 2px solid #e0e0e0;\n}\n.table tbody tr {\n  border-bottom: 1px solid #f0f0f0;\n}\n.clickable-row {\n  cursor: pointer;\n  transition: background-color .15s;\n}\n.clickable-row:hover {\n  background-color: #edf7e8 !important;\n}\n/*# sourceMappingURL=teacher-requests.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeacherRequestsComponent, { className: "TeacherRequestsComponent", filePath: "app/components/teacher/teacher-requests/teacher-requests.component.ts", lineNumber: 32 });
})();
export {
  TeacherRequestsComponent
};
//# sourceMappingURL=chunk-OB7NEAYU.js.map
