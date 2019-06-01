var express = require('express');
// var mysql = require('mysql');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api', function(req, res, next) {
	res.render('index', {title: "Choose a Database to access"});
})

router.get('/offences', function(req,res,next) {
	req.db.from('offence_columns').distinct('*')
		.then((rows) => {
			res.json({"Error": false, "Message" : "Success", "Offences" : rows});
		})
		.catch((err) => {
			res.json({"Error": true, "Message": "Error executing MySQL query"});
		})
})

router.get('/:Param', function(req,res,next) {
	req.db.from('offences').distinct(req.params.Param)
		.then((rows) => {
			res.json({"Error": false, "Message" : "Success", "Offences" : rows});
		})
		.catch((err) => {
			res.json({"Error": true, "Message": "Error executing MySQL query"});
		})
})


router.get('/search?offence=:Param', function(req, res, next) {
	req.db.select(req.params.Param, 'area').from('offences').groupBy('area')
		.then((rows) => {
			res.json({"Error": false, "Message" : "Success", "result" : rows});
		})
		.catch((err) => {
			res.json({"Error": true, "Message": "Error executing MySQL query"});
		})
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
