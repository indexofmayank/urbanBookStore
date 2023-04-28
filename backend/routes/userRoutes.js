const express = require("express");
const router = express.Router();
const db = require("../db");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const bcrypt = require("bcryptjs");
const ErrorHandler = require("../utils/errorhander");
const jwt = require("jsonwebtoken");


//Route to get all users
router.get(`/`, catchAsyncErrors(async(req, res, next) => {
    const q = "SELECT * FROM users";
    db.query(q, (err, data) => {
        if(err){
            console.log(err);
            return next(new ErrorHandler("Something went wrong while getting all users"));
        }

        return res.json(data);
    });
}));


//Route to create user
router.post(`/register`, catchAsyncErrors(async (req, res, next) => {

    //checking where user is already registered with given email id
    const {name, email, password} = req.body;
    db.query("SELECT email from users WHERE email = ?", email,  (err, results) => {
        if(err) {
            console.log(err);
        }else {
            if(results.length > 0) {
                return next(new ErrorHandler("The email iD is already in use"));
            }
        }
    });

    let hashedPassword = await bcrypt.hash(password, 8);

     q = "INSERT INTO users(`name`, `email`, `password`) VALUES (?, ?, ?) ";

    db.query(q, [name, email, hashedPassword], (err, data) => {
        if(err) {
            console.log(err);
            return next(new ErrorHandler("Something went wrong while Registrating user"));
        }
        
        //creating token and storing in cookie
        const id = data.id
        const token = jwt.sign({ id }, "mayank", {
            expiresIn: 3,
        });
    
        const cookieOptions = {
            expires: new Date(
                Date.now() + 5 * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        }

        res.cookie('userSave', token, cookieOptions);
        res.json(data);
    })
}))

//Route to login
router.post(`/login`, catchAsyncErrors(async ( req, res, next) => {
    let user = "";
    const {email, password} = req.body;
    if(!email || !password) {
        return next(new ErrorHandler("Please provide Email Id and Password"));
    }
    
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
       
        if(!results || ! await bcrypt.compare(password, results[0].password)){
            return next(new ErrorHandler("Email or Password is incorrect"));
        }else {
            const id = results[0].id;
            user = results[0].name;
            const token = jwt.sign({ id }, "mayank", {
                expiresIn: 3,
            });
        
            const cookieOptions = {
                expires: new Date(
                    Date.now() + 5 * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            }
             
            res.cookie('userSave', token, cookieOptions);
            res.json({user});
        }
    })
}))





//Route to logout
router.get(`/logout`, catchAsyncErrors(async(req, res, next) => {
    res.cookie('userSave', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.json("Logged out");
}))









router.get(`/test`, catchAsyncErrors(async ( req, res, next) => {
    res.json("Working inside the user-routes");
}));



module.exports = router;