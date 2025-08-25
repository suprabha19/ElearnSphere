import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#e6f7ff] flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-4">Welcome, Admin 🛠️</h2>
        <p className="text-gray-700 mb-6">
          You can manage users, assign roles, and monitor platform analytics.
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
