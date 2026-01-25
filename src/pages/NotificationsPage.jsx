import React, { useState, useEffect } from "react";
import { FaBell, FaTrash, FaCheck, FaCheckDouble } from "react-icons/fa";
import axios from "axios";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all"); // all, unread, read
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const unreadParam = filter === "unread" ? "?unreadOnly=true" : "";
      
      const res = await axios.get(
        `http://localhost:5000/api/notifications${unreadParam}`,
        {
          headers: { Authorization: `****** },
        }
      );

      let filteredNotifications = res.data.notifications || [];
      
      // Apply filter on frontend if needed
      if (filter === "read") {
        filteredNotifications = filteredNotifications.filter(n => n.read);
      }

      setNotifications(filteredNotifications);
      setUnreadCount(res.data.unreadCount || 0);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/notifications/${notificationId}/read`,
        {},
        { headers: { Authorization: `****** } }
      );
      fetchNotifications();
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/notifications/mark-all-read",
        {},
        { headers: { Authorization: `****** } }
      );
      fetchNotifications();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/notifications/${notificationId}`,
        { headers: { Authorization: `****** } }
      );
      fetchNotifications();
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const deleteAllRead = async () => {
    if (!window.confirm("Delete all read notifications?")) return;
    
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        "http://localhost:5000/api/notifications/clear-read",
        { headers: { Authorization: `****** } }
      );
      fetchNotifications();
    } catch (error) {
      console.error("Failed to delete read notifications:", error);
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification._id);
    }
    if (notification.link) {
      window.location.href = notification.link;
    }
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "COURSE_ENROLLED":
        return "bg-green-100 text-green-600";
      case "NEW_MATERIAL":
        return "bg-blue-100 text-blue-600";
      case "NEW_QUIZ":
        return "bg-purple-100 text-purple-600";
      case "QUIZ_GRADED":
        return "bg-yellow-100 text-yellow-600";
      case "NEW_REVIEW":
        return "bg-pink-100 text-pink-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
              <p className="text-gray-600 mt-1">
                {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <FaCheckDouble />
                Mark all as read
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-3 border-t pt-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "unread"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter("read")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "read"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Read
            </button>
            {notifications.some(n => n.read) && (
              <button
                onClick={deleteAllRead}
                className="ml-auto px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 font-medium transition"
              >
                <FaTrash className="inline mr-2" />
                Clear read
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaBell size={48} className="mx-auto mb-4 text-gray-300" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No notifications
            </h2>
            <p className="text-gray-600">
              {filter === "unread"
                ? "You're all caught up! No unread notifications."
                : filter === "read"
                ? "No read notifications to show."
                : "You don't have any notifications yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition cursor-pointer ${
                  !notification.read ? "border-l-4 border-blue-600" : ""
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(
                      notification.type
                    )}`}
                  >
                    <FaBell size={20} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{notification.message}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">
                        {timeAgo(notification.createdAt)}
                      </span>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification._id);
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                          >
                            <FaCheck size={12} />
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification._id);
                          }}
                          className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1"
                        >
                          <FaTrash size={12} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
