"use strict";

var docs = require('../middleware/docs')('core', {
	title: "MooTools Core Documentation"
});

var guides = require('../middleware/guides')('core', {
	title: "MooTools Core Guides"
});

module.exports = function(app){

	var core = function(req, res, next){
		res.locals.site = 'core';
		next();
	};

	app.get('/core', core, function(req, res){
		res.render('core/index', {
			page: "/core",
			title: "MooTools Core"
		});
	});

	app.get('/core/docs', core, docs);
	app.get('/core/docs/:version', core, docs);

	app.get('/core/guides', core, guides.index);
	app.get('/core/guide/:guide', core, guides.article);

};
