//! Require

const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(cors());
app.use(formidable());
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI);

//***********************ROUTES **************************/
const comics = require("./routes/comics");
app.use(comics);
const characters = require("./routes/characters");
app.use(characters);
const character = require("./routes/character");
app.use(character);
const user = require("./routes/user");
app.use(user);
const favorisComics = require("./routes/favorisComics");
app.use(favorisComics);
const deleteComicsFavori = require("./routes/deleteComicsFavori");
app.use(deleteComicsFavori);
const getFavorisComics = require("./routes/getFavorisComics");
app.use(getFavorisComics);

app.get("/", async (req, res) => {
    res.json("Welcome to my Marvel Project");
});

app.all("*", (req, res) => {
    res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
    console.log("Server started");
});
