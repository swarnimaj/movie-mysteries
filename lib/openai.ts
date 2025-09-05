import OpenAI from "openai";

// Initialize OpenAI client with API key from environment
export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//Generates a unique, interesting fact about a movie using OpenAI. Each call produces new content
export async function generateFunFact(movieTitle: string): Promise<string> {
  try {
    // Debug logging
    console.log("Environment check:", {
      hasApiKey: !!process.env.OPENAI_API_KEY,
      keyPrefix: process.env.OPENAI_API_KEY?.substring(0, 7) || 'NO_KEY',
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV
    });

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set!");
      return "The mystery vault is temporarily sealed. API key not configured!";
    }

    const prompt = `Reveal one fascinating, family-friendly mystery or secret about the movie "${movieTitle}". Share surprising behind-the-scenes facts, hidden details, or interesting trivia that most people don't know. Keep it under 200 characters, no spoilers.`;

    console.log("Making OpenAI request for movie:", movieTitle);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.9, // High creativity for varied responses
      messages: [
        { role: "system", content: "You are a movie mysteries expert who reveals fascinating secrets and hidden facts about films. Be intriguing and surprising while keeping facts family-friendly." },
        { role: "user", content: prompt },
      ],
    });

    console.log("OpenAI response received successfully");

    const text = response.choices?.[0]?.message?.content?.trim();
    return text && text.length > 0 ? text : "Here's a fascinating movie secret waiting to be discovered!";
  } catch (error) {
    console.error("OpenAI API error:", error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    
    return "The mystery vault is temporarily sealed. Please try unveiling another secret!";
  }
}


