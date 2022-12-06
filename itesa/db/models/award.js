"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class award extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.user, {as:"winner"})
      // this.belongsTo(models.user, {as:"referring"})
    }
  }
  award.init(
    {
      tokenAmount: DataTypes.INTEGER,
      transferred: { type: DataTypes.BOOLEAN, defaultValue: false },
      winnerId: {
        type: DataTypes.INTEGER,
      },
      referringId: {
        type: DataTypes.INTEGER,
      },
      milestoneId: {
        type: DataTypes.INTEGER,
      },
      currentCampaign:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
      },
      campaignId:{
        type:DataTypes.INTEGER,
        defaultValue:0
      }
    },
    {
      sequelize,
      modelName: "award",
    }
  );
  return award;
};
