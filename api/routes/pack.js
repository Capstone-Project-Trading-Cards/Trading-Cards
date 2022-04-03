const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const UiPack = require("../models/UiPack");
const LowTierPack = require("../models/LowTierPack");
const MidTierPack = require("../models/MidTierPack");
const HighTierPack = require("../models/HighTierPack");
const UserCollection = require("../models/UserCollection");
const User = require("../models/User");
const Card = require("../models/Card").Card;
const Pack = require("../models/Pack");
const PackOpened = require("../models/PackOpened");

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

// create pack
router.post("/addPack", async (req, res) => {
  try {
    const pack = new Pack(req.body);
    console.log(pack);
    const newPack = pack.save();
    res.status(200).send("Pack created");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:packid/open/:cardnum", async (req, res) => {
  try {
    // get username :(
    // get pack and card numbers
    const pack = await Pack.findById(req.params.packid);
    const numCards = req.params.cardnum;
    // get cards that are in pack
    const allCards = await Card.find({ pack: pack.name });
    const cardsToSend = [];
    const cardLength = allCards.length;
    // get a random card from all the cards in pack, send those cards, are duplicates
    if (cardLength >= numCards) {
      for (let i = 0; i < numCards; i++) {
        var random = Math.floor(Math.random() * cardLength);
        cardsToSend.push(await Card.findOne().skip(random));
      }
      // create packopened and save to db
      const packOpened = new PackOpened({
        packname: pack.name,
        dateopened: new Date(),
      });
      await packOpened.save();

      res.send(cardsToSend);
    } else {
      res
        .status(500)
        .send({ err: `Not enough cards in pack to open ${numCards} cards` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/showcase/:packid", async (req, res) => {
  const uiPackId = req.params.packid;
  const userId = req.body.userId;
  var drawnCards = [];
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
