import { gql } from 'apollo-server-express';

export default gql`
    union Event = Whack | Spawn 

    extend type Query {
      games(userId: ID): [Game]
      gameplay(gameId: ID): [Event]
    }

    extend type Mutation {
      createGame(game: GameInput!): Game!
      updateGame(game: GameInput!): Game! 
    }
    
    type Game {
      id: ID!
      userId: ID!
      score: Float
      endTime: DateTime
      startTime: DateTime
    }  

    input GameInput {
      id: ID
      score: Int!
      title: String
      endTime: DateTime!
      startTime: DateTime!
    }
`;
