// src/pages/instructor/EnrolledStudents.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaBookOpen } from "react-icons/fa";

const EnrolledStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  const fetchEnrolledStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:5000/api/users/enrolled-students",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudents(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching enrolled students:", err);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading students...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">👨‍🎓 Enrolled Students</h1>

      {students.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No students enrolled in your courses yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div
              key={student._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              {/* Profile Icon */}
              <div className="flex flex-col items-center mb-4">
                <div className="w-20 h-20 rounded-full bg-[#e44d30] text-white flex items-center justify-center text-2xl font-bold mb-3">
                  {student.fullName.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {student.fullName}
                </h3>
              </div>

              {/* Bio */}
              {student.bio && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {student.bio}
                </p>
              )}

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaEnvelope className="text-[#e44d30]" />
                  <span className="truncate">{student.email}</span>
                </div>
                {student.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaPhone className="text-[#e44d30]" />
                    <span>{student.phone}</span>
                  </div>
                )}
              </div>

              {/* Enrolled Courses */}
              {student.enrolledCourses && student.enrolledCourses.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaBookOpen className="text-[#e44d30]" />
                    Enrolled in Your Courses:
                  </h4>
                  <div className="space-y-1">
                    {student.enrolledCourses.map((course, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 px-3 py-2 rounded text-sm text-gray-700"
                      >
                        {course.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {students.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <p className="text-gray-600">
            Total Students: <span className="font-bold text-[#e44d30]">{students.length}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default EnrolledStudents;
