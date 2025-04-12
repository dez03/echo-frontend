import JournalInput from "./components/JournalInput";
import "./globals.css";
import PromptRotator from "./components/PromptRotator";

export default function Home() {
  const isAuthenticated = false; // replace with real auth later

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">

      <h1 className="text-3xl font-light text-amber-800 mb-6">Echo Journal</h1>
      {/* <p className="text-lg text-gray-600 mb-4"> {PromptRotator} </p> */}
      <PromptRotator />

      <div className="w-1/2 flex flex-col items-center">
        <JournalInput />
      </div>

      {!isAuthenticated && (
        <p className="mt-6 text-sm text-gray-500 text-center">
          Want to save your reflections?{" "}
          <a href="/signup" className="text-blue-600 underline">
            Sign up here.
          </a>
        </p>
      )}
    </main>
  );
}

