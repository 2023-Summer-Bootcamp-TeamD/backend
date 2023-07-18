'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    static associate(models) {
      Word.belongsTo(models.Category, { foreignKey: 'category_id' });
      Word.hasOne(models.Round, { foreignKey: 'word_id' });
    }
  }
  Word.init({
    category_id: DataTypes.INTEGER,
    word: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Word',
    timestamps: true,
  });
  return Word;
};