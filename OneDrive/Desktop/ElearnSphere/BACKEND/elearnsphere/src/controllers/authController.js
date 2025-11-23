const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT
function generateToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// Signup
exports.signup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      role,
      qualifications,
      experience,
    } = req.body;

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = new User({
      fullName,
      email,
      password,
      role,
      qualifications,
      experience,
      instructorStatus: role === "INSTRUCTOR" ? "PENDING" : "APPROVED",
    });

    await user.save();

    res.status(201).json({
      message:
        role === "INSTRUCTOR"
          ? "Instructor application submitted for approval"
          : "Signup successful",
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      token,
      role: user.role,
      instructorStatus: user.instructorStatus,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
