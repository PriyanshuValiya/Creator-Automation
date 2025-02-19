  "use client";

  import { useUser, SignOutButton } from "@clerk/nextjs";
  import { useRouter } from "next/navigation";
  import { useEffect, useState } from "react";

  export default function Dashboard() {
    const { user, isSignedIn } = useUser();
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [customCategory, setCustomCategory] = useState("");
    const [categories, setCategories] = useState([
      "Technology",
      "Travel",
      "Finance",
      "Fitness",
      "Fashion",
    ]);
    const [showManualPost, setShowManualPost] = useState(false);

    useEffect(() => {
      if (!isSignedIn) {
        router.push("/");
      }
    }, [isSignedIn, router]);

    const addCategory = () => {
      if (customCategory.trim() !== "" && !categories.includes(customCategory)) {
        setCategories([...categories, customCategory]);
        setCustomCategory("");
      }
    };

    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-6 flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <nav className="flex flex-col space-y-3">
            <button className="p-3 bg-gray-200 rounded-lg text-left hover:bg-gray-300 transition">📝 Create Post</button>
            <button className="p-3 bg-gray-200 rounded-lg text-left hover:bg-gray-300 transition">📅 Schedule Post</button>
            <button className="p-3 bg-gray-200 rounded-lg text-left hover:bg-gray-300 transition">🤖 AI Post</button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src={user?.imageUrl} alt="Profile" className="w-10 h-10 rounded-full border" />
              <span className="text-lg font-semibold">{user?.fullName}</span>
            </div>
            <SignOutButton>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Sign Out
              </button>
            </SignOutButton>
          </header>

          {/* Category Selection & Add Category */}
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold text-gray-800">Select Category</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg text-white transition ${
                    selectedCategory === category ? "bg-blue-600" : "bg-blue-400 hover:bg-blue-500"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Add New Category */}
            <div className="mt-4 flex space-x-4">
              <input
                type="text"
                placeholder="Add custom category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="px-3 py-2 border rounded-lg w-64"
              />
              <button
                onClick={addCategory}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                ➕ Add
              </button>
            </div>

            {/* Buttons for Manual & AI */}
            <div className="mt-6 flex space-x-6">
              <button
                onClick={() => setShowManualPost(!showManualPost)}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
              >
                ✍️ Manual Post
              </button>
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                🤖 AI-Powered Post
              </button>
            </div>

            {/* Manual Post Section (Hidden by default, toggled on click) */}
            {showManualPost && (
              <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">📤 Create Manual Post</h3>

                {/* Upload Image/Video */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Upload Image/Video</label>
                  <input type="file" className="border p-2 w-full rounded-lg" />
                </div>

                {/* Caption Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Caption</label>
                  <textarea
                    className="border p-2 w-full rounded-lg"
                    placeholder="Write your caption..."
                    rows="3"
                  ></textarea>
                </div>

                {/* Hashtag Generator (Placeholder for AI-powered suggestion) */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Hashtag Generator</label>
                  <div className="flex space-x-2">
                    <input type="text" className="border p-2 flex-1 rounded-lg" placeholder="Type keyword..." />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                      Generate
                    </button>
                  </div>
                </div>

                {/* Schedule Button */}
                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                  ⏳ Schedule Post
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
