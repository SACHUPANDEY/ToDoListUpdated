const express = require('express');
const auth = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');
const User = require('../models/User');
const Todo = require('../models/Todo');

const router = express.Router();

// GET /api/admin/users - admin only
router.get('/users', auth, requireRole('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// PATCH /api/admin/users/:id/role - admin only
router.patch('/users/:id/role', auth, requireRole('admin'), async (req, res) => {
  const { role } = req.body;
  if (!['user','admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
  res.json(user);
});

// GET /api/admin/todos - admin only
router.get('/todos', auth, requireRole('admin'), async (req, res) => {
  const todos = await Todo.find().populate('user', 'username email');
  res.json(todos);
});

module.exports = router;
