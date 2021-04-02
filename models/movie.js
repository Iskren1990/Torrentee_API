const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    uplader: {
        type: "ObjectId",
        reff: "User",
        required: true
    },
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
        type: String,
        default: "N/A"
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
});

module.exports = mongoose.model("Movie", MovieSchema);