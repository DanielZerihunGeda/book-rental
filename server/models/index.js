require('dotenv').config();
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

console.log('Environment:', env);
console.log('Configuration loaded:', config);
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_DIALECT:', process.env.DB_DIALECT);

const db = {};

let sequelize;
if (config && config.use_env_variable) {
  console.log('Using environment variable for database URL');
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else if (config) {
  console.log('Using database configuration directly');
  sequelize = new Sequelize(config.database, config.username, config.password, config);
} else {
  console.error('Configuration is undefined. Please check your config file and environment variables.');
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

testConnection();

module.exports = db;