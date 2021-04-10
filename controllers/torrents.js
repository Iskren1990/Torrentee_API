const { Movie, Serial, Torrents } = require("../models/index");
const { errorMsg } = require("../config/proj-messages");
const YoutubeAPI = require("../services/youtube");


const Models = {
    movies: () => Movie,
    serial: () => Serial,
    torrents: () => Torrents,
}

const upload = {
    post: async (req, res, next) => {
        try {

            if (["movies", "games", "serial"].some(x => x === req.body.category)) {
                req.body.videoId = await YoutubeAPI.get(req.body.title + " trailer");
            }

            const torrentData = await Models[req.body.category]().create(req.body);
            const torrnetUserRelation = { ...req.body, uploader: req.user.id, title: req.body.title };
            torrnetUserRelation[req.body.category] = torrentData._id;
            const data = await Torrents.create(torrnetUserRelation);
            res.status(200).json(data);
        } catch (err) {
            res.status(400);
            res.locals.error.push(errorMsg.serverErr.general);
            next(err);
        } 
    },
}

const torrents = {
    get: async (req, res, next) => {
        try {
            const search = {};

            (req.query.uploader && req.query.uploader !== "undefined") ? search.uploader = req.query.uploader : null;
            req.query.search ? search.$text = { $search: req.query.search } : null;
            req.query.imdbRating ? search.imdbRating = { $gte: req.query.imdbRating } : null;

            const sort = req.query.downloads ? { downloads: -1 } : { _id: -1 };
            const skip = (req.query.limit * req.query.page) || 0;
            const data = await Torrents.find(search).sort(sort).skip(skip).limit(+req.query.limit);
            
            // throw new Error("Remove from BE")
            res.status(200).json(data);
        } catch (err) {
            res.status(400);
            res.locals.error.push(errorMsg.serverErr.general);
            next(err);
        }
    }
}

const count = {
    get: async (req, res, next) => {
        try {
            const { category } = req.query;
            delete req.query.category;
            req.query.uploader === "undefined" && delete req.query.uploader
            const sort = req.query || {};
            const data = await Models[category]().find(sort).countDocuments();

            res.status(200).json(data);
        } catch (err) {
            res.status(400);
            res.locals.error.push(errorMsg.serverErr.general);
            next(err);
        }
    }
}

const torrent = {
    get: async (req, res, next) => {
        try {
            const torrentId = req.params.id
            const data = await Torrents.findOne({ _id: torrentId }).populate(req.query.category);

            res.status(200).json(data);
        } catch (err) {
            res.status(400);
            res.locals.error.push(errorMsg.serverErr.general);
            next(err);
        }
    },
    put: async (req, res, next) => {
        try {
            const torrentId = req.params.id
            const data = await Torrents.findOneAndUpdate({ _id: torrentId }, { $inc: { downloads: +1 } });

            res.status(200).json(data);
        } catch (err) {
            res.status(400);
            res.locals.error.push(errorMsg.serverErr.general);
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const torrentId = req.params.id
            const data = await Torrents.findOneAndDelete({ _id: torrentId });
            const torentData = await Models[data.category]()
                .findOneAndDelete({ _id: data[data.category] });

            res.status(200).json(torentData);
        } catch (err) {
            res.status(400);
            res.locals.error.push(errorMsg.serverErr.general);
            next(err);
        }
    }
}


module.exports = {
    upload,
    torrents,
    count,
    torrent,
}