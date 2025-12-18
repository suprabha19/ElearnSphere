// controllers/courseController.js
import Course from "../models/Course.js";
import User from "../models/User.js"; // make sure you created Course model
import path from "path";
import fs from "fs";
// Add course
export const addCourse = async (req, res) => {
  try {
    const { title, description, category, popularity } = req.body;
    const image = req.file ? req.file.path : null;

 if (!title || !description || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const course = await Course.create({
      title,
      description,
      category,
      image: req.file ? `/uploads/images/${req.file.filename}` : null, // store relative path
      instructor: req.user.id,
      popularity
    });

  // ✅ Add activity
  course.activities.push({
    message: `Course created: ${title}`,
    timestamp: Date.now(),
  });

await course.save();

    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// Get all courses
export const getCourses = async (req, res) => {
  try {
    console.log("req.user:", req.user); // Check if user info is available

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: no user" });
    }

    let courses;
    if (req.user.role === "INSTRUCTOR") {
      courses = await Course.find({ instructor: req.user.id }).populate("instructor", "fullName email");
    } else {
      courses = await Course.find().populate("instructor", "fullName email");
    }

    console.log("Found courses:", courses.length);
    res.json(courses);
  } catch (err) {
    console.error("getCourses error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this course" });
    }

    const { title, description, popularity } = req.body;

    if (title) course.title = title;
    if (description) course.description = description;
    if (popularity) course.popularity = popularity;

    // update image if new one uploaded
    if (req.file) {
      course.image = `/uploads/images/${req.file.filename}`;
    }

    // ✅ Add activity
    course.activities.push({
      message: `Course updated: ${course.title}`,
      timestamp: Date.now(),
    });

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    console.error("Update course error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add material to a course
export const addCourseMaterial = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const materialType = req.file.mimetype.startsWith("video")
      ? "video"
      : req.file.mimetype === "application/pdf"
      ? "pdf"
      : req.file.mimetype.startsWith("image")
      ? "image"
      : "other";

    const material = {
      title: req.body.title || req.file.originalname,
      type: materialType,
      url: `/uploads/materials/${req.file.filename}`,
      description: req.body.description || "",
      uploadedAt: new Date(),
    };

    course.materials.push(material);

    // ✅ Add activity
    course.activities.push({
      message: `Added material: ${material.title}`,
      timestamp: Date.now(),
    });

    await course.save();

    res.status(201).json({
      message: "Material added successfully",
      material: course.materials[course.materials.length - 1],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all materials of a course
export const getCourseMaterials = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Send materials as-is; frontend will append server URL
    res.json(course.materials);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a material from a course
export const deleteCourseMaterial = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const materialIndex = course.materials.findIndex(
      (m) => m._id.toString() === req.params.materialId
    );
    if (materialIndex === -1) return res.status(404).json({ message: "Material not found" });

    // Remove material
    course.materials.splice(materialIndex, 1);

    // ✅ Add activity
    course.activities.push({
      message: `Deleted material: ${materialIndex.title}`,
      timestamp: Date.now(),
    });

    await course.save();

    res.json({ message: "Material deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/courses/:id
export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // <-- Add this line to check what you receive
    console.log("Deleting course:", courseId, "User:", req.user.id);

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Optional: check if the logged-in user is the instructor
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

      course.activities.push({
      message: `Course deleted: ${course.title}`,
      timestamp: Date.now(),
    });

    await Course.findByIdAndDelete(courseId);

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "fullName email"); // get all courses with instructor details
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

 // Only students can enroll
    if (req.user.role !== "STUDENT") {
      return res.status(403).json({ message: "Only students can enroll in courses" });
    }

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) return res.status(404).json({ message: "User or course not found" });

    // Avoid duplicate enrollment
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    user.enrolledCourses.push(courseId);
    course.students.push(userId);
    
    // ✅ Add activity in course
      course.activities.push({
        message: `New student enrolled: ${user.fullName}`,
        timestamp: Date.now(),
      });

      await user.save();
      await course.save();

    res.status(200).json({ message: "Enrolled successfully", courseId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const searchCourses = async (req, res) => {
  try {
    const { query } = req.query;
    console.log("Search query:", query);

     if (!query) return res.json([]);
  //   if (!query) {
  // const popularCourses = await Course.find({}, { title: 1, description: 1, popularity: 1 })
  //   .sort({ popularity: -1 })
  //   .limit(5);

  // return res.json(popularCourses);
// }

   const courses = await Course.find(
      {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } }
        ]
      },
      { title: 1, description: 1, category: 1, popularity: 1, instructor: 1 }
    )
      .populate("instructor", "fullName email")
      .sort({ popularity: -1 }) // most popular first
      .limit(8);

    if (!courses || courses.length === 0) {
      return res.json({ message: "No match found" });
    }

    res.json(courses);
  } catch (error) {
    console.error("Search error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get instructor dashboard stats
export const getInstructorDashboard = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id })
      .populate("students", "fullName email")
      .populate("materials");

    const totalCourses = courses.length;
    const totalMaterials = courses.reduce((sum, c) => sum + c.materials.length, 0);

    const studentSet = new Set();
    courses.forEach(c => c.students.forEach(s => studentSet.add(s._id.toString())));
    const totalStudents = studentSet.size;

    // Collect activities
    let activities = [];
    courses.forEach((c) => {
      c.activities.forEach((a) =>
        activities.push({
          course: c.title,
          message: a.message,
          timestamp: a.timestamp,
        })
      );
    });

        // Sort by latest
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json({
      stats: { totalCourses, totalStudents, totalMaterials },
      activities,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// export const getStudentDashboard = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     // Only students can view this
//     if (req.user.role !== "STUDENT") {
//       return res.status(403).json({ message: "Only students can access dashboard" });
//     }

//     // Fetch student with enrolled courses
//     const student = await User.findById(userId).populate("enrolledCourses");

//     if (!student) return res.status(404).json({ message: "Student not found" });

//     const enrolledCourses = student.enrolledCourses;

//     // Stats
//     const totalCourses = enrolledCourses.length;

//     // Total materials across all enrolled courses
//     const totalMaterials = enrolledCourses.reduce(
//       (sum, course) => sum + (course.materials?.length || 0),
//       0
//     );

//     // Total unique instructors
//     const instructorIds = [
//       ...new Set(enrolledCourses.map((c) => c.instructor.toString())),
//     ];
//     const totalInstructors = instructorIds.length;

//     // Recent activities (from enrolled courses)
//     const activities = [];
//     enrolledCourses.forEach((course) => {
//       course.activities
//         .slice(-5) // last 5 activities per course
//         .forEach((a) =>
//           activities.push({
//             course: course.title,
//             message: a.message,
//             timestamp: a.timestamp,
//           })
//         );
//     });

//     // Sort by timestamp (latest first)
//     activities.sort((a, b) => b.timestamp - a.timestamp);

//     res.json({
//       stats: { totalCourses, totalMaterials, totalInstructors },
//       activities,
//     });
//   } catch (err) {
//     console.error("❌ Error in getStudentDashboard:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// 📌 Student Dashboard
export const getStudentDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // ✅ fetch student with enrolledCourses populated
    const student = await User.findById(userId)
      .populate({
        path: "enrolledCourses",
        populate: [
          { path: "instructor", select: "fullName" },
          { path: "materials" },
        ],
      })
      .exec();

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const enrolledCourses = student.enrolledCourses || [];

    // ✅ stats
    const totalCourses = enrolledCourses.length;
    const totalMaterials = enrolledCourses.reduce(
      (sum, c) => sum + (c.materials?.length || 0),
      0
    );

    // collect all unique instructors from enrolled courses
    const instructorSet = new Set(enrolledCourses.map((c) => c.instructor?._id?.toString()));
    const totalInstructors = instructorSet.size;

    // ✅ activities — only from courses the student is enrolled in
    const activities = [];
    enrolledCourses.forEach((course) => {
      if (course.activities && course.activities.length > 0) {
        course.activities.forEach((a) => {
          activities.push({
            courseTitle: course.title,
            message: a.message,
            timestamp: a.timestamp,
          });
        });
      }
    });

    // sort activities by latest first
    activities.sort((a, b) => b.timestamp - a.timestamp);

    res.json({
      stats: { totalCourses, totalMaterials, totalInstructors },
      activities,
    });
  } catch (error) {
    console.error("Student dashboard error:", error);
    res.status(500).json({ message: "Server error" });
  }
};