// src/pages/student/StudentCourseMaterials.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const StudentCourseMaterials = () => {
  const { id } = useParams(); // courseId from URL
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please login first.");

        const res = await axios.get(
          `http://localhost:5000/api/courses/${id}/materials`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setMaterials(res.data);
      } catch (err) {
        console.error("Failed to fetch materials:", err);
        alert(
          "❌ Failed to fetch materials: " +
            (err.response?.data?.message || err.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [id]);

  if (loading) return <p>Loading course materials...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Course Materials</h2>

      <div className="grid gap-4">
        {materials.length === 0 && <p>No materials available yet.</p>}
        {materials.map((m) => (
          <div key={m._id} className="p-4 border rounded bg-white">
            <h3 className="font-bold">{m.title}</h3>
            <p>{m.description}</p>

            {/* Display based on type */}
            {m.type === "video" && (
              <video controls width="400">
                <source
                  src={`http://localhost:5000${m.file}`}
                  type="video/mp4"
                />
                Your browser does not support video.
              </video>
            )}

            {m.type === "pdf" && (
              <a
                href={`http://localhost:5000${m.file}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500"
              >
                📄 View PDF
              </a>
            )}

            {m.type === "image" && (
              <img
                src={`http://localhost:5000${m.file}`}
                alt={m.title}
                style={{ width: "200px", height: "auto" }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Link to="/student-dashboard" className="text-blue-500">
          ⬅ Back to My Courses
        </Link>
      </div>
    </div>
  );
};

export default StudentCourseMaterials;
