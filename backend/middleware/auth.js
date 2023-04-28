const db = require('../db');
const catctAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const ErrorHander = require("../utils/errorhander");

exports.isAuthenticatedUser = catctAsyncErrors(async(req, res, next) => {
    const {token} = req.cookies;

    if(!token) {
        return next(new ErrorHander("Please Login to access this resource"));
    }

    const decodedData = jwt.verify(token, "mayank");

    db.query("SELECT * FROM users WHERE id = ?", [decodedData], (err, user) => {
        if(err){
            console.log(err);
            return next(new ErrorHander("Something went wrong while autheticating you"));
        }

        req.user = user;
    });
    next();
});
