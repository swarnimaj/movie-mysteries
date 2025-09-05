"use client";
import { signIn, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Redirect to main page if already signed in
  useEffect(() => {
    getSession().then((session) => {
      if (session?.user) {
        router.push("/");
      }
    }).catch(() => {});
  }, [router]);

  // Handle Google sign-in process
  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await signIn("google", { 
        callbackUrl: "/",
        redirect: false 
      });
      
      if (result?.error) {
        setError("Authentication failed. Please try again.");
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-400"></div>
      
      <div className="mystery-card p-8 max-w-md w-full text-center space-y-6 float-animation">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold glow-text bg-gradient-to-r from-purple-400 via-cyan-400 to-yellow-400 bg-clip-text text-transparent">
            MovieMysteries
          </h1>
          <p className="text-cyan-300 text-lg">Enter the vault of cinematic secrets</p>
          <p className="text-gray-400">Authenticate your access to uncover the mysteries behind your favorite films</p>
        </div>
        
        {error && (
          <div className="text-red-300 text-sm bg-red-900/30 border border-red-500/30 p-3 rounded-lg flex items-center gap-2">
            <ExclamationTriangleIcon className="w-4 h-4 text-red-400 flex-shrink-0" />
            {error}
          </div>
        )}
        
        <button
          className="mystery-button w-full px-6 py-4 rounded-lg text-black font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              Accessing Vault...
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <LockClosedIcon className="w-5 h-5" />
              Enter with Google
            </span>
          )}
        </button>
        
        <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
          <LockClosedIcon className="w-3 h-3" />
          Secure authentication via Google
        </div>
      </div>
    </main>
  );
}
