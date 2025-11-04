import { useState, useEffect } from "react";
import axios from "axios";

const TodoForm = ({ onTodoCreated, existingTodo, token }) => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "Non-Urgent",
  });

  useEffect(() => {
    if (existingTodo) {
      setTodo(existingTodo);
    }
  }, [existingTodo]);

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (existingTodo) {
        await axios.put(`http://localhost:5000/api/todos/${existingTodo._id}`, todo, config);
      } else {
        await axios.post("http://localhost:5000/api/todos", todo, config);
      }
      setTodo({ title: "", description: "", dueDate: "", category: "Non-Urgent" });
      onTodoCreated(); // refresh todos
    } catch (err) {
      console.error("Todo save failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md mx-auto space-y-4"
    >
      <h3 className="text-xl font-semibold text-gray-700">
        {existingTodo ? "Edit Todo" : "Create Todo"}
      </h3>

      <input
        type="text"
        name="title"
        placeholder="Title (max 100 chars)"
        value={todo.title}
        maxLength={100}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
      />

      <textarea
        name="description"
        placeholder="Description (max 500 chars)"
        value={todo.description}
        maxLength={500}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="date"
        name="dueDate"
        value={todo.dueDate}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
      />

      <select
        name="category"
        value={todo.category}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
      >
        <option value="Urgent">Urgent</option>
        <option value="Non-Urgent">Non-Urgent</option>
      </select>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        {existingTodo ? "Update Todo" : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
