const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  async register(req, res) {
    const { username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { username } });
      if (!user) return res.status(401).send('Invalid username or password');

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).send('Invalid username or password');

      const accessToken = jwt.sign({ username }, process.env.SECRET_KEY);
      res.json({ accessToken });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new UserController();
