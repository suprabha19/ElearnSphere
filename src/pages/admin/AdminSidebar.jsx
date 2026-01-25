// src/pages/admin/AdminSidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  BookOpen,
  Settings,
  LogOut,
  BarChart,
  User,
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "home", icon: <Home size={18} /> },
    { name: "User Management", path: "users", icon: <Users size={18} /> },
    {
      name: "Course Management",
      path: "courses",
      icon: <BookOpen size={18} />,
    },
    { name: "Analytics", path: "analytics", icon: <BarChart size={18} /> },
    { name: "Settings", path: "settings", icon: <Settings size={18} /> },
    { name: "Profile", path: "profile", icon: <User size={18} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside className="h-screen w-64 bg-[#ce472c] text-white flex flex-col">
      {/* Logo / Title */}
      <div className="flex items-center justify-center h-20 border-b border-[#e44d30]">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              location.pathname.includes(item.path)
                ? "bg-[#e44d30] font-semibold"
                : "hover:bg-[#e44d30]"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="px-4 py-6 border-t border-[#e44d30]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-100 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
