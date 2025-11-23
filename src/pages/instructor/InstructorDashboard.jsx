// src/pages/instructor/InstructorDashboard.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";

const InstructorDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* <Topbar /> */}
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet /> {/* Nested routes for AddCourse, Courses, etc */}
      </main>
    </div>
  );
};

export default InstructorDashboard;
