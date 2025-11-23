// src/pages/student/StudentDashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
// import StudentTopbar from "./StudentTopbar";

const StudentDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main area */}
      {/* <div className="flex-1 flex flex-col">
        {/* Topbar */}
      {/* <StudentTopbar />  */}

      {/* Content area (dynamic) */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet /> {/* All child routes will render here */}
      </main>
    </div>
    // </div>
  );
};

export default StudentDashboard;
