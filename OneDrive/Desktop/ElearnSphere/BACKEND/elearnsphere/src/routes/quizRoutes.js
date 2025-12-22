// routes/quizRoutes.js
import express from "express";
import {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  submitQuizAttempt,
  getStudentAttempts,
  getQuizAttempt
} from "../controllers/quizController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Quiz routes
router.post("/", protect, authorize("INSTRUCTOR"), createQuiz);
router.get("/", protect, getQuizzes);
router.get("/:id", protect, getQuizById);
router.put("/:id", protect, authorize("INSTRUCTOR"), updateQuiz);
router.delete("/:id", protect, authorize("INSTRUCTOR"), deleteQuiz);

// Quiz attempt routes
router.post("/attempt", protect, authorize("STUDENT"), submitQuizAttempt);
router.get("/attempts/my-attempts", protect, authorize("STUDENT"), getStudentAttempts);
router.get("/attempts/:id", protect, getQuizAttempt);

export default router;
