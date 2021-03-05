const games = (sequelize, DataTypes) => {
  const Game = sequelize.define('game',
    {
      id: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'user_id',
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'title',
      },
      score: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
        field: 'score',
      },
      endTime: {
        type: DataTypes.DATE,
        default: new Date().toUTCString(),
        field: 'end_time',
      },
      startTime: {
        type: DataTypes.DATE,
        default: new Date().toUTCString(),
        field: 'start_time',
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
  return Game;
};

export default games;
