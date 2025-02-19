"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Link from "next/link";

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
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    avatar: "",
  });

  // Redirect to home if not signed in
  useEffect(() => {
    if (isSignedIn === false) {
      router.replace("/");
    } else if (isSignedIn === true) {
      setLoading(false);
    }
  }, [isSignedIn, router]);

  // Set user data when available
  useEffect(() => {
    if (user) {
      setUserData({
        username: user?.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        avatar: user?.imageUrl,
      });
    }
  }, [user]);

  const addCategory = () => {
    if (customCategory.trim() !== "" && !categories.includes(customCategory)) {
      setCategories([...categories, customCategory]);
      setCustomCategory("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white shadow-lg p-6 flex flex-col space-y-6 transition-all ${sidebarOpen ? "w-64" : "w-16"}`}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="self-end p-2">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} className="-mx-4" />}
        </button>
        {sidebarOpen && (
          <>
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <nav className="flex flex-col space-y-3">
              <Link href="/createpost">
                <button className="p-3 bg-gray-200 rounded-lg text-left hover:bg-gray-300 transition">📝 Create Post</button>
              </Link>
              <Link href="/aipost">
                <button className="p-3 bg-gray-200 rounded-lg text-left hover:bg-gray-300 transition">🤖 AI Post</button>
              </Link>
              <SignOutButton>
                <button className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Sign Out</button>
              </SignOutButton>
            </nav>
          </>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 space-y-6">
        {/* Top Bar */}
        <header className="bg-white shadow-md px-6 py-4 flex justify-between -my-4 items-center rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800">Creator Automation</h2>
          <UserButton showName />
        </header>

        {/* Buttons for Navigation */}
        <div className="flex space-x-6">
          <Link href="/createpost">
            <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition">
              ✍️ Manual Post
            </button>
          </Link>
          <Link href="/aipost">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              🤖 AI-Powered Post
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
