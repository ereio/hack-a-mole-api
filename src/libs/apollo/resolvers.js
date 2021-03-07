
import {
  user,
  currentUser,
  searchUsers,
  checkAvailableEmail,
  checkAvailableUsername,
} from '../../users/resolvers';

import {
  loginUser,
  signupUser,
  signOut,
  signOutAll,
} from '../../auth/resolvers';

import {
  games,
  gameplay,
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
    games,
    gameplay,
    searchUsers,
    currentUser,
    checkAvailableEmail,
    checkAvailableUsername,
  },
  Mutation: {
    signOut,
    signOutAll,
    loginUser,
    signupUser,
    createGame,
    updateGame,
    saveMoleSpawn,
    saveMoleWhack,
  }
};
