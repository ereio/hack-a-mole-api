import { combineResolvers } from 'graphql-resolvers/lib/combineResolvers';

import {
  isAuthenticated,
} from '../auth/resolvers';

const createGameUnsafe = async (
  parent,
  { game },
  { models },
) => {
  const {
    userId, scoreAmount, startTime, endTime,
  } = game;

  console.log(userId, scoreAmount, startTime, endTime, models);
};


export const createGame = combineResolvers(isAuthenticated, createGameUnsafe);
