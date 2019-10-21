var express = require("express");
var routerMediciones = express.Router();
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
routerMediciones.use(cors(corsOptions));

routerMediciones.get("/", function(req, res) {
    console.log("Ruter Mediciones");
    db.query("SELECT * FROM tpdaii.Mediciones", function(err, result) {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

routerMediciones.get("/:id", function(req, res) {
    console.log("Ruter Mediciones del sensor  " + req.params.id);
    if (isNaN(req.params.id)) {
        console.log("Espero un id");
        res.send("Espero un id");
    } else {
        db.query("SELECT * FROM tpdaii.Mediciones WHERE dispositivoId=?", [req.params.id], function(err, result) {
            if (err) {
                throw err;
            }
            res.send(result);
        });
    }
});
routerMediciones.post("/", function(req, res) {
    console.log("Ruter medicion post  " + req.body);
    if (isNaN(req.body.dispositivoId)) {
        console.log("Espero un id");
        res.send("Espero un id");
    } else {
        var now = new Date();
        var jsonDate = now.toJSON();
        var t = new Date(jsonDate);
        console.log(req.body.apertura, t, now);
        console.log(jsonDate, req.body.electrovalvulaId);
        db.query("INSERT INTO tpdaii.Mediciones (fecha, valor, dispositivoId) VALUES (?,?,?);", [t, req.body.valor, req.body.dispositivoId], function(err, result) {
            if (err) {
                throw err;
            }
            res.send(result);
        });
    }
});

module.exports = routerMediciones;