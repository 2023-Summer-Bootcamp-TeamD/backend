'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.hasMany(models.User, { foreignKey: 'room_id' });
      Room.belongsTo(models.Category, { foreignKey: 'category_id' });
      Room.hasMany(models.Round, { foreignKey: 'room_id' });
    }
  }
  Room.init(
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
    modelName: 'Room',  // Here, change 'Rooms' to 'Room'
  });
  return Room;
};