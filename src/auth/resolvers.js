import { skip, combineResolvers } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { NOT_AUTHENTICATED_ERROR } from '../libs/errors/values';

const { MOLE_SECRET } = process.env;

const checkAuthenticated = async (parent, { token }) => {
  if (!token || token === 'undefined' || token === 'null') {
    return false;
  }

  try {
    // TODO: add banlist of tokens to auth model
    return jwt.verify(token, MOLE_SECRET);
  } catch (error) {
    throw new ForbiddenError(NOT_AUTHENTICATED_ERROR);
  }
};

const isAuthenticated = async (parent, args, { user }) => {
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
  { loginInput: { email, password } },
  { models },
) => {
  const auth = await models.Auths.findOne({ where: { email }, raw: true });


  if (!auth) {
    throw Error('Failed to login. Bad email or password provided');
  }

  const match = await bcrypt.compare(password, auth.hash);

  if (!match) {
    throw Error('Failed to login. Bad email or password provided');
  }

  const token = jwt.sign({
    id: auth.id,
    email: auth.email,
    hash: auth.hash,
  }, MOLE_SECRET, {
    expiresIn: '15m',
  });

  return {
    id: auth.id,
    token,
  };
};

const signOut = async (
  parent,
  args,
  { models, auth },
) => {
  const authData = models.Auths.findByPk(auth.id);

  await authData.update({
    invalidated: [...auth.dataValues.invalidated, auth.token]
  });

  return true;
}

/**
 * Signup a new user
 */
const signupUserUnsafe = async (
  parent,
  { authInput: { email, username, password } },
  { models, user },
) => {
  console.log('[createUser] creating', email, username, password);

  const userExisting = await models.Users.findOne({
    where: { username },
  });

  const authExisting = await models.Auths.findOne({
    where: { email },
  });

  if (!email || !username || !password) {
    throw Error('All signup fields are required to create an account');
  }

  if (user) {
    throw Error('Signed in users cannot create new accounts');
  }

  if (userExisting || authExisting) {
    throw Error('Cannot signup with this information, try again with a different email or username');
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

// purposefully unauthenticated
const loginUser = loginUserUnsafe;
const signupUser = signupUserUnsafe;

export {
  checkAuthenticated,
  isAuthenticated,
  signOut,
  loginUser,
  signupUser,
}