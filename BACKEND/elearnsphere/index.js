import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import courseRoutes from "./src/routes/courseRoutes.js";
import userRoutes from "./src/routes/userRoutes.js"; // Make sure path is correct
import searchRoutes from "./src/routes/search.js";
import studentRoutes from "./src/routes/studentRoutes.js";
import recommendRoutes from "./src/routes/recommend.js";
import quizRoutes from "./src/routes/quizRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import notificationRoutes from "./src/routes/notificationRoutes.js";
import progressRoutes from "./src/routes/progressRoutes.js";
import certificateRoutes from "./src/routes/certificateRoutes.js";

const app = express();
dotenv.config();

app.use(express.json()); // body parser

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Allow requests from Vite frontend

app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", searchRoutes);
app.use("/api/recommend", recommendRoutes);

// app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/certificates", certificateRoutes);

// Allow serving files in /uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// ---------------------
// User Schema + Model
// ---------------------
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, enum: ["STUDENT", "INSTRUCTOR", "ADMIN"], default: "STUDENT" },
});

const UserModel = mongoose.model("users", userSchema);

// ---------------------
// Routes
// ---------------------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Signup
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { fullName, email, password, role, secretCode } = req.body;

    if (role === "INSTRUCTOR" && secretCode !== process.env.INSTRUCTOR_CODE) {
      return res.status(403).json({ message: "Invalid instructor code" });
    }
    if (role === "ADMIN" && secretCode !== process.env.ADMIN_CODE) {
      return res.status(403).json({ message: "Invalid admin code" });
    }



    const existing = await UserModel.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ fullName, email, password: hashedPassword, role, instructorStatus: role === "INSTRUCTOR" ? "PENDING" : "APPROVED", });
    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Middleware to verify instructor
export const verifyInstructor = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "INSTRUCTOR") return res.status(403).json({ message: "Access denied" });
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Example protected route
app.get("/api/instructor/dashboard", verifyInstructor, (req, res) => {
  res.json({ message: `Hello Instructor ${req.user.id}` });
});

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });

// ---------------------
// DB Connection + Start
// ---------------------
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("✅ Database connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => console.error("❌ MongoDB error:", error));
