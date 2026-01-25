// src/pages/student/CourseDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "../../components/ReviewForm";
import ReviewList from "../../components/ReviewList";

// Helper function to get current user
const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const [editingReview, setEditingReview] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        // Get user info
        const user = getCurrentUser();
        if (user) {
          setCurrentUserId(user.id);
        }

        const res = await axios.get(`http://localhost:5000/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCourse(res.data.course);
        setEnrolled(res.data.isEnrolled || false);

        // Fetch reviews
        fetchReviews();
      } catch (err) {
        console.error("Failed to fetch course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/courses/${id}/reviews`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews(res.data.reviews || []);
      setAverageRating(res.data.averageRating || 0);
      setTotalReviews(res.data.totalReviews || 0);

      // Check if current user has already reviewed
      const user = getCurrentUser();
      if (user) {
        const existing = res.data.reviews.find(
          (r) => r.user?._id === user.id
        );
        setUserReview(existing || null);
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/courses/${id}/enroll`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEnrolled(true);
      alert("Enrolled successfully!");
    } catch (err) {
      console.error("Enroll failed:", err);
      alert("Failed to enroll");
    }
  };

  const handleStartLearning = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/courses/${id}/materials`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMaterials(res.data);
      setShowMaterials(true);
    } catch (err) {
      console.error("Failed to fetch materials:", err);
    }
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/courses/${id}/reviews`,
        reviewData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Review submitted successfully!");
      fetchReviews();
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert(err.response?.data?.message || "Failed to submit review");
    }
  };

  const handleUpdateReview = async (reviewData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/courses/${id}/reviews/${userReview._id}`,
        reviewData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Review updated successfully!");
      setEditingReview(false);
      fetchReviews();
    } catch (err) {
      console.error("Failed to update review:", err);
      alert(err.response?.data?.message || "Failed to update review");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/courses/${id}/reviews/${reviewId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Review deleted successfully!");
      fetchReviews();
    } catch (err) {
      console.error("Failed to delete review:", err);
      alert(err.response?.data?.message || "Failed to delete review");
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(true);
  };

  if (loading) return <p className="text-center mt-10">Loading course...</p>;
  if (!course) return <p className="text-center mt-10">Course not found</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left side (details) */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-600 text-sm mb-4">
            Category: <span className="font-medium">{course.category}</span>
          </p>
          {course.instructor && (
            <p className="text-gray-600 text-sm mb-4">
              Instructor:{" "}
              <span className="font-medium">{course.instructor.fullName}</span>
              {course.instructor.email && (
                <span className="text-gray-500 text-xs ml-2">
                  ({course.instructor.email})
                </span>
              )}
            </p>
          )}
          <p className="text-gray-800 leading-relaxed">{course.description}</p>

          {/* Buttons */}
          <div className="mt-6 flex gap-3">
            {!enrolled ? (
              <button
                onClick={handleEnroll}
                className="bg-[#e44d30] hover:bg-[#b33b23] text-white px-5 py-2 rounded-lg font-medium transition"
              >
                Enroll Now
              </button>
            ) : (
              !showMaterials && (
                <button
                  onClick={handleStartLearning}
                  className="bg-[#e44d30] hover:bg-[#b33b23] text-white px-5 py-2 rounded-lg font-medium transition"
                >
                  Start Learning
                </button>
              )
            )}
          </div>
        </div>

        {/* Right side (image) */}
        {course.image && (
          <div className="w-full h-64 md:h-full">
            <img
              src={`http://localhost:5000${course.image}`}
              alt={course.title}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        )}
      </div>

      {/* Materials */}
      {showMaterials && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Course Materials</h2>
          {materials.length === 0 ? (
            <p className="text-gray-600">No materials uploaded yet.</p>
          ) : (
            <div className="space-y-6">
              {materials.map((m) => (
                <div
                  key={m._id}
                  className="border rounded-lg p-4 shadow-sm bg-white"
                >
                  {m.type === "pdf" ? (
                    <a
                      href={`http://localhost:5000${m.url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline font-medium"
                    >
                      {m.title} (PDF)
                    </a>
                  ) : m.type === "video" ? (
                    <div className="w-full">
                      <video
                        controls
                        src={`http://localhost:5000${m.url}`}
                        className="w-full rounded-lg shadow-md"
                      />
                    </div>
                  ) : (
                    <a
                      href={`http://localhost:5000${m.url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline font-medium"
                    >
                      {m.title}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reviews Section */}
      {enrolled && (
        <div className="mt-12">
          {/* Show review form only if user hasn't reviewed or is editing */}
          {(!userReview || editingReview) && (
            <div className="mb-8">
              <ReviewForm
                onSubmit={editingReview ? handleUpdateReview : handleSubmitReview}
                existingReview={editingReview ? userReview : null}
                onCancel={editingReview ? () => setEditingReview(false) : null}
              />
            </div>
          )}

          {/* Reviews List */}
          <ReviewList
            reviews={reviews}
            currentUserId={currentUserId}
            onEdit={handleEditReview}
            onDelete={handleDeleteReview}
            averageRating={averageRating}
            totalReviews={totalReviews}
          />
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
