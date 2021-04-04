const { Movie, Serial, Torrents } = require("../models/index");
const { errorMsg } = require("../config/proj-props");


const Models = {
    movies: (movieObj) => Movie.create(movieObj),
    serial: (movieObj) => Serial.create(movieObj),
}


const upload = {
    post: async (req, res) => {
        try {
            
            const torrentData = await Models[req.body.category](req.body);

            const torrnetUserRelation = {...req.body, uploader: req.user.id, title: req.body.title};
            torrnetUserRelation[req.body.category] = torrentData._id;

            const data = await Torrents.create(torrnetUserRelation);

            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    },
    get: async (req, res) => {
        try {
            const sort = req.query.downloads || {_id: -1};
            const skip = req.query.limit * req.query.pages || 0;

            const data = await Torrents.find({ $query: {}, $orderby: sort }).skip(skip).limit(+req.query.limit);
            
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = {
    upload,
}