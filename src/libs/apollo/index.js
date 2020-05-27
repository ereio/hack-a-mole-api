import { ApolloServer } from 'apollo-server-express';

import schemas from './schemas';
import resolvers from './resolvers';

const initApolloServer = (models) => new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: async ({ req, connection }) => {
    if (req) {
      return {
        models,
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
