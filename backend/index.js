const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

//using to dotenv to config env var in developing mode
if(process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({path: "backend/.env"});
}


//using express to create app
const app = express();


//using middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

//Importing Router from /routes/
const booksRouter = require("./routes/bookRoutes");
const usersRouter = require("./routes/userRoutes");
const testRouter = require("./routes/testRoute");



//Using Router to app.use
app.use(`/books`, booksRouter);
app.use(`/users`, usersRouter);
app.use(`/test`, testRouter);


//for testing purpose
app.get(`/`, (req, res) => {
    res.json("hello");
});


//listening app on PORT 8800 dotenv config but not working
app.listen(8800, () => {
    console.log("Connected to backend: http://localhost:8800");
});

module.exports = app;