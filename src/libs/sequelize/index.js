import Sequelize from 'sequelize';
import url from 'url';

import Auths from '../../auth/model';
import Users from '../../users/model';
import Games from '../../games/model';
import Whacks from '../../games/whacks/model';
import Spawns from '../../games/spawns/model';

const {
  DB_POOL_SIZE = 1, DB_TIMEOUT = 100, DB_SSL = 'true', DATABASE_URL = 'localhost',
} = process.env;

const databaseUrl = url.parse(DATABASE_URL);
const host = databaseUrl.hostname;
const database = databaseUrl.path.slice(1);
const username = databaseUrl.auth.substr(0, databaseUrl.auth.indexOf(':'));
const password = databaseUrl.auth.substr(databaseUrl.auth.indexOf(':') + 1, databaseUrl.auth.length);

const ssl = DB_SSL === 'true';

const config = {
  host,
  dialect: 'postgres',
  database,
  username,
  password,
  ssl,
  logging: false,
  pool: {
    max: Number(DB_POOL_SIZE),
    idle: Number(DB_TIMEOUT),
    acquire: Number(90000),
  },
  dialectOptions: { ssl },
};

const sequelize = new Sequelize(config.database,
  config.username,
  config.password,
  config);

const models = {
  Auths,
  Users,
  Games,
  Whacks,
  Spawns,
};

export { sequelize, models };
