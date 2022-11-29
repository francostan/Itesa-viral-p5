'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{as:"referred"})
      this.belongsTo(models.User,{as:"referring"})
      // define association here
    }
  }
  Invitation.init({
    complete: DataTypes.BOOLEAN,
    redeemed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Invitation',
  });
  return Invitation;
};