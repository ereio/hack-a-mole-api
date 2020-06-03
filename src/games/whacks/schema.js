import { gql } from 'apollo-server-express';

export default gql`
    # extend type Query {
    #   whack(id: ID): Whack
    #   whacks(gameId: ID!): [Whack]
    # }

    extend type Mutation { 
      saveMoleWhack(whack: WhackInput!): Whack! 
    } 
 
    type Whack {
      id: ID!
      gameId: String!
      moleId: String
      cell: String! 
      hit: Boolean!
      timestamp: DateTime!
    } 

    input WhackInput {
      gameId: String!
      moleId: String
      cell: String!
      hit: Boolean
      timestamp: DateTime!
    }  
`;
