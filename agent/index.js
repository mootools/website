"use strict";

var docs = require('../middleware/docs')('agent', {
	title: "MooTools Agent Documentation"
});

var guides = require('../middleware/guides')('agent', {
	title: "MooTools Agent Guides"
});

module.exports = function(app){

	var agent = function(req, res, next){
		res.locals.site = 'agent';
		next();
	};

	app.get('/agent', agent, function(req, res){
		res.render('agent/index', {
			page: "/agent",
			title: "MooTools Agent"
		});
	});

	app.get('/agent/docs', agent, docs);
	app.get('/agent/docs/:version', agent, docs);

	app.get('/agent/guides', agent, guides.index);
	app.get('/agent/guide/:guide', agent, guides.article);

};
