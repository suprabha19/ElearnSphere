import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "COURSE_ENROLLED",
        "COURSE_UPDATED",
        "NEW_MATERIAL",
        "NEW_QUIZ",
        "QUIZ_GRADED",
        "NEW_REVIEW",
        "REVIEW_RESPONSE",
        "GENERAL",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    relatedCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    relatedQuiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
    link: {
      type: String, // URL to redirect when notification is clicked
    },
    read: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index for efficient querying
notificationSchema.index({ user: 1, read: 1, createdAt: -1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
