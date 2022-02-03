const mongoose = require("mongoose");

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
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
