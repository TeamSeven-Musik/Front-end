import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import OAuthLogin from "./OAuthLogin";
import api from "../config/axios"; // Import axios instance

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const validateForm = () => {
    const newErrors = {};

    // Validate email
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // True if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await api.post("/Login", { email, password }); // Sử dụng axios instance

      if (response.status === 200) {
        const data = response.data;
        console.log("Login successful:", data.token);
        // Lưu token hoặc thông tin người dùng vào localStorage/sessionStorage
        localStorage.setItem("token", data.token);
        // Điều hướng đến trang Home
        navigate("/"); // Navigate to Home
      } else {
        // Hiển thị lỗi từ API
        setErrors({ api: response.data.message || "Login failed. Please try again." });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrors({ api: "An unexpected error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSuccess = (user) => {
    console.log("OAuth login success:", user);
    // Handle logic for saving user information
  };

  const handleOAuthFailure = (error) => {
    console.error("OAuth login failed:", error);
  };

  return (
    <div className="h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-[#121212] p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {errors.api && <p className="text-red-500 text-sm">{errors.api}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 bg-[#181818] border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 bg-[#181818] border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 rounded-lg text-black font-bold hover:bg-green-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* OAuth Login */}
        <div className="mt-4">
          <OAuthLogin
            onLoginSuccess={handleOAuthSuccess}
            onLoginFailure={handleOAuthFailure}
          />
        </div>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Don't have an account?{" "}
          <span
            className="text-green-500 hover:underline cursor-pointer"
            onClick={() => navigate("/register")} // Use navigate instead of href
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;