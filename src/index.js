
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import apollo from './libs/apollo';

// Config
const port = process.env.PORT || 4000;

// create express app instance
const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// Attach apollo server to express
apollo.applyMiddleware({ app, path: '/graphql' });

// Attach app to port
const server = http.createServer(app);

// Allow subscriptions on this apollo server
apollo.installSubscriptionHandlers(server);

server.listen({ port }, async () => {
  try {
    // eslint-disable-next-line
    console.log( `🐿  Server ready at http://localhost:${port}${apollo.graphqlPath}`);
    // eslint-disable-next-line
    console.log(`🐿  Subscriptions ready at ws://localhost:${port}${apollo.subscriptionsPath}`);
  } catch (error) {
    // eslint-disable-next-line
      console.error('Unable to connect to the database:', error);
  }
});
