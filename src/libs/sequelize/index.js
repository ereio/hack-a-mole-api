import Sequelize from 'sequelize';
import url from 'url';

import Auths from '../../auth/model';
import Users from '../../users/model';
import Games from '../../games/model';
import Whacks from '../../games/whacks/model';
import Spawns from '../../games/spawns/model';

const {
  DB_URL = 'localhost',
  DB_PORT = 5432,
  DB_POOL_SIZE = 1,
  DB_TIMEOUT = 100,
  DB_SSL = 'true',
} = process.env;

const databaseUrl = url.parse(DB_URL);
const host = databaseUrl.hostname;
const ssl = DB_SSL === 'true';
const database = databaseUrl.path.slice(1);
const username = databaseUrl.auth.substr(0, databaseUrl.auth.indexOf(':'));
const password = databaseUrl.auth.substr(databaseUrl.auth.indexOf(':') + 1, databaseUrl.auth.length);

console.log('[sequelize]', DB_SSL, ssl);

const config = {
  host,
  dialect: 'postgres',
  port: DB_PORT,
  database,
  username,
  password,
  logging: false,
  pool: {
    max: Number(DB_POOL_SIZE),
    idle: Number(DB_TIMEOUT),
    acquire: Number(90000),
  },
};

if (ssl) {
  config.ssl = ssl
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: ssl,
    },
  }
}

const sequelize = new Sequelize(config.database,
  config.username,
  config.password,
  config);

const { DataTypes } = Sequelize;

const models = {
  Auths: Auths(sequelize, DataTypes),
  Users: Users(sequelize, DataTypes),
  Games: Games(sequelize, DataTypes),
  Whacks: Whacks(sequelize, DataTypes),
  Spawns: Spawns(sequelize, DataTypes),
};

export { sequelize, models };
