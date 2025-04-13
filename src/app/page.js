"use client";
// import JournalInput from "./components/JournalInput";
import "./globals.css";
// import Image from "next/image";
// import Logo from "./assets/EchoLogo.png";
// import PromptRotator from "./components/PromptRotator";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { auth } from "../utils/firebase";


export default function LoginPage() {
  const router = useRouter();
  const isAuthenticated = false; // replace with real auth later
  const [reflection, setReflection] = useState(null);


  // handle submission
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const email = e.target[0].value;
    const password = e.target[1].value;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    console.log('User logged in:', userCredential.user);
    router.push('/dashboard');
  } catch (e) {
    if (e.code === "auth/user-not-found" || e.code === "auth/wrong-password") {
      alert("Invalid email or password.");
    } else {
      console.error("Login error:", e);
      alert("Something went wrong. Please try again.");
    }
  }
};




  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-900 text-white"
    >
      <h1 className="text-3xl font-bold mb-6">Login to Echo</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded bg-slate-800 text-white border border-slate-700"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 rounded bg-slate-800 text-white border border-slate-700"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-white font-bold py-2 px-4 rounded transition"
        >
          Log In
        </button>
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-400 underline">
            Sign up
          </a>
        </p>
      </form>
    </main>
  );
}
