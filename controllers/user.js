const { User } = require("../models/index");
const { createJWT } = require("../utils/auth");
const bcrypt = require("bcrypt");
const { errorMsg } = require("../config/proj-props");


const register = {
    post: async function (req, res) {
        const { username, email, password, age } = req.body;
        try {
            const userData = await User.create({ username, email, password, age });
            const token = createJWT({ id: userData._id, email, username, isLogged: true });

            res.cookie("uid", token, { SameSite: "None" });
            res.status(201).json({ id: userData._id, email, isLogged: true, username, email, age, avatar: userData.avatar });
        } catch (err) {
            res.locals.error.push(errorMsg.userErr.emailUsed);
            res.status(400).json({ message: res.locals.error, err });
        }
    }
}

const login = {
    post: async function (req, res) {
        try {
            const userData = await User.findOne({ username: req.body.username });

            const { username, email, age, avatar, id = _id } = userData;
            const isRegistered = bcrypt.compareSync(req.body.password, userData.password);

            if (isRegistered === false) { throw new Error(isRegistered) };

            const token = createJWT({ username, email, age, id, avatar, isLogged: true });

            res.cookie("uid", token);
            res.status(200).json({ username, email, age, id, avatar, isLogged: true });
        } catch (err) {
            console.log(err);
            res.locals.error.push(errorMsg.userErr.wrongCred);
            res.status(400).json({ message: [...res.locals.error], err });
        }
    }
}

const logout = {
    get: function (req, res) {
        res.clearCookie("uid");
        res.status(200).json({ message: "Logged out successfully" });
    }
}

const profile = {
    get: async function (req, res) {
        try {
            // const userData = await (await User.findOne({ _id: req.user.id })).populated("torrents");   -   add after Schema creation
            const userData = await User.findOne({ _id: req.user.id });

            const { username, email, age, avatar, torrents, id = _id, isLogged = req.user.isLogged } = userData;

            res.status(200).json({ username, email, age, avatar, torrents, id, isLogged });
        } catch (err) {
            console.log(err);
            res.locals.error.push(errorMsg.serverErr.general);
            res.status(404).json({ message: [...res.locals.error], err, ...req.user });
        }
    },
    put: async function (req, res) {
        try {
            const updatedUserData = await User.findOneAndUpdate({ _id: req.user.id }, req.body, { returnOriginal: false });

            const { username, email, age, avatar, torrents, id = _id, isLogged = req.user.isLogged } = updatedUserData;

            const token = createJWT({ username, email, age, avatar, torrents, id, isLogged });
            res.cookie("uid", token);
            res.status(200).json(updatedUserData);
        } catch (err) {
            res.locals.error.push(errorMsg.serverErr.general);
            res.status(404).json({ message: [...res.locals.error], err });
        }
    }
}

module.exports = {
    register,
    login,
    logout,
    profile
}