"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FilmIcon, ExclamationTriangleIcon, PlayIcon } from "@heroicons/react/24/outline";

export function FavoriteMovieForm() {
  const [movie, setMovie] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle form submission to save user's favorite movie
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!movie.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/user/favorite-movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favoriteMovie: movie.trim() }),
      });

      if (res.ok) {
        // Redirect to main page after successful save
        router.push("/");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save movie");
      }
    } catch {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          placeholder="e.g. Inception, The Matrix, Interstellar..."
          className="w-full p-4 bg-black/30 border border-purple-400/30 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all"
          required
          maxLength={200}
          disabled={loading}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <FilmIcon className="w-5 h-5 text-yellow-400" />
        </div>
      </div>
      
      {error && (
        <div className="text-red-300 text-sm bg-red-900/30 border border-red-500/30 p-3 rounded-lg flex items-center gap-2">
          <ExclamationTriangleIcon className="w-4 h-4 text-red-400 flex-shrink-0" />
          {error}
        </div>
      )}
      
      <button 
        type="submit" 
        disabled={loading || !movie.trim()}
        className="mystery-button w-full px-6 py-3 rounded-lg text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            Initializing Case File...
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <PlayIcon className="w-5 h-5" />
            Begin Investigation
          </span>
        )}
      </button>
    </form>
  );
}
