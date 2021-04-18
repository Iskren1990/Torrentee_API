const { errorMsg } = require("../config/proj-messages");
const { objTrimmer } = require("../utils/index");

function loginRegFormValidation(req, res, next) {

    req.body = objTrimmer(req.body);

    const { username, email, password, age } = req.body;


    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const usernameAndPassowrdRegex = /[\w\d-@+]{3,9}/;

    if (email !== undefined && emailRegex.test(email) === false) {
        res.locals.error.push(errorMsg.userErr.wrongEmail);
        res.locals.error.push(errorMsg.inputErr.wrongChar);
    }

    if (usernameAndPassowrdRegex.test(username) === false || usernameAndPassowrdRegex.test(password) === false) {
        res.locals.error.push(errorMsg.inputErr.wrongLength("Username and Password", "3 and 9"));
        res.locals.error.push(errorMsg.inputErr.wrongChar);
    }
    if (age !== undefined && /^\d{1,2}$/.test(age) === false) {
        res.locals.error.push(errorMsg.inputErr.notNumber("Age"));
    }

    if (res.locals.error.length > 0) {
        res.status(400);
        next({ message: res.locals.error });
        return;
    }

    next();
}

function uploadMovieFormVaidation(req, res, next) {

    req.body = objTrimmer(req.body);

    if (/cloudinary/.test(req.body.torrentUrl) === false) {
        res.locals.error.push(errorMsg.torrentErr.requiredField("Torrent file"));
    }
    if (req.body.description === "") {
        res.locals.error.push(errorMsg.torrentErr.requiredField("Torrent description"));
    }
    if (req.body.title === "") {
        res.locals.error.push(errorMsg.torrentErr.requiredField("Torrent title"));
    }
    if (/tt\d{7,8}/.test(req.body.imdbID) === false) {
        res.locals.error.push(errorMsg.torrentErr.requiredField("Torrent IMDB link"));
    }
    if (!!req.body.category === false) {
        res.locals.error.push(errorMsg.torrentErr.requiredField("Torrent category"));
    }

    if (res.locals.error.length > 0) {
        res.status(400);
        next({ message: res.locals.error });
        return;
    }

    next();
}

module.exports = {
    loginRegFormValidation,
    uploadMovieFormVaidation
}