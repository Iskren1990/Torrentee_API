const sanitizer = require("./sanitizer");
const error = require("./error");
const logPrettifier = require("./misc");

module.exports = {
    logPrettifier,
    ...sanitizer,
    ...error,
}