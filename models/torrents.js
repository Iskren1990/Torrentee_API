const mongoose = require("mongoose");

const torrentsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: "N/A"
    },
    imdbRating: {
        type: String,
        default: "N/A"
    },
    poster: {
        type: String,
        default: "N/A"
    },
    uploader: {
        type: "ObjectId",
        reff: "User",
        required: true
    },
    movies: {
        type: "ObjectId",
        reff: "Movie",
    },
    games: {
        type: "ObjectId",
        reff: "Game",
    },
    books: {
        type: "ObjectId",
        reff: "Game",
    },
    music: {
        type: "ObjectId",
        reff: "Music",
    },
    serial: {
        type: "ObjectId",
        reff: "Serial",
    },
    downloads: {
        type: Number,
        default: 0
    },
    createdTime: {
        type: String,
        default: () => new Date().toLocaleString("en-GB",
            { year: 'numeric', month: 'long', day: 'numeric', hour: "2-digit", minute: "2-digit", hour12: false }
        )
    }
});

module.exports = mongoose.model("Torrents", torrentsSchema);