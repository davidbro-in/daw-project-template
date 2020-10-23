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
    db_conn.query('SELECT * FROM Devices WHERE id=?', [req.params.id], function(err, respuesta) {
        if (err) {
            res.send(err).status(500);
            return;
        }
        res.send(respuesta);
    });
});

app.put('/devices/:id', function(req, res, next) {
    console.log("Editar dispositivo: " + req.params.id);
    console.log("Name: " + req.body.name);
    let state;
    if (req.body.state == true) {
        state = 1;
    } else {
        state = 0;
    }
    console.log("State: " + req.body.state);
    console.log("State: " + state);
    if (req.body.name != undefined && req.body.description != undefined && req.body.type != undefined) {
        db_conn.query('UPDATE Devices SET state=?, name=?, description=?, type=? WHERE id=?', [state, req.body.name, req.body.description, req.body.type, req.params.id], function(err, respuesta) {
            if (err) {
                res.send(err).status(500);
                return;
            }
            res.send(respuesta);
        });
    } else {
        db_conn.query('UPDATE Devices SET state=? WHERE id=?', [state, req.params.id], function(err, respuesta) {
            if (err) {
                res.send(err).status(500);
                return;
            }
            res.send(respuesta);
        });
    }
});

app.get('/devices', function(req, res, next) {
    console.log("Consultando dispositivos");
    db_conn.query('SELECT * FROM Devices ORDER BY id DESC', function(err, respuesta) {
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