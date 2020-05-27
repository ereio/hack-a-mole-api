const games = (sequelize, DataTypes) => {
  const Game = sequelize.define('game',
    {
      id: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
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
  return Game;
};

export default games;
