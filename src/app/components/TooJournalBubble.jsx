"use client"
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase"; 

export default function TooJournalBubble() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1200); // Animation duration
    }, 8000); // Animate every 8 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isLoggedIn || pathname === "/" || pathname === "/signup") return null; 

  return (
    <button
      onClick={() => router.push("/journal-input")}
      className={`fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-blue-300 border-4 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 z-50 ${
        isAnimating ? "animate-bounce-smooth" : ""
      }`}
      aria-label="New Journal Entry"
    >
      <span className="text-3xl text-white">+</span>
    </button>
  );
}

