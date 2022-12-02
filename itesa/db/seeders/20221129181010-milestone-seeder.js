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
          name: "4 invitations",
          desc: "4 Referred Users successfully registered",
          tokenAmount: "60",
          createdAt: new Date(),
          updatedAt: new Date(),
          quantityCondition: 4,
        },
        {
          name: "8 invitations",
          desc: "8 Referred Users successfully registered",
          tokenAmount: "150",
          createdAt: new Date(),
          updatedAt: new Date(),
          quantityCondition: 8,
        },
        {
          name: "12 invitations",
          desc: "12 Referred Users successfully registered",
          tokenAmount: "200",
          createdAt: new Date(),
          updatedAt: new Date(),
          quantityCondition: 12,
        },
        {
          name: "16 invitations",
          desc: "16 Referred Users successfully registered",
          tokenAmount: "200",
          createdAt: new Date(),
          updatedAt: new Date(),
          quantityCondition: 16,
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {},
};
