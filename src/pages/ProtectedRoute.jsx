// src/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Logged in but role is not allowed
    return <Navigate to="/" replace />; // you can redirect to home or some "unauthorized" page
  }

  return children;
};

export default ProtectedRoute;
