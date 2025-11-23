import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// Cosine similarity helpers
function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
  const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  if (!magA || !magB) return 0;
  return dot / (magA * magB);
}

function textToVector(text, vocabulary) {
  const tokens = text.toLowerCase().split(/\W+/);
  return vocabulary.map(word => tokens.filter(t => t === word).length);
}

function buildVocabulary(courses) {
  const vocabSet = new Set();
  courses.forEach(c => {
    const words = (c.title + " " + c.description)
      .toLowerCase()
      .split(/\W+/);
    words.forEach(w => vocabSet.add(w));
  });
  return Array.from(vocabSet);
}

// GET /api/recommend
router.get("/", async (req, res) => {
  try {
    const allCourses = await Course.find({}, { title: 1, description: 1, popularity: 1, image: 1 });

    if (!allCourses.length) return res.json([]);

    // Step 1: Pick top popular courses
    const topCourses = allCourses
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3); // top 3

    // Step 2: Build vocabulary
    const vocabulary = buildVocabulary(allCourses);

    // Step 3: Vectorize top courses
    const topVectors = topCourses.map(c => textToVector(c.title + " " + c.description, vocabulary));

    // Step 4: Compute average similarity for each course
    const recommended = allCourses
      .filter(c => !topCourses.some(tc => tc._id.equals(c._id))) // exclude top courses
      .map(course => {
        const courseVector = textToVector(course.title + " " + course.description, vocabulary);
        const avgSimilarity =
          topVectors.reduce((sum, vec) => sum + cosineSimilarity(courseVector, vec), 0) / topVectors.length;
        return { ...course._doc, similarity: avgSimilarity };
      })
      .sort((a, b) => b.similarity - a.similarity) // highest similarity first
      .slice(0, 8); // top 8 recommended courses

    res.json({ topCourses, recommended });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Recommendation failed" });
  }
});

export default router;
