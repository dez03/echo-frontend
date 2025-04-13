"use client";
import { useState } from "react";
import React from "react";
import SignupModal from "../components/SignupModal.jsx"
import { auth } from '../../utils/firebase.js'; // Assuming you have firebase authentication set up
import { submitJournalEntry } from "@/lib/routes";

export default function JournalInput() {
  const [prompt, setPrompt] = useState("");
  const [selectedEmotions, setSelectedEmotions] = useState(null);
  const [reflection, setReflection] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  
  const handleEmotionsSelect = (emotionsValue) => {
    console.log('Emotion selected:', emotionsValue);
    setSelectedEmotions(emotionsValue);
  };
  
  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    if (selectedEmotions === null) {
      alert("Please select your emotion by clicking an icon.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to submit your journal entry.");
      return;
    }

    try {
      const reflectionResponse = await submitJournalEntry(user.uid, prompt, selectedEmotions);
      console.log("Received reflection:", reflectionResponse);

      if (typeof reflectionResponse === 'object' && reflectionResponse !== null) {
        setReflection(reflectionResponse.reflection);
      } else {
        setReflection("Unable to load reflection.");
      }

      localStorage.setItem("journalData", JSON.stringify({
        prompt,
        reflection,
        selectedEmotions
      }));

      setTimeout(() => {
        setShowSignupModal(true);
      }, 7500);
    } catch (err) {
      console.error("Error submitting journal entry:", err);
      alert("Sorry, there was an error submitting your entry. Please try again.");
    }
  };

  return (
    <>
      <div className="w-full p-4 py-8 rounded-lg shadow-lg relative flex flex-col gap-4 hover:ring-2 hover:ring-white/30">
        {/* Mood selection icons - now positioned at the top right with proper vertical alignment */}
        <div className="absolute top-3 right-5 flex items-center gap-6">

          {/* Happy icon */}
          <div className="w-8 h-8 cursor-pointer" onClick={() => handleEmotionsSelect(1)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`w-full h-full hover:scale-110 transition-transform duration-150 ease-in-out hover:ring-2 hover:ring-offset-2 hover:ring-#FFBF00 rounded-full transition duration-200 ${selectedEmotions === 1 ? "text-blue-500" : "text-gray-500"}`}>
              <circle cx="12" cy="12" r="10" stroke="#228B22" strokeWidth="1.5" fill="none" />
              <circle cx="9" cy="9" r="1" fill="#228B22" />
              <circle cx="15" cy="9" r="1" fill="#228B22" />
              <path d="M8.5 15.5C9.5 16.5 10.5 17 12 17C13.5 17 14.5 16.5 15.5 15.5" stroke="#228B22" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Neutral icon */}
          <div className="w-8 h-8 cursor-pointer" onClick={() => handleEmotionsSelect(2)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`w-full h-full hover:scale-110 transition-transform duration-150 ease-in-out hover:ring-2 hover:ring-offset-2 hover:ring-#FFBF00 rounded-full transition duration-200 ${selectedEmotions === 2 ? "text-blue-500" : "text-gray-500"}`}>
              <circle cx="12" cy="12" r="10" stroke="#FFBF00" strokeWidth="1.5" fill="none" />
              <circle cx="9" cy="9" r="1" fill="#FFBF00" />
              <circle cx="15" cy="9" r="1" fill="#FFBF00" />
              <line x1="8" y1="14" x2="16" y2="14" stroke="#FFBF00" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Sad icon */}
          <div className="w-8 h-8 cursor-pointer" onClick={() => handleEmotionsSelect(3)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`w-full h-full hover:scale-110 transition-transform duration-150 ease-in-out hover:ring-2 hover:ring-offset-2 hover:ring-#FFBF00 rounded-full transition duration-200 ${selectedEmotions === 3 ? "text-blue-500" : "text-gray-500"}`}>
              <circle cx="12" cy="12" r="10" stroke="#FF0000" strokeWidth="1.5" fill="none" />
              <circle cx="9" cy="9" r="1" fill="#FF0000" />
              <circle cx="15" cy="9" r="1" fill="#FF0000" />
              <path d="M15.5 16C14.5 15 13.5 14.5 12 14.5C10.5 14.5 9.5 15 8.5 16" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="relative w-full mt-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
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
            className="w-full min-h-[3rem] max-h-96 p-4 pr-12 border border-gray-300 rounded-lg focus:outline-none overflow-y-hidden resize-none text-slate-300 placeholder:text-slate-400 placeholder:font-light"
            placeholder="Write your thoughts here..."
            rows={1}
          />
          <button
            onClick={handleSubmit}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#FAF9F6] hover:bg-[#535c6c] text-white rounded-full p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#000000"
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
        {reflection && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow text-sm text-gray-700 animate-fade-in">
            <p className="italic">"{reflection}"</p>
          </div>
        )}

        
        {/* Show the SignupPromptModal if the modal state is true */}
        {/* {showSignupModal && <SignupModal onClose={() => setShowSignupModal(false)} />} */}
      </div>
    </>
  );
}