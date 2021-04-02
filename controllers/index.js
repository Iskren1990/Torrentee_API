const user = require("./user");
const torrents = require("./torrents");


module.exports = {
    ...user,
    ...torrents,
}