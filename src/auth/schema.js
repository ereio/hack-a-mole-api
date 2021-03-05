// import { gql } from 'apollo-server-express';

// export default gql``;

import { gql } from 'apollo-server-express';

export default gql`
    extend type Mutation { 
      loginUser(loginInput: LoginInput!): Auth @rateLimit(limit: 5, duration: 60)
      signupUser(authInput: AuthInput!): Boolean! @rateLimit(limit: 1, duration: 120) 
      signOut: Boolean!
    }

    input LoginInput {
      email: String! @constraint(minLength: 5, format: "email")
      password: String! @constraint(maxLength: 48)
    }

    input AuthInput {
      email: String!  @constraint(minLength: 5, format: "email")
      password: String! @constraint(maxLength: 48)
      username: String! @constraint(pattern: "^[0-9a-zA-Z]*$")
    }

    type Auth {
      token: ID!
    } 
`;
