const express = require("express");
const router = express.Router();
const Favoris = require("../models/Favoris");
const identification = require("../identification");

router.get("/comics/favoris/get", identification, async (req, res) => {
    try {
        const favorisToShow = await Favoris.find();
        res.status(200).json(favorisToShow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
