const jwt = require("jsonwebtoken");
const { key } = require("../config/variables");

module.exports = function createJWT(data) {
    return jwt.sign(data, key, { expiresIn: "1 day" });
}