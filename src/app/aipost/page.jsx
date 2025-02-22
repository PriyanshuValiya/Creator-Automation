"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function AIPost() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!keyword.trim()) {
      alert("Please enter a topic for better results.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setGeneratedCaption(`✨ "${keyword}" - Let's make it viral! 🚀`);
      setGeneratedHashtags(["#ContentCreator", "#InstaGrowth", "#TrendingNow", "#SocialBoost"]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">✨ AI-Powered Post Generator</h2>

        {/* Keyword Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Enter a Topic/Keyword</label>
          <input
            type="text"
            className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="e.g. Digital Marketing, AI Trends..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full bg-indigo-500 text-white py-3 rounded-xl hover:bg-indigo-600 transition font-semibold"
          disabled={loading}
        >
          {loading ? "Generating..." : "🚀 Generate Post"}
        </button>

      </motion.div>
    </div>
  );
}
