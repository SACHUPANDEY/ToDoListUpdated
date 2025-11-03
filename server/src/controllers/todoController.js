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
  }
};
