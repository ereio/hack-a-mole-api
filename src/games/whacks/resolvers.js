import { combineResolvers } from 'graphql-resolvers/lib/combineResolvers';

import { v4 as uuidv4 } from 'uuid';


import {
  isAuthenticated,
} from '../../auth/resolvers';

const saveMoleWhackUnsafe = async (
  parent,
  { whack },
  { models },
) => {
  const {
    gameId,
    moleId,
    cell,
    hit,
    timestamp,
  } = whack;

  const existingGame = await models.Games.findByPk(gameId);
  if (!existingGame) {
    throw Error('Cannot save whack for non-existant game');
  }

  return models.Whacks.create({
    id: uuidv4(),
    gameId,
    moleId,
    cell,
    hit,
    timestamp,
  });
};

export const saveMoleWhack = combineResolvers(isAuthenticated, saveMoleWhackUnsafe);
