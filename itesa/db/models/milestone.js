"use strict";
const { Model } = require("sequelize");
const { Milestone } = require(".");
module.exports = (sequelize, DataTypes) => {
  class milestone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //      this.hasMany(models.award)
      // define association here
    }
  }
  milestone.init(
    {
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
      tokenAmount: DataTypes.INTEGER,
      quantityCondition: DataTypes.INTEGER,
      expirationDate: DataTypes.STRING,
      deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      expired: { type: DataTypes.BOOLEAN, defaultValue: false },
      campaignId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "milestone",
    }
  );
  return milestone;
};
