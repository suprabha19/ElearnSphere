import React from "react";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";

const ReviewList = ({ reviews, currentUserId, onEdit, onDelete, averageRating, totalReviews }) => {
  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={16}
            className={star <= rating ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="mt-8">
      {/* Rating Summary */}
      {totalReviews > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-5xl font-bold text-[#e44d30]">
                {averageRating.toFixed(1)}
              </p>
              <div className="flex justify-center mt-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <h3 className="text-2xl font-semibold mb-4">
        {totalReviews > 0 ? "Student Reviews" : "No Reviews Yet"}
      </h3>

      {reviews.length === 0 ? (
        <p className="text-gray-600">
          Be the first to review this course!
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {/* User Info */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#e44d30] rounded-full flex items-center justify-center text-white font-bold">
                      {review.user?.fullName?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {review.user?.fullName || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(review.createdAt)}
                        {review.updatedAt !== review.createdAt && " (edited)"}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-2">{renderStars(review.rating)}</div>

                  {/* Comment */}
                  <p className="text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                </div>

                {/* Action Buttons (if own review) */}
                {currentUserId && review.user?._id === currentUserId && (
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => onEdit(review)}
                      className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition"
                      title="Edit review"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(review._id)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition"
                      title="Delete review"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
