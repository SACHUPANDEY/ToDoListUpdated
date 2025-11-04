import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("⏳ Logging in...");

    try {
      // ✅ Match backend field names
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.emailOrUsername, // backend checks both email/username
        password: formData.password,
      });

      // ✅ Store token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      setMessage("✅ Login successful!");
      setTimeout(() => {
        // ✅ Redirect based on role (admin or normal user)
        const storedUser = res.data;
        if (storedUser.username === "admin" || storedUser.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 800);
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "❌ Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96 transition-all hover:shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Welcome Back 👋
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="emailOrUsername"
            placeholder="Email or Username"
            value={formData.emailOrUsername}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded text-white font-semibold transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p
            className={`text-center text-sm mt-4 ${
              message.includes("❌")
                ? "text-red-600"
                : message.includes("✅")
                ? "text-green-600"
                : "text-gray-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
