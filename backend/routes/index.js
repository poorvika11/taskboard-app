// routes/index.js
const express = require('express');
const router = express.Router();

// Import your controllers here
const userController = require('../controllers/userController');
const listController = require('../controllers/listController');
const taskController = require('../controllers/taskController');

// Define API routes and connect them to controllers
router.post('/users', userController.createUser);
router.post('/lists', listController.createList);
router.post('/tasks', taskController.createTask);
// Define more routes as needed

module.exports = router;
