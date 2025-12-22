// src/models/Quiz.js
import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: Number, required: true }, // index of correct option (0-based)
      points: { type: Number, default: 1 }
    }
  ],
  totalPoints: { type: Number, default: 0 },
  duration: { type: Number, default: 30 }, // duration in minutes
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Calculate total points before saving
quizSchema.pre("save", function(next) {
  this.totalPoints = this.questions.reduce((sum, q) => sum + (q.points || 1), 0);
  this.updatedAt = Date.now();
  next();
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
