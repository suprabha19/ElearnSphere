// src/pages/student/StudentHome.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Users, FileText, PlusCircle, Eye } from "lucide-react";

const StudentHome = () => {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [topCourses, setTopCourses] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        // Student dashboard stats + activities
        const res = await axios.get(
          "http://localhost:5000/api/courses/student/dashboard",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setStats(res.data.stats);
        setActivities(res.data.activities);

        // Top Recommended Courses
        const recRes = await axios.get("http://localhost:5000/api/recommend", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTopCourses(recRes.data.topCourses || []);
        setRecommended(recRes.data.recommended || []);
      } catch (err) {
        console.error("Failed to fetch dashboard or recommendations:", err);
      }
    };
    fetchDashboard();
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
          <BookOpen className="text-[#e44d30]" size={36} />
          <div>
            <h3 className="text-lg font-semibold">Total Courses</h3>
            <p className="text-2xl font-bold">{stats.totalCourses}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
          <Users className="text-[#e44d30]" size={36} />
          <div>
            <h3 className="text-lg font-semibold">Total Instructors</h3>
            <p className="text-2xl font-bold">{stats.totalInstructors}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
          <FileText className="text-[#e44d30]" size={36} />
          <div>
            <h3 className="text-lg font-semibold">Total Materials</h3>
            <p className="text-2xl font-bold">{stats.totalMaterials}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/student-dashboard/courses"
            className="bg-[#fcf7f3] hover:bg-white text-black font-medium py-4 rounded-lg flex items-center justify-center gap-2 shadow"
          >
            <Eye size={20} /> View All Courses
          </Link>
          <Link
            to="/student-dashboard/courses"
            className="bg-[#e44d30] hover:bg-[#a53923] text-white font-medium py-4 rounded-lg flex items-center justify-center gap-2 shadow"
          >
            <PlusCircle size={20} /> My Courses
          </Link>
        </div>
      </div>

      {/* Top Recommended Courses */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Top Popular Courses</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {topCourses.length > 0 ? (
            topCourses.map((course) => (
              <div
                key={course._id}
                className="border p-3 rounded hover:shadow cursor-pointer"
                onClick={() =>
                  navigate(`/student-dashboard/courses/${course._id}`)
                }
              >
                {course.image && (
                  <img
                    src={`http://localhost:5000${course.image}`}
                    alt={course.title}
                    className="w-full h-32 object-cover rounded"
                  />
                )}
                <h3 className="mt-2 font-semibold">{course.title}</h3>
              </div>
            ))
          ) : (
            <p>No top courses found.</p>
          )}
        </div>

        <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
        <div className="grid grid-cols-4 gap-4">
          {recommended.length > 0 ? (
            recommended.map((course) => (
              <div
                key={course._id}
                className="border p-3 rounded hover:shadow cursor-pointer"
                onClick={() =>
                  navigate(`/student-dashboard/courses/${course._id}`)
                }
              >
                {course.image && (
                  <img
                    src={`http://localhost:5000${course.image}`}
                    alt={course.title}
                    className="w-full h-24 object-cover rounded"
                  />
                )}
                <h3 className="mt-2 text-sm font-semibold">{course.title}</h3>
              </div>
            ))
          ) : (
            <p>No recommended courses found.</p>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-2">
          {activities.length > 0 ? (
            activities.map((a, i) => (
              <li
                key={i}
                className="flex gap-3 p-3 bg-gray-50 justify-between items-center pb-2"
              >
                <p>{a.message}</p>
                <span className="text-sm text-gray-500">
                  {new Date(a.timestamp).toLocaleString()}
                </span>
              </li>
            ))
          ) : (
            <p>No recent activity</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StudentHome;
