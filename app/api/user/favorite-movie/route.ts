import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Validate favorite movie input
const BodySchema = z.object({ favoriteMovie: z.string().trim().min(1).max(200) });

/**
 * API endpoint to save user's favorite movie choice
 * Used during onboarding when user first selects their movie
 */
export async function POST(req: Request) {
  // Ensure user is authenticated and has email
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse and validate request body
  const json = await req.json().catch(() => ({}));
  const parse = BodySchema.safeParse(json);
  if (!parse.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { favoriteMovie } = parse.data;

  // Update user's favorite movie in database
  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: { favoriteMovie },
    select: { id: true, favoriteMovie: true },
  });

  return NextResponse.json({ ok: true, user });
}

