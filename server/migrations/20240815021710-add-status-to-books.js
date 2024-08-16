'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Books', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'available'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Books', 'status');
  }
};
