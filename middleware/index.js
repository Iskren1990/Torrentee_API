const userMiddleware = require("./user-permissions");
const formMiddleware = require("./form-validation");



module.exports = {
    ...userMiddleware,
    ...formMiddleware,
}