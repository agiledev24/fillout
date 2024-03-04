import * as dotenv from "dotenv";
import * as _ from "lodash";

dotenv.config({path: ".env"});

export const ENVIRONMENT    = _.defaultTo(process.env.APP_ENV, "dev");
export const IS_PRODUCTION  = ENVIRONMENT === "prod";
export const APP_PORT       = _.defaultTo(parseInt(process.env.APP_PORT || "3000"), 3000);
export const API_KEY     = _.defaultTo(process.env.API_KEY, "API_KEY");
export const API_BASE_URL     = _.defaultTo(process.env.API_BASE_URL, "API_BASE_URL");