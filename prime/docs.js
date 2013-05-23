"use strict";

var fs = require('fs');

var versions;

try {
	versions = require('./docs/versions.json');
} catch(e){
	console.error("did you run 'node build/docs.js prime'?");
	throw e;
}

var latest = versions[0];
var docs = {};

versions.forEach(function(version){
	docs[version] = {
		content: fs.readFileSync(__dirname + '/docs/content-' + version + '.html'),
		toc: require(__dirname + '/docs/toc-' + version + '.json')
	};
});

module.exports = function(req, res){

	var version = req.params.version || latest;
	if (!docs[version]) version = latest;

	res.render('prime/docs', {
		page: "/prime/docs",
		title: "Prime Documentation",
		content: docs[version].content,
		toc: docs[version].toc,
		version: version,
		versions: versions
	});

};
