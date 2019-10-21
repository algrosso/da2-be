var express = require("express");
var routerDispositivos = express.Router();
var db = require("../mysql");

//-----------------------------------------|
//-- uso del cors                        --
//-----------------------------------------
var cors = require("cors");
var corsOptions = {
    origin: "*", //permito el acceso a todos
    optionSuccessStatus: 200 // devuelvo status OK.
};
// construyo un middleware para inicializar las option del cors
routerDispositivos.use(cors(corsOptions));


routerDispositivos.get("/", function(req, res) {
    console.log("Ruter Dispositivos get /");
    //console.log(collection);
    db.query("SELECT * FROM tpdaii.Dispositivos", function(err, result) {
        if (err) {
            throw err;
        }
        //console.log(result);
        res.send(result);
    });
});

routerDispositivos.get("/leerMedicion/:id", function(req, res) {
    console.log("Ruter Dispositivos Medicion " + req.params.id);
    if (isNaN(req.params.id)) {
        console.log("par'ametro inv'alido");
        res.send(null);
    } else {
        db.query("SELECT valor FROM tpdaii.Mediciones WHERE dispositivoId=? ORDER BY fecha DESC LIMIT 1", [req.params.id], function(err, result) {
            if (err) {
                throw err;
            }
            res.send(result);
        });
    }
});

routerDispositivos.get("/:id", function(req, res) {
    console.log("Ruter Dispositivos parametros " + req.params.id);
    if (isNaN(req.params.id)) {
        console.log("par'ametro inv'alido");
        res.send("Espero un id");
    } else {
        db.query("SELECT * FROM tpdaii.Dispositivos WHERE dispositivoId=?", [req.params.id], function(err, result) {
            if (err) {
                throw err;
            }
            res.send(result);
        });
    }
});

module.exports = routerDispositivos;