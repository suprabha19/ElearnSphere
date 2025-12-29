import express from "express";
import {
  getAdminStats,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllCoursesAdmin,
  deleteCourseAdmin,
  getRecentActivities,
} from "../controllers/adminController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require admin authentication
router.use(protect);
router.use(isAdmin);

// Dashboard statistics
router.get("/stats", getAdminStats);

// Recent activities
router.get("/activities", getRecentActivities);

// User management
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Course management
router.get("/courses", getAllCoursesAdmin);
router.delete("/courses/:id", deleteCourseAdmin);

export default router;
