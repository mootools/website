"use strict";

module.exports = function(app){

	var developers = function(req, res, next){
		res.locals.site = 'developers';
		next();
	};

	app.get('/developers', developers, function(req, res){
		res.render('developers/index', {
			page: "/developers",
			title: "MooTools Developers"
		});
	});

};
