const NewsAPI = require("./news");
const user = require("./user");
const torrents = require("./torrents");
const error = require("./error");


module.exports = {
    ...user,
    ...torrents,
    ...NewsAPI,
    ...error,
}