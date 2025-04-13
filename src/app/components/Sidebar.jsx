"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { postUserLogin } from "../../lib/routes";
import {
  LayoutDashboard,
  Calendar,
  LogOut,
  Settings,
  Menu,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [journalEntries, setJournalEntries] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserName(user.displayName || "User");
        try {
          const data = await postUserLogin(user.uid);
          if (data?.user?.journal_dates) {
            const entries = data.user.journal_dates.map((date, index) => ({
              date,
              text: data.user.recent_ys?.[index] || "No entry text",
            }));
            setJournalEntries(entries.slice(-3).reverse());
          }
        } catch (err) {
          console.error("Error fetching journal entries:", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDashboardClick = () => {
    router.push("/dashboard");
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  if (!isLoggedIn) return null;

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", onClick: handleDashboardClick },
    { icon: LogOut, label: "Sign Out", onClick: handleSignOut, className: "mt-auto" },
  ];

  return (
    <div
      className={`flex flex-col h-screen bg-gradient-to-b from-purple-800 to-indigo-900 text-white transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-indigo-700">
        {!isCollapsed && (
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Echo Journal
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-indigo-700 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.href ? (
                <a
                  href={item.href}
                  className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-700 transition-colors ${
                    item.className || ""
                  }`}
                >
                  <item.icon size={20} className="text-purple-400" />
                  {!isCollapsed && (
                    <span className="text-gray-200 font-medium">
                      {item.label}
                    </span>
                  )}
                </a>
              ) : (
                <button
                  onClick={item.onClick}
                  className={`flex w-full items-center space-x-3 p-3 rounded-lg hover:bg-indigo-700 transition-colors ${
                    item.className || ""
                  }`}
                >
                  <item.icon size={20} className="text-purple-400" />
                  {!isCollapsed && (
                    <span className="text-gray-200 font-medium">
                      {item.label}
                    </span>
                  )}
                </button>
              )}
            </li>
          ))}
        </ul>

        {!isCollapsed && (
          <div className="mt-6">
            <h2 className="text-sm text-slate-300 uppercase mb-2">
              Recent Entries
            </h2>
            {journalEntries.length > 0 ? (
              <ul className="space-y-2">
                {journalEntries.map((entry, index) => (
                  <li key={index} className="text-slate-300 text-sm">
                    <div className="font-semibold">{entry.date}</div>
                    <div className="truncate">{entry.text}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 text-sm">No Recent Entries</p>
            )}
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-indigo-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold">
            N
          </div>
          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium text-gray-200">{userName}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
