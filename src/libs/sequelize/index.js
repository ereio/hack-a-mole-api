import Sequelize from 'sequelize';

const url = require('url');

const dbUrl = url.parse(process.env.DATABASE_URL);
const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1,
  dbUrl.auth.length);
const host = dbUrl.hostname;
const database = dbUrl.path.slice(1);

const { Op } = Sequelize;

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

const config = {
  username,
  password,
  database,
  host,
  dialect: 'postgres',
  ssl: process.env.DATABASE_SSL,
  logging: false,
  pool: {
    max: Number(process.env.DB_POOL_SIZE),
    idle: Number(process.env.DB_TIMEOUT),
    acquire: Number(90000),
  },
  dialectOptions: { ssl: process.env.DATABASE_SSL },
  operatorsAliases,
};

const sequelize = new Sequelize(config.database,
  config.username,
  config.password,
  config);


const models = {
  Users: sequelize.import('../../users/model'),
  Games: sequelize.import('../../games/model'),
};


export { sequelize };
export default models;
