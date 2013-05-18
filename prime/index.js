"use strict";

var docs = require('./docs');

module.exports = function(app){

	app.get('/prime', function(req, res){
		res.render('prime/index', {
			page: "/prime",
			title: "MooTools Prime"
		});
	});

	app.get('/prime/docs', docs);
	app.get('/prime/docs/:version', docs);

};
