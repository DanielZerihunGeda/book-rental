'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Books', 'status');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Books', 'status', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
