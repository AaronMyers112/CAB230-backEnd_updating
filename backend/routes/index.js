var express = require('express');
var mysql = require('mysql');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api', function(req, res, next) {
	res.render('index', {title: "Choose a Database to access"});
})

router.get('/offences', function(req, res, next) {
	var query = "SELECT * FROM ??";
	var table = ["offence_columns"];
	query = mysql.format(query, table);
	req.db.query(query, function(err, rows) {
		if(err) {
			res.json({"Error": true, "Message": "Error executing MySQL query"});
		} else {
			res.json({"Error": false, "Message" : "Success", "Offences" : rows});
		}
	});
});

router.get('/:Param', function(req,res,next) {
	let query = "SELECT DISTINCT ?? FROM ??";
	let parameter = req.params.Param;
	let table = [parameter, "offences"];
	console.log(parameter);
	query = mysql.format(query, table);
	req.db.query(query, function(err, rows) {
		if (err) {
			res.json({"Error": true, "Message": "Error executing query"});
		} else {
			res.json({"Error": false, "Message": "Success", parameter: rows});
		}
	})
})

router.get(/search/, function(req, res, next) {
	res.render('index', {title: "Search function under development"});
})

// router.get('/search', function(req,res,next) {
// 	res.json({"Error": true, "Message": "Seems like you forgot the offences parameter"});
// });

// router.get('./search?offence=:Offence', function(req,res,next) {
// 	var query = "SELECT pretty FROM ?? "
// 	var table = ["offences"];
// 	query = mysql.format(query, table, req.params.Offence);
// 	req.db.query(query, function(err, rows) {
// 		if(err) {
// 			res.json({"Error": true, "Message": "Error executing MySQL query"});
// 		} else {
// 			res.json({"Error": false, "Message" : "Success", "Offences" : rows});
// 		}
// 	})
// });



module.exports = router;
