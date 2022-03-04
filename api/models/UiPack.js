const mongoose = require("mongoose");

const PackSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  packRarity: { type: Number, required: true },
  price: { type: Number, required: true },
  numberOfCards: { type: Number },
});

const pack = mongoose.model("UiPack", PackSchema);

module.exports = pack;
