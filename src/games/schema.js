import { gql } from 'apollo-server-express';

export default gql`
    # extend type Query {
    #   game(id: ID): Game
    #   highscores: [Game]
    # }

    # extend type Mutation {
    #   createGame(game: GameInput!): Game!
    #   saveMoleWhack(whack: WhackInput!): Whack!
    #   saveMoleSpawn(whack: SpawnInput!): Spawn!
    # } 

    type Game {
      id: ID!
      userId: ID!
      score: Score
      startTime: DateTime
      endTime: DateTime
      timeline: [Whack]
    }

    input GameInput {
      userId: ID!
      scoreAmount: Int!
      startTime: DateTime!
      endTime: DateTime!
    }
    
    type Whack {
      id: ID!
      cell: String! 
      hit: Boolean
      timestamp: DateTime!
    } 

    type WhackInput {
      gameId: String!
      moleId: String!
      cell: String!
      hit: Boolean
      timestamp: DateTime!
    }

    type Spawn {
      id: ID!
      cell: String! 
      hit: Boolean
      timestamp: DateTime!
    }

    type SpawnInput {
      gameId: String!
      moleId: String!
      cell: String!
      despawn: Boolean! # false for spawn
      timestamp: DateTime!
    }

    type Score {
      id: ID!
      gameId: ID!
      amount: Int!
      timestmap: DateTime!
    }
`;
