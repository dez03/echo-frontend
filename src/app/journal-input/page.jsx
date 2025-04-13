"use client";
import JournalInput from "../components/JournalInput.jsx";

import Image from "next/image";
import Logo from "../assets/EchoLogo.png";
import PromptRotator from "../components/PromptRotator";
import { useState } from "react";

export default function Home() {
  const isAuthenticated = false; // replace with real auth later
  const [reflection, setReflection] = useState(null);

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{
        background: "radial-gradient(circle at center, #1E40AF, #0c1946)",
      }}
    >
      <div>
        <Image
          src={Logo}
          alt="Echo Journal Logo"
          width={200} // adjust as needed
          height={200} // adjust as needed
        />
      </div>
      <div className="absolute inset-0 -z-10">
        <div className="bg-gradient-to-br from-purple-800 via-indigo-500 to-blue-400 w-full h-full opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-purple-300 to-transparent opacity-50"></div>
        <div className="absolute inset-0 bg-noise-pattern opacity-10"></div>
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-300 text-transparent bg-clip-text">
        Echo Journal
      </h1>
      <PromptRotator />

      <div className="w-1/2 flex flex-col items-center">
        <JournalInput />
      </div>
      
    </main>
  );
}
