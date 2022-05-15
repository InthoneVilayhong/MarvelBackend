// const mongoose = require("mongoose");

// const Favori = mongoose.model("Favori", {
//     item: Array,
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//     },
// });

// module.exports = Favori;
const mongoose = require("mongoose");

const Favoris = mongoose.model("Favoris", {
    title: String,
    description: String,
    thumbnail: Object,
    _id: String,
});

module.exports = Favoris;
