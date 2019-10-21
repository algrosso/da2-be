var mongoClient = require("mongodb").mongoClient;

mongoClient.connection(function(err, db) {
    if (err) {
        throw err;
    }
    //console.log("connection id " + connection.threadId);
    db.collection("Usuarios").find().toArray(function(err, result) {
        if (err) {
            throw err;
        }
        console.log(result);
    })
});
module.exports = mongoClient;