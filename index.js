var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var db = require('./models');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');

var registerCtrl = require('./controllers/register');
var loginCtrl = require('./controllers/login');

var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + '/static'));
app.use(flash());

app.use(session({
  secret: 'dsalkfjasdflkjgdfblknbadiadsnkl',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  if (req.session.userId) {
    db.user.findById(req.session.userId).then(function(user) {
      req.currentUser = user;
      res.locals.currentUser = user;
      next();
    });
  } else {
    req.currentUser = false;
    res.locals.currentUser = false;
    next();
  }
});

app.use('/register', registerCtrl);
app.use('/login', loginCtrl);

app.get('/', function(req, res) {
	res.render('index', {alerts: req.flash()});
});

app.get('/calls', function(req, res) {

	request('https://data.seattle.gov/resource/grwu-wqtk.json?$limit=500&$$app_token=' + process.env.SOCRATA_TOKEN, function(err, response, body) {
		var dataObj = JSON.parse(body);
		if(!err && response.statusCode === 200) {
			res.render('calls', {calls: dataObj});
		} else {
			res.render('error');
		}
	});
});

app.get('/flags', function(req, res) {
	if (req.currentUser) {
		db.flag.findAll({where: {userId: req.session.userId}}).then(function(flags) {
			res.render('flags', {flags: flags})
		});
	} else {
		req.flash('danger', 'You must be logged in.');
		res.redirect('/');

	}
});

app.post('/flags', function(req, res) {
	var newFlag = req.body;

	console.log(newFlag);

	db.flag.create(newFlag).then(function(flag) {
		req.currentUser.addFlag(flag);
		console.log('newFlag')
		res.status(200).send(flag);
	});
});

app.get('/about', function(req, res) {
	res.render('about');
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("You're listening to smooth sounds of port " + port);
});