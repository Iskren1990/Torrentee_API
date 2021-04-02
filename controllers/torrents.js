const { Movie } = require("../models/index");
const { errorMsg } = require("../config/proj-props");

const upload = {
    post: async (req, res) => {
        try {
            req.body.uplader = req.user.id
            const created = await Movie.create(req.body);
            res.status(200).json(created)
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = {
    upload,
}