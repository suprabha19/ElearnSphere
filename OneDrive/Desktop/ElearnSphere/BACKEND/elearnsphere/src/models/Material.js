// models/Material.js
import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ["pdf", "video", "other"], required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Material", materialSchema);
