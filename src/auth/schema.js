// import { gql } from 'apollo-server-express';

// export default gql``;


import { gql } from 'apollo-server-express';

export default gql`
    extend type Mutation { 
      loginUser(email: String!, password: String!): Auth
      signupUser(email: String!, password: String!, username: String!): Boolean!
    }

    type Auth {
      id: ID!
      token: ID!
    } 
`;
