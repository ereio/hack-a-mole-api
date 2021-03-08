import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
      user(id: ID!): User @rateLimit(limit: 5, duration: 60)
      currentUser: User @rateLimit(limit: 10, duration: 60)
      updateUser(id: ID!, user: UserInput!): User @rateLimit(limit: 1, duration: 120)
      searchUsers(username: FieldInput!): [User]  @rateLimit(limit: 5, duration: 60)
      checkAvailableEmail(email: EmailInput!): Boolean!  @rateLimit(limit: 5, duration: 60)
      checkAvailableUsername(username: FieldInput!): Boolean!  @rateLimit(limit: 5, duration: 60)
    }


    type User {
      id: ID!
      gameIds: [ID]
      username: String! @constraint(pattern: "^[0-9a-zA-Z]*$")
    }

    input UserInput {
      username: String! @constraint(pattern: "^[0-9a-zA-Z]*$")
    }

    input FieldInput {
      text: String! @constraint(pattern: "^[0-9a-zA-Z]*$")
    }
    
    input EmailInput {
      text: String! @constraint(minLength: 5, format: "email")
    }
`;
