// controllers/taskController.js
const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, listId } = req.body;
  try {
    const task = await Task.create({ title, listId });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// You can define more controller functions for task-related operations as needed

