// db.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('taskboard', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;

