'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true
  });
  
  User.associate = function(models) {
    User.hasMany(models.Book, { foreignKey: 'ownerId' });
    User.hasMany(models.Rental, { foreignKey: 'userId' });
  };
  
  return User;
};
