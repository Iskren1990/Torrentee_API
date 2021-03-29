const mongoose = require("mongoose");

function establishDbConnection(conf, res, rej) {
    mongoose.connect(
        conf.uri(conf),
        conf.dbOpt,
        err => 
            err 
            ? rej(`Mongoose connection error: ` + err)
            : res()
    );
}

module.exports = establishDbConnection;