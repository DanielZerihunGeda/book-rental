'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define('Rental', {
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Books', 
        key: 'id'
      },
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', 
        key: 'id'
      },
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rentStart: { 
      type: DataTypes.DATE,
      allowNull: false
    },
    rentEnd: { 
      type: DataTypes.DATE,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    timestamps: true 
  });

  Rental.associate = function(models) {
    Rental.belongsTo(models.Book, { foreignKey: 'bookId', as: 'book' });
    Rental.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Rental;
};