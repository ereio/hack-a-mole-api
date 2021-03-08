import { ForbiddenError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers/lib/combineResolvers';
import { skip } from 'graphql-resolvers/lib/utils';

import { v4 as uuidv4 } from 'uuid';

import {
  isAuthenticated,
} from '../auth/resolvers';
import { NOT_AUTHENTICATED_ERROR } from '../libs/errors/values';

// eslint-disable-next-line
export const __resolveTypeEvent = (event) => {
  const type = event.hit !== undefined && event.hit !== null ? 'Whack' : 'Spawn';

  return type;
};

// Helper auth function to make sure the 
// game updated is owned by the user making the call
const isPermitted = async (parent, { game: gameInput }, { models, user }) => {
  const game = await models.Games.findByPk(gameInput.id);

  if (!game || game.userId !== user.id) {
    throw new ForbiddenError(NOT_AUTHENTICATED_ERROR);
  }

  return skip;
};

const gameUnsafe = async (
  parent,
  args,
  { models, user },
) => {
  return await models.Games.findByPk(id);
}

const gamesUnsafe = async (
  parent,
  { userId },
  { models, user },
) => {
  return models.Games.findAll({
    where: { userId: userId || user.id },
  });
};

const gameplayUnsafe = async (
  parent,
  { gameId },
  { models },
) => {
  const spawns = await models.Spawns.findAll({
    where: { gameId }, raw: true,
  });

  const whacks = await models.Whacks.findAll({
    where: { gameId }, raw: true,
  });

  return [...spawns, ...whacks];
};

const createGameUnsafe = async (
  parent,
  { game },
  { models, user },
) => {
  const {
    title, score, startTime, endTime,
  } = game;

  console.log('[createGameUnsafe]', game);

  const newGame = await models.Games.create({
    id: uuidv4(),
    title: title || uuidv4(),
    userId: user.id,
    score: 0,
    endTime,
    startTime,
  });

  return models.Games.findByPk(newGame.id);
};

const updateGameUnsafe = async (
  parent,
  { game },
  { models },
) => {
  const {
    id, title, score, startTime, endTime,
  } = game;

  console.log('[updateGameUnsafe]', id, score, startTime, endTime);
  const updatableGame = await models.Games.findByPk(id);

  await updatableGame.update({
    title,
    score,
    endTime,
    startTime,
  });

  return updatableGame;
};

export const games = combineResolvers(isAuthenticated, gamesUnsafe);
export const gameplay = combineResolvers(isAuthenticated, gameplayUnsafe);
export const createGame = combineResolvers(isAuthenticated, createGameUnsafe);
export const updateGame = combineResolvers(isAuthenticated, isPermitted, updateGameUnsafe);
