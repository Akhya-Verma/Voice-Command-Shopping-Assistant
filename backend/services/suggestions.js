// services/suggestions.js

// Example seasonal items
const seasonalItems = {
  january: ["oranges", "carrots"],
  february: ["strawberries", "cabbage"],
  march: ["mangoes", "peas"],
   april: ["watermelon", "spinach"],
  may: ["cherries", "zucchini"],
  june: ["blueberries", "cucumbers"],
  july: ["peaches", "tomatoes"],
  august: ["grapes", "corn"],
  september: ["pumpkin", "broccoli"],
  october: ["apples", "cauliflower"],
  november: ["cranberries", "sweet potatoes"],
  december: ["pomegranates", "brussels sprouts"],
  // ... fill in more months if you like
};

// Example substitutes
const substitutes = {
  milk: ["almond milk", "soy milk"],
  bread: ["gluten-free bread", "multigrain bread"],
  apples: ["pears", "bananas"],
};

export function getSuggestions(history = []) {
  let suggestions = [];

  // Suggest based on recent history
  if (history.includes("milk")) {
    suggestions.push("bread"); // people often buy milk + bread
  }
  if (history.includes("apples")) {
    suggestions.push("bananas"); // fruit combo
  }

  // Seasonal suggestion (very simple: use current month)
  const month = new Date().toLocaleString("en-US", { month: "long" }).toLowerCase();
  const monthKey = month.toLowerCase();
  if (seasonalItems[monthKey]) {
    suggestions.push(...seasonalItems[monthKey]);
  }
if (suggestions.length === 0) {
    suggestions.push("rice", "pasta", "eggs");
  }
  // Remove duplicates
  suggestions = [...new Set(suggestions)];

  return suggestions;
}

export function getSubstitutes(item) {
  return substitutes[item] || [];
}
