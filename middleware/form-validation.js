const { errorMsg } = require("../config/proj-props");
const { objTrimmer } = require("../utils/index");

function loginRegForm(req, res, next) {

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

    if (age !== undefined && /\d{1,2}/.test(age) === false) {

        res.locals.error.push(errorMsg.inputErr.notNumber("Age"));
    }

    if (res.locals.error.length > 0) {
        res.status(400).json({ message: res.locals.error });
        return;
    }

    next();
}

module.exports = {
    loginRegForm,
}