const mongoose = require("mongoose");

const PackSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  packRarity: { type: String, required: true },
  price: { type: Number, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
});

const pack = mongoose.model("Pack", PackSchema);

module.exports = pack;
