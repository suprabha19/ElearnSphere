// src/pages/instructor/EditQuiz.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    duration: 30,
    isActive: true,
  });
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/quizzes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const quiz = res.data;
      setForm({
        title: quiz.title,
        description: quiz.description,
        category: quiz.category,
        duration: quiz.duration,
        isActive: quiz.isActive,
      });
      setQuestions(quiz.questions || []);
    } catch (err) {
      console.error("Failed to fetch quiz:", err);
      alert("Failed to load quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        points: 1,
      },
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) {
      alert("Quiz must have at least one question");
      return;
    }
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.title || !form.description || !form.category) {
      alert("Please fill in all required fields");
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question) {
        alert(`Question ${i + 1} is empty`);
        return;
      }
      if (q.options.some((opt) => !opt)) {
        alert(`Question ${i + 1} has empty options`);
        return;
      }
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/quizzes/${id}`,
        {
          ...form,
          questions,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("✅ Quiz updated successfully!");
      navigate("/instructor-dashboard/quizzes");
    } catch (err) {
      console.error("Failed to update quiz:", err);
      alert("❌ Failed to update quiz");
    }
  };

  if (loading) return <p className="p-6">Loading quiz...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Quiz</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Quiz Details</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quiz Title *
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e44d30] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e44d30] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e44d30] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes) *
              </label>
              <input
                type="number"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e44d30] outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium text-gray-700">
              Quiz is Active
            </label>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">Questions</h3>
            <button
              type="button"
              onClick={addQuestion}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              + Add Question
            </button>
          </div>

          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="bg-white p-6 rounded-xl shadow-md space-y-4"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-800">
                  Question {qIndex + 1}
                </h4>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Text *
                </label>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "question", e.target.value)
                  }
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e44d30] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options *
                </label>
                <div className="space-y-2">
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${qIndex}`}
                        checked={q.correctAnswer === oIndex}
                        onChange={() =>
                          handleQuestionChange(qIndex, "correctAnswer", oIndex)
                        }
                        className="w-4 h-4"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) =>
                          handleOptionChange(qIndex, oIndex, e.target.value)
                        }
                        placeholder={`Option ${oIndex + 1}`}
                        required
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e44d30] outline-none"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Select the radio button for the correct answer
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Points
                </label>
                <input
                  type="number"
                  value={q.points}
                  onChange={(e) =>
                    handleQuestionChange(
                      qIndex,
                      "points",
                      parseInt(e.target.value)
                    )
                  }
                  min="1"
                  className="w-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e44d30] outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-[#e44d30] text-white py-3 rounded-lg font-medium hover:bg-[#c63d26] transition"
          >
            Update Quiz
          </button>
          <button
            type="button"
            onClick={() => navigate("/instructor-dashboard/quizzes")}
            className="px-8 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditQuiz;
