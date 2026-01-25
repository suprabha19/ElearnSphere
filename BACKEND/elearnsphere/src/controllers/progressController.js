import Progress from "../models/Progress.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

// Get progress for a specific course
export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;

    // Check if student is enrolled
    const user = await User.findById(studentId);
    if (!user.enrolledCourses.some(id => id.toString() === courseId)) {
      return res.status(403).json({ message: "Not enrolled in this course" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    let progress = await Progress.findOne({
      student: studentId,
      course: courseId,
    });

    // If no progress exists, create it
    if (!progress) {
      progress = await Progress.create({
        student: studentId,
        course: courseId,
        totalMaterials: course.materials.length,
        completedMaterials: [],
        completionPercentage: 0,
      });
    } else {
      // Update total materials count if it changed
      if (progress.totalMaterials !== course.materials.length) {
        progress.totalMaterials = course.materials.length;
        progress.calculateProgress();
        await progress.save();
      }
    }

    res.json({
      progress,
      courseMaterials: course.materials,
    });
  } catch (error) {
    console.error("Get course progress error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Mark material as completed
export const markMaterialComplete = async (req, res) => {
  try {
    const { courseId, materialId } = req.params;
    const studentId = req.user.id;

    // Check enrollment
    const user = await User.findById(studentId);
    if (!user.enrolledCourses.some(id => id.toString() === courseId)) {
      return res.status(403).json({ message: "Not enrolled in this course" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Verify material exists in course
    const materialExists = course.materials.some(
      m => m._id.toString() === materialId
    );
    if (!materialExists) {
      return res.status(404).json({ message: "Material not found in this course" });
    }

    let progress = await Progress.findOne({
      student: studentId,
      course: courseId,
    });

    // Create progress if it doesn't exist
    if (!progress) {
      progress = await Progress.create({
        student: studentId,
        course: courseId,
        totalMaterials: course.materials.length,
        completedMaterials: [{ materialId, completedAt: new Date() }],
      });
    } else {
      // Check if material already completed
      const alreadyCompleted = progress.completedMaterials.some(
        m => m.materialId.toString() === materialId
      );

      if (!alreadyCompleted) {
        progress.completedMaterials.push({
          materialId,
          completedAt: new Date(),
        });
      }
    }

    progress.lastAccessedAt = new Date();
    progress.calculateProgress();
    await progress.save();

    res.json({
      message: "Material marked as complete",
      progress,
      completionPercentage: progress.completionPercentage,
    });
  } catch (error) {
    console.error("Mark material complete error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Mark material as incomplete
export const markMaterialIncomplete = async (req, res) => {
  try {
    const { courseId, materialId } = req.params;
    const studentId = req.user.id;

    const progress = await Progress.findOne({
      student: studentId,
      course: courseId,
    });

    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    // Remove material from completed list
    progress.completedMaterials = progress.completedMaterials.filter(
      m => m.materialId.toString() !== materialId
    );

    progress.lastAccessedAt = new Date();
    progress.calculateProgress();
    await progress.save();

    res.json({
      message: "Material marked as incomplete",
      progress,
      completionPercentage: progress.completionPercentage,
    });
  } catch (error) {
    console.error("Mark material incomplete error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all progress for a student
export const getAllProgress = async (req, res) => {
  try {
    const studentId = req.user.id;

    const progressList = await Progress.find({ student: studentId })
      .populate("course", "title description image category")
      .sort({ lastAccessedAt: -1 });

    res.json({
      progressList,
      totalCourses: progressList.length,
      averageCompletion: progressList.length > 0
        ? Math.round(
            progressList.reduce((sum, p) => sum + p.completionPercentage, 0) /
              progressList.length
          )
        : 0,
    });
  } catch (error) {
    console.error("Get all progress error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get progress statistics
export const getProgressStats = async (req, res) => {
  try {
    const studentId = req.user.id;

    const progressList = await Progress.find({ student: studentId });

    const completed = progressList.filter(p => p.completionPercentage === 100).length;
    const inProgress = progressList.filter(
      p => p.completionPercentage > 0 && p.completionPercentage < 100
    ).length;
    const notStarted = progressList.filter(p => p.completionPercentage === 0).length;

    const totalMaterials = progressList.reduce((sum, p) => sum + p.completedMaterials.length, 0);

    res.json({
      stats: {
        totalCourses: progressList.length,
        completedCourses: completed,
        inProgressCourses: inProgress,
        notStartedCourses: notStarted,
        totalMaterialsCompleted: totalMaterials,
        averageCompletion: progressList.length > 0
          ? Math.round(
              progressList.reduce((sum, p) => sum + p.completionPercentage, 0) /
                progressList.length
            )
          : 0,
      },
    });
  } catch (error) {
    console.error("Get progress stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Reset course progress
export const resetCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;

    const progress = await Progress.findOne({
      student: studentId,
      course: courseId,
    });

    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    progress.completedMaterials = [];
    progress.calculateProgress();
    progress.lastAccessedAt = new Date();
    await progress.save();

    res.json({
      message: "Progress reset successfully",
      progress,
    });
  } catch (error) {
    console.error("Reset progress error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
