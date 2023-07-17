const express = require('express');
const router = express.Router();
const Board = require('../models/board');
const Task = require('../models/task');

router.post('/', async (req, res) => {
  try {
    const board = await Board.create(req.body);
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create board' });
  }
});

router.get('/', async (req, res) => {
  try {
    const boards = await Board.find().populate('tasks');
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
});

router.delete('/:boardId', async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.boardId);
    await Task.deleteMany({ _id: { $in: req.params.boardId.tasks } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete board' });
  }
});

module.exports = router;
