import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userRes = await axios.get("http://localhost:5000/api/users");
      const todoRes = await axios.get("http://localhost:5000/api/todos");
      setUsers(userRes.data);
      setTodos(todoRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-8">
        {/* Users Table */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Todos Table */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">All Todos</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Todo</th>
                <th className="p-2">Created By</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((t) => (
                <tr key={t._id} className="border-t">
                  <td className="p-2">{t.todo}</td>
                  <td className="p-2">{t.userName || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
