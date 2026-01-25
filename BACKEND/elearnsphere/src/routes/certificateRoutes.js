import express from "express";
import {
  generateCertificate,
  getCertificate,
  getAllCertificates,
  verifyCertificate,
  getCertificateById,
} from "../controllers/certificateController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route for verification
router.get("/verify/:certificateNumber", verifyCertificate);

// Protected routes
router.use(protect);

// Generate certificate for a course
router.post("/generate/:courseId", generateCertificate);

// Get certificate for a specific course
router.get("/course/:courseId", getCertificate);

// Get all certificates for logged-in student
router.get("/", getAllCertificates);

// Get certificate by ID
router.get("/:id", getCertificateById);

export default router;
