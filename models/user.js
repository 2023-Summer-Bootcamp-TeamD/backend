'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsTo(models.Room, { foreignKey: 'room_id' });
    }
  }
  User.init({
    room_id: { type: DataTypes.INTEGER },
    nickname: DataTypes.STRING,
    score: { type: DataTypes.INTEGER, defaultValue: 0 },
    is_host: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
  });
  return User;
};