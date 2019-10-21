var express = require("express");
var routerElvalvulas = express.Router();
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
routerElvalvulas.use(cors(corsOptions));

routerElvalvulas.get("/", function(req, res) {
    console.log("Ruter electro valvulas");
    db.query("SELECT * FROM tpdaii.Electrovalvulas", function(err, result) {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

routerElvalvulas.get("/:id", function(req, res) {
    console.log("Ruter electro valvulas con par'ametros " + req.params.id);
    if (isNaN(req.params.id)) {
        console.log("Espero un id");
        res.send("Espero un id");
    } else {
        db.query("SELECT * FROM tpdaii.Electrovalvulas WHERE electrovalvulaId=?", [req.params.id], function(err, result) {
            if (err) {
                throw err;
            }
            res.send(result);
        });
    }
});

module.exports = routerElvalvulas;