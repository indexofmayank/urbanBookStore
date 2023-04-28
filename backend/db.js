const mysql = require("mysql");

//connecting mysql database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mayankdev",
    database: "test"
});

module.exports = db;