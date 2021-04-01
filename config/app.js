const { errCtn } = require("../utils/index");
const { userStatus } = require("../middleware/index");


function appConfig(app) {

    app.use(errCtn);
    app.use(userStatus);
}

module.exports = appConfig;

