import { combineResolvers } from 'graphql-resolvers';
import * as EmailValidator from 'email-validator';
import { isAuthenticated } from '../auth/resolvers';
/**
 * Search Users (by username)
 */
export const userUnsafe = async (parent, { id, authId }, { models }) => {
  if (authId) {
    return models.Users.findOne({ where: { authId } });
  }
  return models.Users.findByPk(id);
};

/**
 * Search Users (by username)
 */
export const searchUsersUnsafe = async (parent, { username }, { models }) => {
  try {
    return await models.Users.findAll({ where: { $iLike: username }, raw: true });
  } catch (error) {
    console.log('[searchUsers]', error);
    return [];
  }
};


/**
 * Check Available Email
 */
export const checkAvailableEmail = async (parent, { email }, { models }) => {
  try {
    if (!EmailValidator.validate(email)) {
      throw Error('Not a valid email address');
    }

    const match = await models.Auths.findOne({ where: { email }, raw: true });
    console.log('[checkAvailableEmail]', !match);
    return !match;
  } catch (error) {
    console.log('[checkAvailableEmail]', error);
    return false;
  }
};

/**
 * Check Available Username
 */
export const checkAvailableUsername = async (parent, { username }, { models }) => {
  try {
    if (!username || username.length < 6) {
      throw Error('Not a valid username, must be at least 6 characters');
    }

    const match = await models.Users.findOne({ where: { username }, raw: true });
    console.log('[checkAvailableUsername]', !match);
    return !match;
  } catch (error) {
    console.log('[checkAvailableUsername]', error);
    return false;
  }
};


export const user = combineResolvers(isAuthenticated, userUnsafe);
export const searchUsers = combineResolvers(isAuthenticated, searchUsersUnsafe);
