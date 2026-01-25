import Certificate from "../models/Certificate.js";
import Progress from "../models/Progress.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import { createNotification } from "./notificationController.js";

// Generate certificate when course is 100% complete
export const generateCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;

    // Check if already has certificate
    const existingCertificate = await Certificate.findOne({
      student: studentId,
      course: courseId,
    });

    if (existingCertificate) {
      return res.status(400).json({
        message: "Certificate already generated for this course",
        certificate: existingCertificate,
      });
    }

    // Check progress
    const progress = await Progress.findOne({
      student: studentId,
      course: courseId,
    });

    if (!progress || progress.completionPercentage < 100) {
      return res.status(400).json({
        message: "Course must be 100% complete to generate certificate",
        currentProgress: progress ? progress.completionPercentage : 0,
      });
    }

    const course = await Course.findById(courseId).populate("instructor", "fullName");
    const student = await User.findById(studentId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Generate certificate
    const certificateNumber = Certificate.generateCertificateNumber();
    const certificate = await Certificate.create({
      student: studentId,
      course: courseId,
      certificateNumber,
      completionDate: new Date(),
      verificationUrl: `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify/${certificateNumber}`,
    });

    // Populate certificate data
    const populatedCertificate = await Certificate.findById(certificate._id)
      .populate("student", "fullName email")
      .populate("course", "title description instructor");

    // Create notification
    await createNotification({
      userId: studentId,
      type: "GENERAL",
      title: "Certificate Generated!",
      message: `Congratulations! You've earned a certificate for completing "${course.title}"`,
      link: `/certificates/${certificate._id}`,
    });

    res.status(201).json({
      message: "Certificate generated successfully",
      certificate: populatedCertificate,
    });
  } catch (error) {
    console.error("Generate certificate error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Auto-generate certificate (called internally when progress reaches 100%)
export const autoGenerateCertificate = async (studentId, courseId) => {
  try {
    // Check if certificate already exists
    const existingCertificate = await Certificate.findOne({
      student: studentId,
      course: courseId,
    });

    if (existingCertificate) {
      return null; // Already exists
    }

    const certificateNumber = Certificate.generateCertificateNumber();
    const certificate = await Certificate.create({
      student: studentId,
      course: courseId,
      certificateNumber,
      completionDate: new Date(),
      verificationUrl: `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify/${certificateNumber}`,
    });

    // Create notification
    const course = await Course.findById(courseId);
    await createNotification({
      userId: studentId,
      type: "GENERAL",
      title: "Certificate Generated!",
      message: `Congratulations! You've earned a certificate for completing "${course.title}"`,
      link: `/certificates/${certificate._id}`,
    });

    return certificate;
  } catch (error) {
    console.error("Auto-generate certificate error:", error);
    return null;
  }
};

// Get student's certificate for a course
export const getCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;

    const certificate = await Certificate.findOne({
      student: studentId,
      course: courseId,
    })
      .populate("student", "fullName email")
      .populate("course", "title description instructor");

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.json({ certificate });
  } catch (error) {
    console.error("Get certificate error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all certificates for a student
export const getAllCertificates = async (req, res) => {
  try {
    const studentId = req.user.id;

    const certificates = await Certificate.find({ student: studentId })
      .populate("course", "title description image category instructor")
      .sort({ issuedDate: -1 });

    res.json({
      certificates,
      total: certificates.length,
    });
  } catch (error) {
    console.error("Get all certificates error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify certificate by number
export const verifyCertificate = async (req, res) => {
  try {
    const { certificateNumber } = req.params;

    const certificate = await Certificate.findOne({ certificateNumber })
      .populate("student", "fullName email")
      .populate({
        path: "course",
        select: "title description instructor",
        populate: {
          path: "instructor",
          select: "fullName",
        },
      });

    if (!certificate) {
      return res.status(404).json({ 
        valid: false,
        message: "Certificate not found" 
      });
    }

    res.json({
      valid: true,
      certificate,
    });
  } catch (error) {
    console.error("Verify certificate error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get certificate by ID (for display/download)
export const getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.user.id;

    const certificate = await Certificate.findById(id)
      .populate("student", "fullName email")
      .populate({
        path: "course",
        select: "title description instructor",
        populate: {
          path: "instructor",
          select: "fullName",
        },
      });

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    // Verify ownership
    if (certificate.student._id.toString() !== studentId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json({ certificate });
  } catch (error) {
    console.error("Get certificate by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
