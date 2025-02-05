import React, { useState } from "react";
import OAuthLogin from "./OAuthLogin";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    } 

    // Validate email
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // True if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", { name, email, password });
      // Handle API call or other logic here
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
        <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 bg-[#181818] border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
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
          >
            Register
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
          Already have an account?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
