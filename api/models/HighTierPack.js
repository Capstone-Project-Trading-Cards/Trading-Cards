const mongoose = require("mongoose");

const HighTierPackSchema = mongoose.Schema({
  name: { type: String, default: "High Tier Pack" },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  rarity: { type: Number, default: 3 },
});

module.exports = mongoose.model("HighTierPack", HighTierPackSchema);
