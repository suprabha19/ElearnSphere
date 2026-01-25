import Notification from "../models/Notification.js";
import User from "../models/User.js";

// Get all notifications for the logged-in user
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 20, skip = 0, unreadOnly = false } = req.query;

    const query = { user: userId };
    if (unreadOnly === "true") {
      query.read = false;
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .populate("relatedCourse", "title")
      .populate("relatedQuiz", "title");

    const unreadCount = await Notification.countDocuments({
      user: userId,
      read: false,
    });

    res.json({
      notifications,
      unreadCount,
      total: await Notification.countDocuments({ user: userId }),
    });
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await Notification.findOne({ _id: id, user: userId });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.read = true;
    await notification.save();

    res.json({ message: "Notification marked as read", notification });
  } catch (error) {
    console.error("Mark as read error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    await Notification.updateMany(
      { user: userId, read: false },
      { read: true }
    );

    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Mark all as read error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await Notification.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification deleted" });
  } catch (error) {
    console.error("Delete notification error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete all read notifications
export const deleteAllRead = async (req, res) => {
  try {
    const userId = req.user.id;

    await Notification.deleteMany({ user: userId, read: true });

    res.json({ message: "All read notifications deleted" });
  } catch (error) {
    console.error("Delete all read error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Helper function to create a notification (can be called from other controllers)
export const createNotification = async (userId, notificationData) => {
  try {
    const notification = await Notification.create({
      user: userId,
      ...notificationData,
    });
    return notification;
  } catch (error) {
    console.error("Create notification error:", error);
    throw error;
  }
};

// Helper function to create notifications for multiple users
export const createBulkNotifications = async (userIds, notificationData) => {
  try {
    const notifications = userIds.map((userId) => ({
      user: userId,
      ...notificationData,
    }));

    await Notification.insertMany(notifications);
  } catch (error) {
    console.error("Create bulk notifications error:", error);
    throw error;
  }
};
