// services/search.js
import { products } from "./products.js";

export function searchProducts(command) {
  command = command.toLowerCase();

  // 🔹 Detect price filter (e.g., "under 5", "below 10")
  let priceLimit = null;
  const priceMatch = command.match(/under\s*(\d+)|below\s*(\d+)/);
  if (priceMatch) {
    priceLimit = parseInt(priceMatch[1] || priceMatch[2]);
  }

  // 🔹 Detect known categories
  const categories = ["dairy", "produce", "bakery", "snacks", "personal care"];
  let categoryFilter = categories.find(c => command.includes(c));

  // 🔹 Detect known brands (extend based on products.js)
  const brands = ["colgate", "amul", "alpro", "cadbury", "freshfarm", "wonder"];
  let brandFilter = brands.find(b => command.includes(b));

  // 🔹 Extract keywords (remove filler words)
  const skipWords = [
    "find","search","for","me","show","get",
    "under","below","dollars","rs","$","items"
  ];
  let words = command.split(/\s+/).filter(w => !skipWords.includes(w));
  const query = words.join(" ").trim();

  // 🔹 Filter products
  let results = products;

  // keyword-based filter (loose search)
  if (query) {
    results = results.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }

  // category filter
  if (categoryFilter) {
    results = results.filter(p => p.category.toLowerCase() === categoryFilter);
  }

  // brand filter
  if (brandFilter) {
    results = results.filter(p => p.brand.toLowerCase() === brandFilter);
  }

  // price filter
  if (priceLimit) {
    results = results.filter(p => p.price <= priceLimit);
  }

  // ✅ Return both results and filters used
  return {
    results,
    filters: {
      query: query || null,
      category: categoryFilter || null,
      brand: brandFilter || null,
      priceLimit: priceLimit || null
    }
  };
}
