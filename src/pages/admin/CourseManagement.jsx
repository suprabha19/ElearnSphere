// src/pages/admin/CourseManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Trash2, Eye } from "lucide-react";
import { toast } from "react-toastify";
import API_BASE_URL from "../../config/api";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, searchTerm, categoryFilter]);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/api/admin/courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data);
      setFilteredCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = [...courses];

    if (categoryFilter) {
      filtered = filtered.filter((course) => course.category === categoryFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          (course.title && course.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredCourses(filtered);
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${API_BASE_URL}/api/admin/courses/${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Course deleted successfully");
      fetchCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
      toast.error("Failed to delete course");
    }
  };

  // Get unique categories
  const categories = [...new Set(courses.map((course) => course.category))];

  if (loading) return <p className="text-center py-8">Loading courses...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Course Management</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ce472c]"
            />
          </div>
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ce472c]"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm font-medium">Total Courses</p>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {courses.length}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm font-medium">Total Materials</p>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {courses.reduce((acc, course) => acc + (course.materials?.length || 0), 0)}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 text-sm font-medium">Categories</p>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {categories.length}
          </h2>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No courses found
          </div>
        ) : (
          filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
            >
              {course.image && (
                <img
                  src={`${API_BASE_URL}${course.image}`}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {course.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {course.students?.length || 0} students
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  <p className="font-medium">
                    Instructor: {course.instructor?.fullName || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {course.instructor?.email || ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeleteCourse(course._id)}
                    className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseManagement;
