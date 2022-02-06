const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const UiPack = require("../models/UiPack");
const LowTierPack = require("../models/LowTierPack");
const MidTierPack = require("../models/MidTierPack");
const HighTierPack = require("../models/HighTierPack");
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
    const packs = await UiPack.find();
    res.status(200).send(packs);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get all cards that are in the pack
router.get("/:packid", async (req, res) => {
  try {
    const pack = await UiPack.findById(req.params.packid);
    res.status(200).send(pack);
  } catch (err) {
    res.status(500).send(err);
  }
});

/*
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
*/

const drawCards = async (numberOfCards, pack, cardRange, userId) => {
  const drawnCards = [];
  var oneRandomCard;
  // number of cards will be drawn
  for (let i = 0; i < numberOfCards; i++) {
    // get random numbers from 0 to 19
    const randomNumber = Math.floor(Math.random() * cardRange);
    // get random cards from id of 0 to 19
    // we could also use different models to create more chances and variations
    // for lowtierpack we can draw 5 cards from lowtierpack and 1 from midtierpack
    // for midtierpack we can draw 4 cards from midterpack and 2 from hightier
    // for hightier all cards are drawn from hightierpack model
    if (pack === LowTierPack && i > 4) {
      oneRandomCard = await MidTierPack.findOne({
        items: { $elemMatch: { _id: randomNumber } },
      });
    } else if (pack === MidTierPack && i > 3) {
      oneRandomCard = await HighTierPack.findOne({
        items: { $elemMatch: { _id: randomNumber } },
      });
    } else {
      oneRandomCard = await pack.findOne({
        items: { $elemMatch: { _id: randomNumber } },
      });
    }
    // create card duplicates
    const newCard = new Card({
      name: oneRandomCard.name,
      rating: oneRandomCard.rating,
      // category that it belongs to could be more than one
      category: oneRandomCard.category,
      // rarity
      tier: oneRandomCard.tier,
      price: oneRandomCard.price,
      speed: oneRandomCard.speed,
      power: oneRandomCard.power,
      vision: oneRandomCard.vision,
      passing: oneRandomCard.passing,
      defending: oneRandomCard.defending,
      stamina: oneRandomCard.stamina,
      // assigning that to the user who is openning the package
      owner: userId,
      nationality: oneRandomCard.nationality,
      team: oneRandomCard.team,
      // when user puts the cards up for trade switch to true, it is false as default
      package: oneRandomCard.package,
    });
    const savedCard = newCard.save();
    drawnCards.push(savedCard);
  }
  return drawnCards;
};

router.post("/:packid", async (req, res) => {
  const uiPackId = req.params.packid;
  const userId = req.body.userId;
  const drawnCards = [];
  try {
    // get the package details that user chose
    const uiPack = await UiPack.findById(uiPackId);
    const user = await User.findById(userId);
    // adjust user's coin balance
    const newUserBalance = user.coinBalance - uiPack.price;
    await User.findByIdAndUpdate(userId, {
      $set: { coinBalance: newUserBalance },
    });
    // depending of pack rarity draw it from one of the card models
    //eg. LowTierPack = has 18 non rare 2 rare
    //eg. MidTierPack = has 15 non rare 5 rare
    //eg. HighTierPack = has 10 non rare 10 rare
    switch (uiPack.packRarity) {
      case 1:
        drawnCards = drawCards(6, LowTierPack, 20, userId);
        break;
      case 2:
        drawnCards = drawCards(6, MidTierPack, 20, userId);
        break;
      case 3:
        drawnCards = drawCards(6, HighTierPack, 20, userId);
        break;
    }
    res.status(200).send(drawnCards);
  } catch (err) {
    res.status(500).send(err);
  }
  /*
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
  */
});

module.exports = router;
