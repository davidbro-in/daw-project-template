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
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var mysql = require('./mysql-connector');

// to parse application/json
app.use(express.json());
// for parsing multipart/form-data
app.use(upload.array());
// to serve static files
app.use(express.static('/home/node/app/static/'));

var db_conn = require('./mysql-connector');

//=======[ Main module code ]==================================================

app.get('/devices/:id', function(req, res, next) {
    db_conn.query('SELECT * FROM Devices WHERE id=?', [req.params.id], function(err, respuesta) {
        if (err) {
            res.send(err).status(500);
            return;
        }
        res.send(respuesta);
    });
});

app.put('/devices/:id', function(req, res, next) {
    let state;
    if (req.query.state == "true") {
        state = 1;
    } else {
        state = 0;
    }
    db_conn.query('UPDATE Devices SET state=? WHERE id=?', [state, req.params.id], function(err, respuesta) {
        if (err) {
            res.send(err).status(500);
            return;
        }
        res.send(respuesta);
    });
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

app.post('/devices', function(req, res, next) {
    console.log(req.body);
    db_conn.query('INSERT INTO Devices (name, description, type, state) VALUES (?, ?, ?, 0)', [req.body.name, req.body.description, req.body.type],
        function(err, respuesta) {
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