const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

router.post('/create', TaskController.createTask);
router.put('/update/:taskId', TaskController.updateTask);
router.delete('/delete/:taskId', TaskController.deleteTask);

module.exports = router;
