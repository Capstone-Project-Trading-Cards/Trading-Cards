const router = require("express").Router();
const User = require("../models/User");
const UserCollection = require("../models/UserCollection");

// get user information
router.get("/profile/:userId", (req, res) => {
  try {
    const user = User.findById(req.params.userId);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// edit user profile
router.post("/profile/:userId", (req, res) => {
  try {
    const user = User.findByIdAndUpdate(req.params.userId, req.body);
    res.status(200).send(`User: ${user._id} updated`);
  } catch (err) {
    res.status(500).send(err);
  }
});

// view users collection
// first get all the cards then check if user's id is matching with owner's id
router.get("/collection", (req, res) => {
  try {
    const cards = Card.find({ owner: { $eq: req.params.userId } });
    // const collection = Collection.find({ owner: { $eq: req.params.userId } });
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
