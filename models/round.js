'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Round extends Model {
    static associate(models) {
      Round.belongsTo(models.Room, { foreignKey: 'room_id' });
      Round.hasOne(models.User, { foreignKey: 'round_id' });
      Round.belongsTo(models.Word, { foreignKey: 'word_id' });
    }
  }
  Round.init({
    room_id: DataTypes.INTEGER,
    word_id: DataTypes.INTEGER,
    picture_url: DataTypes.STRING,
    is_deleted: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Round',
  });
  return Round;
};