// src/models/QuizAttempt.js
import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: [
    {
      questionIndex: { type: Number, required: true },
      selectedAnswer: { type: Number, required: true }, // index of selected option
      isCorrect: { type: Boolean, required: true },
      points: { type: Number, default: 0 }
    }
  ],
  score: { type: Number, required: true },
  totalPoints: { type: Number, required: true },
  percentage: { type: Number, required: true },
  completedAt: { type: Date, default: Date.now }
});

const QuizAttempt = mongoose.model("QuizAttempt", quizAttemptSchema);
export default QuizAttempt;
