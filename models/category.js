'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Word, { foreignKey: 'category_id' });
      Category.hasMany(models.Rooms, { foreignKey: 'category_id' });
    }
    
  }
  Category.init({
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    timestamps: true,
  });
  return Category;
};