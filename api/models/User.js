const mongoose = require("mongoose");
const CardSchema = require("./Card").CardSchema;

const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // we can assign admin roles using this
    isAdmin: { type: Boolean, required: true, default: false },
    img: { type: String },
    coinBalance: { type: Number, default: 0 },
    moneyBalance: { type: Number, default: 0 },
    cards: [CardSchema],
    banned: { type: String, default: "false" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
