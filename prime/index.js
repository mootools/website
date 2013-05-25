"use strict";

var docs = require('./docs');
var guides = require('../middleware/guides')('prime', {
	title: "MooTools Prime Guides"
});

module.exports = function(app){

	var prime = function(req, res, next){
		res.locals.site = 'prime';
		next();
	};

	app.get('/prime', prime, function(req, res){
		res.render('prime/index', {
			page: "/prime",
			title: "MooTools Prime"
		});
	});

	app.get('/prime/docs', prime, docs);
	app.get('/prime/docs/:version', prime, docs);

	app.get('/prime/guides', prime, guides.index);
	app.get('/prime/guide/:guide', prime, guides.article);

};
