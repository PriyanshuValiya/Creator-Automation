"use client";

import { SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import { motion } from "framer-motion";

export default function HomePage() {
  // const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure this runs only on the client
  }, []);

  useEffect(() => {
    // if (isLoaded && isSignedIn) {
      router.replace("/");
    //}
  }, []);

  // Prevent rendering content until auth state is loaded
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800">
        Hang tight! We're setting things up for you...
      </div>
    );
  }

  return (
    <SignedOut>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
        <Header />

        {/* Hero Section */}
        <div className="text-center py-20 px-6">
          <motion.h1
            className="text-5xl font-bold text-gray-900 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Automate Your Instagram Content with AI
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Boost your social media presence effortlessly with AI-powered post
            generation, scheduling, and automation.
          </motion.p>

          <motion.button
            className="mt-8 px-6 py-3 bg-black text-white font-semibold rounded-2xl shadow-md hover:bg-gray-800 transition"
            onClick={() => router.push("/sign-in")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go to Dashboard
          </motion.button>

          {/* Smoothly Animated Image */}
          <motion.img
            src="https://img.cryptopolitan.com/wp-content/uploads/2023/12/DALL%C2%B7E-2023-12-17-08.12.45-An-illustration-representing-Generative-AI-on-Social-Media.-It-features-a-humanoid-robot-sitting-at-a-modern-desk-surrounded-by-multiple-screens-di.jpg"
            alt="AI-powered Instagram automation"
            className="w-full max-w-4xl h-[500px] object-cover mx-auto mt-10 rounded-2xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          />
        </div>

        {/* Features Section */}
        <div className="py-20 bg-white">
          <h2 className="text-4xl font-bold text-center text-gray-900">
            Key Features
          </h2>
          <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore powerful AI tools designed to make your Instagram content
            creation seamless and effective.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-xl shadow-md border border-gray-300 hover:shadow-lg transition"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl">{feature.icon}</div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </motion.div>
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
    icon: "🏷",
  },
  {
    title: "Download AI-Generated Images & Email Delivery",
    description: "Save AI-created images locally and receive them via email.",
    icon: "📥",
  },
  {
    title: "Post Preview & Customization",
    description: "Edit, preview, and tweak your posts before publishing.",
    icon: "✍",
  },
  {
    title: "Multi-Format Support",
    description: "Supports images, videos, and carousel posts.",
    icon: "📸",
  },
  {
    title: "Generate Trending Post Ideas",
    description: "Get AI-suggested trending ideas for reels and images.",
    icon: "🔥",
  },
];
