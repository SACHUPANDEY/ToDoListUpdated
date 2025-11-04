<<<<<<< HEAD
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, maxlength: 500 },
  dueDate: { type: Date },
  category: { type: String, enum: ["Urgent", "Non-Urgent"], default: "Non-Urgent" },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
=======
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title:       { type: String, required: true, maxlength: 100 },
  description: { type: String, maxlength: 500 },
  dueDate:     { type: Date },
  category:    { type: String, enum: ['Urgent','Non-Urgent'], default: 'Non-Urgent' },
  completed:   { type: Boolean, default: false },
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
>>>>>>> 4133f435f42f856e397f4544f05406be8d1653a0
}, { timestamps: true });

todoSchema.index({ user: 1 });

<<<<<<< HEAD
const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
=======
module.exports = mongoose.model('Todo', todoSchema);
>>>>>>> 4133f435f42f856e397f4544f05406be8d1653a0
