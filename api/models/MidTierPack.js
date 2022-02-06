const mongoose = require("mongoose");

const MidTierPackSchema = mongoose.Schema({
  name: { type: String, default: "Mid Tier Pack" },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  rarity: { type: Number, default: 2 },
});

module.exports = mongoose.model("MidTierPack", MidTierPackSchema);
