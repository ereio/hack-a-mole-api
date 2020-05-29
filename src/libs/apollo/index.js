import { ApolloServer } from 'apollo-server-express';

import schemas from './schemas';
import resolvers from './resolvers';
import { verifyIdToken } from '../../auth/resolvers';

const initApolloServer = (models) => new ApolloServer({
  typeDefs: schemas,
  resolvers,
  formatError: (error) => {
    console.error(error);
    return error;
  },
  subscriptions: {
    keepAlive: 40000,
    onConnect: async (params, socket) => {
      socket.isAlive = true;

      let token;
      if (!params) {
        const { headers } = socket.upgradeReq;
        const protocols = headers['sec-websocket-protocol'];
        token = protocols.split(', ')[2];
      } else {
        token = params['x-token'];
      }

      const user = await verifyIdToken(token);
      return {
        models,
        user,
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
      const user = await verifyIdToken(token);
      return {
        models,
        user,
      };
    }
    if (connection) {
      return {
        ...connection.query.context,
        models,
      };
    }
  },
});


export { initApolloServer };
