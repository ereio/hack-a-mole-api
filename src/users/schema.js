
import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
      user(id: ID, authId: ID): User
      searchUsers(username: String): [User]
      checkAvailableEmail(email: String): Boolean!
      checkAvailableUsername(username: String): Boolean!
    }

    type User {
      id: ID!
      gameIds: [ID]
      username: String!
    }
`;
