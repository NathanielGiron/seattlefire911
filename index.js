var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');

var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'))

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/about', function(req, res) {
	res.render('about');
});

app.get('/calls', function(req, res) {

	request('https://data.seattle.gov/resource/grwu-wqtk.json?$$app_token=dBK5bIxAg9J3pBe4V92wmtfeS', function(err, response, body) {
		var dataObj = JSON.parse(body);
		if(!err && response.statusCode === 200) {
			res.render('calls', {calls: dataObj});
		} else {
			res.render('error');
		}
	});
});

var port = 3000;
app.listen(port, function() {
	console.log("You're listening to smooth sounds of port " + port);
});