const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const Todo = require('../models/Todo');

const router = express.Router();

// GET /api/todos
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const todos = await Todo.find().populate('user', 'username email');
      return res.json(todos);
    }
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// POST /api/todos
router.post('/', auth, [
  body('title').isLength({ min: 1, max: 100 }),
  body('description').optional().isLength({ max: 500 }),
  body('category').isIn(['Urgent','Non-Urgent']).optional()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { title, description, dueDate, category } = req.body;
    const todo = new Todo({ title, description, dueDate, category, user: req.user.id });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// PUT /api/todos/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Not found' });

    if (req.user.role !== 'admin' && String(todo.user) !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    const updates = req.body;
    Object.assign(todo, updates);
    await todo.save();
    res.json(todo);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// DELETE /api/todos/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Not found' });

    if (req.user.role !== 'admin' && String(todo.user) !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    await todo.remove();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
