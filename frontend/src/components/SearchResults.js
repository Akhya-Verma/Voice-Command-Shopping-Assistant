import React from "react";
import { sendCommand } from "../api";
function SearchResults({ results, filters, setList }) {
  const handleAdd = async (item) => {
    // Use NLP command "add {item}" to stay consistent
    const updated = await sendCommand(`add ${item}`);
    setList(updated.list);
  };
// function SearchResults({ results, filters }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">🔎 Search Results</h2>

      {/* ✅ Filters summary */}
      {filters && (
        <div className="mb-3 text-sm text-gray-600">
          <span className="font-semibold">Filters:</span>{" "}
          {filters.query && <span>Query: "{filters.query}" </span>}
          {filters.category && <span>| Category: {filters.category} </span>}
          {filters.brand && <span>| Brand: {filters.brand} </span>}
          {filters.priceLimit && <span>| Price ≤ ${filters.priceLimit} </span>}
          {!filters.query && !filters.category && !filters.brand && !filters.priceLimit && (
            <span>None</span>
          )}
        </div>
      )}

      {results.length === 0 ? (
        <p className="text-gray-500">No results found</p>
      ) : (
        <ul className="space-y-2">
          {results.map((p, idx) => (
            <li
              key={idx}
              className="border p-3 rounded shadow-sm bg-white flex justify-between items-center"
            >
                <div>
              <div className="font-bold">{p.name}</div>
              <div className="text-sm text-gray-600">
                {p.category} | Brand: {p.brand} | ${p.price}
              </div>

                </div>
                 <button
                onClick={() => handleAdd(p.name)}
                className="ml-4 px-3 py-1 bg-green-500 text-white rounded"
              >
                + Add
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
