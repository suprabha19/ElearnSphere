// src/models/Course.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  tags: [String],
  popularity: { type: Number, default: 0 },
  materials: [
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["video", "pdf", "image", "other"], required: true },
    url: { type: String },
    description: { type: String },
    uploadedAt: { type: Date, default: Date.now },
  }
],
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // ✅ enrolled students
  activities: [
    {
      message: String,
      timestamp: { type: Date, default: Date.now },
    }
  ],
  createdAt: { type: Date, default: Date.now },

});

const Course = mongoose.model("Course", courseSchema);
export default Course; // ✅ default export
