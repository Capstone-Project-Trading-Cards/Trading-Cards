const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const Pack = require("../models/Pack");
const UserCollection = require("../models/UserCollection");
const User = require("../models/User");
const Card = require("../models/Card");

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

// get all packs
router.get("/", async (req, res) => {
  try {
    const packs = await Pack.find();
    res.status(200).send(packs);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get all cards that are in the pack
router.get("/:packid", async (req, res) => {
  try {
    const pack = await Pack.findById(req.params.packid);
    res.status(200).send(pack);
  } catch (err) {
    res.status(500).send(err);
  }
});

const generateNewCards = (packId) => {
  // TODO: Get random 6 cards from pack, use the same data to duplicate the card that is already in the pack
  // TODO: assign same info but the owner so we can have a duplicate cards with new owners
  // TODO: fix the randomize logic what if there is high number id cards in the pack?
  // * get 6 random numbers to use them to get random cards from the pack
  const randomNums = [];
  for (var i = 0; i < 6; i++) {
    const numberOfItemsInPack = Math.floor(Math.random() * pack.items.length());
    randomNums.push(numberOfItemsInPack);
  }
  // * getting random cards from the pack
  // * items are joint table of the Card Model
  // * card ids needs to start from 1 in this case
  const unpackedCards = [];
  for (var i = 0; i < 6; i++) {
    const getCard = Pack.findById(packId).select({
      items: {
        $elemMatch: { _id: randomNums[i] },
      },
    });
    // * creating the card copy
    const newCard = new Card({
      name: getCard.name,
      rating: getCard.rating,
      // category that it belongs to could be more than one
      category: getCard.category,
      // rarity
      tier: getCard.tier,
      price: getCard.price,
      speed: getCard.speed,
      power: getCard.power,
      vision: getCard.vision,
      passing: getCard.passing,
      defending: getCard.defending,
      stamina: getCard.stamina,
      owner: userId,
      nationality: getCard.nationality,
      team: getCard.team,
      // when user puts the cards up for trade switch to true, it is false as default
      package: getCard.package,
    });
    const savedCard = newCard.save();
    // * pushing it to card stack and returning
    unpackedCards.push(savedCard);
    return unpackedCards;
  }
};

router.post("/:packid", async (req, res) => {
  // TODO: Creating 6 brand new random cards, assign them to the user and return them
  const userId = req.body.userId;
  try {
    // * find the pack and user
    const pack = await Pack.findById(req.params.packid);
    const user = await User.findById(userId);
    // * set new user money balance
    const newUserBalance = user.moneyBalance - pack.price;
    await User.findByIdAndUpdate(userId, {
      $set: { coinBalance: newUserBalance },
    });
    // * assign unpackedCards and return it to the user
    const unpackedCards = generateNewCards(req.params.packid);
    res.status(200).send(unpackedCards);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
