// src/pages/student/CourseDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `http://localhost:5000/api/courses/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCourse(data.course);
      } catch (err) {
        console.error("Course fetch error:", err);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Title, Category, Description, Enroll */}
          <div>
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {course.title}
            </h1>

            {/* Category */}
            <p className="text-sm text-gray-600 mb-6">
              Category:{" "}
              <span className="font-medium text-gray-600">
                {course.category}
              </span>
            </p>

            {/* Instructor */}
            {course.instructor && (
              <p className="text-sm text-gray-600 mb-6">
                Instructor:{" "}
                <span className="font-medium text-gray-800">
                  {course.instructor.fullName}
                </span>
                {course.instructor.email && (
                  <span className="text-gray-500 text-xs ml-2">
                    ({course.instructor.email})
                  </span>
                )}
              </p>
            )}

            {/* Description */}
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {course.description}
            </p>

            {/* Enroll button */}
            <Link
              to={`/signup`}
              className="px-8 py-2 bg-[#e44d30] text-white text-lg font-medium rounded-lg shadow hover:bg-[#ae4530] transition"
            >
              Enroll
            </Link>
          </div>

          {/* Right: Image */}
          {course.image && (
            <div className="w-full h-80 rounded-lg overflow-hidden shadow-lg">
              <img
                src={`http://localhost:5000${course.image}`}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetail;
