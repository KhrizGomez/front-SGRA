import {
  Router
} from "./chunk-MXF362TW.js";
import {
  HttpClient
} from "./chunk-K6SHIZGP.js";
import {
  Injectable,
  catchError,
  environment,
  map,
  of,
  setClassMetadata,
  signal,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-OENL2SFL.js";

// src/app/services/auth/auth.service.ts
var AuthService = class _AuthService {
  http;
  router;
  apiUrl = environment.apiUrl;
  // Signal para el usuario actual
  currentUser = signal(null, ...ngDevMode ? [{ debugName: "currentUser" }] : []);
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  constructor(http, router) {
    this.http = http;
    this.router = router;
  }
  login(credentials) {
    this.isLoading.set(true);
    return this.http.post(`${this.apiUrl}/auth/login`, credentials, {
      withCredentials: true
    }).pipe(tap((user) => {
      this.currentUser.set(user);
      this.isLoading.set(false);
    }), catchError((error) => {
      this.isLoading.set(false);
      throw error;
    }));
  }
  me() {
    return this.http.get(`${this.apiUrl}/auth/me`, {
      withCredentials: true
    }).pipe(tap((user) => this.currentUser.set(user)), catchError(() => {
      this.currentUser.set(null);
      return of(null);
    }));
  }
  logout() {
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, {
      withCredentials: true
    }).pipe(tap(() => {
      this.currentUser.set(null);
      this.router.navigate(["/login"]);
    }));
  }
  isAuthenticated() {
    return this.me().pipe(map((user) => user !== null));
  }
  /**
   * Redirige al dashboard según el rol del usuario.
   * Prioridad: admin > coordinator > teacher > student
   */
  redirectByRole(user) {
    if (user.accountState === "C") {
      this.router.navigate(["/change-password"]);
      return;
    }
    const roles = user.roles.map((r) => r.toLowerCase());
    if (roles.includes("admin") || roles.includes("administrador")) {
      this.router.navigate(["/admin"]);
    } else if (roles.includes("coordinator") || roles.includes("coordinador")) {
      this.router.navigate(["/coordinator"]);
    } else if (roles.includes("teacher") || roles.includes("docente")) {
      this.router.navigate(["/teacher"]);
    } else if (roles.includes("student") || roles.includes("estudiante")) {
      this.router.navigate(["/student"]);
    } else if (roles.includes("workareamanagement") || roles.includes("gestor de espacios fisicos")) {
      this.router.navigate(["/workAreaManagement"]);
    } else {
      this.router.navigate(["/login"]);
    }
  }
  hasRole(role) {
    const user = this.currentUser();
    if (!user)
      return false;
    return user.roles.some((r) => r.toLowerCase() === role.toLowerCase());
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: Router }], null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-ZOQXTRIP.js.map
