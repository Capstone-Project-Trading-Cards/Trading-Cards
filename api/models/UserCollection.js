const mongoose = require("mongoose");

const UserCollectionSchema = mongoose.Schema(
  {
    owner: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    user_collection: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserCollection", UserCollectionSchema);
