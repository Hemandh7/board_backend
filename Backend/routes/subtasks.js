const express = require('express');
const router = express.Router();
const Subtask = require('../models/subtask');


router.post('/', async (req, res) => {
  try {
    const subtask = await Subtask.create(req.body);
    res.status(201).json(subtask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create subtask' });
  }
});


router.get('/', async (req, res) => {
  try {
    const subtasks = await Subtask.find();
    res.json(subtasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subtasks' });
  }
});


router.delete('/:subtaskId', async (req, res) => {
  try {
    await Subtask.findByIdAndDelete(req.params.subtaskId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete subtask' });
  }
});

module.exports = router;
