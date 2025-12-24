// src/routes/studentRoutes.js
import express from "express";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js"; // assume you track enrollments
import { protect } from "../middleware/authMiddleware.js"; // middleware for student

const router = express.Router();

router.get("/dashboard", protect, async (req, res) => {
  try {
    // Find all courses student is enrolled in
    const enrollments = await Enrollment.find({ student: req.user.id }).populate("course");
    const courses = enrollments.map(e => e.course);

    const totalCourses = courses.length;
    const totalMaterials = courses.reduce((sum, c) => sum + c.materials.length, 0);

    // Get unique instructors count
    const instructors = new Set(courses.map(c => c.instructor.toString()));
    const totalInstructors = instructors.size;

    // Example activity (you can store in DB if you want full history)
    const activities = enrollments.map(e => ({
      message: `Enrolled in course: ${e.course.title}`,
      timestamp: e.enrolledAt,
    }));

    res.json({
      stats: { totalCourses, totalMaterials, totalInstructors },
      activities,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
