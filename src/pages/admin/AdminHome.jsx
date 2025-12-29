// src/pages/admin/AdminHome.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, BookOpen, Award, TrendingUp } from "lucide-react";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalInstructors: 0,
    totalAdmins: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    totalQuizzes: 0,
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No JWT token found");
          return;
        }

        const [statsRes, activitiesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/stats", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/admin/activities", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setStats(statsRes.data.stats || {});
        setActivities(activitiesRes.data || []);
      } catch (err) {
        console.error("Error fetching admin dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p className="text-center py-8">Loading dashboard...</p>;

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users size={32} />,
      color: "bg-blue-500",
    },
    {
      title: "Students",
      value: stats.totalStudents,
      icon: <Users size={32} />,
      color: "bg-green-500",
    },
    {
      title: "Instructors",
      value: stats.totalInstructors,
      icon: <Users size={32} />,
      color: "bg-purple-500",
    },
    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: <BookOpen size={32} />,
      color: "bg-orange-500",
    },
    {
      title: "Enrollments",
      value: stats.totalEnrollments,
      icon: <TrendingUp size={32} />,
      color: "bg-pink-500",
    },
    {
      title: "Quizzes",
      value: stats.totalQuizzes,
      icon: <Award size={32} />,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {stat.value}
                </h2>
              </div>
              <div className={`${stat.color} text-white p-3 rounded-full`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recent Activities
        </h2>
        <div className="space-y-3">
          {activities.length === 0 ? (
            <p className="text-gray-500">No recent activities</p>
          ) : (
            activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === "enrollment"
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-gray-700">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
