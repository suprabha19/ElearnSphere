import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    certificateNumber: {
      type: String,
      unique: true,
      required: true,
    },
    issuedDate: {
      type: Date,
      default: Date.now,
    },
    completionDate: {
      type: Date,
      required: true,
    },
    grade: {
      type: String,
      default: "Pass",
    },
    verificationUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

// Index for efficient querying
certificateSchema.index({ student: 1, course: 1 }, { unique: true });
certificateSchema.index({ certificateNumber: 1 });

// Generate certificate number
certificateSchema.statics.generateCertificateNumber = function () {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CERT-${timestamp}-${random}`;
};

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
