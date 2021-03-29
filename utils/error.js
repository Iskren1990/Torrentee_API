function errCtn(req, res, next) {
    res.locals.error === [] ? true : res.locals.error = [];
    next();
}

function globalErrorHandler(err, req, res, next) {
    
    const body = { ...req.user, ...req.body, message: res.locals.error};
    console.log("Global error: ", err);
    res.status(500).json(body);
}

module.exports = {
    errCtn,
    globalErrorHandler,
}
