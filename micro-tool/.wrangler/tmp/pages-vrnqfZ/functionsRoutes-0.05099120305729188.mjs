import { onRequestOptions as __api_psu_report_ts_onRequestOptions } from "/Users/divyyadav/New Project/micro-tool/functions/api/psu-report.ts"
import { onRequestPost as __api_psu_report_ts_onRequestPost } from "/Users/divyyadav/New Project/micro-tool/functions/api/psu-report.ts"
import { onRequest as __api_contact_ts_onRequest } from "/Users/divyyadav/New Project/micro-tool/functions/api/contact.ts"

export const routes = [
    {
      routePath: "/api/psu-report",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_psu_report_ts_onRequestOptions],
    },
  {
      routePath: "/api/psu-report",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_psu_report_ts_onRequestPost],
    },
  {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_contact_ts_onRequest],
    },
  ]