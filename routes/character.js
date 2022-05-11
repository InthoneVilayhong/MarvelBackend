const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const apiKey = process.env.API_KEY;

//************************ ROUTE /Character/:characterId Pour recuperer tous les characters******************/

router.get("/character/:characterId", async (req, res) => {
    try {
        const characterId = req.params.characterId;
        const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${apiKey}`
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
