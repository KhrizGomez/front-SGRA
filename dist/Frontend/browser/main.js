import {
  AuthService
} from "./chunk-ZOQXTRIP.js";
import {
  Router,
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-MXF362TW.js";
import {
  provideHttpClient,
  withFetch,
  withInterceptors
} from "./chunk-K6SHIZGP.js";
import {
  Component,
  catchError,
  inject,
  map,
  of,
  provideBrowserGlobalErrorListeners,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement
} from "./chunk-OENL2SFL.js";

// src/app/core/guards/auth.guard.ts
var authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.me().pipe(map((user) => {
    if (user) {
      return true;
    }
    router.navigate(["/login"]);
    return false;
  }), catchError(() => {
    router.navigate(["/login"]);
    return of(false);
  }));
};
var loginGuard = () => {
  const authService = inject(AuthService);
  return authService.me().pipe(map((user) => {
    if (user) {
      authService.redirectByRole(user);
      return false;
    }
    return true;
  }), catchError(() => of(true)));
};
var roleGuard = (allowedRoles) => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.me().pipe(map((user) => {
      if (!user) {
        router.navigate(["/login"]);
        return false;
      }
      const userRoles = user.roles.map((r) => r.toLowerCase());
      const hasRole = allowedRoles.some((role) => userRoles.includes(role.toLowerCase()));
      if (hasRole) {
        return true;
      }
      authService.redirectByRole(user);
      return false;
    }), catchError(() => {
      router.navigate(["/login"]);
      return of(false);
    }));
  };
};

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    loadComponent: () => import("./chunk-JHHQNDOB.js").then((m) => m.LoginComponent),
    canActivate: [loginGuard]
  },
  {
    path: "change-password",
    loadComponent: () => import("./chunk-UKW5I2Q2.js").then((m) => m.ChangePasswordComponent),
    canActivate: [authGuard]
  },
  {
    path: "admin",
    loadComponent: () => import("./chunk-OJEBBCIE.js").then((m) => m.AdminLayoutComponent),
    canActivate: [authGuard, roleGuard(["admin", "administrador"])],
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-J742GCYV.js").then((m) => m.AdminDashboardComponent)
      },
      {
        path: "users",
        loadComponent: () => import("./chunk-LQQ265HR.js").then((m) => m.AdminUserManagementComponent)
      },
      {
        path: "master-tables",
        loadComponent: () => import("./chunk-2IX5HR5D.js").then((m) => m.AdminMasterTablesComponent)
      },
      {
        path: "permissions",
        loadComponent: () => import("./chunk-DJZ32MG3.js").then((m) => m.AdminPermissionManagementComponent)
      },
      {
        path: "roles",
        loadComponent: () => import("./chunk-H736GQQN.js").then((m) => m.AdminRoleManagementComponent)
      },
      {
        path: "email-config",
        loadComponent: () => import("./chunk-YFOAPBE6.js").then((m) => m.AdminEmailConfigComponent)
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  },
  {
    path: "teacher",
    loadComponent: () => import("./chunk-LFZB532Y.js").then((m) => m.TeacherLayoutComponent),
    canActivate: [authGuard, roleGuard(["teacher", "docente"])],
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-WD54Q4HF.js").then((m) => m.TeacherDashboardComponent)
      },
      {
        path: "availability",
        loadComponent: () => import("./chunk-HXDUFNWR.js").then((m) => m.TeacherAvailabilityComponent)
      },
      {
        path: "requests",
        loadComponent: () => import("./chunk-OB7NEAYU.js").then((m) => m.TeacherRequestsComponent)
      },
      {
        path: "history",
        loadComponent: () => import("./chunk-GHIDEITQ.js").then((m) => m.TeacherHistoryComponent)
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  },
  {
    path: "student",
    loadComponent: () => import("./chunk-YNWFYWXP.js").then((m) => m.StudentLayoutComponent),
    canActivate: [authGuard, roleGuard(["student", "estudiante"])],
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-QEPC4FMS.js").then((m) => m.StudentDashboardComponent)
      },
      {
        path: "new-request",
        loadComponent: () => import("./chunk-V2U5IT5O.js").then((m) => m.StudentNewRequestComponent)
      },
      {
        path: "my-requests",
        loadComponent: () => import("./chunk-4D7BJMOY.js").then((m) => m.StudentMyRequestsComponent)
      },
      {
        path: "history",
        loadComponent: () => import("./chunk-SXWOKHHQ.js").then((m) => m.StudentHistoryComponent)
      },
      {
        path: "preferences",
        loadComponent: () => import("./chunk-VR5HRGAW.js").then((m) => m.StudentPreferencesComponent)
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  },
  {
    path: "coordinator",
    loadComponent: () => import("./chunk-TJZHSZVY.js").then((m) => m.CoordLayoutComponent),
    canActivate: [authGuard, roleGuard(["coordinator", "coordinador"])],
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-CG4AAWTK.js").then((m) => m.CoordDashboardComponent)
      },
      {
        path: "dataload",
        loadComponent: () => import("./chunk-RHZMUUB7.js").then((m) => m.CoordDataloadComponent)
      },
      {
        path: "physicalspaces",
        loadComponent: () => import("./chunk-X6YNWGPA.js").then((m) => m.CoordPhysicalspacesComponent)
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  },
  {
    path: "workAreaManagement",
    loadComponent: () => import("./chunk-32TBSC54.js").then((m) => m.WorkAreaManagerLayoutComponent),
    canActivate: [authGuard, roleGuard(["workAreaManagement", "Gestor de Espacios Fisicos"])],
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-6KPZ56X6.js").then((m) => m.WorkAreaManagerDashboardComponent)
      },
      {
        path: "management-requests",
        loadComponent: () => import("./chunk-AHT6IVHD.js").then((m) => m.WorkAreaManagerManagementOfInPersonRequestsComponent)
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  },
  {
    path: "**",
    redirectTo: "/login"
  }
];

// src/app/core/interceptors/credentials.interceptor.ts
var credentialsInterceptor = (req, next) => {
  const clonedRequest = req.clone({
    withCredentials: true
  });
  return next(clonedRequest);
};

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([credentialsInterceptor]))
  ]
};

// src/app/app.ts
var App = class _App {
  title = signal("Frontend", ...ngDevMode ? [{ debugName: "title" }] : []);
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 1, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [RouterOutlet], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", imports: [RouterOutlet], template: "<router-outlet />\r\n" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "app/app.ts", lineNumber: 10 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
