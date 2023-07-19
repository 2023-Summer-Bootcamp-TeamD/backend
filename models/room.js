'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    static associate(models) {
      Rooms.hasMany(models.User, { foreignKey: 'room_id' });
      Rooms.belongsTo(models.Category, { foreignKey: 'category_id' });
      Rooms.hasMany(models.Round, { foreignKey: 'room_id' });
    }
  }
  Rooms.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // id를 주요키로 지정
      },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: uuidv4(),
    },
      category_id: DataTypes.INTEGER,
      time: DataTypes.INTEGER,
      player_num: DataTypes.INTEGER,
    }, {
    sequelize,
    modelName: 'Rooms',
  });
  return Rooms;
};