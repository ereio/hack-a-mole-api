import { gql } from 'apollo-server-express';

import authSchema from '../../auth/schema';
import usersSchema from '../../users/schema';
import gameSchema from '../../games/schema';
import whacksSchema from '../../games/whacks/schema';
import spawnsSchema from '../../games/spawns/schema';


// Allow datetimes
const linkSchema = gql`
    scalar Date
    scalar DateTime
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`;

export default [
  linkSchema,
  usersSchema,
  authSchema,
  gameSchema,
  whacksSchema,
  spawnsSchema,
];
