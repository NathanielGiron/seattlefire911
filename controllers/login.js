var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res) {
  res.render('login', {alerts: req.flash()});
});

router.post('/', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  db.user.authenticate(email, password, function(err, user) {
    if (err) {
      res.send(err);
    } else if (user) {
      req.session.userId = user.id;
      res.redirect('/');
    } else {
      res.send('User and/or password invalid!');
    }
  });
});

router.get('/logout', function(req, res){
  req.session.user = false;
  req.flash('logged', 'You have sucessfully logged out.');
  res.redirect('/');
});

module.exports = router;