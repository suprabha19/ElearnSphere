// src/routes/userRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import multer from "multer";

const router = express.Router();

// Multer configuration for profile picture upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profiles/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

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

// GET /api/users/profile - Get current user profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/users/profile - Update user profile
router.put("/profile", protect, async (req, res) => {
  try {
    const { fullName, bio, qualifications, experience, expertise, phone } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (fullName) user.fullName = fullName;
    if (bio !== undefined) user.bio = bio;
    if (qualifications !== undefined) user.qualifications = qualifications;
    if (experience !== undefined) user.experience = experience;
    if (expertise !== undefined) user.expertise = expertise;
    if (phone !== undefined) user.phone = phone;

    await user.save();

    const updatedUser = await User.findById(req.user.id).select("-password");
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/users/profile/picture - Upload profile picture
router.post("/profile/picture", protect, upload.single("profilePicture"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profilePicture = `/uploads/profiles/${req.file.filename}`;
    await user.save();

    res.json({ profilePicture: user.profilePicture });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/users/instructors - Get all instructors
router.get("/instructors", async (req, res) => {
  try {
    const instructors = await User.find({ role: "INSTRUCTOR" })
      .select("-password")
      .lean();

    res.json(instructors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/users/instructors/:id - Get single instructor details
router.get("/instructors/:id", async (req, res) => {
  try {
    const instructor = await User.findOne({ 
      _id: req.params.id, 
      role: "INSTRUCTOR" 
    }).select("-password");

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.json(instructor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/users/enrolled-students - Get all students enrolled in instructor's courses
router.get("/enrolled-students", protect, async (req, res) => {
  try {
    // Verify user is an instructor
    if (req.user.role !== "INSTRUCTOR") {
      return res.status(403).json({ message: "Only instructors can access this" });
    }

    // Import Course model
    const Course = (await import("../models/Course.js")).default;

    // Find all courses by this instructor
    const courses = await Course.find({ instructor: req.user.id })
      .populate("students", "fullName email phone bio enrolledCourses")
      .lean();

    // Collect unique students with their enrolled courses
    const studentMap = new Map();

    courses.forEach(course => {
      course.students.forEach(student => {
        const studentId = student._id.toString();
        if (!studentMap.has(studentId)) {
          studentMap.set(studentId, {
            _id: student._id,
            fullName: student.fullName,
            email: student.email,
            phone: student.phone || "",
            bio: student.bio || "",
            enrolledCourses: []
          });
        }
        // Add this course to the student's enrolled courses
        studentMap.get(studentId).enrolledCourses.push({
          _id: course._id,
          title: course.title
        });
      });
    });

    // Convert map to array
    const students = Array.from(studentMap.values());

    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
