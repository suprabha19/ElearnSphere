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
        watchTime: {
          type: Number,
          default: 0, // in seconds
        },
        totalDuration: {
          type: Number,
          default: 0, // in seconds
        },
        fullyWatched: {
          type: Boolean,
          default: false,
        },
      },
    ],
    videoWatchProgress: [
      {
        materialId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        currentTime: {
          type: Number,
          default: 0, // in seconds
        },
        duration: {
          type: Number,
          default: 0, // total video duration in seconds
        },
        watchedSegments: [
          {
            start: Number,
            end: Number,
          },
        ],
        lastWatchedAt: {
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

// Method to check if material is unlocked (sequential access)
progressSchema.methods.isMaterialUnlocked = function (materialIndex, courseMaterials) {
  // First material is always unlocked
  if (materialIndex === 0) return true;
  
  // Check if previous material is completed
  if (materialIndex > 0 && materialIndex < courseMaterials.length) {
    const previousMaterialId = courseMaterials[materialIndex - 1]._id;
    const isCompleted = this.completedMaterials.some(
      (m) => m.materialId.toString() === previousMaterialId.toString() && m.fullyWatched
    );
    return isCompleted;
  }
  
  return false;
};

// Method to get next unlocked material index
progressSchema.methods.getNextUnlockedMaterialIndex = function (courseMaterials) {
  for (let i = 0; i < courseMaterials.length; i++) {
    if (this.isMaterialUnlocked(i, courseMaterials)) {
      const materialId = courseMaterials[i]._id;
      const isCompleted = this.completedMaterials.some(
        (m) => m.materialId.toString() === materialId.toString()
      );
      if (!isCompleted) {
        return i;
      }
    } else {
      return i - 1; // Return last unlocked
    }
  }
  return courseMaterials.length - 1; // All unlocked
};

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
