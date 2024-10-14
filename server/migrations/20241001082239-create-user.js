'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      emailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      phoneVerified: {
        type: Sequelize.STRING,
        defaultValue: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      avatar: {
        type: Sequelize.STRING
      },
      balance: {
        type: Sequelize.BIGINT,
        defaultValue: 0
      },
      score: {
        type: Sequelize.STRING,
        defaultValue: 0
      },
      resetPwdToken: {
        type: Sequelize.STRING
      },
      resetPwdExpire: {
        type: Sequelize.DATE
      },
      idPricing: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Pricings',
          key: 'id' // idPricing cua bang user lien ket voi id cua bang pricing
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
    await queryInterface.dropTable('Users');
  }
};
