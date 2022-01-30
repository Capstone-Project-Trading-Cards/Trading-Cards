const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const Card = require("../models/Card");
const UserCollection = require("../models/UserCollection");

// Sets up where to store POST images
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "../public/uploads/images");
  },
  // add back the extension that multer removed
  filename: (request, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

// upload parameter for multer
// defining the storage and the upload limit
const upload = multer({
  storage: storage,
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },
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

// name image matches with the input name image
router.post("/add", upload.single("image"), async (req, res) => {
  const newCard = new Card({
    name: req.body.name,
    rating: req.body.rating,
    // category that it belongs to could be more than one
    category: req.body.category,
    // rarity
    tier: req.body.tier,
    price: req.body.price,
    speed: req.body.speed,
    power: req.body.power,
    vision: req.body.vision,
    passing: req.body.passing,
    defending: req.body.defending,
    stamina: req.body.stamina,

    nationality: req.body.nationality,
    team: req.body.team,
    // when user puts the cards up for trade switch to true, it is false as default
    package: req.body.package,
  });

  newCard.image.data = fs.readFileSync(req.body.image);
  newCard.image.type = "image/jpeg";
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
