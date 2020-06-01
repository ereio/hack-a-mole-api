
import { v4 as uuidv4 } from 'uuid';

const users = (sequelize, DataTypes) => {
  const User = sequelize.define('user',
    {
      id: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
        default: uuidv4(),
      },
      authId: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: false,
        field: 'auth_id',
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'username',
      },
      gameIds: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'game_ids',
      },
      createdAt: {
        type: DataTypes.DATE,
        default: new Date().toUTCString(),
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
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
        {
          unique: true,
          fields: ['auth_id'],
        },
        {
          unique: true,
          fields: ['username'],
        },
      ],
    });
  return User;
};

export default users;
