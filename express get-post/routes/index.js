var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', condition: false, anArray: ['one', 'two', 'three']});
});

router.get('/test/:id', function(req, res, next){
  res.render('test', {output: req.params.id});
});

router.post('/test/submit/', function(req, res, next){
  var id = req.body.id;
  res.redirect('/test/' + id);
});

// route.get()

module.exports = router;
