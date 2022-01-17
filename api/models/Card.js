const mongoose = require("mongoose");

const CardSchema = mongoose.Schema(
  {
    // name of the card
    name: { type: String, required: true },
    // category that it belongs to could be more than one
    category: { type: Array },
    // rarity
    tier: { type: String, required: true },
    price: { type: Number, required: true },
    // owner of the card it is connected to our User model
    owner: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: "tradingcards.co",
      },
    ],
    // when user puts the cards up for trade switch to true, it is false as default
    availableToTrade: { type: Boolean, required: true, default: false },
  },
  {
    // add the time when it is created
    timestamps: true,
  }
);

module.exports = mongoose.model("Card", CardSchema);
