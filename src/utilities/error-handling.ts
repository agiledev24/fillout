import { Application, Request, Response } from 'express';
import { IS_PRODUCTION } from "./secrets";

import { AxiosError } from "axios";

function isAxiosError<T>(error: Error | AxiosError<T>): error is AxiosError<T> {
  return "isAxiosError" in error && error.isAxiosError;
}

export function loadErrorHandlers(app: Application) {

  app.use((req, res, next) => {

    interface BetterError extends Error {
      status?: number;
    }

    const err: BetterError = new Error('Not Found');
    err.status             = 404;
    next(err);
  });

  app.use((error: any, request: Request, response: Response, next: any) => {
    if (isAxiosError(error)) {
      response.status(500).json({
        message: `Failed request`,
        method: error.config.method?.toUpperCase(),
        url: error.config.url,
      });
    } else {
      next(error);
    }
  });
}