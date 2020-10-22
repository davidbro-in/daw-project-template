/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main backend file
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================

var PORT = 3000;

var express = require('express');
var app = express();
var mysql = require('./mysql-connector');

// to parse application/json
app.use(express.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));

var db_conn = require('./mysql-connector');

//=======[ Main module code ]==================================================

app.get('/devices/:id', function(req, res, next) {
    let id = req.params.id;
    response = `{ 'key1':${id} }`
    res.send(JSON.stringify(response)).status(200);
});

app.get('/devices', function(req, res, next) {
    db_conn.query('SELECT * FROM Devices', function(err, respuesta) {
        if (err) {
            res.send(err).status(500);
            return;
        }
        res.send(respuesta);
    });
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================