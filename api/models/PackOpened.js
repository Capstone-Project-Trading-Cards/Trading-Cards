const mongoose = require("mongoose");

const PackOpened = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  packname: {
    type: String,
    required: true,
  },
  dateopened: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("PackOpened", PackOpened);
