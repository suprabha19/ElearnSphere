// src/pages/student/CourseDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await axios.get(`http://localhost:5000/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCourse(res.data.course);
        setEnrolled(res.data.isEnrolled || false);
      } catch (err) {
        console.error("Failed to fetch course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/courses/${id}/enroll`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEnrolled(true);
      alert("Enrolled successfully!");
    } catch (err) {
      console.error("Enroll failed:", err);
      alert("Failed to enroll");
    }
  };

  const handleStartLearning = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/courses/${id}/materials`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMaterials(res.data);
      setShowMaterials(true);
    } catch (err) {
      console.error("Failed to fetch materials:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading course...</p>;
  if (!course) return <p className="text-center mt-10">Course not found</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left side (details) */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-600 text-sm mb-4">
            Category: <span className="font-medium">{course.category}</span>
          </p>
          {course.instructor && (
            <p className="text-gray-600 text-sm mb-4">
              Instructor:{" "}
              <span className="font-medium">{course.instructor.fullName}</span>
            </p>
          )}
          <p className="text-gray-800 leading-relaxed">{course.description}</p>

          {/* Buttons */}
          <div className="mt-6 flex gap-3">
            {!enrolled ? (
              <button
                onClick={handleEnroll}
                className="bg-[#e44d30] hover:bg-[#b33b23] text-white px-5 py-2 rounded-lg font-medium transition"
              >
                Enroll Now
              </button>
            ) : (
              !showMaterials && (
                <button
                  onClick={handleStartLearning}
                  className="bg-[#e44d30] hover:bg-[#b33b23] text-white px-5 py-2 rounded-lg font-medium transition"
                >
                  Start Learning
                </button>
              )
            )}
          </div>
        </div>

        {/* Right side (image) */}
        {course.image && (
          <div className="w-full h-64 md:h-full">
            <img
              src={`http://localhost:5000${course.image}`}
              alt={course.title}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        )}
      </div>

      {/* Materials */}
      {showMaterials && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Course Materials</h2>
          {materials.length === 0 ? (
            <p className="text-gray-600">No materials uploaded yet.</p>
          ) : (
            <div className="space-y-6">
              {materials.map((m) => (
                <div
                  key={m._id}
                  className="border rounded-lg p-4 shadow-sm bg-white"
                >
                  {m.type === "pdf" ? (
                    <a
                      href={`http://localhost:5000${m.url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline font-medium"
                    >
                      {m.title} (PDF)
                    </a>
                  ) : m.type === "video" ? (
                    <div className="w-full">
                      <video
                        controls
                        src={`http://localhost:5000${m.url}`}
                        className="w-full rounded-lg shadow-md"
                      />
                    </div>
                  ) : (
                    <a
                      href={`http://localhost:5000${m.url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline font-medium"
                    >
                      {m.title}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
