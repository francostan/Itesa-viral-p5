'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class award extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  award.init({
    tokenAmount: DataTypes.INTEGER,
    transferred: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'award',
  });
  return award;
};