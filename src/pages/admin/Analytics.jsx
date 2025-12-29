// src/pages/admin/Analytics.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, BookOpen, TrendingUp, Award } from "lucide-react";
import API_BASE_URL from "../../config/api";

const Analytics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalInstructors: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    totalQuizzes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE_URL}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data.stats || {});
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-center py-8">Loading analytics...</p>;

  const analyticsData = [
    {
      title: "User Distribution",
      items: [
        { label: "Students", value: stats.totalStudents, color: "bg-green-500" },
        {
          label: "Instructors",
          value: stats.totalInstructors,
          color: "bg-blue-500",
        },
        { label: "Admins", value: stats.totalAdmins, color: "bg-red-500" },
      ],
    },
    {
      title: "Platform Engagement",
      items: [
        {
          label: "Total Enrollments",
          value: stats.totalEnrollments,
          color: "bg-purple-500",
        },
        {
          label: "Total Courses",
          value: stats.totalCourses,
          color: "bg-orange-500",
        },
        {
          label: "Total Quizzes",
          value: stats.totalQuizzes,
          color: "bg-pink-500",
        },
      ],
    },
  ];

  const avgEnrollmentsPerCourse =
    stats.totalCourses > 0
      ? (stats.totalEnrollments / stats.totalCourses).toFixed(2)
      : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Users</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {stats.totalUsers}
              </h2>
            </div>
            <div className="bg-blue-500 text-white p-3 rounded-full">
              <Users size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Courses</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {stats.totalCourses}
              </h2>
            </div>
            <div className="bg-orange-500 text-white p-3 rounded-full">
              <BookOpen size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Enrollments</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {stats.totalEnrollments}
              </h2>
            </div>
            <div className="bg-green-500 text-white p-3 rounded-full">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Enrollment</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {avgEnrollmentsPerCourse}
              </h2>
            </div>
            <div className="bg-purple-500 text-white p-3 rounded-full">
              <Award size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Sections */}
      {analyticsData.map((section, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {section.title}
          </h2>
          <div className="space-y-4">
            {section.items.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-medium">{item.label}</span>
                  <span className="text-gray-800 font-bold">{item.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`${item.color} h-2.5 rounded-full`}
                    style={{
                      width: `${Math.min(
                        (item.value / stats.totalUsers) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Additional Stats */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Platform Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">Student-Instructor Ratio</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {stats.totalInstructors > 0
                ? (stats.totalStudents / stats.totalInstructors).toFixed(2)
                : 0}
              :1
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">Courses per Instructor</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {stats.totalInstructors > 0
                ? (stats.totalCourses / stats.totalInstructors).toFixed(2)
                : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
