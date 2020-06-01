const spawns = (sequelize, DataTypes) => {
  const Spawn = sequelize.define('spawn',
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
      despawn: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'despawn',
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
  return Spawn;
};

export default spawns;
