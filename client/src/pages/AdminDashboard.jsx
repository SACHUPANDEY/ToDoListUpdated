import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch users and todos
  const fetchAdminData = async () => {
    try {
      const [userRes, todoRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/admin/todos", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setUsers(userRes.data);
      setTodos(todoRes.data);
    } catch (err) {
      setError("Failed to load admin data.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Change user role
  const changeRole = async (id, role) => {
    try {
      const newRole = role === "admin" ? "user" : "admin";
      await axios.patch(
        `http://localhost:5000/api/admin/users/${id}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(
        users.map((u) =>
          u._id === id ? { ...u, role: newRole } : u
        )
      );
    } catch (err) {
      setError("Failed to update role.");
      throw err;
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading admin data...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">👑 Admin Dashboard</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Users Section */}
      <div className="bg-white p-5 rounded-2xl shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-3">All Users</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Username</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-2">{u.username}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2 capitalize">{u.role}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => changeRole(u._id, u.role)}
                    className={`px-3 py-1 rounded text-white ${
                      u.role === "admin" ? "bg-red-500" : "bg-green-600"
                    }`}
                  >
                    {u.role === "admin" ? "Revoke Admin" : "Make Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Todos Section */}
      <div className="bg-white p-5 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-3">All Todos</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">User</th>
              <th className="p-2">Title</th>
              <th className="p-2">Category</th>
              <th className="p-2">Completed</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((t) => (
              <tr key={t._id} className="border-t">
                <td className="p-2">{t.user?.username || "Unknown"}</td>
                <td className="p-2">{t.title}</td>
                <td className="p-2">{t.category}</td>
                <td className="p-2">{t.completed ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
