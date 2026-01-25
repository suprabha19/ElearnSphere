import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrophy, FaBook, FaCheckCircle, FaClock, FaChartLine } from "react-icons/fa";
import axios from "axios";
import ProgressBar from "../../components/ProgressBar";

const ProgressDashboard = () => {
  const [stats, setStats] = useState(null);
  const [progressList, setProgressList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Fetch statistics
      const statsRes = await axios.get(
        "http://localhost:5000/api/progress/stats",
        { headers: { Authorization: `****** } }
      );
      setStats(statsRes.data.stats);

      // Fetch all progress
      const progressRes = await axios.get(
        "http://localhost:5000/api/progress",
        { headers: { Authorization: `****** } }
      );
      setProgressList(progressRes.data.progressList);
    } catch (error) {
      console.error("Failed to fetch progress data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Loading progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Learning Progress</h1>
          <p className="text-gray-600 mt-1">Track your course completion and achievements</p>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Courses */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FaBook className="text-blue-600" size={24} />
                </div>
                <p className="text-3xl font-bold text-blue-600">{stats.totalCourses}</p>
              </div>
              <p className="text-gray-600 font-medium">Total Courses</p>
            </div>

            {/* Completed */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-green-100 rounded-full">
                  <FaCheckCircle className="text-green-600" size={24} />
                </div>
                <p className="text-3xl font-bold text-green-600">{stats.completedCourses}</p>
              </div>
              <p className="text-gray-600 font-medium">Completed</p>
            </div>

            {/* In Progress */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <FaClock className="text-yellow-600" size={24} />
                </div>
                <p className="text-3xl font-bold text-yellow-600">{stats.inProgressCourses}</p>
              </div>
              <p className="text-gray-600 font-medium">In Progress</p>
            </div>

            {/* Average Completion */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-purple-100 rounded-full">
                  <FaChartLine className="text-purple-600" size={24} />
                </div>
                <p className="text-3xl font-bold text-purple-600">{stats.averageCompletion}%</p>
              </div>
              <p className="text-gray-600 font-medium">Avg. Completion</p>
            </div>
          </div>
        )}

        {/* Overall Progress */}
        {stats && stats.totalCourses > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Overall Progress</h2>
            <ProgressBar percentage={stats.averageCompletion} height="h-6" />
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <span>{stats.totalMaterialsCompleted} materials completed</span>
              <span>{stats.completedCourses} of {stats.totalCourses} courses finished</span>
            </div>
          </div>
        )}

        {/* Course List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Progress</h2>

          {progressList.length === 0 ? (
            <div className="text-center py-12">
              <FaBook size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-600 mb-4">No courses enrolled yet</p>
              <Link
                to="/courses"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {progressList.map((progress) => (
                <div
                  key={progress._id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
                >
                  <div className="flex items-start gap-4">
                    {/* Course Image */}
                    {progress.course.image && (
                      <img
                        src={`http://localhost:5000${progress.course.image}`}
                        alt={progress.course.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}

                    {/* Course Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {progress.course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {progress.course.category}
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="mb-2">
                        <ProgressBar 
                          percentage={progress.completionPercentage} 
                          showPercentage={false}
                          height="h-2"
                        />
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">
                          {progress.completedMaterials.length} of {progress.totalMaterials} materials completed
                        </span>
                        <span className="font-semibold text-blue-600">
                          {progress.completionPercentage}%
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Link
                        to={`/student/courses/${progress.course._id}/progress`}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition text-center"
                      >
                        View Progress
                      </Link>
                      <Link
                        to={`/courses/${progress.course._id}`}
                        className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition text-center"
                      >
                        View Course
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
