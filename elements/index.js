"use strict";

var docs = require('./docs');

module.exports = function(app){

	app.get('/elements', function(req, res){
		res.render('elements/index', {
			page: "/elements",
			title: "MooTools Elements"
		});
	});

	app.get('/elements/docs', docs);
	app.get('/elements/docs/:version', docs);

};
