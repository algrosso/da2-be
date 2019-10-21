var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: "3306",
    //password: "userpass",
    user: "root"
});

connection.connect(function(err, db) {
    if (err) {
        throw err;
    }
    console.log("connection id " + connection.threadId);
});
module.exports = connection;