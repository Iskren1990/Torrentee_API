const { loggedUserStop, guestUserStop } = require("../middleware/index");
const { loginRegFormValidation, uploadMovieFormVaidation } = require("../middleware/index");
const { register, login, logout, profile } = require("../controllers/index");
const { upload, torrents, count, torrent } = require("../controllers/index");
const { NewsAPI } = require("../controllers/index");
const { error } = require("../controllers/index");
const path = require("path");
const filesPath = path.resolve(__dirname, "../build");

module.exports = (app) => {

    app.post("/api/user/register", loginRegFormValidation, register.post);
    app.post("/api/user/login", loginRegFormValidation, login.post);
    app.get("/api/user/logout", guestUserStop, logout.get);
    app.put("/api/user/profile/edit", loginRegFormValidation, guestUserStop, profile.put);
    app.get("/api/user/profile", guestUserStop, profile.get);

    app.post("/api/torrents/upload",uploadMovieFormVaidation, guestUserStop, upload.post);
    app.get("/api/torrents/list", guestUserStop, torrents.get);
    app.get("/api/torrents/count", guestUserStop, count.get);
    app.get("/api/torrents/:id", guestUserStop, torrent.get);
    app.put("/api/torrents/:id", guestUserStop, torrent.put);
    app.delete("/api/torrents/:id", guestUserStop, torrent.delete);

    app.post("/api/error", error.post);

    app.get("/api/news", NewsAPI.get);

    app.all("*", (req, res) => res.sendFile(`${filesPath}/index.html`));
}