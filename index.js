require("dotenv").config({ path: "./config/.env" });
require("./utils/index").logPrettifier();
const { globalErrorHandler } = require("./utils/index");

const config = require("./config/variables");
const app = require("express")();


const http = require('http');
const server = http.createServer(app);



require("./config/express")(app, config);
require("./config/app")(app);
// require("./routes/router")(app);


app.use(globalErrorHandler);

server.listen(config.PORT, (err) => {
    err 
    ? console.error("Something went wrong with the server")
    : new Promise((res, rej) => require("./config/db-connection")(config, res, rej))
        .then(x => {
            console.info(`DB connection established`);
            console.info("Server is running.");
            console.info("Open app on: \033[35mhttp://localhost:" + config.PORT);
        })
        .catch(console.error);
});