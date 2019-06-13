var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET requests to API
// Returns a list of all the offence rows
router.get('/offences', function(req,res,next) {
	req.db.from('offence_columns').distinct('*')
		.then((rows) => {
			res.json({"Error": false, "Message" : "Success", "Offences" : rows});
		})
		.catch((err) => {
			res.status(400).json({"Error": true, "Message": "Error executing MySQL query"})
		})
});

// Implements the search function without JWT authorization
router.get('/search?', function(req, res, next) {
	if( !req.query.offences ){
		res.status(400).json({message: `oops! it looks like you're missing the offence query parm`})
		throw new Error('OFFENCES');
	}
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
			res.json({"Error": true, "Message": "Error executing MySQL query"});
		})
});

// checks for requests asking for specific data
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


// Post Requests
// checks for a register request
router.post('/register', function(req,res,next) {
	res.status(400).json({message: `oops! It looks like that user already exists :(`})
});
// checks for a login request
router.post('/login', function(req,res,next) {
	res.status(401).json({message: `invalid login - bad password`})
});

module.exports = router;
