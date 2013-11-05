"use strict";

var docs = require('../middleware/docs')('slick', {
	title: "MooTools Slick Documentation"
});

var guides = require('../middleware/guides')('slick', {
	title: "MooTools Slick Guides"
});

module.exports = function(app){

	var slick = function(req, res, next){
		res.locals.site = 'slick';
		next();
	};

	app.get('/slick', slick, function(req, res){
		res.render('slick/index', {
			page: "/slick",
			title: "MooTools Slick"
		});
	});

	app.get('/slick/docs', slick, docs);
	app.get('/slick/docs/:version', slick, docs);

};
