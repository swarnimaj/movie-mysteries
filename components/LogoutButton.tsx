"use client";
import { signOut } from "next-auth/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export function LogoutButton() {
  return (
    <button 
      className="px-4 py-2 bg-red-500/20 border border-red-400/30 text-red-300 rounded-lg hover:bg-red-500/30 hover:border-red-400/50 transition-all duration-300 text-sm font-medium inline-flex items-center gap-2"
      onClick={() => signOut({ callbackUrl: "/sign-in" })}
    >
      <ArrowRightOnRectangleIcon className="w-4 h-4" />
      Logout
    </button>
  );
}


