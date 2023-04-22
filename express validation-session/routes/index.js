var express = require('express');
var router = express.Router();
var { check, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index', { title: 'Form Validation', success: req.session.success, errors: req.session.errors });
});

router.post('/submit', function(req, res, next){
  check('email', 'Invalid Email address').isEmail();
  check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);

  var errors = validationResult(req);
  if(errors){
    req.session.errors = errors;
    req.session.success = false;
  } else{
    req.session.success = true
  }

  res.redirect('/');
});


// route.get()

module.exports = router;
