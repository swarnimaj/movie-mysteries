"use client";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon, EyeIcon } from "@heroicons/react/24/outline";

export function FunFact({ movie }: { movie: string }) {
  const [fact, setFact] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch a new movie fact from API
  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/fun-fact?movie=${encodeURIComponent(movie)}`);
      const data = await res.json();
      setFact(data.fact ?? "");
    } finally {
      setLoading(false);
    }
  }

  // Load new fact whenever the movie changes
  useEffect(() => {
    load();
  }, [movie]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-full border border-purple-500/30">
          <EyeIcon className="w-4 h-4 text-purple-400" />
          <span className="text-cyan-300 font-medium">Mystery revealed about</span>
          <span className="text-yellow-400 font-bold">{movie}</span>
          <EyeIcon className="w-4 h-4 text-purple-400" />
        </div>
      </div>
      
      <div className="relative">
        <div className="mystery-card p-6 min-h-[120px] flex items-center justify-center">
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-cyan-300 text-lg">Generating mystery...</span>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-lg text-white leading-relaxed typewriter-container">
                {fact}
              </div>
              <div className="flex justify-center">
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-center">
        <button 
          className="mystery-button px-8 py-3 rounded-full text-black font-bold shadow-lg inline-flex items-center gap-2"
          onClick={load}
          disabled={loading}
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
          Unveil Another Secret
        </button>
      </div>
    </div>
  );
}
