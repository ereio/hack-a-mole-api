
const users = (sequelize, DataTypes) => {
  const User = sequelize.define('user',
    {
      id: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: true,
        field: 'username',
      },
      gameIds: {
        type: DataTypes.TEXT,
        primaryKey: false,
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
          fields: ['username'],
        },
      ],
    });
  return User;
};

export default users;
