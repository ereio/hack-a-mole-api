import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware';

import { createRateLimitDirective, createRateLimitTypeDef } from 'graphql-rate-limit-directive';
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive';
import schemas from './schemas';
import resolvers from './resolvers';
import { checkAuthenticated } from '../../auth/resolvers';
import { loggingMiddleware } from './logging';
import { authUserUnsafe } from '../../users/resolvers';

const typeDefs = [
  createRateLimitTypeDef(),
  constraintDirectiveTypeDefs,
  ...schemas
];

const schemaExecutable = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(schemaExecutable, loggingMiddleware)

const initApolloServer = (models) => new ApolloServer({
  resolvers,
  typeDefs,
  schema: schemaWithMiddleware,
  schemaTransforms: [constraintDirective()],
  schemaDirectives: {
    rateLimit: createRateLimitDirective(),
  },
  formatError: (error) => {
    console.error(error);
    return error;
  },
  subscriptions: {
    keepAlive: 40000,
    onConnect: async (params, socket) => {
      // eslint-disable-next-line no-param-reassign
      socket.isAlive = true;
      let id;
      let token;

      if (!params) {
        const id = req.cookies['x-id'];
        const socketToken = req.cookies['x-token'];

        // const { headers } = socket.upgradeReq;
        // const protocols = headers['sec-websocket-protocol'];
        // const [, , socketToken] = protocols.split(', ');
        token = socketToken;
      } else {
        id = req.cookies['x-id'];
        token = req.cookies['x-token'];
      }

      const auth = await checkAuthenticated(null, { token, id }, { models });
      const user = await authUserUnsafe(null, { authId: id }, { models })
      return {
        ...context,
        auth,
        user,
        models,
      };
    },
    onDisconnect: async (socket) => {
      clearInterval(socket.interval);
      return true;
    },
  },
  context: async (context) => {
    const { req, connection } = context;

    if (req) {
      const id = req.cookies['x-id'];
      const token = req.cookies['x-token'];
      const auth = await checkAuthenticated(null, { token, id }, { models });
      const user = await authUserUnsafe(null, { authId: id }, { models })
      return {
        ...context,
        auth,
        user,
        models,
      };
    }
    if (connection) {
      return {
        ...connection.query.context,
        models,
      };
    }

    return {};
  },
});

export { initApolloServer };
