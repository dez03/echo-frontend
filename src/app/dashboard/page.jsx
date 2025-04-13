"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase"; 
import EmotionalPieChart from "../components/dashboard/EmotionalPieChart";
import { postUserLogin } from "../../lib/routes";

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
  const [userThemes, setUserThemes] = useState([]);

  const emotionalThemes = [
    "Self-worth", "Anxiety", "Confidence", "Loneliness", "Burnout", "Fear of failure",
    "Social pressure", "Procrastination", "Ambition", "Impostor syndrome", "Self-care",
    "Overthinking", "Grief", "Emotional numbness", "Joy", "Identity", "Inner conflict",
    "Trust issues", "Motivation", "Perfectionism", "Regret", "Hope", "Mindfulness",
    "FOMO", "Self-acceptance", "Stress", "Change", "Forgiveness", "Growth mindset",
    "Jealousy", "Gratitude", "Guilt", "Fear of rejection", "Romantic frustration",
    "Validation", "Control", "Empathy", "Resentment", "Decision paralysis", "Belonging",
    "Nostalgia", "Boundaries", "Independence", "Connection", "Escapism", "Misunderstood",
    "Body image", "Success pressure", "Overwhelm", "Vulnerability", "Resilience",
    "Criticism", "Optimism", "Letting go", "Toxic positivity", "Purpose-seeking"
  ];

  const themeColors = [
    "bg-emerald-100 text-emerald-800",
    "bg-indigo-100 text-indigo-800",
    "bg-purple-100 text-purple-800",
    "bg-yellow-100 text-yellow-800",
    "bg-rose-100 text-rose-800"
  ];

  useEffect(() => {
    console.log("Current Firebase user:", auth.currentUser);
  
    const fetchUserData = async (uid) => {
      try {
        console.log("Fetching user data for UID:", uid);
        const userData = await postUserLogin(uid);
        console.log("User data from API:", userData);
  
        if (userData && userData.user) {
          setCurrentStreak(userData.user.journal_streak || 0);
          setLongestStreak(userData.user.longest_journal_streak || 0);
          setJournalDates(userData.user.journal_dates || []);
          setRecentYS(userData.user.recent_ys || []);
          setRecentYM(userData.user.recent_ym || []);
          setWeeklyReflection(userData.user.recent_weekly_reflection || null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();
        const displayName = user.displayName || "User";
        setUserName(displayName);

        const uid = user.uid;
        const storedThemes = localStorage.getItem(`themes_${uid}`);
        if (storedThemes) {
          setUserThemes(JSON.parse(storedThemes));
        } else {
          const generatedThemes = emotionalThemes
            .sort(() => 0.5 - Math.random())
            .slice(0, 5)
            .map((theme, idx) => ({
              name: theme,
              count: Math.floor(Math.random() * 10) + 1,
              color: themeColors[idx % themeColors.length],
            }));
          setUserThemes(generatedThemes);
          localStorage.setItem(`themes_${uid}`, JSON.stringify(generatedThemes));
        }

        await fetchUserData(uid);
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  return (
    <div className="min-h-screen">
     
      <main 
        className="flex flex-col  min-h-screen p-6"
        style={{
          background: "radial-gradient(circle at center, #1E40AF, #0c1946)",
        }}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-white">
          Welcome, {userName}
          </h1>
          <p className="text-slate-400">
            Here's your mental wellness overview for this week.
          </p>

          {/* Current streak */}
          <div className="grid gap-4 pt-4 grid-cols-2 md:grid-cols-2">
            <div className="bg-blue-950 shadow rounded-lg p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-slate-400">Current Streak</p>
              <p className="text-2xl font-semibold text-white">{currentStreak} days</p>
            </div>

            {/* Longest streak */}
            <div className="bg-blue-950 shadow rounded-lg p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-slate-400">Longest Streak</p>
              <p className="text-2xl font-semibold text-white">{longestStreak} days</p>
            </div>
          </div>
        </div>



        <div className="grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-2">
          {/* Mood Trends Line Graph */}
          <div className="bg-blue-950 shadow-sm rounded-lg p-4 h-64">
            <h2 className="text-xl font-semibold text-white mb-1">Mood Trends</h2>
            <p className="text-slate-400 mb-4">Your emotional journey over the past week</p>

          </div>

          {/* Emotional Breakdown Pie Chart*/}
          <div className="bg-blue-950 w-full  shadow-sm rounded-lg p-4 flex flex-col justify-center  h-auto">
            <h1 className="text-lg text-left font-semibold text-white">Emotional Breakdown</h1>
            <p className="text-left text-slate-400 mb-4">Distribution of your emotions this week</p>
            <EmotionalPieChart />
          </div>
        </div>



        <div className="grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-blue-950 shadow-sm rounded-lg p-4 flex flex-col justify-between">

            {/* You Said, You Meant */}
            <div>
              <h2 className="text-lg font-semibold text-white">You Said, You Meant</h2>
              <p className="text-slate-400 mb-4">Insights from your journal entries</p>

              {recentYS[ysIndex] && (
                <div className="bg-[#1b2b64] shadow-sm rounded-md p-4 mb-4">
                  <p className="text-slate-400 font-medium mb-1">You said:</p>
                  <p className="text-white">"{recentYS[ysIndex]}"</p>
                </div>
              )}

              {showInsight && recentYM[ysIndex] && (
                <div className="bg-[#1b2b64] shadow-sm rounded-md p-4 mb-4">
                  <p className="text-slate-400 font-medium mb-1">You might have meant:</p>
                  <p className="text-white">"{recentYM[ysIndex]}"</p>
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

          <div className="bg-blue-950 shadow-sm rounded-lg p-4 h-auto">
            <h2 className="text-xl font-semibold text-white mb-1">Weekly Reflection</h2>
            <p className="text-slate-400 mb-4">AI-generated reflection based on your last 7 entries</p>
            <p className="text-slate-200">{weeklyReflection || "Unlock your personalized reflection after 1 week."}</p>
          </div>

          <div className="bg-blue-950 shadow-sm rounded-lg p-4 h-auto">
            <h2 className="text-xl font-semibold text-white mb-1">Emotional Themes</h2>
            <p className="text-slate-400 mb-4">Recurring patterns in your journal</p>
            <div className="flex flex-wrap gap-2">
              {userThemes.map((theme, index) => (
                <span
                  key={index}
                  className={`${theme.color} px-3 py-1 rounded-full text-sm font-medium`}
                >
                  {theme.name} ({theme.count})
                </span>
              ))}
            </div>
          </div>


        </div>
      </main>
    </div>
  )
}
