// services/categories.js

// Simple dictionary to map items into categories
const categories = {
  milk: "Dairy",
  cheese: "Dairy",
  yogurt: "Dairy",
  bread: "Bakery",
  rice: "Grains",
  pasta: "Grains",
  apple: "Produce",
  apples: "Produce",
  banana: "Produce",
  bananas: "Produce",
  mango: "Produce",
  mangoes: "Produce",
  onion: "Produce",
  onions: "Produce",
  potato: "Produce",
  potatoes: "Produce",
  water: "Beverages",
  juice: "Beverages",
  soda: "Beverages",
  chicken: "Meat",
  beef: "Meat",
  fish: "Meat",
  shampoo: "Personal Care",
  soap: "Personal Care",
  toothpaste: "Personal Care",
};

// Categorize item (default: "Other")
export function categorizeItem(item) {
  return categories[item.toLowerCase()] || "Other";
}
