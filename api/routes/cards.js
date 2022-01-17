const router = require("express").Router();
const Card = require("../models/Card");
const UserCollection = require("../models/UserCollection");

// get all the cards on the homepage
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send(err);
  }
});

// add new card
router.post("/add", async (req, res) => {
  const newCard = new Card(req.body);
  try {
    const savedCard = await newCard.save();
    res.status(200).send(savedCard);
  } catch (err) {
    res.status(500).send(err);
  }
});

// show card
router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    res.status(200).send(card);
  } catch (err) {
    res.status(500).send(err);
  }
});

// delete card
router.delete("/:id", async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.status(200).send(`Card Id: ${req.params.id} has been deleted`);
  } catch (err) {
    res.status(500).send(err);
  }
});

// update card
router.post("/:id", async (req, res) => {
  try {
    const updateCard = await Card.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(`Car updated ${updateCard}`);
  } catch (err) {
    res.status(500).send(err);
  }
});

// add card to the collection
// basically change the ownership of the card
router.post("buy/:id", async (req, res) => {
  try {
    const Card = await Card.findByIdAndUpdate(
      req.params.id,
      { owner: { $set: req.body } },
      { new: true }
    );
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
