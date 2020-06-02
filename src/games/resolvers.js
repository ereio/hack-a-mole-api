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
  args,
  { models, user },
) => {
  const currentUser = await models.Users.findOne(
    { where: { authId: user.uid }, raw: true },
  );

  return models.Games.findAll({
    where: { userId: currentUser.id },
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


  const currentUser = await models.Users.findOne(
    { where: { authId: user.uid }, raw: true },
  );

  const newGameId = uuidv4();

  await models.Games.create({
    id: newGameId,
    userId: currentUser.id,
    score: 0,
    endTime,
    startTime,
  });

  return models.Games.findByPk(newGameId);
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
