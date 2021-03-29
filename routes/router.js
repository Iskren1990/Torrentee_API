const path = require("path");

const filesPath = path.resolve(__dirname, "../public/dist/");

module.exports = (app) => {
 
    app.post("/api/users/register", loggedUserStop, loginRegForm, register.post);
    app.post("/api/users/login", loggedUserStop, login.post);
    app.put("/api/users/profile", guestUserStop, profile.put);
    app.get("/api/users/logout", logout.get);

    // serve
    app.all("*", (req, res) => res.sendFile(`${filesPath}/index.html`));
}