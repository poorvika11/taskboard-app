const Sequelize = require('sequelize');
const sequelize = require('../db');

// Importing models
const User = require('./User');
const List = require('./List');
const Task = require('./Task');

// Define associations if needed
List.belongsTo(User); // Assuming List has a foreign key userId
Task.belongsTo(List); // Assuming Task has a foreign key listId

const db = {
  User: User,
  List: List,
  Task: Task,
  sequelize: sequelize, // Export the sequelize instance if needed
  Sequelize: Sequelize, // Export Sequelize for data types and operators
};

module.exports = db;
