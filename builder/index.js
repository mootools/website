"use strict";

var os = require('os');
var path = require('path');
var express = require('express');
var wrapupBuilder = require('wrapup-webbuilder');

var config = require('../package.json')._wrapupWebbuilderConfig;
config.tmpdir      = path.join(os.tmpdir(), 'website-builder');
config.dir         = path.join(__dirname, '../', config.dir);
config.snippetsdir = path.join(__dirname, '../', config.snippetsdir);

var builder = wrapupBuilder(config);

module.exports = function(app){

	app.use('/builder', express.static(__dirname + '/../node_modules/wrapup-webbuilder/public'));

	app.get('/builder', builder.index, function(req, res){
		res.render('builder/index', {
			title: 'MooTools Builder'
		});
	});

	app.post('/builder', builder.result);

};
