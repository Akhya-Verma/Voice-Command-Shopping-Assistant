import React from "react";
import { Sun, Moon } from "lucide-react";

function ThemeToggle({ dark, setDark }) {
  return (
    <button
      className="p-2 rounded-full bg-white/70 dark:bg-gray-800 shadow transition"
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle theme"
    >
      {dark ? (
        <Sun className="text-yellow-400" />
      ) : (
        <Moon className="text-gray-700" />
      )}
    </button>
  );
}

export default ThemeToggle;