'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('awards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tokenAmount: {
        type: Sequelize.INTEGER
      },
      transferred: {
        type: Sequelize.BOOLEAN
      },
      winnerAddress:{
        type:Sequelize.STRING
      },
      winnerId:{
        type:Sequelize.INTEGER
      },
      referringId:{
        type:Sequelize.INTEGER
      },
      milestoneId:{
        type:Sequelize.INTEGER
      },
      currentCampaign:{
        type:Sequelize.BOOLEAN,
        defaultValue:true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('awards');
  }
};