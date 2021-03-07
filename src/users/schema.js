import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
      user(id: ID!): User @rateLimit(limit: 5, duration: 60)
      currentUser: User @rateLimit(limit: 10, duration: 60)
      updateUser(id: ID!, user: UserInput!): User @rateLimit(limit: 1, duration: 120)
      searchUsers(username: String): [User]  @rateLimit(limit: 5, duration: 60)
      checkAvailableEmail(email: String): Boolean!  @rateLimit(limit: 5, duration: 60)
      checkAvailableUsername(username: String): Boolean!  @rateLimit(limit: 5, duration: 60)
    }


    type User {
      id: ID!
      gameIds: [ID]
      username: String!
    }

    input UserInput {
      username: String!
    }
`;
