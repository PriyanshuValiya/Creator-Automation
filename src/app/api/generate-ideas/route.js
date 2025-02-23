import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function POST(req) {
  try {
    const { category, wordlimit = 30 } = await req.json();

    if (!category) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    const chatSession = model.startChat({
      generationConfig: {
        temperature: 1.2,
        topP: 0.95,
        topK: 50,
        maxOutputTokens: 500,
        responseMimeType: "text/plain",
      },
      history: [],
    });

    const prompt = `
      Generate 5 highly engaging Instagram post ideas for the *${category}* niche. 
      The ideas should be based on current viral trends across Instagram. 
      Make sure they have high engagement potential, are visually appealing, 
      and use effective storytelling or hooks.
      Format the response as a numbered list with each idea under ${wordlimit} words.
    `;

    const result = await chatSession.sendMessage(prompt);
    const responseText = await result.response.text();

    const ideas = responseText
      .split("\n\n")
      .map((idea) => idea.trim())
      .filter(Boolean)
      .slice(0, 6);

    return NextResponse.json({ ideas });
  } catch (error) {
    console.error("Error generating ideas:", error);
    return NextResponse.json(
      { error: "Failed to generate ideas" },
      { status: 500 }
    );
  }
}
