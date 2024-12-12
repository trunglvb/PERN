'use strict';
const { pricings } = require('@utils/constants.js');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */

    await queryInterface.bulkInsert('Pricings', pricings, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     */

    await queryInterface.bulkDelete('Pricings', null, {});
  }
};
