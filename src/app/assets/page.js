import JournalInput from "./components/JournalInput";
import "./globals.css";
import Image from "next/image";
import Logo from "./assets/EchoJournalLogo.png";
import PromptRotator from "./components/PromptRotator";

export default function Home() {
  const isAuthenticated = false; // replace with real auth later

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{
        background: "linear-gradient(to right, #39085e, #9198e5)",
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

      <h1 className="text-3xl font-light text-amber-800 mb-6">Echo Journal</h1>
      <PromptRotator />

      <div className="w-1/2 flex flex-col items-center">
        <JournalInput />
      </div>
    </main>
  );
}

