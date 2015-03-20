var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*GET contactlist page. */
router.get('/contactlist', function(req, res){
	var db = req.db;
	var collection = db.get('contacts');
	collection.find({},{limit:10, sort: [['last',1]]},function(e,docs){
		res.render('contactlist', {
			"contactlist" : docs
		});
	});
});



/*GET New User page. */
router.get('/newcontact', function(req,res){
	res.render('newcontact', { title: 'Add New Contact' });
});


/*Post to ADD Contact */
router.post('/addcontact', function(req, res){
	// Set our internal DB variable
	var db = req.db;

	// Get our form values. These rely on the "name" attributes
	var userFirst = req.body.first;
	var userLast = req.body.last;
	var userTitle = req.body.titl; 
	var userCompany = req.body.company;
	var userMet = req.body.met;
	var userDate = req.body.date;
	var userEmail = req.body.email;
	var userComment = req.body.comment; 

	// Set our collection
	var collection = db.get('contacts');

	//Submit to the DB
	collection.insert({
		"first" : userFirst,
		"last" : userLast,
		"title" : userTitle,
		"company" : userCompany,
		"met" : userMet,
		"date" : userDate,
		"email" : userEmail,
		"comments" : userComment
	}, function (err, doc){
		if (err) {
			//if it failed, retur error
			res.send("There was a problem adding");

		}
		else{
			//if worked, set bar so it doesn't say /addcontact
			res.location("contactlist");
			// ANd forward to Succes page
			res.redirect("contactlist");
		}
	});
	
});

/*DELETE CONTACT*/
router.get('/deletecontact/:id', function(req, res){
	var db = req.db;
	var collection = db.get('contacts');
	collection.findOne({_id:req.params.id}, function(e,contact){
		res.render('deletecontact', {
			"contacts":contact
			});
	});
});

router.post('/deletecontact/:id', function(req,res){
	var db = req.db;
	var collection = db.get('contacts');
	

collection.remove(
	{
		"_id" : req.params.id}, function (err, doc){
		if (err) {
			//if it failed, retur error
			res.send("There was a problem adding");

		}
		else{
			//if worked, set bar so it doesn't say /addcontact
			res.location("contactlist");
			// ANd forward to Succes page
			res.redirect("/contactlist");
		}
	});
});

/*UPDATE CONTACT*/



router.get('/updatecontact/:id', function(req, res){
	var db = req.db;
	var collection = db.get('contacts');
	collection.findOne({_id:req.params.id,}, function(e,contact){
		res.render('updatecontact', {
			"contacts":contact
						});
	});
});
			
router.post('/updatecontact/:id', function(req,res){
	var db = req.db;
	var collection = db.get('contacts');


var first = req.body.first;
var last = req.body.last;
var titl = req.body.titl;
var company = req.body.company;
var met = req.body.met;
var date = req.body.date;
var email = req.body.email;
var comments = req.body.comments;

collection.update({_id: req.params.id},{
first: first,
last: last,
title: titl,
company: company,
met: met,
date: date,
email: email,
comments: comments

	
}, function (err, doc){
		if (err) {
			//if it failed, retur error
			res.send("There was a problem adding");

		}
		else{
			//if worked, set bar so it doesn't say /addcontact
			res.location("contactlist");
			// ANd forward to Succes page
			res.redirect("/contactlist");
		}
	});
});




		







module.exports = router;