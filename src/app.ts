import express from 'express';
import { Application } from 'express';
import MainRouter from './routes';
import { loadErrorHandlers } from './utilities/error-handling';

const app: Application = express();

app.use('/', MainRouter);

loadErrorHandlers(app);

export default app;