import { combineResolvers } from 'graphql-resolvers';
import * as EmailValidator from 'email-validator';
import { isAuthenticated } from '../auth/resolvers';

// Helper auth function to make sure the 
// user updated is owned by the user making the call
const isPermitted = async (parent, { id }, { models, user: userAuthed }) => {
  const user = await models.Users.findByPk(id);

  if (user.id !== userAuthed.id) {
    throw new ForbiddenError(NOT_AUTHENTICATED_ERROR);
  }

  return skip;
};

const userUnsafe = async (parent, { id }, { models }) => {
  if (!id) { return null; }

  return await models.Users.findByPk(id);
};

const currentUserUnsafe = async (parent, args, { models, req, user }) => {
  const { cookies } = req;
  const authId = cookies['x-id'];

  if (!authId && !user.id) return null;

  // attempt using the found user object in context if available
  return user || await models.Users.findOne({ where: { authId } });
};

const updateUserUnsafe = async (parent, { id, user: { username } }, { models }) => {
  const user = await models.Users.findByPk(id);

  await user.update({ username })

  return user;
};


const authUserUnsafe = async (parent, { authId }, { models }) => {
  if (!authId) { return null; }

  return await models.Users.findOne({ where: { authId } });
};


/**
 * Search Users (by username)
 */
const searchUsersUnsafe = async (parent, { username }, { models }) => {
  try {
    return await models.Users.findAll({ where: { $iLike: username }, raw: true });
  } catch (error) {
    return [];
  }
};

/**
 * Check Available Email
 */
const checkAvailableEmail = async (parent, { email }, { models }) => {
  try {
    if (!EmailValidator.validate(email)) {
      throw Error('Not a valid email address');
    }

    const match = await models.Auths.findOne({ where: { email }, raw: true });
    return !match;
  } catch (error) {
    console.log('[checkAvailableEmail]', error);
    return false;
  }
};

/**
 * Check Available Username
 */
const checkAvailableUsername = async (parent, { username }, { models }) => {
  try {
    if (!username || username.length < 6) {
      throw Error('Not a valid username, must be at least 6 characters');
    }

    const match = await models.Users.findOne({ where: { username }, raw: true });
    return !match;
  } catch (error) {
    console.log('[checkAvailableUsername]', error);
    return false;
  }
};

const user = combineResolvers(isAuthenticated, userUnsafe);
const currentUser = combineResolvers(isAuthenticated, currentUserUnsafe);
const searchUsers = combineResolvers(isAuthenticated, searchUsersUnsafe);
const updateUser = combineResolvers(isAuthenticated, isPermitted, updateUserUnsafe);

export {
  authUserUnsafe,
  user,
  currentUser,
  searchUsers,
  updateUser,
  checkAvailableUsername,
  checkAvailableEmail,
}
