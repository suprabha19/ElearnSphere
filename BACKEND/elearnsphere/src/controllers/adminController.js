import User from "../models/User.js";
import Course from "../models/Course.js";
import Quiz from "../models/Quiz.js";
import Enrollment from "../models/Enrollment.js";

// Get platform statistics
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: "STUDENT" });
    const totalInstructors = await User.countDocuments({ role: "INSTRUCTOR" });
    const totalAdmins = await User.countDocuments({ role: "ADMIN" });
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();
    const totalQuizzes = await Quiz.countDocuments();

    res.json({
      stats: {
        totalUsers,
        totalStudents,
        totalInstructors,
        totalAdmins,
        totalCourses,
        totalEnrollments,
        totalQuizzes,
      },
    });
  } catch (error) {
    console.error("Get admin stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all users with filtering
export const getAllUsers = async (req, res) => {
  try {
    const { role, search } = req.query;
    
    let query = {};
    if (role) {
      query.role = role;
    }
    if (search) {
      // Sanitize search input to prevent ReDoS
      const sanitizedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').substring(0, 100);
      query.$or = [
        { fullName: { $regex: sanitizedSearch, $options: "i" } },
        { email: { $regex: sanitizedSearch, $options: "i" } },
      ];
    }

    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("enrolledCourses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { fullName, email, role, bio, qualifications, experience } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (role) user.role = role;
    if (bio !== undefined) user.bio = bio;
    if (qualifications !== undefined) user.qualifications = qualifications;
    if (experience !== undefined) user.experience = experience;

    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ message: "Cannot delete your own account" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all courses (admin view)
export const getAllCoursesAdmin = async (req, res) => {
  try {
    const { category, search } = req.query;
    
    let query = {};
    if (category) {
      query.category = category;
    }
    if (search) {
      // Sanitize search input to prevent ReDoS
      const sanitizedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').substring(0, 100);
      query.$or = [
        { title: { $regex: sanitizedSearch, $options: "i" } },
        { description: { $regex: sanitizedSearch, $options: "i" } },
      ];
    }

    const courses = await Course.find(query)
      .populate("instructor", "fullName email")
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (error) {
    console.error("Get all courses admin error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete any course (admin only)
export const deleteCourseAdmin = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Delete course admin error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get recent activities
export const getRecentActivities = async (req, res) => {
  try {
    // Get recent enrollments
    const recentEnrollments = await Enrollment.find()
      .sort({ enrolledAt: -1 })
      .limit(10)
      .populate("student", "fullName email")
      .populate("course", "title");

    // Get recently created courses
    const recentCourses = await Course.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("instructor", "fullName email");

    const activities = [];

    recentEnrollments.forEach((enrollment) => {
      activities.push({
        type: "enrollment",
        message: `${enrollment.student?.fullName || "Unknown"} enrolled in ${enrollment.course?.title || "Unknown Course"}`,
        timestamp: enrollment.enrolledAt,
      });
    });

    recentCourses.forEach((course) => {
      activities.push({
        type: "course",
        message: `${course.instructor?.fullName || "Unknown"} created course: ${course.title}`,
        timestamp: course.createdAt,
      });
    });

    // Sort by timestamp
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json(activities.slice(0, 15));
  } catch (error) {
    console.error("Get recent activities error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
