import { exampleMiddleware } from './users/middleware';

module.exports = function (app, models) {
  app.get('/example', exampleMiddleware);
};
