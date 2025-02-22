"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Send } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

export default function AIPost() {
  const { user } = useUser();
  const [keyword, setKeyword] = useState("");
  const [theme, setTheme] = useState("color");
  const [size, setSize] = useState("1:1");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");

  const handleTextToImage = async () => {
    setLoading(true);
    setGeneratedImage("");

    const path =
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMAGE_KEY}`,
    };

    const [width, height] =
      size === "1:1"
        ? [1080, 1080]
        : size === "16:9"
        ? [1920, 1080]
        : [1080, 1920];

    const body = {
      steps: 20,
      width: 896,
      height: 1152,
      seed: 0,
      cfg_scale: 3,
      samples: 1,
      text_prompts: [
        {
          text: `Create a simple, clean, and modern Instagram poster about "${keyword}". 
                 The theme should be ${theme}, with a **minimalist and flat design**. 
                 No unnecessary details, no clutter. Use modern UI style with clear fonts.`,
          weight: 1,
        },
      ],
    };

    try {
      const response = await fetch(path, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Non-200 response: ${await response.text()}`);
      }

      const responseJSON = await response.json();
      const base64Image = responseJSON.artifacts[0]?.base64;

      if (base64Image) {
        setGeneratedImage(`data:image/png;base64,${base64Image}`);
      } else {
        throw new Error("Image generation failed");
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = () => {
    if (!generatedImage) return;

    const base64Data = generatedImage.split(",")[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `AI_Post_${keyword.replace(/\s+/g, "_")}.jpg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendEmail = async () => {
    if (!generatedImage) {
      toast("Sorry, Image is not Created !!");
      return;
    }

    toast("We will send you mail of this image...");
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    try {
      const response = await fetch("/api/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          image: generatedImage,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast("Email Sent Successfully...");
      } else {
        toast(`Failed to send email: ${result.error}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast("An error occurred while sending the email !!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#e0e7ff] p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 backdrop-blur-md shadow-xl rounded-3xl p-8 w-full max-w-lg border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center flex items-center gap-2">
          ✨ AI-Powered Post Generator
        </h2>

        {/* Keyword Input */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Enter a Topic/Keyword
          </label>
          <input
            type="text"
            className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none bg-white text-gray-800 placeholder-gray-500"
            placeholder="Digital Marketing, AI Trends, Fitness"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {/* Theme Selection */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Select Photo Theme
          </label>
          <Select onValueChange={(val) => setTheme(val)} defaultValue={theme}>
            <SelectTrigger className="w-full border border-gray-300 p-3 rounded-xl bg-white focus:ring-2 focus:ring-indigo-400">
              <SelectValue placeholder="Select Theme" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg rounded-xl cursor-pointer">
              <SelectItem className="cursor-pointer" value="color">
                🎨 Color
              </SelectItem>
              <SelectItem className="cursor-pointer" value="black_white">
                🖤 Black & White
              </SelectItem>
              <SelectItem className="cursor-pointer" value="vintage">
                📜 Vintage
              </SelectItem>
              <SelectItem className="cursor-pointer" value="minimalist">
                ⚪ Minimalist
              </SelectItem>
              <SelectItem className="cursor-pointer" value="cyberpunk">
                🔥 Cyberpunk
              </SelectItem>
              <SelectItem className="cursor-pointer" value="abstract">
                🎭 Abstract
              </SelectItem>
              <SelectItem className="cursor-pointer" value="nature">
                🌿 Nature
              </SelectItem>
              <SelectItem className="cursor-pointer" value="dark_mode">
                🌑 Dark Mode
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleTextToImage}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-xl hover:scale-[1.03] transition font-semibold shadow-lg"
          disabled={loading}
        >
          {loading ? "⏳ Generating..." : "🚀 Generate Image"}
        </Button>

        {/* Generated Image Display */}
        {loading && (
          <div className="mt-6">
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        )}

        {!loading && generatedImage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-xl shadow-inner bg-gray-100"
          >
            <img
              src={generatedImage}
              alt="Generated"
              className="w-full rounded-lg"
            />

            <div className="flex justify-between mt-5">
              <Button
                className="w-1/3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-xl hover:scale-[1.03] transition font-semibold shadow-lg"
                onClick={handleSendEmail}
              >
                <Send /> Share
              </Button>
              <Button
                className="w-1/3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-xl hover:scale-[1.03] transition font-semibold shadow-lg"
                onClick={handleDownloadImage}
              >
                <Download /> Download
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
