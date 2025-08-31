const API_URL = "https://voice-command-shopping-assistant-neux.onrender.com"; // our backend

// 🎙 Send a voice/text command (add/remove items)
export async function sendCommand(command) {
  const res = await fetch(`${API_URL}/command`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command }),
  });
  return res.json();
}

// 🛒 Get current shopping list
export async function getList() {
  const res = await fetch(`${API_URL}/list`);
  return res.json();
}

// ✨ Get smart suggestions
export async function getSuggestions() {
  const res = await fetch(`${API_URL}/suggestions`);
  return res.json();
}

// 🔎 Voice-activated product search
export async function searchProducts(command) {
  const res = await fetch(`${API_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command }),
  });
  return res.json();
}

// 🔄 Get substitutes for a product
export async function getSubstitutes(item) {
  const res = await fetch(`${API_URL}/substitutes/${encodeURIComponent(item)}`);
  return res.json();
}
