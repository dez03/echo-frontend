"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { postUserLogin } from "../../lib/routes";
import { signOut } from "firebase/auth";


export default function Sidebar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Auto sign out user on reload (for dev testing)
    signOut(auth)
      .then(() => console.log("Signed out on load (dev only)"))
      .catch((error) => console.error("Auto sign-out error:", error));
  }, []);

  const handleDashboardClick = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          await postUserLogin(user.uid);
        } catch (err) {
          console.error("Failed to send login info to server:", err);
        }
      }
    });

    router.push("/dashboard");
  };

  if (!isLoggedIn) return null;

  return (
    <div className="w-64 h-screen bg-white border-r shadow-sm p-4 flex flex-col justify-between">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Echo Journal</h1>
        <nav className="space-y-4">
          <button
            onClick={handleDashboardClick}
            className="text-left w-full text-slate-600 font-medium hover:text-slate-800 transition"
          >
            Dashboard
          </button>
          <Link href="/calendar" className="block text-slate-600 hover:text-slate-800 transition">
            Calendar
          </Link>
        </nav>
        <button
          onClick={() => signOut(auth)}
          className="text-left w-full text-slate-700 hover:text-red-600"
        >
          Sign Out
        </button>
      </div>
      <div className="text-slate-500 text-sm">User Profile</div>
    </div>
  );
}
