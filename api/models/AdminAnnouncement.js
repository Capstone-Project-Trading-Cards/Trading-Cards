const mongoose = require("mongoose");
const { stringify } = require("uuid");

const AdminAnnouncement = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: stringify,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    datecreated: {
        type: Date,
        required: true
    },
    isVisible: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("AdminAnnouncement", AdminAnnouncement)