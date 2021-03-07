import Sequelize from "sequelize";
import jwt from 'jsonwebtoken';
import { authenticateUserUnsafe } from './resolvers';

const { Op } = Sequelize;
const { MOLE_SECRET } = process.env;

export const healthCheck = (models) => async (req, res) => {
  res.status(200).json({ status: 'ok' });
};

export const refreshToken = (models) => async (req, res) => {
  try {
    const { cookies } = req;
    const authId = cookies['x-id'];
    const refreshToken = cookies['x-refresh'];

    // will make a call to db or cache every refresh 
    // (should still be fast due to BTree indexing in PSQL)
    // but allows users to globally logout by changing
    // the salt for their JWTs
    const auth = await models.Auths.findByPk(authId)

    if (!auth) {
      throw 'Failed to find auth record';
    }

    // verify JWT of refresh token
    const { dataValues: { salt, email } } = auth;
    const secret = MOLE_SECRET + salt;
    await jwt.verify(refreshToken, secret);

    // remove refresh token from 
    await auth.update({
      refreshTokens: auth.dataValues.refreshTokens.filter(
        (token) => token === refreshToken
      )
    })

    await authenticateUserUnsafe(null, { auth }, { models, res })

    console.log('[refreshToken] generated new auth');

    res.status(200).json({
      email: email
    });
  } catch (error) {
    console.error('[refreshToken] error', error);
    res.status(401).json({});
  }
};