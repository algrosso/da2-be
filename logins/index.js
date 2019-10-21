var express = require("express");
var routerLogins = express.Router();
var db = require("../mysql");

//-----------------------------------------
//-- uso del cors                        --
//-----------------------------------------
var cors = require("cors");
var corsOptions = {
    origin: "*", //permito el acceso a todos
    optionSuccessStatus: 200 // devuelvo status OK.
};

// construyo un middleware para inicializar las option del cors
routerLogins.use(cors(corsOptions));

routerLogins.get("/", function(req, res) {
    console.log("Ruter Logins");
    db.query("SELECT * FROM tpdaii.Log_Riegos", function(err, result) {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

routerLogins.get("/:id", function(req, res) {
    console.log("Ruter Logins del sensor  " + req.params.id);
    if (isNaN(req.params.id)) {
        console.log("Espero un id");
        res.send("Espero un id");
    } else {
        db.query("SELECT * FROM tpdaii.Log_Riegos WHERE electrovalvulaId=?", [req.params.id], function(err, result) {
            if (err) {
                throw err;
            }
            res.send(result);
        });
    }
});

routerLogins.post("/", function(req, res) {
    console.log("Ruter Logins post  " + req.body);
    if (isNaN(req.body.electrovalvulaId)) {
        console.log("Espero un id");
        res.send("Espero un id");
    } else {
        var now = new Date();
        var jsonDate = now.toJSON();
        var t = new Date(jsonDate);
        console.log(req.body.apertura, t, now);
        console.log(jsonDate, req.body.electrovalvulaId);
        db.query("INSERT INTO tpdaii.Log_Riegos (apertura, fecha, electrovalvulaId) VALUES (?,?,?);", [req.body.apertura, t, req.body.electrovalvulaId], function(err, result) {
            if (err) {
                throw err;
            }
            res.send(result);
        });
    }
});

module.exports = routerLogins;