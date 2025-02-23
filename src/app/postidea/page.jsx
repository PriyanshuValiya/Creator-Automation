"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const categories = [
  "Motivation",
  "Finance",
  "Technology",
  "AI News",
  "Trends",
  "Brands",
];

export default function PostIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const generateNewIdeas = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: selectedCategory, wordlimit: 20 }),
      });

      const data = await response.json();
      if (data.ideas) {
        setIdeas(data.ideas);
      }
    } catch (error) {
      console.error("Error generating new ideas:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-10 flex flex-col items-center">
      <motion.h1
        className="text-4xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        ✨ AI-Generated Instagram Post Ideas
      </motion.h1>
      <p className="text-gray-600 mt-3 text-center max-w-lg">
        Get creative and boost engagement with fresh content ideas powered by
        AI.
      </p>

      {/* Category Selection */}
      <div className="mt-6">
        <label className="text-gray-700 font-medium mr-3">
          Choose Category:
        </label>
        <select
          className="p-2 border border-gray-300 rounded-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {ideas.length > 0 ? (
        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {ideas.map((idea, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold">{idea}</h3>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="mt-6 text-gray-500">
          No ideas generated yet. Click the button below to get started!
        </p>
      )}

      <motion.button
        onClick={generateNewIdeas}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition flex items-center disabled:opacity-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={loading}
      >
        <Sparkles className="mr-2" />{" "}
        {loading ? "Generating..." : "Generate Ideas"}
      </motion.button>
    </div>
  );
}
