'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Room, { foreignKey: 'room_id' });
      User.belongsTo(models.Round, { foreignKey: 'round_id' });
    }
    
  }
  User.init({
    round_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    score: DataTypes.INTEGER,
    is_host: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
  });
  return User;
};