"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "milestones",
      [
        {
          name: "Registration",
          desc: "Succesfull Registration",
          tokenAmount: "25",
          createdAt: new Date(),
          updatedAt: new Date(),
          quantityCondition: 0,
        },
        {
          name: "Invitation",
          desc: "Referred User successfully registered",
          tokenAmount: "50",
          createdAt: new Date(),
          updatedAt: new Date(),
          quantityCondition: 1,
        },
        {
          name: "10 invitations",
          desc: "10 Referred Users successfully registered",
          tokenAmount: "60",
          createdAt: new Date(),
          updatedAt: new Date(),
          quantityCondition: 4,
        },
        {
          name: "50 invitations",
          desc: "50 Referred Users successfully registered",
          tokenAmount: "150",
          createdAt: new Date(),
          updatedAt: new Date(),
          quantityCondition: 8,
        },
        {
          name: "100 invitations",
          desc: "100 Referred Users successfully registered",
          tokenAmount: "200",
          createdAt: new Date(),
          updatedAt: new Date(),
          quantityCondition: 12,
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {},
};
