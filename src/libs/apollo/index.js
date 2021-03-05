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

      let token;
      if (!params) {
        const { headers } = socket.upgradeReq;
        const protocols = headers['sec-websocket-protocol'];
        const [, , socketToken] = protocols.split(', ');
        token = socketToken;
      } else {
        token = params['x-token'];
      }

      const auth = await checkAuthenticated(null, { token }, { models });
      const user = await authUserUnsafe(null, { authId: auth.id }, { models })
      return {
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
  context: async ({ req, connection }) => {
    if (req) {
      const token = req.headers['x-token'];
      const auth = await checkAuthenticated(null, { token }, { models });
      const user = await authUserUnsafe(null, { authId: auth.id }, { models })
      return {
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
