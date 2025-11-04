<<<<<<< HEAD
import express from "express";
import authenticateToken from "../middleware/auth.js";
import { permit } from "../middleware/roles.js";
import User from "../models/User.js";
import Todo from "../models/Todo.js";

const router = express.Router();

router.use(authenticateToken, permit("admin"));

router.get("/users", async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
});

router.patch("/users/:id/role", async (req, res) => {
  const { role } = req.body;
  if (!["user", "admin"].includes(role)) return res.status(400).json({ message: "Invalid role" });
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

router.get("/todos", async (req, res) => {
  const todos = await Todo.find().populate("user", "username email").sort({ createdAt: -1 });
  res.json(todos);
});

export default router;
=======
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
>>>>>>> 4133f435f42f856e397f4544f05406be8d1653a0
