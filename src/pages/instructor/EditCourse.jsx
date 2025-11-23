// src/pages/instructor/EditCourse.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    popularity: "",
    image: null,
  });

  const [existingImage, setExistingImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch the course from the correct endpoint and read from data.course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const course = res.data?.course || res.data; // fallback if shape differs

        setForm({
          title: course?.title || "",
          description: course?.description || "",
          category: course?.category || "",
          popularity:
            course?.popularity === 0 || course?.popularity
              ? String(course.popularity)
              : "", // keep input controlled
          image: null, // new image is optional
        });

        if (course?.image) {
          setExistingImage(`http://localhost:5000${course.image}`);
        }
      } catch (err) {
        console.error("Failed to fetch course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("popularity", form.popularity);
    if (form.image) formData.append("image", form.image); // optional

    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/courses/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Course updated successfully!");
      navigate("/instructor-dashboard/courses");
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Failed to update course");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Edit Course
        </h2>

        {/* Existing image preview (if any) */}
        {existingImage && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Current Image</p>
            <img
              src={existingImage}
              alt="Current course"
              className="w-full h-56 object-cover rounded-lg border"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e44d30] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e44d30] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e44d30] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Popularity
            </label>
            <input
              type="number"
              name="popularity"
              value={form.popularity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e44d30] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload New Image (optional)
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#e44d30] text-white py-2 rounded-lg font-medium hover:bg-[#c63d26] transition"
          >
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
