//! Require

const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(formidable());

//***********************ROUTES **************************/
const comics = require("./routes/comics");
app.use(comics);
const characters = require("./routes/characters");
app.use(characters);
const character = require("./routes/character");
app.use(character);

app.get("/", async (req, res) => {
    res.json("Welcome to my Marvel Project");
});

app.all("*", (req, res) => {
    res.status(404).json({ message: "Page not found" });
});

app.listen(4000, () => {
    console.log("Server started");
});
