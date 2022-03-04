const mongoose = require("mongoose");

const CardSchema = mongoose.Schema(
  {
    // name of the card
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    // category that it belongs to could be more than one
    category: { type: Array },
    // rarity
    tier: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    rating: {type: Number, required: true},
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
    pack: { type: String, required: true },
  }
);

const Card = mongoose.model("Card", CardSchema);

/*
// increment card id by 1 whenever there is a new card added to the database
CardSchema.pre("save", function (next) {
  if (this.isNew) {
    Card.count().then((res) => {
      this._id = res;
      next();
    });
  } else {
    next();
  }
});
*/
module.exports = Card;
