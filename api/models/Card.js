const mongoose = require("mongoose");
const { Schema } = mongoose;

const CardSchema = new Schema({
  // name of the card
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  // category that it belongs to could be more than one
  category: { type: Array },
  // rarity
  tier: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  rating: { type: Number, required: true },
  speed: { type: Number, required: true },
  power: { type: Number, required: true },
  vision: { type: Number, required: true },
  passing: { type: Number, required: true },
  defending: { type: Number, required: true },
  stamina: { type: Number, required: true },

  nationality: { type: String, required: true },
  team: { type: String, required: true },
  // when user puts the cards up for trade switch to true, it is false as default
  availableToTrade: { type: String, default: "false" },
  pack: { type: String, required: true },
  owner: { type: String, default: "TCC" },
});

module.exports = {
  Card: mongoose.model("Card", CardSchema),
  CardSchema: CardSchema,
};
