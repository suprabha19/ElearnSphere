import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
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
    completedMaterials: [
      {
        materialId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        completedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    totalMaterials: {
      type: Number,
      default: 0,
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index for efficient querying
progressSchema.index({ student: 1, course: 1 }, { unique: true });
progressSchema.index({ student: 1, completionPercentage: -1 });

// Method to calculate completion percentage
progressSchema.methods.calculateProgress = function () {
  if (this.totalMaterials === 0) {
    this.completionPercentage = 0;
  } else {
    this.completionPercentage = Math.round(
      (this.completedMaterials.length / this.totalMaterials) * 100
    );
  }
  return this.completionPercentage;
};

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
