"use client";

import {
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Dashboard() {
  // const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // Redirect to home if not signed in
  useEffect(() => {
    // if (isSignedIn === false) {
      router.replace("/");
    // } else if (isSignedIn === true) {
    //   setLoading(false);
    // }
  }, [router]);

  if (loading) return null; // Prevent rendering before auth check

  return (
    <SignedIn>
      <div className="flex h-screen bg-gray-50 text-gray-900">
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-lg p-6 flex flex-col transition-all duration-300 ease-in-out ${
            sidebarOpen ? "w-64" : "w-16"
          } border-r border-gray-200`}
        >
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
            {sidebarOpen ? (
              <X size={24} className="mx-44" />
            ) : (
              <Menu size={24} className="-mx-3" />
            )}
          </button>
          {sidebarOpen && (
            <>
              <h2 className="text-xl font-bold mt-4">Dashboard</h2>
              <nav className="flex flex-col space-y-4 mt-6">
                <Link href="/createpost">
                  <button className="w-full p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition">
                    ✍ Create Post
                  </button>
                </Link>
                <Link href="/aipost">
                  <button className="w-full p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition">
                    🤖 AI Post
                  </button>
                </Link>
                <Link href="/postidea">
                  <button className="w-full p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition">
                    💡 Post Ideas
                  </button>
                </Link>
                <div
                  className="relative"
                  onMouseEnter={() => setShowCalendar(true)}
                  onMouseLeave={() => setShowCalendar(false)}
                >
                  <button className="w-full p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition">
                    📅 Calendar
                  </button>
                  {showCalendar && (
                    <div className="absolute mt-2 bg-white shadow-lg p-4 rounded-lg z-10">
                      <Calendar />
                    </div>
                  )}
                </div>
                <SignOutButton>
                  <button className="w-full p-3 bg-red-500 text-black rounded-xl hover:bg-red-400 transition">
                    Sign Out
                  </button>
                </SignOutButton>
              </nav>
            </>
          )}
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6 space-y-6">
          {/* Top Bar */}
          <header className="bg-white shadow px-6 py-4 -mx-6 -mt-6 flex justify-between items-center rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold">Creator Automation</h2>
            <UserButton showName />
          </header>

          {/* Workflow Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow border-l-8 border-gray-800">
              <h3 className="text-lg font-semibold">✍ Manual Post Creation</h3>
              <p className="text-gray-600 mt-3">
                Create posts manually for full control. Perfect for customized
                content.
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2">
                <li>Enter Topics to organize your posts.</li>
                <li>Upload relevant image/video for engaging content.</li>
                <li>Flexible Caption length.</li>
                <li>Get AI generated Captions and Hashtags in Seconds.</li>
                <li>Schedule posts or publish immediately.</li>
              </ul>
              <Link href="/createpost">
                <button className="mt-4 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition shadow-md">
                  Go to Manual Post
                </button>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border-l-8 border-gray-800">
              <h3 className="text-lg font-semibold">
                🤖 AI-Powered Post Creation
              </h3>
              <p className="text-gray-600 mt-3">
                Let AI generate high-quality posts for you effortlessly.
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2">
                <li>Select a category or provide a brief topic.</li>
                <li>Select the Theme for Photos as you like.</li>
                <li>Select the required Image Ratio.</li>
                <li>
                  AI generates an engaging post optimized for your audience.
                </li>
                <li>Schedule or publish instantly with a single click.</li>
              </ul>
              <Link href="/aipost">
                <button className="mt-4 px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-black transition shadow-md">
                  Try AI-Powered Post
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SignedIn>
  );
}
