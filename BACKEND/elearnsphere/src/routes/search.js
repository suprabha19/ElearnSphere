import express from "express";
import Course from "../models/Course.js"; // adjust path as needed

const router = express.Router();

// Search endpoint
router.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query) return res.json([]); // no query → no results

  try {
    console.log("Searching for:", query);
    const courses = await Course.find(
      { title: { $regex: query, $options: "i" } }, // case-insensitive match
      { title: 1, popularity: 1, description: 1 } // return only what we need
    )
      .sort({ popularity: -1 }) // most popular first
      .limit(8); // keep it short

    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;
