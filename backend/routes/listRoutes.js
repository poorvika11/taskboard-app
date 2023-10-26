const express = require('express');
const router = express.Router();
const ListController = require('../controllers/ListController');

router.post('/create', ListController.createList);
router.get('/all', ListController.getAllLists);

module.exports = router;
