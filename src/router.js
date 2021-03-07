import { healthCheck, refreshToken } from './auth/middleware';

export const initMiddleware = (app, models) => {
  app.get('/health', healthCheck(models));
  app.get('/refresh', refreshToken(models));
};
