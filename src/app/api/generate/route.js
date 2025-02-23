import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function POST(req) {
  try {
    const { topic , wordlimit } = await req.json();
    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    // Start a chat session
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });



    // Send request to Gemini for a detailed caption & max 5 hashtags
    const prompt = `
      Generate a highly engaging social media caption for the topic: "${topic}" in less than ${wordlimit}. 
      The caption should be **short, informative and creative, relavant**.
      Also, provide **exactly 5 relevant hashtags** related to the caption for instagram.
      Format the response as:
      "Caption: {Your caption here} \n Hashtags: {tag1 tag2 tag3 tag4 tag5}"
    `;

    const result = await chatSession.sendMessage(prompt);
    const responseText = await result.response.text();

    console.log("Gemini API Response:", responseText);

    // Extract Caption & Hashtags
    const captionMatch = responseText.match(/Caption: (.+)/i);
    const hashtagsMatch = responseText.match(/Hashtags: (.+)/i);

    const caption = captionMatch ? captionMatch[1].trim() : "No caption generated.";
    const hashtags = hashtagsMatch ? hashtagsMatch[1].split(" ").slice(0, 5) : [];

    return NextResponse.json({ caption, hashtags });
  } catch (error) {
    console.error("Error fetching AI content:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
