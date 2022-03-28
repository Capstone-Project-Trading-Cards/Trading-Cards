const mongoose = require("mongoose");
const { Schema } = mongoose;

const TradeListSchema = new Schema({
  offerFrom: { type: String },
  offerTo: { type: String },
  offeredCard: { type: Object },
  wantedCard: { type: Object },
});

module.exports = {
  TradeList: mongoose.model("TradeList", TradeListSchema),
  TradeListSchema: TradeListSchema,
};
