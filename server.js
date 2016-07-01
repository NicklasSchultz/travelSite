"use strict";
var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/travels');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Server -> Connected to database: travels');
});

var Trip = require("./data/models/TravelScema").Trip;

/* serves main page */
app.get("/", function(req, res) {
	res.sendfile('index.html');
});

/* serves all the static files */
app.get(/^(.+)$/, function(req, res) {
	console.log('static file request : ' + req.params);
	res.sendfile(__dirname + req.params[0]);
});

app.listen(port, function() {
	console.log("Open localhost:5000 in a browser and observe the awsomeness " + port);
});

app.use(bodyParser.urlencoded({
	extended: true
}));

