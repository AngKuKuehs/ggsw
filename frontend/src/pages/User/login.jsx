import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/header";
import Footer from "../../components/footer";

// const backendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrl = "http://localhost:5000";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${backendUrl}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // VERY IMPORTANT for cookies
        body: JSON.stringify(formData),
      });
      alert(`${backendUrl}/api/users/login`);
      if (!response.ok) throw new Error("Login failed");
  
      const data = await response.json();
      console.log("Login successful:", data);
  
      // Optionally redirect or update global auth state
      alert("Logged in successfully!");
  
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error("Login error:", error);
      alert(error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center px-4 py-4 bg-gray-50 min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition duration-200"
            >
              Log In
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-700 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;