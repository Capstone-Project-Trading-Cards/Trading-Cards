const mongoose = require("mongoose");

const LowTierPackSchema = mongoose.Schema({
  name: { type: String, default: "Low Tier Pack" },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  rarity: { type: Number, default: 1 },
});

module.exports = mongoose.model("LowTierPack", LowTierPackSchema);
