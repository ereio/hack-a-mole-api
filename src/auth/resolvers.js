import { skip, combineResolvers } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { NOT_AUTHENTICATED_ERROR } from '../libs/errors/values';

const { MOLE_SECRET } = process.env;

const checkAuthenticated = async (parent, { token, id }, { models }) => {
  console.log('[checkAuthenticated]', token)
  if (!token || token === 'undefined' || token === 'null') {
    return false;
  }

  try {
    const { dataValues } = await models.Auths.findByPk(id);
    return jwt.verify(token, MOLE_SECRET + dataValues.salt);
  } catch (error) {
    throw new ForbiddenError(NOT_AUTHENTICATED_ERROR);
  }
};

const isAuthenticated = async (parent, args, { user }) => {
  if (!user) {
    throw new ForbiddenError(NOT_AUTHENTICATED_ERROR);
  }

  return skip;
};

export const authenticateUserUnsafe = async (
  parent,
  { auth },
  { models, res },
) => {
  // refresh key to be signed / encoded
  const refreshKey = crypto.randomBytes(48).toString('hex');

  // get record instance handle
  const authRecord = auth.dataValues != null ? auth : await models.Auths.findByPk(auth.id);
  const { dataValues: { salt } } = authRecord;

  // TODO: remove
  console.log('[authenticateUserUnsafe]', refreshKey, { ...authRecord.dataValues }, salt);

  // allows for global revoke of all sessions
  const secret = MOLE_SECRET + salt;

  const authToken = jwt.sign({
    id: auth.id,
    email: auth.email,
    hash: auth.hash,
  }, secret, {
    expiresIn: '15m',
    audience: auth.id
  });

  const refreshToken = jwt.sign(
    { refreshKey },
    secret, {
    expiresIn: '7d'
  })

  // issue a refrersh token to prevent CSRF
  const { dataValues: { refreshTokens } } = authRecord;
  authRecord.update({
    refreshTokens: [refreshToken, ...refreshTokens]
  })

  // set httpOnly x-token
  res.cookie('x-token', authToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true
  })

  // set httpOnly x-refresh
  res.cookie('x-refresh', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true
  })

  // set httpOnly auth Id reference
  res.cookie('x-id', authRecord.id, {
    httpOnly: true,
    sameSite: 'none',
    secure: true
  })

  return {
    authToken,
    refreshToken,
  };
}

/**
 * Login a user
 */
const loginUserUnsafe = async (
  parent,
  { loginInput: { email, password } },
  { models, res },
) => {
  const auth = await models.Auths.findOne({ where: { email } });

  if (!auth) {
    throw Error('Failed to login. Bad email or password provided');
  }

  const match = await bcrypt.compare(password, auth.hash);

  if (!match) {
    throw Error('Failed to login. Bad email or password provided');
  }

  // actually generate authentication / set httpOnly token headers
  const { refreshToken } = await authenticateUserUnsafe(parent, { auth }, { models, res })

  return {
    email: auth.email,
    refreshToken: refreshToken,
  };
};

const signOut = async (
  parent,
  args,
  { res },
) => {
  try {
    res.clearCookie('x-id');
    res.clearCookie('x-token');
    res.clearCookie('x-refresh');

    return true;
  } catch (error) {
    console.log('[signOut]', error);
    return false;
  }
}

const signOutAll = async (
  parent,
  args,
  { models, auth, res },
) => {
  try {
    const authRecord = await models.Auths.findByPk(auth.id);

    await authRecord.update({ salt: await bcrypt.genSalt(14) })

    res.clearCookie('x-id');
    res.clearCookie('x-token');
    res.clearCookie('x-refresh');

    return true;
  } catch (error) {
    console.log('[signOutAll]', error);
    return false;
  }
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
  const hash = await bcrypt.hash(password, await bcrypt.genSalt(14));

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
  signOutAll,
  loginUser,
  signupUser,
}