import { combineResolvers } from 'graphql-resolvers/lib/combineResolvers';

import { v4 as uuidv4 } from 'uuid';

import {
  isAuthenticated,
} from '../auth/resolvers';

// eslint-disable-next-line
export const __resolveTypeEvent = (event) => {
  // eslint-disable-next-line
  console.log('HELP ME PLEASE ', event, event.hit != null, event.despawn != null);

  const type = event.hit !== undefined && event.hit !== null ? 'Whack' : 'Spawn';

  return type;
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

const gameplayUnsafe = async (
  parent,
  { gameId },
  { models },
) => {
  console.log('[gameplayUnsafe]', gameId);

  const spawns = await models.Spawns.findAll({
    where: { gameId }, raw: true,
  });
  const whacks = await models.Whacks.findAll({
    where: { gameId }, raw: true,
  });
  const events = [...spawns, ...whacks];

  return events;
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
export const gameplay = combineResolvers(isAuthenticated, gameplayUnsafe);
export const createGame = combineResolvers(isAuthenticated, createGameUnsafe);
export const updateGame = combineResolvers(isAuthenticated, updateGameUnsafe);
