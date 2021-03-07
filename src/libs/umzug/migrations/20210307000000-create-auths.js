import Sequelize from 'sequelize';

// `query` was passed in the `index.js` file
const up = async (query) => {
  await query.createTable('users', {
    id: {
      type: Sequelize.TEXT,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      field: 'email',
    },
    salt: { // TODO: change to sign out of all "sessions"
      type: Sequelize.TEXT,
      allowNull: false,
      field: 'salt',
    },
    hash: {
      type: Sequelize.TEXT,
      allowNull: false,
      field: 'hash',
    },
    refreshTokens: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: false,
      defaultValue: [],
      field: 'refresh_tokens',
    },
    createdAt: {
      type: Sequelize.DATE,
      default: new Date().toUTCString(),
      field: 'created_at',
    },
    updatedAt: {
      type: Sequelize.DATE,
      default: new Date().toUTCString(),
      field: 'updated_at',
    },
  },
    {
      indexes: [
        {
          unique: true,
          fields: ['id'],
        },
      ],
    });
},

const down = async (query) => {
  await query.dropTable('auths')
}

export { up, down }