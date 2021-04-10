const jwt = require("jsonwebtoken");
const { key } = require("../config/variables");
const { errorMsg } = require("../config/proj-messages");
const {JWTReniew} = require("../utils/auth");

function guestUserStop(req, res, next) {
    if (req.user.isLogged === false) {
        res.status(401);
        res.locals.error.push(errorMsg.userErr.notLogged);
        next({ message: errorMsg.userErr.notLogged });
        return;
    }

    next();
}

function loggedUserStop(req, res, next) {
    
    if (req.user.isLogged === true) {
        res.status(400);
        res.locals.error.push(errorMsg.userErr.loggedUser);
        next({message: errorMsg.userErr.loggedUser });
        return;
    }

    next();
}

function userStatus(req, res, next) {
    const status = req.cookies.uid;

    if (status === undefined) {
        req.user = { isLogged: false };
    } else {
        req.user = jwt.verify(status, key, (err, suc) => {
            if (err) {
                res.clearCookie("uid");
                return { isLogged: false };
            };
            JWTReniew(suc, 1);
            delete suc.iat;
            delete suc.exp;
            suc.isLogged = true;
            
            return suc;
        });
    }
    next();
}




module.exports = {
    guestUserStop,
    loggedUserStop,
    userStatus
}