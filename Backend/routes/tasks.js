const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const Board = require('../models/board');


router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    const board = await Board.findById(req.body.boardId);
    board.tasks.push(task._id);
    await board.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});


router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});


router.delete('/:taskId', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    const board = await Board.findById(task.boardId);
    board.tasks.pull(task._id);
    await board.save();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
