var express = require('express');
// var mysql = require('mysql');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api', function(req, res, next) {
	res.render('index', {title: "Choose a Database to access"});
});

router.get('/offences', function(req,res,next) {
	req.db.from('offence_columns').distinct('*')
		.then((rows) => {
			res.json({"Error": false, "Message" : "Success", "Offences" : rows});
		})
		.catch((err) => {
			res.json({"Error": true, "Message": "Error executing MySQL query"});
		})
});

router.get('/search?', function(req, res, next) {
	let p = req.params.Param;
	let query = req.db.select('area').sum({total: req.query.offence}).from('offences').groupBy('area')
	if(req.query.area && req.query.area != ""){
		query.where('area', req.query.area);
	}
	if(req.query.age && req.query.age != "")
	{
		query.where('age', req.query.age);
	}
	if(req.query.gender && req.query.gender != "")
	{
		query.where('gender', req.query.gender);
	}
	if(req.query.year && req.query.year != "")
	{
		query.where('year', req.query.year);
	}
	if(req.query.month && req.query.month != ""){
		query.where('month', req.query.month);
	}
	console.log(req.query);
	// req.db.select('area').sum({total: req.query.offence}).from('offences').where('area','like',req.query.area).groupBy('area')
		query.then((rows) => {
			res.json({"Error": false, "Message" : "Success", "result" : rows});
		})
		.catch((err) => {
			res.json({"Error": true, "Message": "Error executing MySQL query", "Param": req.params.Param});
		})
});

router.get('/:Param', function(req,res,next) {
	console.log(req.query);
	req.db.from('offences').distinct(req.params.Param)
		.then((rows) => {
			res.json({"Error": false, "Message" : "Success", "Offences" : rows});
		})
		.catch((err) => {
			res.json({"Error": true, "Message": "Error executing MySQL query"});
		})
});

module.exports = router;
