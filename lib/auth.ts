import { type NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// Extend the default session to include user ID and favorite movie
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      favoriteMovie?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  // Use Prisma adapter to store sessions in database
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { 
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // Keep users logged in for 30 days
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in", // Redirect errors to sign-in page for better UX
  },
  callbacks: {
    // Add user ID and favorite movie to the session for easy access
    session: async ({ session, user }) => {
      if (session.user && user) {
        session.user.id = user.id;
        session.user.favoriteMovie = (user as { favoriteMovie?: string }).favoriteMovie ?? null;
      }
      return session;
    },
    // Handle redirects after authentication
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  events: {
    async signIn({ user }) {
      console.log("User signed in:", user.email);
    },
    async signOut() {
      console.log("User signed out");
    },
  },
  debug: process.env.NODE_ENV === "development",
};

// Helper function to get the current session
export async function auth() {
  return getServerSession(authOptions);
}
