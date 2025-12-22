// src/pages/student/QuizResult.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const QuizResult = () => {
  const { id } = useParams();
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttempt();
  }, [id]);

  const fetchAttempt = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/quizzes/attempts/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAttempt(res.data);
    } catch (err) {
      console.error("Failed to fetch attempt:", err);
      alert("Failed to load results");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading results...</p>;
  if (!attempt) return <p className="p-6">Results not found</p>;

  const { quiz, score, totalPoints, percentage, answers } = attempt;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Results</h2>
        <h3 className="text-xl text-gray-700 mb-4">{quiz.title}</h3>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              {score}/{totalPoints}
            </div>
            <div className="text-sm text-gray-600">Score</div>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">
              {percentage.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Percentage</div>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">
              {answers.filter((a) => a.isCorrect).length}/{answers.length}
            </div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>
        </div>

        <div className="text-center">
          {percentage >= 80 ? (
            <p className="text-green-600 font-semibold text-lg">
              🎉 Excellent! You did great!
            </p>
          ) : percentage >= 60 ? (
            <p className="text-blue-600 font-semibold text-lg">
              👍 Good job! Keep practicing!
            </p>
          ) : (
            <p className="text-orange-600 font-semibold text-lg">
              📚 Keep studying and try again!
            </p>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800">
          Question Review
        </h3>

        {quiz.questions.map((question, qIndex) => {
          const userAnswer = answers.find((a) => a.questionIndex === qIndex);
          const isCorrect = userAnswer?.isCorrect;

          return (
            <div
              key={qIndex}
              className={`bg-white rounded-xl shadow-md p-6 border-2 ${
                isCorrect ? "border-green-300" : "border-red-300"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-semibold text-lg text-gray-800">
                  {qIndex + 1}. {question.question}
                </h4>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isCorrect
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                </span>
              </div>

              <div className="space-y-2">
                {question.options.map((option, oIndex) => {
                  const isUserAnswer = userAnswer?.selectedAnswer === oIndex;
                  const isCorrectAnswer = question.correctAnswer === oIndex;

                  let bgColor = "bg-gray-50";
                  let borderColor = "border-gray-200";
                  let textColor = "text-gray-800";

                  if (isCorrectAnswer) {
                    bgColor = "bg-green-50";
                    borderColor = "border-green-500";
                    textColor = "text-green-800";
                  } else if (isUserAnswer && !isCorrect) {
                    bgColor = "bg-red-50";
                    borderColor = "border-red-500";
                    textColor = "text-red-800";
                  }

                  return (
                    <div
                      key={oIndex}
                      className={`p-3 border-2 rounded-lg ${bgColor} ${borderColor}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={textColor}>{option}</span>
                        <div className="flex gap-2">
                          {isUserAnswer && (
                            <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded">
                              Your Answer
                            </span>
                          )}
                          {isCorrectAnswer && (
                            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded">
                              Correct Answer
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 text-sm text-gray-600">
                Points earned: {userAnswer?.points || 0} / {question.points}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/student-dashboard/quizzes"
          className="px-8 py-3 bg-[#e44d30] text-white rounded-lg font-medium hover:bg-[#c63d26] transition inline-block"
        >
          Back to Quizzes
        </Link>
      </div>
    </div>
  );
};

export default QuizResult;
