"use strict";

var docs = require('./docs');
var guides = require('./guides');

module.exports = function(app){

	app.get('/prime', function(req, res){
		res.render('prime/index', {
			page: "/prime",
			title: "MooTools Prime"
		});
	});

	app.get('/prime/docs', docs);
	app.get('/prime/docs/:version', docs);

	app.get('/prime/guides', guides.index);
	app.get('/prime/guide/:guide', guides.article);

};
