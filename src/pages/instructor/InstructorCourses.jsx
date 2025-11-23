// src/pages/instructor/InstructorCourses.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteCourse from "./DeleteCourse";

const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please login first.");

        const res = await axios.get(
          "http://localhost:5000/api/courses/instructor",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        alert(
          "❌ Failed to fetch courses: " +
            (err.response?.data?.message || err.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;

  return (
    // <div>
    //   <h2 className="text-2xl font-bold mb-4">My Courses</h2>
    //   <div className="grid gap-4">
    //     {courses.map((c) => (
    //       <div key={c._id} className="p-4 border rounded bg-white">
    //         <h3 className="font-bold">{c.title}</h3>
    //         {c.image && (
    //           <img
    //             src={`http://localhost:5000${c.image}`}
    //             alt={c.title}
    //             style={{ width: "200px", height: "auto" }}
    //           />
    //         )}
    //         <p>{c.category}</p>
    //         <p>{c.description}</p>

    //         <div className="flex gap-3 mt-2">
    //           <Link
    //             to={`/instructor-dashboard/courses/${c._id}/edit`}
    //             className="text-blue-500"
    //           >
    //             Edit
    //           </Link>
    //           <Link
    //             to={`/instructor-dashboard/courses/${c._id}/materials`}
    //             className="text-green-500"
    //           >
    //             Materials
    //           </Link>
    //           {/* Delete button */}
    //           <DeleteCourse courseId={c._id} />
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    // );
    // };
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Courses</h2>
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
              <p className="text-gray-700 mb-4">{c.description}</p>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to={`/instructor-dashboard/courses/${c._id}/edit`}
                  className="px-4 py-2 bg-[#e44d30] text-white text-sm font-medium rounded-lg shadow hover:bg-[#ce472c] transition"
                >
                  Edit
                </Link>
                <Link
                  to={`/instructor-dashboard/courses/${c._id}/materials`}
                  className="px-4 py-2 bg-[#e44d30] text-white text-sm font-medium rounded-lg shadow hover:bg-[#ce472c] transition"
                >
                  Materials
                </Link>
                <DeleteCourse courseId={c._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorCourses;
