const router = require("express").Router();
const Card = require("../models/Card").Card;
const TradeList = require("../models/TradeList").TradeList;
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const tradeOffers = await TradeList.find();
    console.log(tradeOffers);
    res.send(tradeOffers);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/offer", async (req, res) => {
  try {
    const newOffer = new TradeList({
      offerFrom: req.body.offerFrom,
      offerTo: req.body.offerTo,
      offeredCard: req.body.offeredCard,
      wantedCard: req.body.wantedCard,
    });
    await newOffer.save();
    res.send("Trade offer sent");
  } catch (err) {
    res.send(err);
  }
});

router.post("/acceptOffer", async (req, res) => {
  try {
    const offerFrom = await User.findById(req.body.offerFrom);
    const offerTo = await User.findById(req.body.offerTo);
    await TradeList.findByIdAndDelete(req.body.tradeId);
    await Card.findByIdAndUpdate(req.body.wantedCard, {
      $set: { owner: offerFrom._id, availableToTrade: "false" },
    });
    await Card.findByIdAndUpdate(req.body.offeredCard, {
      $set: { owner: offerTo._id, availableToTrade: "false" },
    });
    res.send("Transfer completed");
  } catch (err) {
    res.send(err);
  }
});

router.post("/refuseOffer", async (req, res) => {
  try {
    await TradeList.findByIdAndDelete(req.body.tradeId);
    res.send("Offer declined");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
