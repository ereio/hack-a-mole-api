import { combineResolvers } from 'graphql-resolvers/lib/combineResolvers';

import { v4 as uuidv4 } from 'uuid';

import {
  isAuthenticated,
} from '../auth/resolvers';

// eslint-disable-next-line
export const __resolveTypeEvent = (event) => {
  // eslint-disable-next-line
  const type = event._modelOptions.name.singular;

  return type.charAt(0).toUpperCase() + type.slice(1);
};


const gamesUnsafe = async (
  parent,
  { userId },
  { models },
) => {
  console.log(userId);
  return models.Games.findAll({
    where: { userId },
  });
};

const createGameUnsafe = async (
  parent,
  { game },
  { models, user },
) => {
  const {
    score, startTime, endTime,
  } = game;

  console.log('[createGameUnsafe]', user.uid, score, startTime, endTime, models);

  return models.Games.create({
    id: uuidv4(),
    userId: user.uid,
    score: 0,
    endTime,
    startTime,
  });
};

const updateGameUnsafe = async (
  parent,
  { game },
  { models },
) => {
  const {
    id, score, startTime, endTime,
  } = game;

  console.log('[updateGameUnsafe]', score, startTime, endTime, models);
  const updatableGame = await models.Games.findByPk(id);

  return updatableGame.update({
    score,
    endTime,
    startTime,
  });
};


export const games = combineResolvers(isAuthenticated, gamesUnsafe);
export const createGame = combineResolvers(isAuthenticated, createGameUnsafe);
export const updateGame = combineResolvers(isAuthenticated, updateGameUnsafe);
