import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 8 },
    role: {
      type: String,
      enum: ["STUDENT", "INSTRUCTOR", "ADMIN"],
      default: "STUDENT",
    },
    enrolledCourses: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
    ],
    // Profile fields for instructors
    bio: { type: String, default: "" },
    qualifications: { type: String, default: "" },
    experience: { type: String, default: "" },
    expertise: [{ type: String }],
    profilePicture: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

// module.exports = mongoose.model("User", userSchema);

const User = mongoose.model("User", userSchema);

export default User; 