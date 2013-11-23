"use strict";

var fs = require('fs');
var path = require('path');
var async = require('async');
var object = require('prime/shell/object');
var pkg = require('../package.json');
var waitForIt = require('../lib/waitForIt');
var loadJSON = require('../lib/loadJSON');
var debounce = require('../lib/debounce');

function loadArticles(dir, guides, callback){
	async.each(Object.keys(guides), function(key, cb){
		var guide = guides[key];
		fs.readFile(dir + '/' + guide.htmlFile, function(err, data){
			if (err) return cb(err);
			guide.content = data;
			cb(null, guide);
		});
	}, function(err){
		callback(err, guides);
	});
}

function sortGuides(guides, callback){
	var sorted = object.values(guides).map(function(guide){
		guide._date = new Date(guide.date);
		return guide;
	}).sort(function(a, b){
		return a._date - b._date;
	});
	callback(null, {sorted: sorted, guides: guides});
}

module.exports = function(project, options){

	if (!project){
		throw new Error("'project' argument is required");
	}

	if (!options) options = {};
	if (!options.title) options.title = project;

	var dir = path.join(__dirname, '../', pkg._buildOutput, project, 'guides');
	var getGuidesJSON = async.apply(loadJSON, dir + '/guides.json');
	var getArticles = async.apply(loadArticles, dir);
	var _loadGuides = async.compose(sortGuides, getArticles, getGuidesJSON);
	var loadGuides = waitForIt(_loadGuides);

	fs.watch(dir, debounce(function(){
		console.log('resetting ' + dir + ' guides');
		loadGuides.reset();
	}));

	return {

		index: function(req, res, next){
			loadGuides.get(function(err, data){
				if (err) return next(err);
				res.render(project + '/guides', {
					page: "/" + project + "/guides",
					title: options.title,
					guides: data.sorted
				});
			});
		},

		article: function(req, res, next){
			loadGuides.get(function(err, data){
				var guide;
				var guides = data.guides;
				var sorted = data.sorted;

				if (req.params.guide) guide = guides[req.params.guide];
				else guide = sorted[0];

				if (!guide) return next();

				res.render(project + '/guide', {
					page: "/" + project + "/guides",
					title: options.title + ": " + guide.title,
					guide: guide
				});
			});
		}
	};

};
