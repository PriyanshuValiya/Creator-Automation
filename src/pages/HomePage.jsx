"use client";

import { SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";

export default function HomePage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure this runs only on the client
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isSignedIn, router]);

  if (!isClient) {
    return null; // Prevent rendering on the server
  }

  return (
    <SignedOut>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-16 px-6">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Automate Your Instagram Content with AI
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Boost your social media presence effortlessly with AI-powered post
            generation, scheduling, and automation.
          </p>
          <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
            Our tool transforms long-form content into engaging Instagram posts,
            saving you time and effort.
          </p>

          <h2 className="mt-16 text-3xl font-bold text-gray-900">
            Key Features
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition"
              >
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SignedOut>
  );
}

const features = [
  {
    title: "AI-Powered Post Generation",
    description: "Generate high-quality Instagram posts instantly using AI.",
    icon: "🤖",
  },
  {
    title: "Automated Hashtags & Captions",
    description: "Get optimized hashtags and captions for better reach.",
    icon: "🏷️",
  },
  {
    title: "Smart Scheduling & Auto-Posting",
    description: "Schedule posts and let AI handle the publishing.",
    icon: "📅",
  },
  {
    title: "Post Preview & Customization",
    description: "Edit, preview, and tweak your posts before publishing.",
    icon: "✍️",
  },
  {
    title: "Multi-Format Support",
    description: "Supports images, videos, and carousel posts.",
    icon: "📸",
  },
  {
    title: "Analytics & Performance Tracking",
    description: "Track engagement and optimize your content strategy.",
    icon: "📊",
  },
];