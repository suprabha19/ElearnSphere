import express from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllRead,
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get all notifications for logged-in user
router.get("/", getNotifications);

// Mark a notification as read
router.put("/:id/read", markAsRead);

// Mark all notifications as read
router.put("/mark-all-read", markAllAsRead);

// Delete a notification
router.delete("/:id", deleteNotification);

// Delete all read notifications
router.delete("/clear-read", deleteAllRead);

export default router;
