"use client";

import { useState } from "react";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [file, setFile] = useState(null);

  const generateCaption = () => {
    setCaption("✨ Check out this amazing post! #Trending #AwesomeContent");
  };

  const generateHashtags = () => {
    setHashtags(["#SocialMedia", "#AI", "#ContentCreation", "#Trending"]);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">📝 Create a Manual Post</h2>

        {/* Upload File */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Upload Image/Video</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border p-2 w-full rounded-lg" />
        </div>

        {/* Caption Input & Generate Button */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Caption</label>
          <textarea
            className="border p-2 w-full rounded-lg"
            placeholder="Write your caption..."
            rows="3"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>
          <button onClick={generateCaption} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            ⚡ Generate Caption
          </button>
        </div>

        {/* Hashtag Generator */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Hashtag Generator</label>
          <div className="flex space-x-2">
            <button onClick={generateHashtags} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              🔥 Generate Hashtags
            </button>
          </div>
          {hashtags.length > 0 && (
            <div className="mt-2 p-2 bg-gray-200 rounded-lg">
              {hashtags.map((tag, index) => (
                <span key={index} className="text-blue-600 font-semibold mr-2">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
          📤 Post Now
        </button>
      </div>
    </div>
  );
}
