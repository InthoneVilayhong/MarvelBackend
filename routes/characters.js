const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const apiKey = process.env.API_KEY;

//************************ ROUTE /Character  Pour recuperer tous les characters******************/

router.get("/characters", async (req, res) => {
    try {
        ("Access-Control-Allow-Origin: http://localhost:3000");
        const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}`
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
