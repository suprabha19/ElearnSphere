// src/routes/userRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// GET /api/users/me/enrolled-courses
router.get("/me/enrolled-courses", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("enrolledCourses");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.enrolledCourses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
