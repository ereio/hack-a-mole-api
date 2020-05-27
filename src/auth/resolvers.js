
import { skip } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server';

import {
  firebaseAdmin,
} from '../libs/firebase';

const NOT_AUTHENTICATED_ERROR = 'Not Authenticated';

export const isAuthenticated = () => async (parent, args, { user }) => {
  if (!user) {
    throw new ForbiddenError(NOT_AUTHENTICATED_ERROR);
  }

  return skip;
};

/**
 * Create a user
 */
export const createAuthUser = async (
  parent,
  { email, password, displayName },
) => {
  let authUser = false;

  try {
    // create auth user for logins
    authUser = await firebaseAdmin.auth().createUser({
      email,
      password,
      displayName,
    });
  } catch (error) {
    // eslint-disable-next-line
    console.error('[Create Client Auth User] error', error);
    throw error;
  }
  return authUser;
};

/**
 * Create a user
 */
export const updateAuthUserPassword = async (parent, { uid, password }) => {
  try {
    await firebaseAdmin.auth().updateUser(uid, { password });
    return true;
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    return false;
  }
};
