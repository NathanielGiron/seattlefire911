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
      req.flash('success', 'Successfully logged in.');
      res.redirect('/');
    } else {
      req.flash('danger','User and/or password invalid!');
      res.redirect('/login');
    }
  });
});

router.get('/logout', function(req, res){
  req.session.user = false;
  req.currentUser = false;
  res.locals.currentUser = false;
  req.flash('success', 'You have sucessfully logged out.');
  res.redirect('/');
});

module.exports = router;