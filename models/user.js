'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Room, { foreignKey: 'room_id' });
      User.belongsTo(models.Round, { foreignKey: 'round_id' });
    }

  }
  User.init({
    round_id: { type: DataTypes.INTEGER  },
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