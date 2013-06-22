"use strict";

var fs = require('fs');
var path = require('path');
var object = require('prime/shell/object');
var pkg = require('../package.json');

module.exports = function(project, options){

	if (!project){
		throw new Error("'project' argument is required");
	}

	if (!options) options = {};
	if (!options.title) options.title = project;

	var guides;

	var dir = path.join(__dirname, '../', pkg._buildOutput, project, 'guides');
	var JSONPath = dir + '/guides.json';

	try {
		guides = require(JSONPath);
	} catch(e){
		console.error(JSONPath + " does not exist\n" +
			" did you build the markdown files with 'node build/guides " + project + "'?");
		throw e;
	}

	object.each(guides, function(guide){
		guide.content = fs.readFileSync(dir + '/' + guide.htmlFile);
	});

	var sorted = object.values(guides).map(function(guide){
		guide._date = new Date(guide.date);
		return guide;
	}).sort(function(a, b){
		return a._date - b._date;
	});

	return {

		index: function(req, res){

			res.render(project + '/guides', {
				page: "/" + project + "/guides",
				title: options.title,
				guides: sorted
			});

		},

		article: function(req, res, next){
			var guide;

			if (req.params.guide) guide = guides[req.params.guide];
			else guide = sorted[0];

			if (!guide) return next();

			res.render(project + '/guide', {
				page: "/" + project + "/guides",
				title: options.title + ": " + guide.title,
				guide: guide
			});

		}
	};

};
