
import { skip, combineResolvers } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

const { MOLE_SECRET } = process.env;
const NOT_AUTHENTICATED_ERROR = 'Not Authenticated';

export const checkAuthenticated = async (parent, { token }, context) => {
  if (!token || token === 'undefined' || token === 'null') {
    return false;
  }

  try {
    // TODO: add banlist of tokens to auth model
    return jwt.verify(user.token, MOLE_SECRET);
  } catch (error) {
    throw new ForbiddenError(NOT_AUTHENTICATED_ERROR);
  } finally {
    console.log('[checkAuthenticated]', token);
  }
};

export const isAuthenticated = async (parent, { token }, { user }) => {
  console.log('[isAuthenticated]', user);

  if (!user) {
    throw new ForbiddenError(NOT_AUTHENTICATED_ERROR);
  }

  return skip;
};

/**
 * Login a user
 */
const loginUserUnsafe = async (
  parent,
  { email, password },
  { models },
) => {
  const auth = await models.Auths.findOne({ where: { email } });

  console.log('[loginUser]', auth);
  if (!auth) {
    throw Error('Failed to login. Bad email or password provided');
  }

  const match = await bcrypt.compare(password, auth.hash);

  console.log('[loginUser]', match);
  if (!match) {
    throw Error('Failed to login. Bad email or password provided');
  }

  const token = jwt.sign({
    id: auth.id,
    email: auth.email,
    hash: auth.hash,
  }, MOLE_SECRET, {
    expiresIn: '15m'
  });

  await auth.update({ token });

  return auth;
};


/**
 * Signup a new user
 */
const signupUserUnsafe = async (
  parent,
  { email, username, password },
  { models, user },
) => {
  console.log('[createUser] creating', username);

  const userExisting = models.Users.findOne({ where: { username } });

  if (user) {
    throw Error('Signed in users cannot create new accounts');
  }

  if (userExisting) {
    throw Error('Username already exists, try again');
  }


  const salt = await bcrypt.genSalt(14);
  const hash = await bcrypt.hash(password, salt);

  if (!hash) {
    throw Error('Could not create account, please try again');
  }

  const authNew = await models.Auths.create({
    id: uuidv4(),
    email,
    salt,
    hash,
  });

  const userNew = await models.Users.create({
    id: uuidv4(),
    authId: authNew.id,
    username,
  });

  console.log('[createUser] success', userNew.dataValues.username);

  return true;
};

/**
 * Create a user
 */
const signOutUnsafe = async (parent, params, { user, models }) => {
};

// purposefully unauthenticated
export const loginUser = loginUserUnsafe;
export const signupUser = signupUserUnsafe;

export const signOut = combineResolvers(isAuthenticated, signOutUnsafe);
