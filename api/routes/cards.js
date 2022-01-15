const router = require("express").Router();
const Card = require("../models/Card");

// get all the cards
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
