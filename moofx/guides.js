"use strict";

var fs = require('fs');
var object = require('prime/shell/object');

var guides;

try {
	guides = require('./guides/guides.json');
} catch(e){
	console.error(__dirname + "/guides/guides.json does not exist\n" +
		" did you build the markdown files with 'node build/guides moofx'?");
	throw e;
}

object.each(guides, function(guide){
	guide.content = fs.readFileSync(__dirname + '/guides/' + guide.htmlFile);
});

var sorted = object.values(guides).map(function(guide){
	guide._date = new Date(guide.date);
	return guide;
}).sort(function(a, b){
	return a._date - b._date;
});

exports.index = function(req, res){

	res.render('moofx/guides', {
		page: "/moofx/guides",
		title: "MooFx Guides",
    site: 'moofx',
		guides: sorted
	});

};

exports.article = function(req, res, next){
	var guide;

	if (req.params.guide) guide = guides[req.params.guide];
	else guide = sorted[0];

	if (!guide) return next();

	res.render('moofx/guide', {
		page: "/moofx/guides",
		title: "MooFx Guide: " + guide.title,
		guide: guide,
    site: 'moofx'
	});

};