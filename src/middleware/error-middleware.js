const HttpsError = require("../errors/HttpsError");

module.exports = (err, req, res, next) => {
    if (err) {
        if (err instanceof HttpsError){
            res.status(err.statusCode).json({ message: err.message });
        } else {
            res.status(400).json({ message: err.message });
        }
    }else { next() };
}