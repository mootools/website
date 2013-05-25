"use strict";

var docs = require('./docs');

module.exports = function(app){

	var elements = function(req, res, next){
		res.locals.site = 'elements';
		next();
	};

	app.get('/elements', elements, function(req, res){
		res.render('elements/index', {
			page: "/elements",
			title: "MooTools Elements"
		});
	});

	app.get('/elements/docs', elements, docs);
	app.get('/elements/docs/:version', elements, docs);

};
