
import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
      user(authId: ID): User
      searchUsers(username: String): [User]
      checkAvailableEmail(email: String): Boolean!
      checkAvailableUsername(username: String): Boolean!
    }

    extend type Mutation {
      updateUserGames(gameId: ID): Boolean!
    }

    type User {
      id: ID!
      gameIds: [ID]
      username: String!
    }
`;
