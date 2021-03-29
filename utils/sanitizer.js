function objTrimmer(obj) {
    const sanitizedObj = Object.assign({}, obj);

    Object.keys(obj).forEach(key => {
        if (sanitizedObj[key] === "string") sanitizedObj[key].trim()
    });

    return sanitizedObj;
}

module.exports = {
    objTrimmer,
}