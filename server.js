var bodyParser = require('body-parser');
var express = require("express");
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/travels');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

/* serves main page */
app.get("/", function(req, res) {
	res.sendfile('index.html')
});

app.post("/user/add", function(req, res) {
	/* some server side logic */
	res.send("OK");
});

/* serves all the static files */
app.get(/^(.+)$/, function(req, res) {
	console.log('static file request : ' + req.params);
	res.sendfile(__dirname + req.params[0]);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});

app.use(bodyParser.urlencoded({
	extended: true
}));

