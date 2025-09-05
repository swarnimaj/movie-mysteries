import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { generateFunFact } from "@/lib/openai";

// Validate movie name, must be between 1-200 characters
const QuerySchema = z.object({ movie: z.string().trim().min(1).max(200) });

// API endpoint to generate new movie facts Requires authentication and returns a new fact each time
export async function GET(req: Request) {
  try {
    // Check if user is authenticated
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract and validate movie name from query parameters
    const url = new URL(req.url);
    const movie = url.searchParams.get("movie") || "";
    const parse = QuerySchema.safeParse({ movie });
    if (!parse.success) {
      return NextResponse.json({ error: "Invalid movie" }, { status: 400 });
    }

    // Generate new fact using OpenAI
    const fact = await generateFunFact(parse.data.movie);
    return NextResponse.json({ fact });
  } catch (error) {
    console.error("Fun fact API error:", error);
    return NextResponse.json({ 
      error: "Failed to generate fact", 
      fact: "Here's a fascinating movie secret waiting to be discovered!" 
    }, { status: 500 });
  }
}
