var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send('welcome to seattle 911!');
});

var port = 3000;
app.listen(port, function() {
	console.log("You're listening to smooth sounds of port " + port);
});