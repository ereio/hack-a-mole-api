import { gql } from 'apollo-server-express';

import authSchema from '../../auth/schema';
import gameSchema from '../../games/schema';
import usersSchema from '../../users/schema';


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
  //   authSchema, // TODO:
  //   gameSchema, // TODO:
];
