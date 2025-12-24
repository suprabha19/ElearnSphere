const express = require("express");
import multer from "multer";

const upload = multer({ dest: "uploads/" });

router.post("/signup", upload.single("verificationDocument"), signupController);

const { signup, login } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;

import { verifyToken, isInstructor, isAdmin } from "./middleware/authMiddleware.js";

app.get("/api/instructor/dashboard", verifyToken, isInstructor, (req, res) => {
  res.json({ message: "Welcome Instructor Dashboard", user: req.user });
});

app.get("/api/admin/dashboard", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin Dashboard", user: req.user });
});
