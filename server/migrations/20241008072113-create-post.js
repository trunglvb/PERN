'use strict';

const { EnumListingType, EnumPropertyTypes, EnumDirection, EnumPostStatus } = require('@utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idPost: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      province: {
        type: Sequelize.STRING,
        allowNull: false
      },
      district: {
        type: Sequelize.STRING
      },
      ward: {
        type: Sequelize.STRING
      },
      avgScore: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false
      },
      price: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
      },
      priceUnit: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      floor: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      bedroom: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      bathroom: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isFurniture: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      listingType: {
        type: Sequelize.ENUM,
        values: EnumListingType
      },
      propertyType: {
        type: Sequelize.ENUM,
        values: EnumPropertyTypes
      },
      direction: {
        type: Sequelize.ENUM,
        values: EnumDirection
      },
      balconyDirection: {
        type: Sequelize.ENUM,
        values: EnumDirection
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      expiredDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      expiredBoost: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        values: EnumPostStatus
      },
      idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
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
    await queryInterface.dropTable('Posts');
  }
};
