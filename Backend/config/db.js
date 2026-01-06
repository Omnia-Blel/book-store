// backend/config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'bookstore',
  process.env.DB_USER || 'test',
  process.env.DB_PASS || 'test',
  {
    host: process.env.DB_HOST || 'mysql_container',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: console.log,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Connecté à la base de données MySQL avec Sequelize');
  })
  .catch(err => {
    console.error('❌ Erreur de connexion à la base de données:', err.message);
  });

module.exports = sequelize;