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
    res.redirect('/');
  }).catch(function(err) {
    res.send(err);
  });
});

module.exports = router;