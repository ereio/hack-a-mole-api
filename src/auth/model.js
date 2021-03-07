const auths = (sequelize, DataTypes) => {
  const Auth = sequelize.define('auth',
    {
      id: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'email',
      },
      salt: { // TODO: change to sign out of all "sessions"
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'salt',
      },
      hash: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'hash',
      },
      refreshTokens: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
        defaultValue: [],
        field: 'refresh_tokens',
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
      ],
    });
  return Auth;
};

export default auths;
