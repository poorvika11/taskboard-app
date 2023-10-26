
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, List, Task } = require('/home/skyfly/Desktop/ascend/taskboard-app/backend/models'); // Import Sequelize models
const sequelize = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(cors());

require('dotenv').config(); // Load environment variables from .env file
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key'; // Use default_secret_key if .env file is not found


// Authentication Middleware
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user) return res.status(401).send('Invalid username or password');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send('Invalid username or password');

  const accessToken = jwt.sign({ username }, SECRET_KEY);
  res.json({ accessToken });
});

// Create List Route
app.post('/lists', authenticateToken, async (req, res) => {
  const { title } = req.body;
  const userId = req.user.username;

  try {
    const list = await List.create({ title, userId });
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Create Task Route
app.post('/tasks', authenticateToken, async (req, res) => {
  const { title, listId } = req.body;
  const userId = req.user.username;

  try {
    const task = await Task.create({ title, listId, userId });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Update Task Route
app.put('/tasks/:taskId', authenticateToken, async (req, res) => {
  const { title, completed } = req.body;
  const taskId = req.params.taskId;
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
});

// Delete Task Route
app.delete('/tasks/:taskId', authenticateToken, async (req, res) => {
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
});

// Get Tasks for a Specific List Route
app.get('/tasks/:listId', authenticateToken, async (req, res) => {
  const listId = req.params.listId;
  const userId = req.user.username;

  try {
    const tasks = await Task.findAll({ where: { listId, userId } });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
});
