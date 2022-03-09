const mongoose = require("mongoose");

const PackOpened = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    packname: {
        type: String,
        required: true
    },
    dateopened: {
        type: Date,
        required: true
    }
})

const CoinsBought = mongoose.Schema({
    username: String,
    numCoins: Number,
    date: Date
})

const CountingData = mongoose.Schema({
    dataType: String,
    count: Number,
})

module.exports = mongoose.model("PackOpened", PackOpened)