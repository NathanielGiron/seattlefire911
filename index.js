var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var db = require('./models');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
	res.render('index');
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

app.get('/flags', function(req, res) {
	db.flag.findAll().then(function(flags) {
		res.render('flags', {flags: flags})
	});
});

app.post('/flags', function(req, res) {
	var newFlag = req.body;

	console.log(newFlag);

	db.flag.create(newFlag).then(function() {
		res.status(200).send('Flagged Item.');
	});
});

app.get('/about', function(req, res) {
	res.render('about');
});

//-----AUTHENTICATION----->
app.get('/register', function(req, res) {
	res.render('register');
});

app.get('/login', function(req, res) {
	res.render('login');
});

var port = 3000;
app.listen(port, function() {
	console.log("You're listening to smooth sounds of port " + port);
});