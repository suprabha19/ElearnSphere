// src/pages/instructor/DeleteCourse.jsx
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteCourse = ({ courseId }) => {
  const navigate = useNavigate();

  const handleDeleteCourse = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this course? All materials will be removed."
      )
    )
      return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh courses after deletion
      alert("Course deleted successfully!");
      navigate("/instructor-dashboard/courses"); // redirect after deletion
    } catch (err) {
      console.error(err);
      alert("Failed to delete course");
    }
  };

  return (
    <button
      onClick={handleDeleteCourse}
      className="px-4 py-2 bg-[#e44d30] text-white text-sm font-medium rounded-lg shadow hover:bg-[#ce472c] transition"
    >
      Delete Course
    </button>
  );
};

export default DeleteCourse;
