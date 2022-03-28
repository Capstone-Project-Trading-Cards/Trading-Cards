const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const Card = require("../models/Card").Card;
const UserCollection = require("../models/UserCollection");
const User = require("../models/User");
const path = require("path");
const Pack = require("../models/Pack");
const ObjectId = require("mongodb").ObjectId;
// Sets up where to store POST images
const storage = multer.diskStorage({
  destination: "./public/uploads/images/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 10 * 1024 * 1024 },
});

router.get("/trades", async (req, res) => {
  try {
    // const cards = await Card.find({ $match: { availableToTrade: "true" } });
    const cards = await Card.find({ availableToTrade: { $eq: "true" } });
    console.log(cards);
    res.send(cards);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// get all the cards on the homepage
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find({ owner: { $eq: "TCC" } });
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get cards by id
router.get("/pack/:id", async (req, res) => {
  try {
    const pack = await Pack.findById(req.params.id);
    if (pack) {
      const cards = await Card.find({ pack: pack.name });
      console.log("done");
      res.statusCode = 200;
      res.send(cards);
    } else {
      res.status(500).send({ err: "Pack not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// name image matches with the input name image
router.post("/add", (req, res) => {
  console.log(req.body);
  const newCard = new Card(req.body);
  try {
    const savedCard = newCard.save();
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

// buy card
router.get("/:cardId/buy/:ownerId", async (req, res) => {
  try {
    const copyCard = await Card.findById(req.params.cardId);
    const user = await User.findById(req.params.ownerId);
    copyCard.owner = req.params.ownerId;
    var id = new ObjectId();
    copyCard._id = id;
    await Card.insertMany(copyCard);
    const newUserBalance = user.coinBalance - copyCard.price;
    await User.findByIdAndUpdate(user._id, {
      $set: { coinBalance: newUserBalance },
    });
    res.status(200).send(`Card now owned by ${user._id}`);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/sell", async (req, res) => {
  try {
    const card = await Card.findById(req.body.cardId);
    const user = await User.findById(req.body.userId);
    const newUserBalance = user.coinBalance + card.price;
    await User.findByIdAndUpdate(user._id, {
      $set: { coinBalance: newUserBalance },
    });
    await Card.findByIdAndDelete(req.body.cardId);
    res.send(`Card is sold`);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/putCardForTrade", async (req, res) => {
  console.log(req.body);
  try {
    const card = await Card.findOneAndUpdate(
      { _id: req.body.cardId },
      { availableToTrade: "true", price: req.body.price },
      { new: true }
    );
    res.send(`is now available to trade`);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/removeFromTrade", async (req, res) => {
  try {
    const card = await Card.findOneAndUpdate(
      { _id: req.body.cardId },
      { availableToTrade: "false" },
      { new: true }
    );
    res.send(`is now not available to trade`);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get(`/userCollection/:userId`, async (req, res) => {
  try {
    const cards = await Card.find({ owner: req.params.userId });
    res.status(200).send(cards);
  } catch (err) {
    res.send(err);
  }
});

// buy card from trades
router.get("/:cardId/buyTrades/:ownerId", async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    const user = await User.findById(req.params.ownerId);
    card.owner = req.params.ownerId;
    const newUserBalance = user.coinBalance - card.price;
    await Card.findByIdAndUpdate(req.params.cardId, {
      $set: { owner: req.params.ownerId, availableToTrade: "false" },
    });
    await User.findByIdAndUpdate(req.params.ownerId, {
      $set: { coinBalance: newUserBalance },
    });
    res.status(200).send(`Card bought`);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
/*
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
*/

module.exports = router;
