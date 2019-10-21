//-----------------------------//
//-- Esto es solo java scrip --//
//-- Levanta una API usando  --//
//-- un middleware ruteador  --//
//-----------------------------//

var express = require("express"); // con esto cargamos la biblioteca express.
var app = express(); // crea una aplicacion express
//var mongoClient = require("mongodb").MongoClient;

var dispositivos = require("./dispositivos");
var elvalvulas = require("./elvalvulas");
var mediciones = require("./mediciones");
var log_riego = require("./logins");
var connection = require("./mysql");

app.use(express.json()); //Middleware 
app.use("/dispositivos", dispositivos); //Middleware router
app.use("/elvalvulas", elvalvulas); //Middleware router
app.use("/mediciones", mediciones); //Middleware router
app.use("/logins", log_riego); //Middleware router

//-----------------------------//
//-- Funci'on del Middleware --//
//-----------------------------//

app.get("/", function(req, res) {
    console.log("Respuesa al requerimiento GET");
    connection.query("SELECT * FROM tpdaii.Dispositivos", function(err, result, fields) {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send(result);
    });
});

//app.post("/", function(req, res) {
//    console.log("requerimiento post al /");
//    console.log(req.body);
//    console.log(req.body.id);
//    res.json(req.body);
//});

//app.all("/", function(req, res) {
//    console.log("requerimento all al /");
//    res.send(null);
//});
app.listen(3500, function(req, res) {
    console.log("API levantada en el puerto 3500");
});