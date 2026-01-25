import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrolledCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/users/me/enrolled-courses",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch enrolled courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  if (loading) return <p>Loading your courses...</p>;
  if (courses.length === 0)
    return <p>You are not enrolled in any courses yet.</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Courses</h2>
      <div className="space-y-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="flex flex-col md:flex-row items-start gap-6 bg-white shadow-md rounded-xl overflow-hidden border border-gray-200"
          >
            {course.image && (
              <img
                src={`http://localhost:5000${course.image}`}
                alt={course.title}
                className="w-full md:w-60 h-40 object-cover"
              />
            )}
            {/* Course Info */}
            <div className="flex-1 p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Category: {course.category}
              </p>
              {course.instructor && (
                <p className="text-sm text-gray-500 mb-2">
                  Instructor:{" "}
                  <span className="font-medium text-gray-700">
                    {course.instructor.fullName}
                  </span>
                </p>
              )}
              <p className="text-gray-700 mb-4">{course.description}</p>
              <Link
                to={`/student-dashboard/course/${course._id}`}
                className="px-4 py-2 bg-[#e44d30] text-white text-sm font-medium rounded-lg shadow hover:bg-[#ce482d] transition"
              >
                View Course
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;
