
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

export default {
  Query: {
    user,
    searchUsers,
    checkAvailableEmail,
    checkAvailableUsername,
  },
  Mutation: {
    loginUser,
    signupUser,
  },
};
