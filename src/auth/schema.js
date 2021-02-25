// import { gql } from 'apollo-server-express';

// export default gql``;


import { gql } from 'apollo-server-express';

export default gql`
    extend type Mutation { 
      loginUser(loginInput: LoginInput!): Auth
      signupUser(authInput: AuthInput!): Boolean!
      signOut: Boolean!
    }

    input AuthInput {
      email: String!
      password: String!
    }

    input LoginInput {
      email: String!
      password: String!
      username: String!
    }

    type Auth {
      id: ID!
      token: ID!
    } 
`;
