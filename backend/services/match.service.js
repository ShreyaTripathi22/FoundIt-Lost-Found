import { getDb } from "../config/db.js";
import { sendMatchEmail } from "./email.service.js";

/* ---------------- UTILS ---------------- */

// Levenshtein Distance (edit distance)
const editDistance = (a, b) => {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else {
        dp[i][j] =
          1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[a.length][b.length];
};

// Normalize similarity (0 → 1)
const similarityScore = (a, b) => {
  a = a.toLowerCase();
  b = b.toLowerCase();
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - editDistance(a, b) / maxLen;
};

/* ---------------- SMART MATCHING ---------------- */

export const runSmartMatching = async (item, type) => {
  const db = getDb();

  const targetCollection =
    type === "FOUND" ? "Lost Items" : "Found Items";

  const itemDate = new Date(item.date);
  const startDate = new Date(itemDate);
  startDate.setDate(itemDate.getDate() - 3);

  const candidates = await db.collection(targetCollection).find({
    date: {
      $gte: startDate.toISOString().split("T")[0],
      $lte: item.date,
    },
  }).toArray();

  const MATCH_THRESHOLD = 0.65; // 65% confidence
  const matches = [];

  for (const candidate of candidates) {
    const nameScore = similarityScore(item.name, candidate.name);
    const locationScore = similarityScore(
      item.location,
      candidate.location
    );

    // Weighted score
    const finalScore = nameScore * 0.7 + locationScore * 0.3;

    if (finalScore >= MATCH_THRESHOLD) {
      matches.push({
        ...candidate,
        confidence: Math.round(finalScore * 100),
      });

      // Email notification
      await sendMatchEmail(candidate.email, item, finalScore);
    }
  }

  return {
    totalMatches: matches.length,
    matches,
  };
};
