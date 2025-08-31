import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  category: { type: String, default: "Other" },
});

export default mongoose.model("Item", itemSchema);
