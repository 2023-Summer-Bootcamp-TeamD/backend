'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Round extends Model {
    static associate(models) {
      Round.belongsTo(models.Room, { foreignKey: 'room_id' });
      Round.hasOne(models.User, { foreignKey: 'round_id' });
      Round.belongsTo(models.Word, { foreignKey: 'word_id' });
    }
  }
  Round.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: uuidv4(),
    },
    room_id: DataTypes.INTEGER,
    word_id: DataTypes.INTEGER,
    picture_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Round',
  });
  return Round;
};
