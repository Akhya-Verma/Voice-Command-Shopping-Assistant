import React, { useState } from "react";
import { sendCommand } from "../api";
import toast from "react-hot-toast";

function VoiceInput({ setList }) {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setListening(true);

    recognition.onresult = async (event) => {
      const command = event.results[0][0].transcript;
      console.log("Heard:", command);

      try {
        const updated = await sendCommand(command);
        setList(updated.list);

        // ✅ show toast feedback
        if (updated.parsed.action === "add") {
          toast.success(`Added ${updated.parsed.quantity} × ${updated.parsed.item}`);
        } else if (updated.parsed.action === "remove") {
          toast.error(`Removed ${updated.parsed.item}`);
        }
      } catch (err) {
        toast.error("❌ Failed to send command");
      }

      setListening(false);
    };

    recognition.onerror = () => setListening(false);
  };

  return (
    <button 
      onClick={startListening} 
      className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-md"
    >
      🎙 {listening ? "Listening..." : "Speak"}
    </button>
  );
}

export default VoiceInput;
