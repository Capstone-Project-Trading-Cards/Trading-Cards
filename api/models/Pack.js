const mongoose = require("mongoose");

const PackSchema = mongoose.Schema({
  name: { 
      type: String,
      required: true, 
      unique: true
    },
    tier: {
        type: String,
        enum: ['LOW', 'MID',, 'HIGH'],
        default: 'LOW'
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }

});

module.exports = mongoose.model("Pack", PackSchema);