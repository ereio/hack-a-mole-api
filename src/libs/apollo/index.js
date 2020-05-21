import { ApolloServer } from 'apollo-server-express';

import schemas from './schemas';

module.exports = new ApolloServer({
  typeDefs: schemas,
});
