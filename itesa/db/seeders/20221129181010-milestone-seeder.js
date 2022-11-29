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
        },
        {
          name: "Invitation",
          desc: "Referred User successfully registered",
          tokenAmount: "50",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "10 invitations",
          desc: "10 Referred Users successfully registered",
          tokenAmount: "60",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "50 invitations",
          desc: "50 Referred Users successfully registered",
          tokenAmount: "150",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "100 invitations",
          desc: "100 Referred Users successfully registered",
          tokenAmount: "200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {},
};
