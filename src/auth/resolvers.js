
import { skip } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

const { MOLE_SECRET } = process.env;
const NOT_AUTHENTICATED_ERROR = 'Not Authenticated';


export const checkAuthenticated = async (parent, { token }, { models }) => {
  if (!token || token === 'undefined' || token === 'null') {
    return false;
  }

  return models.Auth.findOne({ where: { token }, raw: true });
};


export const isAuthenticated = async (parent, args, { user }) => {
  console.log('[isAuthenticated]', user);

  if (!user || !user.token) {
    throw new ForbiddenError(NOT_AUTHENTICATED_ERROR);
  }

  let token;
  try {
    token = jwt.verify(user.token, MOLE_SECRET);
  } catch (error) {
    throw new ForbiddenError(NOT_AUTHENTICATED_ERROR);
  } finally {
    console.log('[isAuthenticated]', token);
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
    email: auth.email,
    hash: auth.hash,
  }, MOLE_SECRET);

  await auth.update({ token });

  return auth;
};


/**
 * Create a user
 */
export const signupUser = async (
  parent,
  { email, username, password },
  { models, user },
) => {
  console.log('[createUser] creating', username);

  if (user) {
    throw Error('Signed in users cannot create new accounts');
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
export const signOut = async (parent, params, { user }) => {
};
