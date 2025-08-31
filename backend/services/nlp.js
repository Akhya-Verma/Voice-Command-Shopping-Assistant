// services/nlp.js
import { categorizeItem } from "./categories.js";  // ✅ import category helper

export function parseCommand(command) {
  command = command.toLowerCase().trim();

  // 🔹 Map number words to digits
  const numberWords = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10
  };

  let quantity = 1;

  // ✅ Detect digits first
  const numberMatch = command.match(/\d+/);
  if (numberMatch) {
    quantity = parseInt(numberMatch[0]);
    command = command.replace(numberMatch[0], "").trim(); // remove digit from text
  } else {
    // ✅ Detect number words
    for (const [word, value] of Object.entries(numberWords)) {
      if (command.includes(word)) {
        quantity = value;
        command = command.replace(word, "").trim(); // remove word from text
        break;
      }
    }
  }

  // 🔹 Detect action
  let action = "add";
  if (command.includes("remove") || command.includes("delete")) {
    action = "remove";
  }

  // 🔹 Remove filler words
  const skipWords = ["add", "buy", "want", "need", "to", "i", "remove", "delete"];
  let words = command
    .split(/\s+/)
    .filter(w => w && !skipWords.includes(w) && isNaN(parseInt(w)));

  // 🔹 Extract item
  let item = words.join(" ").trim();
  if (!item) item = "unknown";

  // 🔹 Normalize plural smartly
  if (quantity > 1) {
    if (!item.endsWith("s")) {
      item = item + "s";
    }
  }

  // 🔹 Detect category
  const category = categorizeItem(item);

  return { action, item, quantity, category };
}
