import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data);
    } catch (err) {
      setError("Failed to fetch todos.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Add todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/todos",
        { title: newTodo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([res.data, ...todos]);
      setNewTodo("");
    } catch (err) {
      setError("Failed to add todo.");
      throw err;
    }
  };

  // Toggle completion
  const toggleComplete = async (id, completed) => {
    try {
      await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        { completed: !completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(
        todos.map((t) => (t._id === id ? { ...t, completed: !completed } : t))
      );
    } catch {
      setError("Failed to update todo.");
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch {
      setError("Failed to delete todo.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading todos...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">📝 My To-Do List</h1>

        <form onSubmit={addTodo} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos yet!</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className={`flex justify-between items-center p-2 border rounded ${
                  todo.completed ? "bg-green-100" : "bg-white"
                }`}
              >
                <span
                  onClick={() => toggleComplete(todo._id, todo.completed)}
                  className={`flex-1 cursor-pointer ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
