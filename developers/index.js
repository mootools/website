"use strict";

module.exports = function(app){

	var developersData = require('./developers');
	var randomSort = function(){
		return 0.5 - Math.random();
	};

	app.get('/developers', function(req, res){

		Object.keys(developersData).forEach(function(section){
			developersData[section] = developersData[section].sort(randomSort);
		});
		res.render('developers/index', {
			site: "developers",
			title: "MooTools Developers",
			developersData: developersData
		});
	});

};

