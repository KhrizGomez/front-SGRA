import {
  HttpClient
} from "./chunk-K6SHIZGP.js";
import {
  Injectable,
  catchError,
  environment,
  setClassMetadata,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-OENL2SFL.js";

// src/app/services/student/student-new-request.service.ts
var StudentNewRequestService = class _StudentNewRequestService {
  http;
  baseUrl = environment.apiUrl;
  httpOptions = { withCredentials: true };
  constructor(http) {
    this.http = http;
  }
  // ==================== CATÁLOGOS ====================
  /** Obtiene las asignaturas en las que el estudiante está matriculado (periodo activo) */
  getSubjects() {
    return this.http.get(`${this.baseUrl}/student/catalogs/subjects`, this.httpOptions).pipe(catchError(this.handleError));
  }
  /** Obtiene el docente asignado al paralelo del estudiante para una asignatura */
  getTeacherBySubject(subjectId) {
    return this.http.get(`${this.baseUrl}/student/catalogs/subjects/${subjectId}/teacher`, this.httpOptions).pipe(catchError(this.handleError));
  }
  /** Lista los tipos de sesión (Individual, Grupal) */
  getSessionTypes() {
    return this.http.get(`${this.baseUrl}/student/catalogs/sessionTypes`, this.httpOptions).pipe(catchError(this.handleError));
  }
  /** Obtiene el periodo académico activo */
  getActivePeriod() {
    return this.http.get(`${this.baseUrl}/student/catalogs/active-period`, this.httpOptions).pipe(catchError(this.handleError));
  }
  /** Obtiene los compañeros matriculados en la misma asignatura */
  getClassmatesBySubject(subjectId) {
    return this.http.get(`${this.baseUrl}/student/catalogs/subjects/${subjectId}/classmates`, this.httpOptions).pipe(catchError(this.handleError));
  }
  // ==================== CREAR SOLICITUD ====================
  /**
   * Crea una nueva solicitud de refuerzo.
   * Envía los datos como multipart/form-data (JSON + archivos).
   *
   * @param payload Datos de la solicitud (subjectId, sessionTypeId, reason, participantIds)
   * @param files   Archivos opcionales a adjuntar
   */
  createRequest(payload, files = []) {
    const formData = new FormData();
    formData.append("request", new Blob([JSON.stringify(payload)], { type: "application/json" }));
    for (const file of files) {
      formData.append("files", file);
    }
    return this.http.post(`${this.baseUrl}/student/requests`, formData, { withCredentials: true }).pipe(catchError(this.handleError));
  }
  // ==================== MANEJO DE ERRORES ====================
  handleError(error) {
    let message = "Ha ocurrido un error inesperado";
    if (error.status === 0) {
      message = "No se pudo conectar con el servidor.";
    } else if (error.status === 401) {
      message = "Sesi\xF3n expirada. Por favor, inicia sesi\xF3n nuevamente.";
    } else if (error.status === 400) {
      message = error.error?.message || "Datos inv\xE1lidos.";
    } else if (error.status >= 500) {
      message = "Error en el servidor. Intenta m\xE1s tarde.";
    } else if (error.error?.message) {
      message = error.error.message;
    }
    console.error("[StudentNewRequestService] Error:", error);
    return throwError(() => new Error(message));
  }
  static \u0275fac = function StudentNewRequestService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StudentNewRequestService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StudentNewRequestService, factory: _StudentNewRequestService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StudentNewRequestService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  StudentNewRequestService
};
//# sourceMappingURL=chunk-CQDBQWHQ.js.map
