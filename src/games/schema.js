import { gql } from 'apollo-server-express';

export default gql`
    union Event = Whack | Spawn 

    extend type Query {
      # game(id: ID): Game
      games(userId: ID): [Game]
    }

    extend type Mutation {
      createGame(game: GameInput!): Game!
      updateGame(id: ID, game: GameInput!): Game! 
    }
    
    type Game {
      id: ID!
      userId: ID!
      score: Float
      endTime: DateTime
      startTime: DateTime
      # timeline: [Event]
    }

    # type Timeline {
    #   gameId: ID!
    #   events: [Event]
    # }

    input GameInput {
      id: ID
      score: Int!
      endTime: DateTime!
      startTime: DateTime!
    }
`;
