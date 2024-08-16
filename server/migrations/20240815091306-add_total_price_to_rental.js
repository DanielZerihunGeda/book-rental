module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Rentals', 'totalPrice', {
      type: Sequelize.DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Rentals', 'totalPrice');
  }
};
