"use strict";
var bodyParser = require('body-parser');
var express = require("express");
var mongoose = require('mongoose');
var fileSystem = require('fs');
var port = process.env.PORT || 5000;
var app = express();
var contentDir = 'data/texts';
// Connect to database
mongoose.connect('mongodb://localhost/travels');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Server -> Connected to database: travels');
});
// Database connection is setup
var _getAllFilesFromFolder = function(dir) {

    var results = [];

    fileSystem.readdirSync(dir).forEach(function(file) {
    	console.error(file);
        file = dir+'/'+file;
        var stat = fileSystem.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file));
        } else results.push(file);

    });

    return results;

};

var imgs = _getAllFilesFromFolder('data/imgs/poc');
console.log(JSON.stringify(imgs));

var sections;
// Fetch the mongoose schema
var Trip = require("./data/models/TravelScema").Trip;
// Fetch all the trips from the database
Trip.find({}, function(err, data) {
	sections = data;
});

/* serves main page */
app.get("/", function(req, res) {
	res.sendfile('index.html');
});

app.get("/sections", function(req, res) {
	res.send(sections);
});

app.get("/content", function(req, res) {
    var id = req.query.id;
    console.log( req.query);
    res.sendfile(contentDir + '/' + id + '/contentPage.html');
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

