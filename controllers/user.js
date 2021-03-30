const { User } = require("../models/index");
const createJWT = require("../utils/auth");
const bcrypt = require("bcrypt");
const { errorMsg } = require("../config/proj-props");


const register = {
    post: async function (req, res) {
        const { username, email, password, age } = req.body;
        try {
            const suc = await User.create({ username, email, password, age });
            const token = createJWT({ id: suc._id, email, username, isLogged: true });

            res.cookie("uid", token, { SameSite: "None" });
            res.status(201).json({ id: suc._id, email, isLogged: true, username, email, password, age });
        } catch (err) {
            console.log(err);
            res.locals.error.push(errorMsg.userErr.emailUsed);
            res.status(400).json({ message: res.locals.error, err });
        }
    }
}

const login = {
    post: async function (req, res) {
        try {
            const dbRes = await User.findOne({ username: req.body.username });

            const { username, email, password, age, id = _id } = dbRes;
            const isRegistered = bcrypt.compareSync(req.body.password, dbRes.password);

            if (isRegistered === false) { throw new Error(isRegistered) };

            const token = createJWT({ username, email, password, age, id, isLogged: true });
            res.cookie("uid", token);
            res.status(200).json({ username, email, password, age, id });
        } catch (err) {
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

// const profile = {
//     put: async function (req, res) {
//         try {
//             const { firstName, lastName, email, id = _id, position, profilePic }
//                 = await User.findOneAndUpdate({ _id: req.user.id }, req.body, { returnOriginal: false });

//             const token = createJWT({ id, email, isLogged: true });
//             res.cookie("uid", token);
//             res.status(200).json({ firstName, lastName, email, id, position, profilePic });
//         } catch (err) {
//             res.locals.error.push(errorMsg.userErr.wrongCred);
//             res.status(404).json({ message: [...res.locals.error], err });
//         }
//     }
// }

module.exports = {
    register,
    login,
    logout,
    // profile
}