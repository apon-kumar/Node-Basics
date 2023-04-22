var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://127.0.0.1:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-data', function(req, res, next){
  var resultArray = [];
  var flag = '';
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    var cursor = db.collection('user-data').find();
    if(cursor){
      cursor.forEach(function(doc, err){
        assert.equal(null, err);
        resultArray.push(doc);
      });
    } else{
      flag = 'no data fetched';
    }

    db.close();
  });
  if(flag == 'no data fetched'){
    res.render('index', {items: flag});
  }else{
    res.render('index', {items: resultArray});
  }
  
});

router.post('/insert', function(req, res, next){
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('user-data').insertOne(item, function(err, reault){
      assert.equal(null, err);
      console.log('Item Inserted.');
      db.close();
    });
  });

  res.redirect('/');
});

router.post('/update', function(req, res, next){
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });
});

router.post('/delete', function(req, res, next){
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item deleted');
      db.close();
    });
  });
});
// route.get()

module.exports = router;
