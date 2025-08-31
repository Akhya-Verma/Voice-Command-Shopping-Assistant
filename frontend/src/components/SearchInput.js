import React, { useState } from "react";
import { searchProducts } from "../api";

function SearchInput({ setResults }) {
  const [listening, setListening] = useState(false);
  const [lastQuery, setLastQuery] = useState("");

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setListening(true);

    recognition.onresult = async (event) => {
      const command = event.results[0][0].transcript;
      setLastQuery(command);
      console.log("🔎 Search query:", command);

      try {
        const results = await searchProducts(command);
        setResults(results.results || []);
      } catch (err) {
        console.error("❌ Error searching:", err);
      }

      setListening(false);
    };

    recognition.onerror = (err) => {
      console.error("❌ Speech recognition error:", err);
      setListening(false);
    };
  };

  return (
    <div className="mb-4">
      <button
        onClick={startListening}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        🔎 {listening ? "Listening..." : "Search by Voice"}
      </button>

      {lastQuery && (
        <p className="mt-2 text-gray-700">
          Last search: <span className="font-semibold">"{lastQuery}"</span>
        </p>
      )}
    </div>
  );
}

export default SearchInput;
