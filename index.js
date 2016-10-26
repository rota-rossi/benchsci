var express = require('express')
var mongo = require('mongodb')
var MongoClient = mongo.MongoClient
var bodyParser = require('body-parser')
var assert = require('assert')
var app = express()

app.use(express.static('public'))
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


var url = 'mongodb://benchsci:MAZNObi5mCop@ds031965.mlab.com:31965/bench-sci';
MongoClient.connect(url, function(err, db) {

  app.get('/', function(req, res) {
  	res.render ('index')
  })

  app.get('/publications', function(req, res) {
    var skipPage = (req.query.page - 1 || 0) * 20
    db.collection('MockData').find({}).sort({name:1}).limit(20).skip(skipPage).toArray(function(err, arr){
      assert.equal(null, err)
      db.collection('MockData').count({},function(err, total) {
        assert.equal(null, err)
        var results = {
          totalItems: total,
          queryString: null,
          results: arr
        }
        res.send(results)
      })
    })
  })

  app.get('/publications/:id', function(req, res) {
    db.collection('MockData').findOne({_id:req.params.id}, function(err, document){
      assert.equal(null, err)
      var result = {
          item: document
        }
      res.send(result)
    })
  })

  app.get('/graph', function(req, res) {
    var queryString = req.query.q
    db.collection('MockData').aggregate([
      { $match: {"gene": queryString } },
      { $unwind: { path: '$technique_group' } },
      { $group: { _id: '$technique_group', count: {$sum: 1} } }
    ], function(err, data) {
        assert.equal(null, err)
        res.send(data)
    })
  })

  app.get('/search', function(req, res){
    var queryString = req.query.q
    var skipPage = (req.query.page - 1 || 0) * 20
    db.collection('MockData').find({gene: queryString}).sort({name:1}).limit(20).skip(skipPage).toArray(function(err, arr){
      assert.equal(null, err)
      db.collection('MockData').count({gene: queryString},function(err, total) {
        assert.equal(null, err)
        var results = {
          totalItems: total,
          queryString: queryString,
          results: arr
        }
        res.send(results)
      })
    })
  })
})

app.listen(3000,function() {
	console.log("Starting on port 3000")
})
