const router = require("express").Router();
const User = require("../models/User");
const Card = require("../models/Card").Card;
const PackOpened = require("../models/PackOpened")

// packs opened by packname
router.post("/:packname/opened", async (req, res) => {
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    if(startDate != undefined && endDate != undefined) {
        // get packs inbetween dates
    } else {
        // get all packs opened
    }
})

// packs opened by user



module.exports = router;