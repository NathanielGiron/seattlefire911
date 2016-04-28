var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res) {
  res.render('register', {alerts: req.flash()});
});

router.post('/', function(req, res) {
  db.user.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
  	if(created) {
  		req.session.userId = user.id;
  		req.flash('success', 'Successfully Registered! Please Login')
    	res.redirect('/');
    } else {
    	req.flash('danger', 'Email already taken. Please choose another.')
    	res.redirect('/register');
    }
    

  }).catch(function(err) {
    res.send(err);
  });
});

module.exports = router;