"use strict";

module.exports = function(app){
	
	var developersData     = require('./developers');

	var developers = function(req, res, next){
		res.locals.site = 'developers';
		next();
	};

	app.get('/developers', developers, function(req, res){
		res.render('developers/index', {
			page: "/developers",
			title: "MooTools Developers",
			developersData: developersData
		});
	});

};


/*
"use strict";

var express = require('express');
var app = express();

var developersData     = require('./developers');
console.log(developersData);

module.exports = function(app){

	var developers = function(req, res, next){
		res.locals.site = 'developers';
		next();
	};

	app.get('/', function(req, res){

	  // render the Jade template located in views/developers/index.jade file passing in data
	  res.render('index', {developersData: data});

	});
	

};

*/