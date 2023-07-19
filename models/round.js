'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Round extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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