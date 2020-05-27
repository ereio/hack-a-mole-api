
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import models, { sequelize } from './libs/sequelize';
import { initApolloServer } from './libs/apollo';

console.log('[main] starting');

// Config
const port = process.env.PORT || 4000;

// create express app instance
const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

console.log('[main] express initialized');

// Initialize Apollo Server Instance w/ attached models
const apollo = initApolloServer(models);

console.log('[main] apollo initialized');

// Attach apollo server to express
apollo.applyMiddleware({ app, path: '/graphql' });

// Attach app to port
const server = http.createServer(app);

console.log('[main] http initialized');

// Allow subscriptions on this apollo server
apollo.installSubscriptionHandlers(server);

console.log('[main] beginning sync');
sequelize.sync().then(async () => {
  server.listen({ port }, async () => {
    try {
      await sequelize.authenticate();

      // eslint-disable-next-line
      console.log( `🐿  Server ready at http://localhost:${port}${apollo.graphqlPath}`);
      // eslint-disable-next-line
      console.log(`🐿  Subscriptions ready at ws://localhost:${port}${apollo.subscriptionsPath}`);

      setInterval(() => server.getConnections((error, count) => {
        // eslint-disable-next-line
        console.log('[Active Connections]', count);
      }), 60 * 1000);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Unable to connect to the database:', error);
    }
  });
});
