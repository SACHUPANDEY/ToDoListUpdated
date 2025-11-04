<<<<<<< HEAD
import Todo from "../models/Todo.js";

// 📌 Create a new todo
export const createTodo = async (req, res) => {
  try {
    const { title, description, dueDate, category } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = await Todo.create({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      category,
      user: req.user.id,
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📋 Get all todos for the logged-in user (or all if admin)
export const getTodos = async (req, res) => {
  try {
    let todos;

    if (req.user.role === "admin" && req.query.all === "true") {
      todos = await Todo.find()
        .populate("user", "username email role")
        .sort({ createdAt: -1 });
    } else {
      todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    }

    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔍 Get a specific todo by ID
export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id).populate("user", "username email role");
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Only owner or admin can view
    if (req.user.role !== "admin" && todo.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(todo);
  } catch (error) {
    console.error("Error getting todo:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✏️ Update a todo
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (req.user.role !== "admin" && todo.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const fields = ["title", "description", "dueDate", "category", "completed"];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        todo[field] = req.body[field];
      }
    });

    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🗑️ Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (req.user.role !== "admin" && todo.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await todo.deleteOne();
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Server error" });
=======
const Todo = require('../models/Todo');

// ✅ Create a new Todo
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const todo = new Todo({
      title,
      description,
      user: req.userId, // logged-in user ka ID (authMiddleware se)
    });

    await todo.save();
    res.status(201).json({ message: 'Todo created successfully', todo });
  } catch (error) {
    console.error('Create Todo Error:', error.message);
    res.status(500).json({ message: 'Server error while creating todo' });
  }
};

// ✅ Get all Todos for a user
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    console.error('Get Todos Error:', error.message);
    res.status(500).json({ message: 'Server error while fetching todos' });
  }
};

// ✅ Update a Todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.userId },
      { title, description, completed },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo updated successfully', todo });
  } catch (error) {
    console.error('Update Todo Error:', error.message);
    res.status(500).json({ message: 'Server error while updating todo' });
  }
};

// ✅ Delete a Todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({ _id: id, user: req.userId });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete Todo Error:', error.message);
    res.status(500).json({ message: 'Server error while deleting todo' });
>>>>>>> 4133f435f42f856e397f4544f05406be8d1653a0
  }
};
