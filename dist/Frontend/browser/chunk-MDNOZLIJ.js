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

// src/app/services/teacher/teacher-requests.service.ts
function buildHttpParams(params) {
  let httpParams = new HttpParams();
  for (const key of Object.keys(params)) {
    const value = params[key];
    if (value !== null && value !== void 0 && value !== "") {
      httpParams = httpParams.set(key, String(value));
    }
  }
  return httpParams;
}
var TeacherRequestsService = class _TeacherRequestsService {
  http;
  baseUrl = environment.apiUrl;
  opts = { withCredentials: true };
  constructor(http) {
    this.http = http;
  }
  /** RF10 – List incoming requests with optional status filter */
  getRequests(filters) {
    const params = buildHttpParams({
      statusId: filters.statusId ?? void 0,
      page: filters.page ?? 1,
      size: filters.size ?? 10
    });
    return this.http.get(`${this.baseUrl}/teacher/requests`, __spreadProps(__spreadValues({}, this.opts), { params })).pipe(catchError(this.handleError));
  }
  /** RF10+RF11 – Accept a pending request and schedule the session */
  acceptRequest(requestId, body) {
    return this.http.put(`${this.baseUrl}/teacher/requests/${requestId}/accept`, body, this.opts).pipe(catchError(this.handleError));
  }
  /** RF10 – Reject a pending request with optional reason */
  rejectRequest(requestId, body) {
    return this.http.put(`${this.baseUrl}/teacher/requests/${requestId}/reject`, body, this.opts).pipe(catchError(this.handleError));
  }
  /** RF11 – Reschedule an already-accepted session */
  rescheduleRequest(requestId, body) {
    return this.http.put(`${this.baseUrl}/teacher/requests/${requestId}/reschedule`, body, this.opts).pipe(catchError(this.handleError));
  }
  /** RF15 – Cancel an accepted session with optional reason */
  cancelRequest(scheduledId, body) {
    return this.http.put(`${this.baseUrl}/teacher/requests/${scheduledId}/cancel`, body, this.opts).pipe(catchError(this.handleError));
  }
  handleError = (error) => {
    let message = "Error al procesar la solicitud";
    if (error.status === 0)
      message = "No se pudo conectar con el servidor. Verifica tu conexi\xF3n.";
    else if (error.status === 401)
      message = "Sesi\xF3n expirada. Inicia sesi\xF3n nuevamente.";
    else if (error.status === 403)
      message = "No tienes permisos para esta acci\xF3n.";
    else if (error.status === 400)
      message = error.error?.message || "Datos inv\xE1lidos.";
    else if (error.status === 409)
      message = error.error?.message || "Conflicto de estado.";
    else if (error.status === 500)
      message = "Error interno del servidor. Contacta al administrador.";
    else if (error.error?.message)
      message = error.error.message;
    console.error("[TeacherRequestsService]", error);
    return throwError(() => new Error(message));
  };
  static \u0275fac = function TeacherRequestsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeacherRequestsService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TeacherRequestsService, factory: _TeacherRequestsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeacherRequestsService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  TeacherRequestsService
};
//# sourceMappingURL=chunk-MDNOZLIJ.js.map
