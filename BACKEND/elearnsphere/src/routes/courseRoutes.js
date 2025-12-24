import express from "express";
import { addCourse, getCourses, updateCourse, deleteCourse, addCourseMaterial, getCourseMaterials, deleteCourseMaterial, getAllCourses } from "../controllers/courseController.js";
import { enrollCourse, searchCourses, getInstructorDashboard, getStudentDashboard } from "../controllers/courseController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { uploadImage, uploadMaterial } from "../middleware/multerConfig.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

const router = express.Router();

// Instructor/Admin can create a course
// router.post("/", protect, authorize("INSTRUCTOR", "ADMIN"), addCourse);
router.get("/search", searchCourses);

router.get("/dashboard", protect, authorize("INSTRUCTOR"), getInstructorDashboard);

router.get("/student/dashboard", protect, getStudentDashboard);

router.post("/", protect, authorize("INSTRUCTOR", "ADMIN"), uploadImage.single("image"), addCourse);

// Public - get all courses
router.get("/instructor",protect, getCourses);

// Get all courses (for students)
router.get("/", protect, getAllCourses);


// Instructor/Admin - update a course
 router.put("/:id", protect, authorize("INSTRUCTOR", "ADMIN"), uploadImage.single("image"), updateCourse);

 // Add course material (Instructor only)
router.post(
  "/:id/materials",
  protect,
  authorize("INSTRUCTOR", "ADMIN"),
  uploadMaterial.single("material"),  // if uploading PDF, docs, etc.
  addCourseMaterial
);

router.get("/:id/materials", protect, getCourseMaterials); // fetch all materials of a course

router.delete("/:courseId/materials/:materialId", protect, authorize("INSTRUCTOR", "ADMIN"), deleteCourseMaterial);

// Instructor/Admin - delete a course
router.delete("/:id", protect, authorize("INSTRUCTOR", "ADMIN"), deleteCourse);

//add enroll route
router.post("/:id/enroll", protect, enrollCourse);

// src/routes/courseRoutes.js
router.get("/:id", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor", "fullName email");
    if (!course) return res.status(404).json({ message: "Course not found" });

    // check if user is enrolled
    const user = await User.findById(req.user.id);
    const isEnrolled = user?.enrolledCourses?.includes(course._id);

    res.json({
      course,
      isEnrolled
    });
  } catch (err) {
    console.error("Course details error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
