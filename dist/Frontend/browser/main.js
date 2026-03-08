import {
  ToastComponent
} from "./chunk-KCGY4BR2.js";
import {
  AuthService
} from "./chunk-7NSLUCCU.js";
import {
  Router,
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-FI7NBRUV.js";
import "./chunk-CDOKGMOL.js";
import {
  provideHttpClient,
  withFetch,
  withInterceptors
} from "./chunk-J4U5MJXD.js";
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
} from "./chunk-QLTODTZN.js";
import "./chunk-DOECEMG6.js";

// src/app/core/guards/auth.guard.ts
var authGuard = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.me().pipe(map((user) => {
    if (user) {
      if (user.accountState === "C") {
        const targetPath = route.routeConfig?.path;
        if (targetPath !== "change-password") {
          router.navigate(["/change-password"]);
          return false;
        }
      }
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
  const router = inject(Router);
  return authService.me().pipe(map((user) => {
    if (user) {
      if (user.accountState === "C") {
        router.navigate(["/change-password"]);
        return false;
      }
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
    loadComponent: () => import("./chunk-JAD2IESV.js").then((m) => m.LoginComponent),
    canActivate: [loginGuard]
  },
  {
    path: "forgot-password",
    loadComponent: () => import("./chunk-OGGYRQPF.js").then((m) => m.ForgotPasswordComponent),
    canActivate: [loginGuard]
  },
  {
    path: "change-password",
    loadComponent: () => import("./chunk-6EDV75T5.js").then((m) => m.ChangePasswordComponent),
    canActivate: [authGuard]
  },
  {
    path: "admin",
    loadComponent: () => import("./chunk-AAVIG7UY.js").then((m) => m.AdminLayoutComponent),
    canActivate: [authGuard, roleGuard(["admin", "administrador"])],
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-QCDGICZN.js").then((m) => m.AdminDashboardComponent)
      },
      {
        path: "users",
        loadComponent: () => import("./chunk-E6QCNAWA.js").then((m) => m.AdminUserManagementComponent)
      },
      {
        path: "master-tables",
        loadComponent: () => import("./chunk-X7HGM7NE.js").then((m) => m.AdminMasterTablesComponent)
      },
      {
        path: "permissions",
        loadComponent: () => import("./chunk-AYN2JBNL.js").then((m) => m.AdminPermissionManagementComponent)
      },
      {
        path: "roles",
        loadComponent: () => import("./chunk-ML6BNHKW.js").then((m) => m.AdminRoleManagementComponent)
      },
      {
        path: "config",
        loadComponent: () => import("./chunk-BEPWIHOF.js").then((m) => m.AdminEmailConfigComponent)
      },
      {
        path: "audit",
        loadComponent: () => import("./chunk-YWG4K54D.js").then((m) => m.AdminAuditComponent)
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  },
  {
    path: "teacher",
    loadComponent: () => import("./chunk-L7TWVAQM.js").then((m) => m.TeacherLayoutComponent),
    canActivate: [authGuard, roleGuard(["teacher", "docente"])],
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-MWOS6GR5.js").then((m) => m.TeacherDashboardComponent)
      },
      {
        path: "requests",
        loadComponent: () => import("./chunk-VXZXS6OP.js").then((m) => m.TeacherRequestsComponent)
      },
      {
        path: "history",
        loadComponent: () => import("./chunk-JIJWIAJ4.js").then((m) => m.TeacherHistoryComponent)
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  },
  {
    path: "student",
    loadComponent: () => import("./chunk-UKZ5ZDKB.js").then((m) => m.StudentLayoutComponent),
    canActivate: [authGuard, roleGuard(["student", "estudiante"])],
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-7EG6DS4J.js").then((m) => m.StudentDashboardComponent)
      },
      {
        path: "new-request",
        loadComponent: () => import("./chunk-RSK3WUQM.js").then((m) => m.StudentNewRequestComponent)
      },
      {
        path: "my-requests",
        loadComponent: () => import("./chunk-ZHLA4R5P.js").then((m) => m.StudentMyRequestsComponent)
      },
      {
        path: "history",
        loadComponent: () => import("./chunk-J6RGHIIO.js").then((m) => m.StudentHistoryComponent)
      },
      {
        path: "preferences",
        loadComponent: () => import("./chunk-WV42H54W.js").then((m) => m.StudentPreferencesComponent)
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  },
  {
    path: "coordinator",
    loadComponent: () => import("./chunk-DC755ZFZ.js").then((m) => m.CoordLayoutComponent),
    canActivate: [authGuard, roleGuard(["coordinator", "coordinador"])],
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-GDHZ6VCM.js").then((m) => m.CoordDashboardComponent)
      },
      {
        path: "dataload",
        loadComponent: () => import("./chunk-5ICQ4RT4.js").then((m) => m.CoordDataloadComponent)
      },
      {
        path: "physicalspaces",
        loadComponent: () => import("./chunk-RE35DEEM.js").then((m) => m.CoordPhysicalspacesComponent)
      },
      {
        path: "reports",
        loadComponent: () => import("./chunk-NUDYVHU5.js").then((m) => m.CoordReportsComponent)
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  },
  {
    path: "workAreaManagement",
    loadComponent: () => import("./chunk-34L5BBCX.js").then((m) => m.WorkAreaManagerLayoutComponent),
    canActivate: [authGuard, roleGuard(["workAreaManagement", "Gestor de Espacios Fisicos"])],
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-2BVYOLBL.js").then((m) => m.WorkAreaManagerDashboardComponent)
      },
      {
        path: "management-requests",
        loadComponent: () => import("./chunk-NA63WZ6R.js").then((m) => m.WorkAreaManagerManagementOfInPersonRequestsComponent)
      },
      {
        path: "schedule",
        loadComponent: () => import("./chunk-4TCDNIEI.js").then((m) => m.WamScheduleComponent)
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 2, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-toast")(1, "router-outlet");
    }
  }, dependencies: [RouterOutlet, ToastComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", imports: [RouterOutlet, ToastComponent], template: "<app-toast></app-toast>\r\n<router-outlet />\r\n" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "app/app.ts", lineNumber: 11 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
