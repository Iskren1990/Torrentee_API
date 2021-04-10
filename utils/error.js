function errCtn(req, res, next) {
    res.locals.error === [] ? true : res.locals.error = [];
    next();
}

function globalErrorHandler(err, req, res, next) {
    
    const body = { ...req.user, ...req.body, err, message: res.locals.error};
    // console.log("Global error: ", err);
    if (!res.headersSent) {
        res.status(500)
    }

    res.json(body);
}

module.exports = {
    errCtn,
    globalErrorHandler,
}
