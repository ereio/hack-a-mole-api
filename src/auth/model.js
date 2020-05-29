
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
      passwordHash: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'password_hash',
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
