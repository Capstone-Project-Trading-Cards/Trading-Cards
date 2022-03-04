const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const Card = require("../models/Card");
const UserCollection = require("../models/UserCollection");
const path = require("path");
const Pack = require('../models/Pack')

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

// get all the cards on the homepage
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get cards by id
router.get("/pack/:id", async (req, res) => {
  try {
    const pack = await Pack.findById(req.params.id)
    if(pack) {
      const cards = await Card.find({pack: pack.name});
      console.log('done')
      res.statusCode = 200
      res.send(cards);
    }else {
      res.status(500).send({"err": "Pack not found"});
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
