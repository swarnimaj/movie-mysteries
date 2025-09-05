import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { FavoriteMovieForm } from "@/components/FavoriteMovieForm";
import { FilmIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default async function OnboardingPage() {
  // Ensure user is authenticated
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  // Redirect to main page if user already has a favorite movie
  if (session.user.favoriteMovie) {
    redirect("/");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-8 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-400"></div>
      
      <div className="mystery-card p-8 max-w-lg w-full space-y-6 float-animation">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold glow-text bg-gradient-to-r from-purple-400 via-cyan-400 to-yellow-400 bg-clip-text text-transparent">
            Welcome, {session.user.name?.split(' ')[0]}!
          </h1>
          <p className="text-cyan-300 text-lg">Initialize your investigation profile</p>
          <p className="text-gray-400">Choose your primary case file - we&apos;ll decrypt the hidden secrets and classified information about your chosen film.</p>
        </div>
        
        <div className="mystery-card p-6 bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-yellow-400 font-semibold inline-flex items-center gap-2">
                <FilmIcon className="w-4 h-4" />
                Select Your Investigation Target
              </span>
            </div>
            <FavoriteMovieForm />
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-1">
          <MagnifyingGlassIcon className="w-3 h-3" />
          Once selected, we&apos;ll compile classified intel about your chosen film
        </div>
      </div>
    </main>
  );
}
