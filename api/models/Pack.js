const mongoose = require("mongoose");

const PackSchema = mongoose.Schema(
  {
      name: {
          type:String,
          required: true,
          unique: true
      }
  }

)

module.exports = mongoose.model("Pack", PackSchema);