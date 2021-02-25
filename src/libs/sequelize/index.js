import Sequelize from 'sequelize';
import url from 'url';

const databaseUrl = url.parse(process.env.DATABASE_URL);
const host = databaseUrl.hostname;
const database = databaseUrl.path.slice(1);
const username = databaseUrl.auth.substr(0, databaseUrl.auth.indexOf(':'));
const password = databaseUrl.auth.substr(databaseUrl.auth.indexOf(':') + 1, databaseUrl.auth.length);

const ssl = process.env.DB_SSL === "true"

const config = {
  host,
  dialect: 'postgres',
  database,
  username,
  password,
  ssl: ssl,
  logging: false,
  pool: {
    max: Number(process.env.DB_POOL_SIZE),
    idle: Number(process.env.DB_TIMEOUT),
    acquire: Number(90000),
  },
  dialectOptions: { ssl: ssl },
};

const sequelize = new Sequelize(config.database,
  config.username,
  config.password,
  config);


const models = {
  Auths: sequelize.import('../../auth/model'),
  Users: sequelize.import('../../users/model'),
  Games: sequelize.import('../../games/model'),
  Whacks: sequelize.import('../../games/whacks/model'),
  Spawns: sequelize.import('../../games/spawns/model'),
};


export { sequelize, models }; 
