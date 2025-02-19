"use client";

import { useState } from "react";

export default function AIPost() {
  const [keyword, setKeyword] = useState("");
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [generatedHashtags, setGeneratedHashtags] = useState([]);

  const handleGenerate = () => {
    setGeneratedCaption(`🚀 AI-generated post about "${keyword}"! Stay tuned for amazing content.`);
    setGeneratedHashtags(["#AIContent", "#SocialGrowth", "#ViralPosts", "#TechTrends"]);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">🤖 AI-Powered Post</h2>

        {/* Keyword Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Enter a Topic/Keyword</label>
          <input
            type="text"
            className="border p-2 w-full rounded-lg"
            placeholder="Enter a topic..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition mb-4"
        >
          ⚡ Generate Post & Hashtags
        </button>

        {/* AI Generated Caption */}
        {generatedCaption && (
          <div className="mt-4 p-4 bg-gray-200 rounded-lg">
            <p className="text-gray-700">{generatedCaption}</p>
          </div>
        )}

        {/* AI Generated Hashtags */}
        {generatedHashtags.length > 0 && (
          <div className="mt-4 p-2 bg-gray-200 rounded-lg">
            {generatedHashtags.map((tag, index) => (
              <span key={index} className="text-blue-600 font-semibold mr-2">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
