const mongoose = require("mongoose");

const torrentsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true,
        text: true,
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
        ref: "User",
        required: true
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
    },
    movies: {
        type: "ObjectId",
        ref: "Movie",
    },
    games: {
        type: "ObjectId",
        ref: "Game",
    },
    books: {
        type: "ObjectId",
        ref: "Game",
    },
    music: {
        type: "ObjectId",
        ref: "Music",
    },
    serial: {
        type: "ObjectId",
        ref: "Serial",
    },
});

module.exports = mongoose.model("Torrents", torrentsSchema);