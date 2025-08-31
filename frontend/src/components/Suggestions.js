import React, { useEffect, useState } from "react";
import { getSuggestions, sendCommand } from "../api";

function Suggestions({ list, setList }) {
  const [suggestions, setSuggestions] = useState([]);

  // Fetch suggestions whenever the shopping list changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      const data = await getSuggestions();
      setSuggestions(data.suggestions || []);
    };

    fetchSuggestions();
  }, [list]); // 👈 runs whenever `list` changes

  const handleAdd = async (item) => {
    const updated = await sendCommand(`add ${item}`);
    setList(updated.list); // update shopping list
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">✨ Smart Suggestions</h2>
      {suggestions.length === 0 ? (
        <p className="text-gray-500">No suggestions right now</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {suggestions.map((s, idx) => (
            <li key={idx}>
              <button
                onClick={() => handleAdd(s)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                + {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Suggestions;
