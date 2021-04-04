// const { loggedUserStop, guestUserStop, loginRegForm } = require("../middleware/index");
const { loginRegForm } = require("../middleware/index");
const { register, login, logout, profile } = require("../controllers/index");
const { upload } = require("../controllers/index");
// const path = require("path");

// const filesPath = path.resolve(__dirname, "../public/dist/");

module.exports = (app) => {


    app.post("/api/user/register", loginRegForm, register.post);
    app.post("/api/user/login", loginRegForm, login.post);
    app.get("/api/user/logout", logout.get);
    app.put("/api/user/profile/edit", profile.put);
    app.get("/api/user/profile", profile.get);

    app.post("/api/torrents/upload", upload.post);
    app.get("/api/torrents/list", upload.get);


    // app.post("/api/user/register", loggedUserStop, loginRegForm, register.post);
    // app.post("/api/user/login", loggedUserStop, login.post);
    // app.put("/api/user/profile", guestUserStop, profile.put);
    // app.get("/api/user/logout", logout.get);

    // serve
    app.all("*", (req, res) => res.status(400).json({message: "app.all reached"}));

    // app.all("*", (req, res) => res.sendFile(`${filesPath}/index.html`));
}