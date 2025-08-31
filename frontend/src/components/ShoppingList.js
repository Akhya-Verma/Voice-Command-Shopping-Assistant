import React from "react";
import { sendCommand } from "../api";


function ShoppingList({ list, setList }) {
  const handleRemove = async (item) => {
    const updated = await sendCommand(`remove ${item}`);
    setList(updated.list);
  };
//function ShoppingList({ list }) {
  // Group items by category
  const grouped = list.reduce((acc, item) => {
    const cat = item.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">🛍 Shopping List</h2>
      {Object.keys(grouped).map((category, idx) => (
        <div key={idx} className="mb-4">
          <h3 className="font-bold text-lg mb-2">{category}</h3>
          <ul>
            {grouped[category].map((i, index) => (
              <li key={index} className="flex justify-between items-center border-b py-2">
              <span>  {i.quantity} × {i.item} 
              </span>
                <button
                  onClick={() => handleRemove(i.item)}
                  className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ShoppingList;
