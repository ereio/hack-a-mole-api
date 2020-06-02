
import { skip } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import {
  firebaseAdmin,
} from '../libs/firebase';

const NOT_AUTHENTICATED_ERROR = 'Not Authenticated';

export const verifyIdToken = async (token) => {
  if (!token || token === 'undefined' || token === 'null') { // lol
    return false;
  }

  try {
    return await firebaseAdmin.auth().verifyIdToken(token);
  } catch (error) {
    console.error('[verifyIdToken]', error.message);
    return false;
  }
};


export const isAuthenticated = async (parent, args, { user }) => {
  console.log('[isAuthenticated]', user);
  if (!user) {
    throw new ForbiddenError(NOT_AUTHENTICATED_ERROR);
  }

  return skip;
};


/**
 * Create a user
 */
export const loginUser = async (
  parent,
  { email, password },
  { models },
) => {
  const auth = await models.Auths.findOne({ where: { email }, raw: true });

  console.log('[loginUser]', auth);
  if (!auth) {
    throw Error('Failed to login. Bad email or password provided');
  }

  const match = await bcrypt.compare(password, auth.passwordHash);

  console.log('[loginUser]', match);
  if (!match) {
    throw Error('Failed to login. Bad email or password provided');
  }

  const token = await firebaseAdmin.auth().createCustomToken(auth.id);

  const authUser = {
    id: auth.id,
    email: auth.email,
    token,
  };

  console.log({
    id: auth.id,
    email: auth.email,
    token: '[token redacted]',
  });

  return authUser;
};


/**
 * Create a user
 */
export const signupUser = async (
  parent,
  { email, password, username },
  { models, user },
) => {
  console.log('[createUser]', { email, password, username });
  if (user) {
    throw Error('Signed in users cannot create new accounts');
  }

  const hash = await bcrypt.hash(password, 14);

  if (!hash) {
    throw Error('Could not create account, please try again');
  }

  const newAuth = await models.Auths.create({
    id: uuidv4(),
    username,
    email,
    passwordHash: hash,
  });

  console.log('[createUser]', newAuth);

  await models.Users.create({
    id: uuidv4(),
    authId: newAuth.id,
    username,
  });

  console.log('[createUser]', username);

  return true;
};

/**
 * Create a user
 */
export const signOut = async (parent, params, { user }) => {
  try {
    await firebaseAdmin.auth().revokeRefreshTokens(user.token);
    return true;
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    return false;
  }
};
