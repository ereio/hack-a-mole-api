import Umzug from 'umzug';
import { sequelize } from '../sequelize';
import path from 'path';

const __dirname = process.cwd();
const migrations = path.join(__dirname, 'src/libs/umzug/migrations');

console.log('[umzug]', migrations);
const umzug = new Umzug({
  migrations: {
    path: migrations,
    params: [
      sequelize.getQueryInterface(),
      sequelize.constructor,
    ],
  },
  logging: false,
  storage: 'sequelize',
  storageOptions: { sequelize },
});

export { umzug };
