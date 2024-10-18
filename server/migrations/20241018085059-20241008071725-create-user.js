'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Users', 'idPricing', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.changeColumn('Users', 'phoneVerified', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      })
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Users', 'idPricing'),
      queryInterface.changeColumn('Users', 'phoneVerified')
    ]);
  }
};
