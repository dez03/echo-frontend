"use client";
import { useState } from "react";

export default function JournalInput() {
  const [entry, setEntry] = useState("");

  const handleSubmit = () => {
    if (!entry.trim()) return;
    console.log("Submitted entry:", entry);
    setEntry(""); // Clear input after submit
  };

  return (
    <div className="w-full p-4 rounded-lg shadow-md relative">
        <div className="relative w-full">
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          className="w-full min-h-[3rem] max-h-96 p-4 pr-12 border border-gray-300 rounded-lg focus:outline-none overflow-y-hidden resize-none"
          placeholder="Write your thoughts here..."
          rows={1}
        />
        <button
          onClick={handleSubmit}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#687387] hover:bg-[#535c6c] text-white rounded-full p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
        </div>
    </div>
  );
}