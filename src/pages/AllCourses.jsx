import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const AllStudentCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="p-6 ml-">
      <h2 className="text-3xl font-bold mb-6 mt-15 text-gray-800">
        All Courses
      </h2>
      <div className="space-y-6">
        {courses.map((c) => (
          <div
            key={c._id}
            className="flex flex-col md:flex-row items-start gap-6 bg-white shadow-md rounded-xl overflow-hidden border border-gray-200"
          >
            {/* Course Image */}
            {c.image && (
              <img
                src={`http://localhost:5000${c.image}`}
                alt={c.title}
                className="w-full md:w-60 h-40 object-cover"
              />
            )}
            {/* Course Info */}
            <div className="flex-1 p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {c.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Category: {c.category}
              </p>
              {c.instructor && (
                <p className="text-sm text-gray-500 mb-2">
                  Instructor: <span className="font-medium text-gray-700">{c.instructor.fullName}</span>
                </p>
              )}
              
              {/* Rating Display */}
              {c.totalReviews > 0 && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={16}
                        className={
                          star <= Math.round(c.averageRating || 0)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {(c.averageRating || 0).toFixed(1)} ({c.totalReviews} {c.totalReviews === 1 ? "review" : "reviews"})
                  </span>
                </div>
              )}
              
              <p className="text-gray-700 mb-4">{c.description}</p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to={`/courses/${c._id}`}
                  className="px-4 py-2 bg-[#e44d30] text-white text-sm font-medium rounded-lg shadow hover:bg-[#ae4530] transition"
                >
                  View Details
                </Link>
                <Link
                  to={`/signup`}
                  className="px-4 py-2 bg-[#e44d30] text-white text-sm font-medium rounded-lg shadow hover:bg-[#ae4530] transition"
                >
                  Enroll
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const handleEnroll = async (courseId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please login first.");

    await axios.post(
      `http://localhost:5000/api/courses/${courseId}/enroll`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("✅ Enrolled successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to enroll: " + (err.response?.data?.message || err.message));
  }
};

export default AllStudentCourses;
