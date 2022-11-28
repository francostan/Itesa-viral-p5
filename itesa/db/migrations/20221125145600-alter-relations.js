'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'awards', // name of Source model --> el nombre va en plural (es nombre de la tabla (Invitations), no del modelo (Invitation))
      'winnerId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model --> el nombre va en plural (es nombre de la tabla (Invitations), no del modelo (Invitation))
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.addColumn(
      'awards', // name of Source model --> el nombre va en plural (es nombre de la tabla (Invitations), no del modelo (Invitation))
      'milestoneId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'milestones', // name of Target model --> el nombre va en plural (es nombre de la tabla (Invitations), no del modelo (Invitation))
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.addColumn(
      'awards', // name of Source model --> el nombre va en plural (es nombre de la tabla (Invitations), no del modelo (Invitation))
      'referredId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model --> el nombre va en plural (es nombre de la tabla (Invitations), no del modelo (Invitation))
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.addColumn(
        'Invitations', // name of Source model --> el nombre va en plural (es nombre de la tabla (Invitations), no del modelo (Invitation))
        'ReferredId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users', // name of Target model --> el nombre va en plural (es nombre de la tabla (Invitations), no del modelo (Invitation))
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
      await queryInterface.addColumn(
        'Invitations', // name of Source model --> el nombre va en plural (es nombre de la tabla (Invitations), no del modelo (Invitation))
        'ReferringId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users', // name of Target model --> el nombre va en plural (es nombre de la tabla (Invitations), no del modelo (Invitation))
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('awards');
  }
};