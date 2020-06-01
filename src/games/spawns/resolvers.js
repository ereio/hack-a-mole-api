import { combineResolvers } from 'graphql-resolvers/lib/combineResolvers';

import { v4 as uuidv4 } from 'uuid';


import {
  isAuthenticated,
} from '../../auth/resolvers';


const saveMoleSpawnUnsafe = async (
  parent,
  { spawn },
  { models },
) => {
  const {
    gameId,
    moleId,
    cell,
    despawn,
    timestamp,
  } = spawn;

  const existingGame = await models.Games.findByPk(gameId);

  if (!existingGame) {
    throw Error('Cannot save spawn for non-existant game');
  }

  return models.Spawns.create({
    id: uuidv4(),
    gameId,
    moleId,
    cell,
    despawn,
    timestamp,
  });
};

export const saveMoleSpawn = combineResolvers(isAuthenticated, saveMoleSpawnUnsafe);
