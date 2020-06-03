import { gql } from 'apollo-server-express';

export default gql`
    # extend type Query {
    #   spawn(id: ID): Spawn
    #   spawns(gameId: ID!): [Spawn]
    # }

    extend type Mutation { 
      saveMoleSpawn(spawn: SpawnInput!): Spawn!
    } 
 
    type Spawn {
      id: ID!
      gameId: String!
      moleId: String
      cell: String!
      despawn: Boolean!
      timestamp: DateTime!
    }

    input SpawnInput {
      gameId: String!
      moleId: String!
      cell: String!
      despawn: Boolean # false for spawn
      timestamp: DateTime!
    } 
`;
