import http from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { initMiddleware } from './router';
import { sequelize, models } from './libs/sequelize';
import { initApolloServer } from './libs/apollo';

console.log('[main] starting');

// Config
const port = process.env.PORT || 4000;

const corsOptions = (request, callback) => {
  let options;
  const { headers: { origin } } = request;
  const allowed = process.env.CORS_URL || 'localhost';

  if (origin.includes(allowed)) {
    options = {
      origin: origin,
      credentials: true,
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
  } else {
    options = {
      origin: allowed,
      credentials: true,
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
  }

  callback(null, options);
}

// create express app instance
const app = express();
app.use(express.json({ limit: '3mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(helmet());

console.log('[main] express initialized');

// initialize restful endpoints
initMiddleware(app, models);

console.log('[main] restful endpoints initialized');

// initialize Apollo Server Instance w/ attached models
const apollo = initApolloServer(models);

console.log('[main] apollo initialized');

// attach apollo server to express
apollo.applyMiddleware({ app, path: '/graphql', cors: corsOptions });

// attach app to port
const server = http.createServer(app);

console.log('[main] http initialized');

// allow subscriptions on this apollo server
apollo.installSubscriptionHandlers(server);

console.log('[main] beginning sync');

sequelize.sync().then(async () => {
  server.listen({ port }, async () => {
    try {
      await sequelize.authenticate();

      // eslint-disable-next-line
      console.log(`🚀 Health check ready at http://localhost:${port}/health`);
      // eslint-disable-next-line
      console.log(`🚀 Server ready at http://localhost:${port}${apollo.graphqlPath}`);
      // eslint-disable-next-line
      console.log(`🚀 Subscriptions ready at ws://localhost:${port}${apollo.subscriptionsPath}`);

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
