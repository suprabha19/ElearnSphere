import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    alert("Reset link sent!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcf8f3] px-4">
      <div className="bg-white shadow-md p-8 rounded max-w-md w-full relative">
        {/* Close Icon */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <AiOutlineClose size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full mb-4 p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-[#e44d30] text-white py-2 rounded hover:bg-[#c0392b]"
          >
            Send Reset Link
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Remember password?{" "}
          <Link to="/login" className="text-[#e44d30] underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
