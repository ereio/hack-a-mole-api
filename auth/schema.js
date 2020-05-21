import { gql } from 'apollo-server-express';

export default gql`
    extend type Mutation {
      signupUser(newUser: UserInput!): User!
      loginUser(email:String!, password:String!): User!
    }

    input AuthUserInput {
      email: String!
      password: String!
      displayName: String
    }

    type AuthUser {
        id: ID!
        email: String!
        displayName: String!
        token: String!
    } 
`;
