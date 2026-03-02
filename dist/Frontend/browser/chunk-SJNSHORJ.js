import {
  HttpClient
} from "./chunk-K6SHIZGP.js";
import {
  Injectable,
  __spreadValues,
  catchError,
  environment,
  setClassMetadata,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-OENL2SFL.js";

// src/app/services/teacher/teacher-class-schedule.service.ts
var TeacherClassScheduleService = class _TeacherClassScheduleService {
  http;
  baseUrl = environment.apiUrl;
  httpOptions = { withCredentials: true };
  constructor(http) {
    this.http = http;
  }
  /**
   * GET /api/academic/class-schedules?teacherId={id}
   * Returns all class schedules for a given teacher
   */
  getSchedulesByTeacherId(id) {
    return this.http.get(`${this.baseUrl}/academic/class-schedules/detail/${id}`, __spreadValues({}, this.httpOptions)).pipe(catchError(this.handleError));
  }
  handleError(error) {
    let message = "Error al obtener horarios de clase";
    if (error.status === 0)
      message = "No se pudo conectar con el servidor.";
    else if (error.status === 401)
      message = "Sesi\xF3n expirada. Inicia sesi\xF3n nuevamente.";
    else if (error.status === 400)
      message = error.error?.message || "Datos inv\xE1lidos.";
    else if (error.error?.message)
      message = error.error.message;
    console.error("[TeacherClassScheduleService] Error:", error);
    return throwError(() => new Error(message));
  }
  static \u0275fac = function TeacherClassScheduleService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeacherClassScheduleService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TeacherClassScheduleService, factory: _TeacherClassScheduleService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeacherClassScheduleService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/services/teacher/teacher-availability.service.ts
var TeacherAvailabilityService = class _TeacherAvailabilityService {
  http;
  baseUrl = environment.apiUrl;
  httpOptions = { withCredentials: true };
  constructor(http) {
    this.http = http;
  }
  /**
   * GET /api/academic/time-slots
   * Returns all configured time slots from the backend.
   */
  getTimeSlots() {
    return this.http.get(`${this.baseUrl}/academic/time-slots`, this.httpOptions).pipe(catchError(this.handleError));
  }
  /**
   * GET /api/reinforcement/teacher-availabilities/by-user/{userId}
   * Returns all saved availability slots for a given teacher.
   */
  getAvailabilityByUser(userId) {
    return this.http.get(`${this.baseUrl}/reinforcement/teacher-availabilities/by-user/${userId}`, this.httpOptions).pipe(catchError(this.handleError));
  }
  /**
   * POST /api/reinforcement/teacher-availabilities/batch
   * Saves all selected availability slots for a teacher in a given period.
   */
  saveAvailability(payload) {
    return this.http.post(`${this.baseUrl}/reinforcement/teacher-availabilities/batch`, payload, this.httpOptions).pipe(catchError(this.handleError));
  }
  handleError(error) {
    let message = "Error al guardar disponibilidad";
    if (error.status === 0)
      message = "No se pudo conectar con el servidor.";
    else if (error.status === 401)
      message = "Sesi\xF3n expirada. Inicia sesi\xF3n nuevamente.";
    else if (error.status === 400)
      message = error.error?.message || "Datos inv\xE1lidos.";
    else if (error.error?.message)
      message = error.error.message;
    console.error("[TeacherAvailabilityService] Error:", error);
    return throwError(() => new Error(message));
  }
  static \u0275fac = function TeacherAvailabilityService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeacherAvailabilityService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TeacherAvailabilityService, factory: _TeacherAvailabilityService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeacherAvailabilityService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  TeacherClassScheduleService,
  TeacherAvailabilityService
};
//# sourceMappingURL=chunk-SJNSHORJ.js.map
