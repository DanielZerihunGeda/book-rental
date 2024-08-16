'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    initial_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    available_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    ownerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false
    },
    status: { 
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'available' 
    }
  }, {
    timestamps: true,
    hooks: {
      beforeCreate: (book, options) => {
        book.available_quantity = book.initial_quantity;
      }
    }
  });

  Book.associate = function(models) {
    Book.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
  };

  return Book;
};