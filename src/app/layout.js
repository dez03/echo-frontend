"use client";
import "./globals.css";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";
import TooJournalBubble from "./components/TooJournalBubble";
import Sidebar from "./components/Sidebar";

export default function Layout({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <html>
      <body>
      {userLoggedIn ? (
        <div className="flex">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      ) : (
        children
      )}
      {userLoggedIn && <TooJournalBubble className="bg-[#FFEA00]" />}
      </body>
      </html>
  );
}
