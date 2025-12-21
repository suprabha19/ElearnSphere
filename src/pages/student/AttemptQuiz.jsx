// src/pages/student/AttemptQuiz.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AttemptQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && quiz && !submitting) {
      handleAutoSubmit();
    }
  }, [timeRemaining, submitting]);

  const handleAutoSubmit = async () => {
    if (submitting) return; // Prevent multiple submissions
    
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const formattedAnswers = Object.keys(answers).map((qIndex) => ({
        questionIndex: parseInt(qIndex),
        selectedAnswer: answers[qIndex],
      }));

      const res = await axios.post(
        "http://localhost:5000/api/quizzes/attempt",
        {
          quizId: id,
          answers: formattedAnswers,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("⏰ Time's up! Quiz submitted automatically.");
      navigate(`/student-dashboard/quiz-result/${res.data._id}`);
    } catch (err) {
      console.error("Failed to auto-submit quiz:", err);
      alert("Failed to submit quiz automatically. Please try again.");
      setSubmitting(false);
    }
  };

  const fetchQuiz = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/quizzes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuiz(res.data);
      setTimeRemaining(res.data.duration * 60); // Convert minutes to seconds
    } catch (err) {
      console.error("Failed to fetch quiz:", err);
      alert("Failed to load quiz");
      navigate("/student-dashboard/quizzes");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: optionIndex,
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (Object.keys(answers).length < quiz.questions.length) {
      if (!window.confirm("You haven't answered all questions. Submit anyway?")) {
        return;
      }
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const formattedAnswers = Object.keys(answers).map((qIndex) => ({
        questionIndex: parseInt(qIndex),
        selectedAnswer: answers[qIndex],
      }));

      const res = await axios.post(
        "http://localhost:5000/api/quizzes/attempt",
        {
          quizId: id,
          answers: formattedAnswers,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("✅ Quiz submitted successfully!");
      navigate(`/student-dashboard/quiz-result/${res.data._id}`);
    } catch (err) {
      console.error("Failed to submit quiz:", err);
      alert(err.response?.data?.message || "❌ Failed to submit quiz");
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) return <p className="p-6">Loading quiz...</p>;
  if (!quiz) return <p className="p-6">Quiz not found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {quiz.title}
            </h2>
            <p className="text-gray-600">{quiz.description}</p>
          </div>
          <div className="text-right">
            <div
              className={`text-2xl font-bold ${
                timeRemaining < 60 ? "text-red-600" : "text-gray-800"
              }`}
            >
              ⏱️ {formatTime(timeRemaining)}
            </div>
            <p className="text-sm text-gray-500">Time Remaining</p>
          </div>
        </div>

        <div className="flex gap-4 text-sm text-gray-600">
          <span>Questions: {quiz.questions.length}</span>
          <span>Total Points: {quiz.totalPoints}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex} className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">
              {qIndex + 1}. {question.question}
              <span className="text-sm text-gray-500 ml-2">
                ({question.points} point{question.points > 1 ? "s" : ""})
              </span>
            </h3>

            <div className="space-y-2">
              {question.options.map((option, oIndex) => (
                <label
                  key={oIndex}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
                    answers[qIndex] === oIndex
                      ? "bg-[#e44d30] bg-opacity-10 border-[#e44d30]"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    checked={answers[qIndex] === oIndex}
                    onChange={() => handleAnswerSelect(qIndex, oIndex)}
                    className="w-4 h-4 mr-3"
                  />
                  <span className="text-gray-800">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-[#e44d30] text-white py-3 rounded-lg font-medium hover:bg-[#c63d26] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit Quiz"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/student-dashboard/quizzes")}
            className="px-8 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttemptQuiz;
