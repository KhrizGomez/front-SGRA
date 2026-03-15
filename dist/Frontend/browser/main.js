import {
  ToastComponent
} from "./chunk-N5R3SXJP.js";
import {
  AuthService
} from "./chunk-LDIU7UUJ.js";
import {
  Router,
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-JLABSWHE.js";
import "./chunk-B6KECOTC.js";
import {
  provideHttpClient,
  withFetch,
  withInterceptors
} from "./chunk-CAIBJNNP.js";
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
} from "./chunk-UPYVF73X.js";
import "./chunk-4AJYGB4N.js";

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
    loadComponent: () => import("./chunk-YEIMSIAV.js").then((m) => m.LoginComponent),
    canActivate: [loginGuard]
  },
  {
    path: "forgot-password",
    loadComponent: () => import("./chunk-XZUEWIQU.js").then((m) => m.ForgotPasswordComponent),
    canActivate: [loginGuard]
  },
  {
    path: "change-password",
    loadComponent: () => import("./chunk-EDJJLRTK.js").then((m) => m.ChangePasswordComponent),
    canActivate: [authGuard]
  },
  {
    path: "admin",
    loadComponent: () => import("./chunk-KCDKKF6I.js").then((m) => m.AdminLayoutComponent),
    canActivate: [authGuard, roleGuard(["admin", "administrador"])],
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-HNLNP7ML.js").then((m) => m.AdminDashboardComponent)
      },
      {
        path: "users",
        loadComponent: () => import("./chunk-5EGI54PN.js").then((m) => m.AdminUserManagementComponent)
      },
      {
        path: "master-tables",
        loadComponent: () => import("./chunk-2VBZC6DQ.js").then((m) => m.AdminMasterTablesComponent)
      },
      {
        path: "permissions",
        loadComponent: () => import("./chunk-MP5XPNJI.js").then((m) => m.AdminPermissionManagementComponent)
      },
      {
        path: "roles",
        loadComponent: () => import("./chunk-ZWRXZVR7.js").then((m) => m.AdminRoleManagementComponent)
      },
      {
        path: "config",
        loadComponent: () => import("./chunk-4BXTX5W6.js").then((m) => m.AdminEmailConfigComponent)
      },
      {
        path: "audit",
        loadComponent: () => import("./chunk-NULZR37O.js").then((m) => m.AdminAuditComponent)
      },
      {
        path: "backup",
        loadComponent: () => import("./chunk-3YJAO2MY.js").then((m) => m.AdminBackupComponent)
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  },
  {
    path: "teacher",
    loadComponent: () => import("./chunk-YV75EANH.js").then((m) => m.TeacherLayoutComponent),
    canActivate: [authGuard, roleGuard(["teacher", "docente"])],
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-LCSGZXP3.js").then((m) => m.TeacherDashboardComponent)
      },
      {
        path: "requests",
        loadComponent: () => import("./chunk-DYYXKGM2.js").then((m) => m.TeacherRequestsComponent)
      },
      {
        path: "history",
        loadComponent: () => import("./chunk-DDEY5CMF.js").then((m) => m.TeacherHistoryComponent)
      },
      {
        path: "preferences",
        loadComponent: () => import("./chunk-BOKVS6G6.js").then((m) => m.TeacherPreferencesComponent)
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  },
  {
    path: "student",
    loadComponent: () => import("./chunk-ZBZ4B5KY.js").then((m) => m.StudentLayoutComponent),
    canActivate: [authGuard, roleGuard(["student", "estudiante"])],
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-47EQHEJT.js").then((m) => m.StudentDashboardComponent)
      },
      {
        path: "new-request",
        loadComponent: () => import("./chunk-ZRI5J3HV.js").then((m) => m.StudentNewRequestComponent)
      },
      {
        path: "my-requests",
        loadComponent: () => import("./chunk-EABGFDL7.js").then((m) => m.StudentMyRequestsComponent)
      },
      {
        path: "history",
        loadComponent: () => import("./chunk-CJEDVC5C.js").then((m) => m.StudentHistoryComponent)
      },
      {
        path: "preferences",
        loadComponent: () => import("./chunk-6IAHNDFL.js").then((m) => m.StudentPreferencesComponent)
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  },
  {
    path: "coordinator",
    loadComponent: () => import("./chunk-O5YC254O.js").then((m) => m.CoordLayoutComponent),
    canActivate: [authGuard, roleGuard(["coordinator", "coordinador"])],
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-NVBMILS4.js").then((m) => m.CoordDashboardComponent)
      },
      {
        path: "dataload",
        loadComponent: () => import("./chunk-AGACZG2T.js").then((m) => m.CoordDataloadComponent)
      },
      {
        path: "physicalspaces",
        loadComponent: () => import("./chunk-YNMWZCZN.js").then((m) => m.CoordPhysicalspacesComponent)
      },
      {
        path: "reports",
        loadComponent: () => import("./chunk-HWROWHZA.js").then((m) => m.CoordReportsComponent)
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  },
  {
    path: "workAreaManagement",
    loadComponent: () => import("./chunk-M4NIH72P.js").then((m) => m.WorkAreaManagerLayoutComponent),
    canActivate: [authGuard, roleGuard(["workAreaManagement", "Gestor de Espacios Fisicos"])],
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-JJD5SRNS.js").then((m) => m.WorkAreaManagerDashboardComponent)
      },
      {
        path: "management-requests",
        loadComponent: () => import("./chunk-FO3DTH6V.js").then((m) => m.WorkAreaManagerManagementOfInPersonRequestsComponent)
      },
      {
        path: "schedule",
        loadComponent: () => import("./chunk-B364J32J.js").then((m) => m.WamScheduleComponent)
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
