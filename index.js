//! Require

const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(cors());
app.use(formidable());
mongoose.connect("mongodb://localhost:27017/marvel");

//***********************ROUTES **************************/
const comics = require("./routes/comics");
app.use(comics);
const characters = require("./routes/characters");
app.use(characters);
const character = require("./routes/character");
app.use(character);
const user = require("./routes/user");
app.use(user);

app.get("/", async (req, res) => {
    res.json("Welcome to my Marvel Project");
});

app.all("*", (req, res) => {
    res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
    console.log("Server started");
});
