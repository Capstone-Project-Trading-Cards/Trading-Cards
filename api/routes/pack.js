const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const Pack = require("../models/Pack");
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
router.get("/:packname", async (req, res) => {

})



module.exports = router;
