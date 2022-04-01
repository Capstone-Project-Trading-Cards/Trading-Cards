const router = require("express").Router();
const { findByIdAndUpdate } = require("../models/User");
const User = require("../models/User");
const Card = require("../models/Card").Card;
const PackOpened = require('../models/PackOpened')

// schema test
User.schema.static.adjustUserBalance = function (
  userId,
  coinAmount,
  moneyAmount
) {
  User.findByIdAndUpdate(userId, {
    $set: {
      coinBalance: coinBalance + coinAmount,
      moneyBalance: moneyBalance + moneyAmount,
    },
  });
  User.save();
  return "User balance is updated";
};

// get user information
router.get("/profile/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// edit user profile
router.post("/profile/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body);
    res.status(200).send(`User: ${user._id} updated`);
  } catch (err) {
    res.status(500).send(err);
  }
});

// view users collection
// first get all the cards then check if user's id is matching with owner's id
router.get("/collection/:username", async (req, res) => {
  console.log("here");
  var user = await User.findOne({ username: req.params.username });

  if (!user) {
    res.status(500).send({ err: "user not found" });
  } else {
    user = user.toObject();
    console.log(user.cardCollection);
    res.status(200).send(user.cardCollection);
  }
});

// add card on pack open
router.post("/collection/add", async (req, res) => {
  console.log(req.body.username);
  console.log(req.body.cardId);
  // get card
  var card = await Card.findById(req.body.cardId);
  // get user
  var user = await User.findOne({ username: req.body.username });
  if (!card) {
    // card not found
    res.status(500).send("err: card not found");
  } else if (!user) {
    // user not found
    res.status(500).send("err: user not found");
  } else {
    // add card to users collection
    const updatedUser = await User.findOneAndUpdate(
      { username: req.body.username },
      { $push: { cards: card } }
    ).exec();

    user = updatedUser.toObject();
    console.log(user.cards.length);
    res.status(200).send("Card Added");
  }
});

// sell card for coins
router.post("/card/sell", async (req, res) => {
  console.log(req.body.username);
  console.log(req.body.cardId);
  // get card
  var card = await Card.findById(req.body.cardId);
  // get user
  var user = await User.findById({ username: req.body.username });
  if (!card) {
    // card not found
    res.status(500).send("err: card not found");
  } else if (!user) {
    // user not found
    res.status(500).send("err: user not found");
  } else {
    // add coins to user
    const updatedUser = await User.findByIdAndUpdate(user._id, {
      $set: { coinBalance: user.coinBalance + card.price * 0.3 },
    });
    res.status(200).send("card sold");
  }
});

// create user
router.post("/new", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).send(savedUser.username);
  } catch (err) {
    res.status(500).send(err);
  }
});

// add coins to user acount
router.post("/buyCoins", async (req, res) => {
  const coinBalance = req.body.coinBalance;
  const moneyBalance = req.body.moneyBalance;
  const userId = req.body.userId;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { coinBalance: coinBalance, moneyBalance: moneyBalance },
      },
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get users balance
router.get("/getUserBalance", async (req, res) => {
  const user = await User.find(req.body.userId);
  res.send(user.coinBalance);
});

router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});



router.post("/banUser", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $set: { banned: "true" },
    });
    res.send("User is banned");
  } catch (err) {
    res.send(err);
  }
});

router.post("/unbanUser", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $set: { banned: "false" },
    });
    res.send("User is unbanned");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
