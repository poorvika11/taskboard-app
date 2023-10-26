const Task = require('../models/Task');

class TaskController {
  async createTask(req, res) {
    const { title, listId } = req.body;
    const userId = req.user.username; // Assuming username is used as userId

    try {
      const task = await Task.create({ title, listId, userId });
      res.status(201).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async updateTask(req, res) {
    const taskId = req.params.taskId;
    const { title, completed } = req.body;
    const userId = req.user.username;

    try {
      const task = await Task.findOne({ where: { id: taskId, userId } });
      if (!task) return res.status(404).send('Task not found');

      task.title = title;
      task.completed = completed;
      await task.save();

      res.json(task);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteTask(req, res) {
    const taskId = req.params.taskId;
    const userId = req.user.username;

    try {
      const task = await Task.findOne({ where: { id: taskId, userId } });
      if (!task) return res.status(404).send('Task not found');

      await task.destroy();
      res.sendStatus(204); // No content (task successfully deleted)
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getTasksForList(req, res) {
    const listId = req.params.listId;
    const userId = req.user.username;

    try {
      const tasks = await Task.findAll({ where: { listId, userId } });
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new TaskController();
