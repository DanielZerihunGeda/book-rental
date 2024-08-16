'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Books', 'initial_quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });

    // Set initial_quantity to available_quantity for existing records
    await queryInterface.sequelize.query(
      `UPDATE "Books" SET "initial_quantity" = "available_quantity"`
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Books', 'initial_quantity');
  }
};