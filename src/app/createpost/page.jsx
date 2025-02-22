"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const generateContent = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic for better results.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      setCaption(data.caption || "");
      setHashtags(data.hashtags || []);
    } catch (error) {
      console.error("Error fetching AI-generated content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnCopy = async () => {
    await navigator.clipboard.writeText(caption);
    toast("Caption Copied to Clipboard...");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">✨ AI-Powered Post Creator</h2>
        
        {/* Topic Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Enter Topic</label>
          <input
            type="text"
            className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Fitness, Motivation, Travel, Technology"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Upload Image/Video</label>
          <input
            type="file"
            accept="image/*,video/*"
            className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleFileChange}
          />
        </div>

        {/* Generate Content Button */}
        <button
          onClick={generateContent}
          className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition font-semibold"
          disabled={loading}
        >
          {loading ? "Generating..." : "⚡ Generate AI Content"}
        </button>

        {/* Caption Output */}
        <div className="mt-6">
          <label className="flex items-center justify-between text-gray-700 font-medium mb-2"><p>Generated Caption</p> < Copy className="cursor-pointer" size={15} onClick={handleOnCopy} /></label>
          <div className="border border-gray-300 p-3 w-full rounded-xl min-h-[80px] bg-gray-50">
            {loading ? (
              <>
                <Skeleton className="h-5 w-96 mb-2 bg-slate-300" />
                <Skeleton className="h-5 w-80 mb-2 bg-slate-300" />
                <Skeleton className="h-5 w-80 mb-2 bg-slate-300" />
                <Skeleton className="h-5 w-72 mb-2 bg-slate-300" />
              </>
            ) : caption || <p className="text-gray-500 font-base font-mono">Your generated caption will appear here...</p>}
          </div>
        </div>

        {/* Hashtags Output */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-2">Generated Hashtags</label>
          <div className="border border-gray-300 p-3 w-full rounded-xl bg-gray-50 min-h-[50px] flex flex-wrap gap-2">
            {loading ? (
              <>
                <Skeleton className="h-5 w-24 bg-slate-300" />
                <Skeleton className="h-5 w-28 bg-slate-300" />
                <Skeleton className="h-5 w-44 bg-slate-300" />
                <Skeleton className="h-5 w-36 bg-slate-300" />
                <Skeleton className="h-5 w-28 bg-slate-300" />
              </>
            ) : hashtags.length > 0 ? (
              hashtags.map((tag, index) => (
                <span key={index} className="border border-black text-sm text-blue-600 font-semibold bg-white px-2 py-1 rounded-xl shadow-sm">
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-500 font-mono">Generated hashtags will appear here...</span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}