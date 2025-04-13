"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase"; 
import EmotionalPieChart from "../components/dashboard/EmotionalPieChart";

export default function Dashboard() {
  const [userName, setUserName] = useState("")
  const [streak, setStreak] = useState("")
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [journalDates, setJournalDates] = useState([]);
  const [recentYS, setRecentYS] = useState([]);
  const [recentYM, setRecentYM] = useState([]);
  const [ysIndex, setYsIndex] = useState(0);
  const [showInsight, setShowInsight] = useState(false);
  const [weeklyReflection, setWeeklyReflection] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const displayName = user.displayName || "User"
        setUserName(displayName),
        setRecentYS(user.recent_ys || []);
        setRecentYM(user.recent_ym || []);

        // TEMPORARY: filler insight data
        setRecentYS([
          "I skipped the gym again today.",
          "I haven’t texted anyone all week.",
          "I feel like I’m wasting time.",
          "I’ve been overthinking everything.",
          "I’m too tired to do anything."
        ]);

        setRecentYM([
          "You're worried about falling behind.",
          "You're feeling disconnected and isolated.",
          "You're frustrated with your progress.",
          "You're overwhelmed and trying to regain control.",
          "You’re mentally exhausted and need rest, not guilt."
        ]);
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
     
      <main className="container px-4 py-6 md:px-6 md:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-slate-900">
          Welcome, {userName}
          </h1>
          <p className="text-slate-500">
            Here's your mental wellness overview for this week.
          </p>

          {/* Current streak */}
          <div className="grid gap-4 pt-4 grid-cols-2 md:grid-cols-2">
            <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-slate-500">Current Streak</p>
              <p className="text-2xl font-semibold text-slate-900">{currentStreak} days</p>
            </div>

            {/* Longest streak */}
            <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-slate-500">Longest Streak</p>
              <p className="text-2xl font-semibold text-slate-900">{longestStreak} days</p>
            </div>
          </div>
        </div>



        <div className="grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-2">
          {/* Mood Trends Line Graph */}
          <div className="bg-white shadow-sm rounded-lg p-4 h-64">
            <h2 className="text-xl font-semibold text-slate-900 mb-1">Mood Trends</h2>
            <p className="text-slate-500 mb-4">Your emotional journey over the past week</p>

          </div>

          {/* Emotional Breakdown Pie Chart*/}
          <div className="bg-white w-full  shadow-sm rounded-lg p-4 flex flex-col justify-center  h-auto">
            <h1 className="text-lg text-left font-semibold text-slate-900">Emotional Breakdown</h1>
            <p className="text-left text-slate-500 mb-4">Distribution of your emotions this week</p>
            <EmotionalPieChart />
          </div>
        </div>



        <div className="grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white shadow-sm rounded-lg p-4 flex flex-col justify-between">

            {/* You Said, You Meant */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">You Said, You Meant</h2>
              <p className="text-slate-500 mb-4">Insights from your journal entries</p>

              {recentYS[ysIndex] && (
                <div className="bg-slate-100 rounded-md p-4 mb-4">
                  <p className="text-slate-700 font-medium mb-1">You said:</p>
                  <p className="italic text-slate-900">"{recentYS[ysIndex]}"</p>
                </div>
              )}

              {showInsight && recentYM[ysIndex] && (
                <div className="bg-emerald-50 rounded-md p-4 mb-4">
                  <p className="text-emerald-700 font-medium mb-1">You might have meant:</p>
                  <p className="text-slate-900">"{recentYM[ysIndex]}"</p>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-2">
              {!showInsight ? (
                <button
                  onClick={() => setShowInsight(true)}
                  className="border border-dashed border-emerald-400 text-emerald-700 px-4 py-2 rounded-md hover:bg-emerald-50 transition"
                >
                  Reveal insight
                </button>
              ) : (
                <button
                  onClick={() => {
                    setYsIndex((prev) => (prev + 1) % Math.max(recentYS.length, 1));
                    setShowInsight(false);
                  }}
                  className="border border-dashed border-emerald-400 text-emerald-700 px-4 py-2 rounded-md hover:bg-emerald-50 transition"
                >
                  Next insight
                </button>
              )}
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-4 h-auto">
            <h2 className="text-xl font-semibold text-slate-900 mb-1">Weekly Reflection</h2>
            <p className="text-slate-500 mb-4">AI-generated reflection based on your last 7 entries</p>
            <p className="text-slate-800">{weeklyReflection || "Unlock your personalized reflection after 1 week."}</p>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-4 h-auto">
            <h2 className="text-xl font-semibold text-slate-900 mb-1">Emotional Themes</h2>
            <p className="text-slate-500 mb-4">Recurring patterns in your journal</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">Work-life balance (7)</span>
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">Self-care (5)</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Relationships (4)</span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Future plans (3)</span>
              <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-medium">Personal growth (2)</span>
            </div>
          </div>


        </div>
      </main>
    </div>
  )
}
