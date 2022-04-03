const router = require("express").Router();
const User = require("../models/User");
const Card = require("../models/Card").Card;
const PackOpened = require("../models/PackOpened")
const Pack = require('../models/Pack')
const AdminAnnouncement = require('../models/AdminAnnouncement')

// all packs opened
router.post("/packs/opened", async (req, res) => {
    // probably just use query string for dates
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    try {
        if(startDate != undefined && endDate != undefined) {
            // get packs inbetween dates
            let packs = await PackOpened.find({
                dateopened: {
                    $gte: startDate,
                    $lt: endDate
                }
            })
            res.send({
                numberOpened: packs.count(),
                packs: packs
            })
        } else {
            // get all packs opened
            let packs = await PackOpened.find()
            res.send({
                numberOpened: packs.count(),
                packs: packs
            })
        }
    } catch(err) {
        res.status(500).send(err)
    }  
})


// packs opened by packname
router.post("/:packname/opened", async (req, res) => {
    // probably just use query string for dates
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const packName = req.params.packname
    try{
        if(startDate != undefined && endDate != undefined) {
            // get packs inbetween dates
            let packs = await PackOpened.find({
                packname: packName,
                dateopened: {
                    $gte: startDate,
                    $lt: endDate
                }
            })
            res.send({
                numberOpened: packs.count(),
                packs: packs
            })
        } else {
            // get all packs opened
            let packs = await PackOpened.find({
                packname: packName
            })
            res.send({
                numberOpened: packs.count(),
                packs: packs
            })
        }
    } catch(err) {
        res.status(500).send(err)
    }  
})

// packs opened by user
router.post("/:username/packsopened", async (req, res) => {
    const username = req.params.username

    try {
        let packs = await PackOpened.find({username: username})
        res.send({
            numberOpened: packs.count(),
            packs: packs
        })
    } catch(err) {
        res.status(500).send(err)
    }      
})

// get 5 most recently added packs
router.get('/recentpacks', async (req, res) => {
    try {
        let packs = await Pack.find().sort({datecreated: 'desc'}).limit(5)
        res.send(packs)
    } catch(err) {
        res.status(500).send(err)
    }
    
})

// get 5 most recently added cards
router.get('/recentcards', async (req, res) => {
    try{
        let cards = await Card.find().sort({datecreated: 'desc'}).limit(5)
        res.send(cards)
    }catch(err) {
        res.status(500).send(err)
    }
})

// admin anncouncements routes

// add anncounment
router.post('/announcements/add', async (req, res) => {
    const newAccouncement = new AdminAnnouncement(req.body)
    try {
        const savedAnnoucement = await newAccouncement.save()
        res.status(200).send(savedAnnoucement)
    } catch(err) {
        res.status(500).send(err)
    }
})

// get all announcements, sort by date
router.get('/annoucements', async (req, res) => {
    try{
        const anncouncements = await AdminAnnouncement.find().sort({datecreated: 'desc'})
        res.send(anncouncements)
    } catch(err) {
        res.status(500).send(err)
    }  
})

// get announcements to display on page
router.get('/annoucements/display', async (req, res) => {
    try{
        const anncouncements = await AdminAnnouncement.find().sort({datecreated: 'desc', isVisible: true})
        res.send(anncouncements)
    } catch(err) {
        res.status(500).send(err)
    }  
})

// hide/unhide accouncement (toggle it)
router.get('accouncements/:id/toggle', async (req, res) => {
    try{
        const annId = req.params.id
        const announcement = await AdminAnnouncement.findById(annId)
        if(announcement != null) {
            await AdminAnnouncement.findByIdAndUpdate(annId, {
                $set: {
                    isVisible: !announcement.isVisible
                }
            })
        }else {
            res.status(500).send({ err: "annoucement not found" });
          }
    } catch(err) {
        res.status(500).send(err)
    }  
})

// delete annoucement
router.delete("/:id", async (req, res) => {
    try {
      await AdminAnnouncement.findByIdAndDelete(req.params.id);
      res.status(200).send(`Annoucement: ${req.params.id} has been deleted`);
    } catch (err) {
      res.status(500).send(err);
    }
});

module.exports = router;