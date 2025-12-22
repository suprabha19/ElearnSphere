// src/pages/student/StudentQuizzes.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const StudentQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const [quizzesRes, attemptsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/quizzes", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/quizzes/attempts/my-attempts", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setQuizzes(quizzesRes.data);
      setAttempts(attemptsRes.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  const isAttempted = (quizId) => {
    return attempts.some((attempt) => attempt.quiz._id === quizId);
  };

  const getAttemptResult = (quizId) => {
    return attempts.find((attempt) => attempt.quiz._id === quizId);
  };

  if (loading) return <p className="p-6">Loading quizzes...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Available Quizzes</h2>

      {quizzes.length === 0 ? (
        <p className="text-gray-600">No quizzes available at the moment.</p>
      ) : (
        <div className="space-y-6">
          {quizzes.map((quiz) => {
            const attempted = isAttempted(quiz._id);
            const result = getAttemptResult(quiz._id);

            return (
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
                    {quiz.instructor && (
                      <p className="text-sm text-gray-500 mb-2">
                        Instructor: {quiz.instructor.fullName}
                      </p>
                    )}
                    <p className="text-gray-700 mb-3">{quiz.description}</p>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>Questions: {quiz.questions?.length || 0}</span>
                      <span>Total Points: {quiz.totalPoints}</span>
                      <span>Duration: {quiz.duration} min</span>
                    </div>

                    {attempted && result && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm font-medium text-green-800">
                          ✅ Completed - Score: {result.score}/{result.totalPoints} (
                          {result.percentage.toFixed(1)}%)
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    {!attempted ? (
                      <Link
                        to={`/student-dashboard/quiz/${quiz._id}/attempt`}
                        className="px-4 py-2 bg-[#e44d30] text-white text-sm font-medium rounded-lg hover:bg-[#ce472c] transition text-center"
                      >
                        Attempt Quiz
                      </Link>
                    ) : (
                      <Link
                        to={`/student-dashboard/quiz-result/${result._id}`}
                        className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition text-center"
                      >
                        View Results
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentQuizzes;
