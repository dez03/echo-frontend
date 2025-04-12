"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase"; // Adjust the import path as necessary

export default function Dashboard() {
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const displayName = user.displayName || "User"
        setUserName(displayName)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
     
      <main className="container px-4 py-6 md:px-6 md:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-slate-900">
          Welcome back, {userName}
          </h1>
          <p className="text-slate-500">
            Here's your mental wellness overview for this week.
          </p>
        </div>

        <div className="grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-2">
          <div className="bg-white shadow-sm rounded-lg p-4 h-64">
            {/* Mood Trends */}
          </div>
          <div className="bg-white shadow-sm rounded-lg p-4 h-64">
            {/* Emotional Breakdown */}
          </div>
        </div>

        <div className="grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white shadow-sm rounded-lg p-4 h-64">
            {/* You Said, You Meant */}
          </div>
          <div className="bg-white shadow-sm rounded-lg p-4 h-64">
            {/* Weekly Reflection */}
          </div>
          <div className="bg-white shadow-sm rounded-lg p-4 h-64">
            {/* Emotional Themes */}
          </div>
        </div>

        <div className="grid gap-6 pt-6">
          <div className="bg-white shadow-sm rounded-lg p-4 h-64">
            {/* Personal Quote Generator */}
          </div>
        </div>
      </main>
    </div>
  )
}
