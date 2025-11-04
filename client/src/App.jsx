<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
=======
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import TodoDashboard from "./pages/Todos/TodoDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* 🌈 Navbar */}
        <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
          <div className="container mx-auto flex justify-between items-center p-4">
            <h1 className="text-xl font-bold tracking-wide">
              📝 ToDo<span className="text-yellow-300">List</span>
            </h1>

            <div className="space-x-4">
              <Link
                to="/"
                className="hover:bg-white hover:text-blue-600 px-3 py-1 rounded-md transition-all duration-300"
              >
                Home
              </Link>
              <Link
                to="/todos"
                className="hover:bg-white hover:text-blue-600 px-3 py-1 rounded-md transition-all duration-300"
              >
                Todos
              </Link>
              <Link
                to="/admin"
                className="hover:bg-white hover:text-blue-600 px-3 py-1 rounded-md transition-all duration-300"
              >
                Admin
              </Link>
              <Link
                to="/login"
                className="hover:bg-white hover:text-blue-600 px-3 py-1 rounded-md transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:bg-white hover:text-blue-600 px-3 py-1 rounded-md transition-all duration-300"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>

        {/* 🌤️ Main Content */}
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 text-gray-800">
          <div className="container mx-auto p-6">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="text-center mt-10">
                    <h2 className="text-3xl font-bold text-gray-700 mb-4">
                      Welcome 👋
                    </h2>
                    <p className="text-lg text-gray-600">
                      Start managing your tasks — visit{" "}
                      <span className="font-semibold text-blue-600">
                        /todos
                      </span>{" "}
                      or{" "}
                      <span className="font-semibold text-purple-600">
                        /admin
                      </span>
                      .
                    </p>
                  </div>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/todos"
                element={
                  <ProtectedRoute>
                    <TodoDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
>>>>>>> 4133f435f42f856e397f4544f05406be8d1653a0
