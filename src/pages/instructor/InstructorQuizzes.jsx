// src/pages/instructor/InstructorQuizzes.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const InstructorQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/quizzes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes(res.data);
    } catch (err) {
      console.error("Failed to fetch quizzes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/quizzes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Quiz deleted successfully");
      fetchQuizzes();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete quiz");
    }
  };

  if (loading) return <p className="p-6">Loading quizzes...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Quizzes</h2>
        <Link
          to="/instructor-dashboard/add-quiz"
          className="px-4 py-2 bg-[#e44d30] text-white font-medium rounded-lg hover:bg-[#ce472c] transition"
        >
          + Add New Quiz
        </Link>
      </div>

      {quizzes.length === 0 ? (
        <p className="text-gray-600">No quizzes created yet.</p>
      ) : (
        <div className="space-y-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Category: {quiz.category}
                  </p>
                  <p className="text-gray-700 mb-3">{quiz.description}</p>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>Questions: {quiz.questions?.length || 0}</span>
                    <span>Total Points: {quiz.totalPoints}</span>
                    <span>Duration: {quiz.duration} min</span>
                    <span className={quiz.isActive ? "text-green-600" : "text-red-600"}>
                      {quiz.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    to={`/instructor-dashboard/quizzes/${quiz._id}/edit`}
                    className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(quiz._id)}
                    className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstructorQuizzes;
