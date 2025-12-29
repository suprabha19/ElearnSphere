import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData
      );
      const { token, role, user } = res.data;

      // Store token & role
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));

      // Check instructor status if applicable
      if (role === "INSTRUCTOR" && user.instructorStatus !== "APPROVED") {
        setError("Your instructor account is pending admin approval");
        setIsLoading(false);
        return;
      }

      // Show success popup
      setSuccess(true);

      // Navigate based on role
      switch (user.role) {
        case "STUDENT":
          navigate("/student-dashboard");
          break;
        case "INSTRUCTOR":
          navigate("/instructor-dashboard");
          break;
        case "ADMIN":
          navigate("/admin-dashboard");
          break;
        default:
          navigate("/"); // fallback
      }
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcf8f3] px-4">
      <div className="bg-white shadow-md p-8 rounded max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
          aria-label="Close login form"
        >
          <AiOutlineClose size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Login successful! Redirecting...
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#e44d30]"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              minLength="8"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#e44d30]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#e44d30] text-white py-3 rounded hover:bg-[#c0392b] transition-colors font-semibold ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* <div className="text-center pt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-[#e44d30] hover:underline"
            >
              Forgot password?
            </Link>
          </div> */}
        </form>

        <div className="border-t border-gray-200 mt-6 pt-4 text-sm text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#e44d30] font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
