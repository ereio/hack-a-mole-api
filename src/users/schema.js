
import { gql } from 'apollo-server-express';

export default gql`

    extend type Mutation { 
      loginUser(email: String!, password: String!): User!
      signupUser(email: String!, password: String!, username: String!): User!
    }

    extend type Query {
      user(id: ID!): User
      searchUsers(username: String): [User]
      checkAvailableEmail(email: String): Boolean!
      checkAvailableUsername(username: String): Boolean!
    }

    type User {
      id: ID!
      gameIds: [ID]
      username: String!
    }

    type AuthUser {
      id: ID!
      user: User
      token: ID!
    } 
`;
