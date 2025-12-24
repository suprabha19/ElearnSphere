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
  ],// <-- This is important
    // qualifications: { type: String },
    // experience: { type: Number },
    // verificationDocument: { type: String }, // store file path or cloud URL
    // instructorStatus: {
    //   type: String,
    //   enum: ["PENDING", "APPROVED", "REJECTED"],
    //   default: "PENDING",
    // },
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