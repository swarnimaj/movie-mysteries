import { redirect } from "next/navigation";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FunFact } from "@/components/FunFact";
import { LogoutButton } from "@/components/LogoutButton";
import { FilmIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default async function Home() {
  // Check authentication, redirect to signin if not logged in
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  // Get user data from database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { name: true, email: true, image: true, favoriteMovie: true },
  });

  // Redirect to onboarding if user hasn't selected a movie yet
  if (!user?.favoriteMovie) {
    redirect("/onboarding");
  }

  return (
    <main className="min-h-screen relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-400"></div>
      
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-5xl font-bold glow-text bg-gradient-to-r from-purple-400 via-cyan-400 to-yellow-400 bg-clip-text text-transparent">
            MovieMysteries
          </h1>
          <p className="text-cyan-300 text-lg opacity-80">Unraveling the secrets behind cinematic masterpieces</p>
        </div>

        <div className="mystery-card p-6 float-animation">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              {user?.image && (
                <div className="relative">
                  <Image 
                    src={user.image} 
                    alt="User avatar" 
                    width={80} 
                    height={80} 
                    className="rounded-full border-2 border-purple-400 shadow-lg shadow-purple-500/30" 
                  />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <FilmIcon className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="text-2xl font-bold text-white glow-text">{user?.name ?? "Mystery Agent"}</div>
              <div className="text-cyan-300 text-sm">{user?.email}</div>
              <div className="text-purple-300 text-sm mt-1">
                <span className="inline-flex items-center gap-1">
                  <MagnifyingGlassIcon className="w-3 h-3 text-yellow-400" />
                  Current Investigation: <span className="text-yellow-400 font-semibold">{user!.favoriteMovie}</span>
                </span>
              </div>
            </div>
            <div className="w-full sm:w-auto">
              <LogoutButton />
            </div>
          </div>
        </div>

        <div className="mystery-card p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
              Mystery Archive
            </h2>
            <p className="text-gray-300 mt-2">Classified intelligence on your chosen film</p>
          </div>
          
          <FunFact movie={user!.favoriteMovie!} />
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p className="flex items-center justify-center gap-2">
            <SparklesIcon className="w-4 h-4 text-gray-400" />
            Every refresh reveals a new secret from the vault
            <SparklesIcon className="w-4 h-4 text-gray-400" />
          </p>
        </div>
      </div>
    </main>
  );
}
