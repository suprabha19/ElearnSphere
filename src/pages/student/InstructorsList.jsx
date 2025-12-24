// src/pages/student/InstructorsList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const InstructorsList = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/users/instructors");
      setInstructors(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching instructors:", err);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading instructors...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">👨‍🏫 Our Instructors</h1>

      {instructors.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No instructors available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((instructor) => (
            <div
              key={instructor._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              {/* Profile Picture */}
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 rounded-full bg-[#e44d30] text-white flex items-center justify-center text-3xl font-bold mb-3 overflow-hidden">
                  {instructor.profilePicture ? (
                    <img
                      src={`http://localhost:5000${instructor.profilePicture}`}
                      alt={instructor.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    instructor.fullName.charAt(0).toUpperCase()
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {instructor.fullName}
                </h3>
              </div>

              {/* Bio */}
              {instructor.bio && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {instructor.bio}
                </p>
              )}

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaEnvelope className="text-[#e44d30]" />
                  <span className="truncate">{instructor.email}</span>
                </div>
                {instructor.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaPhone className="text-[#e44d30]" />
                    <span>{instructor.phone}</span>
                  </div>
                )}
              </div>

              {/* Qualifications */}
              {instructor.qualifications && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    Qualifications:
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {instructor.qualifications}
                  </p>
                </div>
              )}

              {/* Experience */}
              {instructor.experience && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    Experience:
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {instructor.experience}
                  </p>
                </div>
              )}

              {/* Expertise */}
              {instructor.expertise && instructor.expertise.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Expertise:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {instructor.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-[#e44d30] bg-opacity-10 text-[#e44d30] px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstructorsList;
