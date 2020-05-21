import { gql } from 'apollo-server-express';

export default gql`
    extend type Mutation {
      saveMoleWhack(gameId: String!, moleId: String, cell: String!, timestamp: DateTime): Whack!
      saveMoleSpawn(gameId: String!, moleId: String, cell: String!, timestamp: DateTime): Boolean! 
    } 

    type Whack {
        id: ID!
        cell: String! 
        timestamp: DateTime! 
    }  
`;
