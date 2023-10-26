const List = require('../models/List');

class ListController {
  async createList(req, res) {
    const { title } = req.body;
    const userId = req.user.username;

    try {
      const list = await List.create({ title, userId });
      res.status(201).json(list);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getAllLists(req, res) {
    const userId = req.user.username;

    try {
      const lists = await List.findAll({ where: { userId } });
      res.json(lists);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new ListController();
