const whacks = (sequelize, DataTypes) => {
  const Whack = sequelize.define('whack',
    {
      id: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
      },
      gameId: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'game_id',
      },
      moleId: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'mole_id',
      },
      cell: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'cell',
      },
      hit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'hit',
        default: false,
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
  return Whack;
};

export default whacks;
