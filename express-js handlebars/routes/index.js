var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', condition: false, anArray: ['one', 'two', 'three']});
});

module.exports = router;
