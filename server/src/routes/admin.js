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
