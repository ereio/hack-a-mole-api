import { exampleMiddleware } from './admin/middleware';

export const initMiddleware = (app, models) => {
  app.get('/health', healthCheck(models));
};
