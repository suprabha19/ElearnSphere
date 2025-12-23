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

export default router;
