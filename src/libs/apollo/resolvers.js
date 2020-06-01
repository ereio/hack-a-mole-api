
import {
  user,
  searchUsers,
  checkAvailableEmail,
  checkAvailableUsername,
} from '../../users/resolvers';

import {
  loginUser,
  signupUser,
} from '../../auth/resolvers';

import {
  createGame,
  updateGame,
  __resolveTypeEvent,
} from '../../games/resolvers';

import {
  saveMoleSpawn,
} from '../../games/spawns/resolvers';

import {
  saveMoleWhack,
} from '../../games/whacks/resolvers';

export default {
  Event: { __resolveType: __resolveTypeEvent },
  Query: {
    user,
    searchUsers,
    checkAvailableEmail,
    checkAvailableUsername,
  },
  Mutation: {
    loginUser,
    signupUser,
    createGame,
    updateGame,
    saveMoleSpawn,
    saveMoleWhack,
  },
};
