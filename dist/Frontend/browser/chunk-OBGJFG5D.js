import {
  HttpClient,
  HttpParams
} from "./chunk-K6SHIZGP.js";
import {
  Injectable,
  __spreadProps,
  __spreadValues,
  catchError,
  environment,
  setClassMetadata,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-OENL2SFL.js";

// src/app/services/teacher/teacher-sessions.service.ts
var TeacherSessionsService = class _TeacherSessionsService {
  http;
  baseUrl = environment.apiUrl;
  opts = { withCredentials: true };
  constructor(http) {
    this.http = http;
  }
  /** RF13 – Register or update virtual meeting link */
  setVirtualLink(scheduledId, body) {
    return this.http.put(`${this.baseUrl}/teacher/sessions/${scheduledId}/virtual-link`, body, this.opts).pipe(catchError(this.handleError));
  }
  /** RF16 – Mark attendance for session participants */
  registerAttendance(scheduledId, body) {
    return this.http.post(`${this.baseUrl}/teacher/sessions/${scheduledId}/attendance`, body, this.opts).pipe(catchError(this.handleError));
  }
  /** RF17 – Register session result and optionally attach resource files */
  registerPerformed(scheduledId, observation, duration, files) {
    const form = new FormData();
    form.append("observation", observation);
    form.append("duration", duration);
    files.forEach((f) => form.append("files[]", f, f.name));
    return this.http.post(`${this.baseUrl}/teacher/sessions/${scheduledId}/performed`, form, { withCredentials: true }).pipe(catchError(this.handleError));
  }
  /** RF18 – Paginated session history */
  getHistory(page = 1, size = 10) {
    const params = new HttpParams().set("page", String(page)).set("size", String(size));
    return this.http.get(`${this.baseUrl}/teacher/history/sessions`, __spreadProps(__spreadValues({}, this.opts), { params })).pipe(catchError(this.handleError));
  }
  handleError = (error) => {
    let message = "Error al procesar la sesi\xF3n";
    if (error.status === 0)
      message = "No se pudo conectar con el servidor.";
    else if (error.status === 401)
      message = "Sesi\xF3n expirada. Inicia sesi\xF3n nuevamente.";
    else if (error.status === 403)
      message = "No tienes permisos para esta acci\xF3n.";
    else if (error.status === 400)
      message = error.error?.message || "Datos inv\xE1lidos.";
    else if (error.status === 409)
      message = error.error?.message || "Conflicto de estado.";
    else if (error.error?.message)
      message = error.error.message;
    console.error("[TeacherSessionsService]", error);
    return throwError(() => new Error(message));
  };
  static \u0275fac = function TeacherSessionsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeacherSessionsService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TeacherSessionsService, factory: _TeacherSessionsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeacherSessionsService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  TeacherSessionsService
};
//# sourceMappingURL=chunk-OBGJFG5D.js.map
