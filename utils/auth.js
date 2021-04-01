const jwt = require("jsonwebtoken");
const { key } = require("../config/variables");

function createJWT(data) {
    return jwt.sign(data, key, { expiresIn: "5 day" });
}

function JWTReniew(tokenData, reniewBeforeDays) {
    const daysToExpiration = (tokenData.exp - (Date.now() / 1000)) / 86400;
    if (daysToExpiration <= Number(reniewBeforeDays)) {
        delete tokenData.iat;
        delete tokenData.exp;
        res.cookie("uid", createJWT(tokenData))
    }
}

module.exports = {
    createJWT,
    JWTReniew
}