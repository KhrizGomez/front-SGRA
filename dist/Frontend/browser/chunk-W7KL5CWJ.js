import {
  HttpParams
} from "./chunk-K6SHIZGP.js";

// src/app/services/student/http-params.helper.ts
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

export {
  buildHttpParams
};
//# sourceMappingURL=chunk-W7KL5CWJ.js.map
