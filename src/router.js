import { calculateRecurring, fetchTransactions } from './transactions/middleware';
import { exampleMiddleware } from './users/middleware';

module.exports = function (app, models) {
  app.get('/transactions', fetchTransactions);
  app.get('/calculate', calculateRecurring);
};
