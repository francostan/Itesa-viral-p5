"use strict";
let expiration=new Date()
expiration=expiration.setDate(expiration.getDate()+30)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "milestones",
      [
        {
          name: "Registro",
          desc: "Creación de Usuario",
          tokenAmount: "25",
          createdAt: new Date(),
          updatedAt: new Date(),
          quantityCondition: 0,
          campaignId:0,
        },
        {
          name: "Referido",
          desc: "Referido Registrado",
          tokenAmount: "50",
          createdAt: new Date(),
          updatedAt: new Date(),
          quantityCondition: 1,
          campaignId:0,
        },
        {
          name: "4 Referidos",
          desc: "4 Referidos Registrados",
          tokenAmount: "60",
          createdAt: new Date(),
          updatedAt: new Date(),
          expirationDate:new Date(expiration),
          quantityCondition: 4,
          campaignId:1,
        },
        {
          name: "8 Referidos",
          desc: "8 Referidos Registrados",
          tokenAmount: "150",
          createdAt: new Date(),
          updatedAt: new Date(),
          expirationDate:new Date(expiration),
          quantityCondition: 8,
          campaignId:1,
        },
        {
          name: "12 Referidos",
          desc: "12 Referidos Registrados",
          tokenAmount: "200",
          createdAt: new Date(),
          updatedAt: new Date(),
          expirationDate:new Date(expiration),
          quantityCondition: 12,
          campaignId:1,
        },
        {
          name: "16 Referidos",
          desc: "16 Referidos Registrados",
          tokenAmount: "200",
          createdAt: new Date(),
          updatedAt: new Date(),
          expirationDate:new Date(expiration),
          quantityCondition: 16,
          campaignId:1,
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {},
};
