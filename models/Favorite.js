const mongoose = require("mongoose");

const Favori = mongoose.model("Favori", {
    id: String,
    name: String,
    description: String,
    type: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = Favori;
