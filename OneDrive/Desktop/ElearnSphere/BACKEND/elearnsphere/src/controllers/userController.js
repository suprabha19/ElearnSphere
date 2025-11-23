import User from "../models/User.js";
import Course from "../models/Course.js";

// Get courses the student is enrolled in
export const getEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("enrolledCourses");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.enrolledCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
