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
    },
    returnedQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.0
    }
  }, {
    timestamps: true,
    hooks: {
      beforeCreate: async (rental, options) => {
        console.log('beforeCreate hook called');
        const book = await sequelize.models.Book.findByPk(rental.bookId);
        if (book) {
          const rentDays = Math.ceil((rental.rentEnd - rental.rentStart) / (1000 * 60 * 60 * 24));
          rental.totalPrice = book.price * rentDays * rental.quantity;
          console.log(`Calculated totalPrice: ${rental.totalPrice}`);
        } else {
          console.log('Book not found');
        }
      },
      beforeUpdate: async (rental, options) => {
        console.log('beforeUpdate hook called');
        const book = await sequelize.models.Book.findByPk(rental.bookId);
        if (book) {
          const rentDays = Math.ceil((rental.rentEnd - rental.rentStart) / (1000 * 60 * 60 * 24)); // Difference in days
          rental.totalPrice = book.price * rentDays * rental.quantity;
          console.log(`Calculated totalPrice: ${rental.totalPrice}`);
        } else {
          console.log('Book not found');
        }
      }
    }
  });

  Rental.associate = function(models) {
    Rental.belongsTo(models.Book, { foreignKey: 'bookId', as: 'book' });
    Rental.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Rental;
};