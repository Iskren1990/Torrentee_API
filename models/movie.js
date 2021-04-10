const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    imdbID: {
        type: String,
        required: true,
        $regex: /tt\d{7,8}/
    },
    torrentUrl: {
        type: String,
        required: true,
        $regex: /[http|https].*\.torrent$/
    },
    picUrls: [{
        type: String,
        default: "N/A",
        $regex: /[http|https].*/
    }],
    category: {
        type: String,
        default: "N/A"
    },
    year: {
        type: String,
        default: "N/A"
    },
    released: {
        type: String,
        default: "N/A"
    },
    poster: {
        type: String,
        default: "N/A"
    },
    released: {
        type: String,
        default: "N/A"
    },
    plot: {
        type: String,
        default: "N/A"
    },
    imdbRating: {
        type: Number,
        default: "0"
    },
    country: {
        type: String,
        default: "N/A"
    },
    language: {
        type: String,
        default: "N/A"
    },
    actors: {
        type: String,
        default: "N/A"
    },
    director: {
        type: String,
        default: "N/A"
    },
    genre: {
        type: String,
        default: "N/A"
    },
    runtime: {
        type: String,
        default: "N/A"
    },
    videoId: [{
        type: String,
    }]
});

module.exports = mongoose.model("Movie", movieSchema);