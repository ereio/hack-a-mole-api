import { gql } from 'apollo-server-express';

import authSchema from '../../auth/schema';
import gameSchema from '../../game/schema';


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
  authSchema,
  gameSchema, 
];
