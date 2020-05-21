import { gql } from 'apollo-server-express';

export default gql`
    extend type Mutation {
      saveMoleWhack(newUser: UserInput!): User! 
    } 

    type Whack {
        id: ID!
        x: String!
        y: String!
        timestamp: DateTime! 
    } 
`;
