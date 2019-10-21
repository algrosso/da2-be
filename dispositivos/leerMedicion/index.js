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

routerDispositivos.get("./:id", function(req, res) {
            console.log("Ruter Dispositivos Medicion " + req.params.id);
            if (isNaN(req.params.id)) {
                console.log("par'ametro inv'alido");
                res.send(-1);
            } else {
                db.query("SELECT valor FROM Mediciones WHERE dispositivoId=? ORDER BY fecha DESC LIMIT 1", [req.params.id], function(err, result) {
                    if (err) {
                        throw err;
                    }
                    res.send(result);
                });
                //    }
            });