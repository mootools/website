"use strict";

var docs = require('../middleware/docs')('more', {
	title: "MooTools More Documentation"
});

var guides = require('../middleware/guides')('more', {
	title: "MooTools More Guides"
});

module.exports = function(app){

	var more = function(req, res, next){
		res.locals.site = 'more';
		next();
	};

	app.get('/more', more, function(req, res){
		res.render('more/index', {
			page: "/more",
			title: "MooTools More"
		});
	});

	app.get('/more/docs', more, docs);
	app.get('/more/docs/:version', more, docs);

	app.get('/more/guides', more, guides.index);
	app.get('/more/guide/:guide', more, guides.article);

};
