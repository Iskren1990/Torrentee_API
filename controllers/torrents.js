const { Movie, Serial, Torrents } = require("../models/index");
const { errorMsg } = require("../config/proj-props");
const YoutubeAPI = require("../services/youtube");


const Models = {
    movies: (movieObj) => Movie.create(movieObj),
    serial: (movieObj) => Serial.create(movieObj),
}


const upload = {
    post: async (req, res) => {
        try {

            req.body.videoId = await YoutubeAPI.get(req.body.title);
            
            const torrentData = await Models[req.body.category](req.body);

            const torrnetUserRelation = {...req.body, uploader: req.user.id, title: req.body.title};
            torrnetUserRelation[req.body.category] = torrentData._id;

            const data = await Torrents.create(torrnetUserRelation);

            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    },
}

const torrents = {
    get: async (req, res) => {
        try {
            const sort = req.query.downloads ? {downloads: -1} : {_id: -1};
            const skip = (req.query.limit * req.query.page) || 0;

            const data = await Torrents.find().sort(sort).skip(skip).limit(+req.query.limit);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }
}

const count = {
    get: async (req, res) => {
        try {
            
            // for all Models
            const data = await Torrents.find().count();

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }
}

const torrent = {
    get: async (req, res) => {
        try {

            const torrentId = req.params.id
            const data = await Torrents.findOne({_id: torrentId}).populate(req.query.category);
            res.status(200).json(data);
            
        } catch (error) {
            console.log(error);
        }
    },
    put: async (req, res) => {
        try {

            const torrentId = req.params.id
            const data = await Torrents.findOneAndUpdate({_id: torrentId}, {$inc: { downloads: +1}});

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            
        }
    }
}


module.exports = {
    upload,
    torrents,
    count,
    torrent,
}