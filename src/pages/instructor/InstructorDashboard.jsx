// src/pages/instructor/InstructorDashboard.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardTopbar from "../../components/DashboardTopbar";

const InstructorDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardTopbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet /> {/* Nested routes for AddCourse, Courses, etc */}
        </main>
      </div>
    </div>
  );
};

export default InstructorDashboard;
