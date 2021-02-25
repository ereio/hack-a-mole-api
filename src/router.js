import { exampleMiddleware } from './admin/middleware';

module.exports = (app, models) => {
  app.get('/health', exampleMiddleware(models));
};
