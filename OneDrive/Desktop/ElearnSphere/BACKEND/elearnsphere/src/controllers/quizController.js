// controllers/quizController.js
import Quiz from "../models/Quiz.js";
import QuizAttempt from "../models/QuizAttempt.js";
import User from "../models/User.js";

// Create a new quiz (Instructor only)
export const createQuiz = async (req, res) => {
  try {
    const { title, description, category, questions, duration } = req.body;

    if (!title || !description || !category || !questions || questions.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const quiz = await Quiz.create({
      title,
      description,
      category,
      questions,
      duration: duration || 30,
      instructor: req.user.id
    });

    res.status(201).json(quiz);
  } catch (err) {
    console.error("Create quiz error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all quizzes (filtered by role)
export const getQuizzes = async (req, res) => {
  try {
    let quizzes;
    if (req.user.role === "INSTRUCTOR") {
      // Instructors see only their quizzes
      quizzes = await Quiz.find({ instructor: req.user.id }).populate("instructor", "fullName email");
    } else {
      // Students see all active quizzes
      quizzes = await Quiz.find({ isActive: true }).populate("instructor", "fullName email");
    }

    res.json(quizzes);
  } catch (err) {
    console.error("Get quizzes error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get a single quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("instructor", "fullName email");
    
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // For students, don't send correct answers
    if (req.user.role === "STUDENT") {
      const quizForStudent = quiz.toObject();
      quizForStudent.questions = quizForStudent.questions.map(q => ({
        question: q.question,
        options: q.options,
        points: q.points,
        _id: q._id
      }));
      return res.json(quizForStudent);
    }

    res.json(quiz);
  } catch (err) {
    console.error("Get quiz error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a quiz (Instructor only)
export const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this quiz" });
    }

    const { title, description, category, questions, duration, isActive } = req.body;

    if (title) quiz.title = title;
    if (description) quiz.description = description;
    if (category) quiz.category = category;
    if (questions) quiz.questions = questions;
    if (duration) quiz.duration = duration;
    if (typeof isActive !== 'undefined') quiz.isActive = isActive;

    const updatedQuiz = await quiz.save();
    res.json(updatedQuiz);
  } catch (err) {
    console.error("Update quiz error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a quiz (Instructor only)
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this quiz" });
    }

    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ message: "Quiz deleted successfully" });
  } catch (err) {
    console.error("Delete quiz error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Submit quiz attempt (Student only)
export const submitQuizAttempt = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    if (!quizId || !answers || answers.length === 0) {
      return res.status(400).json({ message: "Quiz ID and answers are required" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Check if student has already attempted this quiz
    const existingAttempt = await QuizAttempt.findOne({ 
      quiz: quizId, 
      student: req.user.id 
    });

    if (existingAttempt) {
      return res.status(400).json({ 
        message: "You have already attempted this quiz",
        attempt: existingAttempt
      });
    }

    // Calculate score
    let score = 0;
    const processedAnswers = answers.map((answer, index) => {
      const question = quiz.questions[answer.questionIndex];
      const isCorrect = question.correctAnswer === answer.selectedAnswer;
      const points = isCorrect ? (question.points || 1) : 0;
      score += points;

      return {
        questionIndex: answer.questionIndex,
        selectedAnswer: answer.selectedAnswer,
        isCorrect,
        points
      };
    });

    const totalPoints = quiz.totalPoints;
    const percentage = (score / totalPoints) * 100;

    const attempt = await QuizAttempt.create({
      quiz: quizId,
      student: req.user.id,
      answers: processedAnswers,
      score,
      totalPoints,
      percentage
    });

    // Populate quiz and student info
    const populatedAttempt = await QuizAttempt.findById(attempt._id)
      .populate("quiz")
      .populate("student", "fullName email");

    res.status(201).json(populatedAttempt);
  } catch (err) {
    console.error("Submit quiz attempt error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get student's quiz attempts
export const getStudentAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ student: req.user.id })
      .populate("quiz")
      .sort({ completedAt: -1 });

    res.json(attempts);
  } catch (err) {
    console.error("Get attempts error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get specific quiz attempt (for viewing results)
export const getQuizAttempt = async (req, res) => {
  try {
    const attempt = await QuizAttempt.findById(req.params.id)
      .populate("quiz")
      .populate("student", "fullName email");

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    // Students can only see their own attempts
    if (req.user.role === "STUDENT" && attempt.student._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(attempt);
  } catch (err) {
    console.error("Get attempt error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
