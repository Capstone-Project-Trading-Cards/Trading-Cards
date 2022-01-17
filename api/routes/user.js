const router = require("express").Router();
const User = require("../models/User");
const Card = require("../models/Card");
const UserCollection = require("../models/UserCollection");

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
router.get("/collection/:userId", async (req, res) => {
  try {
    const cards = await Card.find({ owner: { $eq: req.params.userId } });
    // const collection = Collection.find({ owner: { $eq: req.params.userId } });
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/new", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).send(savedUser.username);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
