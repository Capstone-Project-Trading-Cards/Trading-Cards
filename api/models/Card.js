const mongoose = require("mongoose");

const CardSchema = mongoose.Schema(
  {
    // name of the card
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    // category that it belongs to could be more than one
    category: { type: Array },
    // rarity
    tier: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: "no-pic" },
    // owner of the card it is connected to our User model
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: "tradingcards.co",
    },
    speed: { type: Number, required: true },
    power: { type: Number, required: true },
    vision: { type: Number, required: true },
    passing: { type: Number, required: true },
    defending: { type: Number, required: true },
    stamina: { type: Number, required: true },

    nationality: { type: String, required: true },
    team: { type: String, required: true },
    // when user puts the cards up for trade switch to true, it is false as default
    availableToTrade: { type: Boolean, default: false },
  },
  {
    // add the time when it is created
    timestamps: true,
  }
);

module.exports = mongoose.model("Card", CardSchema);
