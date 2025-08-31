
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import { getSuggestions, getSubstitutes } from "./services/suggestions.js";
import { parseCommand } from "./services/nlp.js";
import { searchProducts } from "./services/search.js";
import { connectDB } from "./services/db.js";  // ✅ DB connection
import Item from "./models/Item.js";           // ✅ Mongoose model

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ✅ Connect MongoDB
connectDB();

// Root route
app.get("/", (req, res) => {
  res.send("Voice Shopping Assistant Backend Running 🚀 (MongoDB mode)");
});

// NLP Command route
app.post("/command", async (req, res) => {
  const { command } = req.body;
  const parsed = parseCommand(command);

  if (parsed.action === "add") {
    await Item.create({
      item: parsed.item,
      quantity: parsed.quantity,
      category: parsed.category,
    });
  } else if (parsed.action === "remove") {
    await Item.deleteMany({ item: parsed.item });
  }

  const list = await Item.find();
  res.json({ success: true, parsed, list });
});

// Get full shopping list
app.get("/list", async (req, res) => {
  const list = await Item.find();
  res.json(list);
});

// Basic add (non-NLP, optional)
app.post("/list/add", async (req, res) => {
  const { item, quantity } = req.body;
  await Item.create({
    item,
    quantity: quantity || 1,
    category: "Other",
  });
  const list = await Item.find();
  res.json({ success: true, list });
});

// Basic remove (non-NLP, optional)
app.post("/list/remove", async (req, res) => {
  const { item } = req.body;
  await Item.deleteMany({ item });
  const list = await Item.find();
  res.json({ success: true, list });
});

// Smart suggestions route
app.get("/suggestions", async (req, res) => {
  const history = (await Item.find()).map(i => i.item);
  const suggestions = getSuggestions(history);
  res.json({ suggestions });
});

// Substitutes route
app.get("/substitutes/:item", (req, res) => {
  const item = req.params.item;
  const subs = getSubstitutes(item);
  res.json({ substitutes: subs });
});

// ✅ Search route
app.post("/search", (req, res) => {
  const { command } = req.body;
  const { results, filters } = searchProducts(command);
  res.json({ query: command, results, filters });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
