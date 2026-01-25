import express from "express";
import {
  getCourseProgress,
  markMaterialComplete,
  markMaterialIncomplete,
  getAllProgress,
  getProgressStats,
  resetCourseProgress,
  updateVideoProgress,
  markVideoComplete,
  getUnlockedMaterials,
} from "../controllers/progressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get all progress for logged-in student
router.get("/", getAllProgress);

// Get progress statistics
router.get("/stats", getProgressStats);

// Get progress for a specific course
router.get("/course/:courseId", getCourseProgress);

// Get unlocked materials (sequential access)
router.get("/course/:courseId/unlocked", getUnlockedMaterials);

// Update video watch progress
router.post("/course/:courseId/material/:materialId/video-progress", updateVideoProgress);

// Mark video as complete (with validation)
router.post("/course/:courseId/material/:materialId/video-complete", markVideoComplete);

// Mark material as complete
router.post("/course/:courseId/material/:materialId/complete", markMaterialComplete);

// Mark material as incomplete
router.post("/course/:courseId/material/:materialId/incomplete", markMaterialIncomplete);

// Reset course progress
router.delete("/course/:courseId/reset", resetCourseProgress);

export default router;
