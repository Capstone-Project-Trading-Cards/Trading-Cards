const mongoose = require("mongoose");

const AdminAnnouncement = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
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