// app/journal/page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import JournalInput from "../components/JournalInput";
import Sidebar from "../components/Sidebar";

export default function JournalPage() {
  const [journalData, setJournalData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      // Replace this with your actual authentication check
      // For example, checking a token in localStorage or making an API call
      const token = localStorage.getItem("userToken");
      
      if (!token) {
        // Redirect to login if not authenticated
        router.push("/login");
        return;
      }
      
      setIsAuthenticated(true);
      
      // Retrieve journal data from localStorage
      const savedData = localStorage.getItem("journalData");
      if (savedData) {
        setJournalData(JSON.parse(savedData));
        // Optional: Clear localStorage after retrieving
        // localStorage.removeItem("journalData");
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, [router]);
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  return (
    <div className="flex min-h-screen">
      {/* Sidebar for logged-in users */}
      <Sidebar />
      
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">Your Journal</h1>
        
        {/* Display previous entry if it exists */}
        {journalData && (
          <div className="mb-8">
            <div className="mb-4 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-lg font-medium mb-2">Your Previous Entry</h2>
              <p>{journalData.prompt}</p>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-lg font-medium mb-2">Your Reflection</h2>
              <p className="italic">{journalData.reflection}</p>
            </div>
          </div>
        )}
        
        {/* Journal input for new entries */}
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">Write a New Entry</h2>
          <JournalInput />
        </div>
      </main>
    </div>
  );
}