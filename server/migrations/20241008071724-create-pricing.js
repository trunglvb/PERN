'use strict';

const { EnumPricing } = require('@utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pricings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.ENUM,
        values: EnumPricing,
        defaultValue: EnumPricing[0]
      },
      isDisplayImmedialy: {
        type: Sequelize.BOOLEAN
      },
      levelShowDescription: {
        type: Sequelize.FLOAT
      },
      priority: {
        type: Sequelize.INTEGER
      },
      requireScore: {
        type: Sequelize.INTEGER
      },
      requireScoreNextLevel: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      expiredDay: {
        type: Sequelize.INTEGER
      },
      imageUrl: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Pricings');
  }
};
