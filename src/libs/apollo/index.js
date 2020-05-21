const { ApolloServer } = require('apollo-server');
const schemas = require('./schemas');

module.exports = new ApolloServer({
  typeDefs: schemas,
});
