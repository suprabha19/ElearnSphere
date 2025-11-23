import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BookOpen, Users, FileText, PlusCircle, Eye } from "lucide-react";

const InstructorHome = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalMaterials: 0,
  });

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No JWT token found. Please log in first.");
          return;
        }
        const res = await axios.get(
          "http://localhost:5000/api/courses/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStats(
          res.data.stats || {
            totalCourses: 0,
            totalStudents: 0,
            totalMaterials: 0,
          }
        );
        setActivities(res.data.activities || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Instructor Dashboard</h1>

      {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-4 shadow rounded-xl">
          <BookOpen className="text-indigo-600" size={36} />
          <div>
            <p>Total Courses</p>
            <h2 className="text-xl font-bold">{stats?.totalCourses || 0}</h2>
          </div>
        </div>
        <div className="p-4 shadow rounded-xl">
          <p>Total Students</p>
          <h2 className="text-xl font-bold">{stats?.totalStudents || 0}</h2>
        </div>
        <div className="p-4 shadow rounded-xl">
          <p>Total Materials</p>
          <h2 className="text-xl font-bold">{stats?.totalMaterials || 0}</h2>
        </div>
      </div> */}
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
          <BookOpen className="text-[#e44d30]" size={36} />
          <div>
            <h2 className="text-lg font-semibold">Total Courses</h2>
            <p className="text-2xl font-bold">{stats.totalCourses}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
          <Users className="text-[#e44d30]" size={36} />
          <div>
            <h2 className="text-lg font-semibold">Total Students</h2>
            <p className="text-2xl font-bold">{stats.totalStudents}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
          <FileText className="text-[#e44d30]" size={36} />
          <div>
            <h2 className="text-lg font-semibold">Materials Uploaded</h2>
            <p className="text-2xl font-bold">{stats.totalMaterials}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/instructor-dashboard/courses"
            className="bg-white hover:bg-[#fcf6f3]  text-black font-medium py-4 rounded-lg flex items-center justify-center gap-2 shadow"
          >
            <Eye size={20} /> View All Courses
          </Link>
          <Link
            to="/instructor-dashboard/add-course"
            className="bg-[#e44d30] hover:bg-[#a53923] text-white font-medium py-4 rounded-lg flex items-center justify-center gap-2 shadow"
          >
            <PlusCircle size={20} /> Add New Course
          </Link>
        </div>
      </div>

      {/* <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          {activities?.length > 0 ? (
            activities.map((a, i) => (
              <li key={i} className="flex justify-between border-b pb-1">
                <span>
                  {a.message} {a.course && `(Course: ${a.course})`}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(a.timestamp).toLocaleString()}
                </span>
              </li>
            ))
          ) : (
            <p>No recent activity yet.</p>
          )}
        </ul>
      </div> */}
      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white shadow rounded-lg p-6">
          {activities.length > 0 ? (
            <ul className="space-y-3">
              {activities.map((act, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span>{act.message}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(act.timestamp).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorHome;
