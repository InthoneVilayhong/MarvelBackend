const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const apiKey = process.env.API_KEY;

//************************ ROUTE /comics Pour récupérer tous les comics ******************/
router.get("/comics", async (req, res) => {
    try {
        const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}`
        );

        res.json(response.data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//************************ ROUTE /comics/:characterId Pour recupérer les comics avec un character en particulier******************/

router.get("/comics/:characterId", async (req, res) => {
    try {
        const characterId = req.params.characterId;
        // console.log(characterId);
        const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${apiKey}`
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
