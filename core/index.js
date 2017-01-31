"use strict";

var project = 'core';

var docs = require('../middleware/docs')(project, {
	title: "MooTools Core Documentation"
});

var guides = require('../middleware/guides')(project, {
	title: "MooTools Core Guides"
});

var hash = require('../middleware/buildHash')(project);
var pkgProject = require('../package.json')._projects[project];
var versions = pkgProject.versions;
var suffixes = {
	beforeCompat: ['', '-yui-compressed'],
	old: ['', '-yui-compressed', '-nocompat', '-nocompat-yui-compressed'],
	new: ['', '.min', '-nocompat', '-nocompat.min'],
	names: ['compat', 'compat compressed', 'nocompat', 'nocompat compressed']
}

function getSuffix(ver) {
	var xyz = ver.split('.').map(Number);
	if (xyz[0] > 0 && (xyz[1] > 4 && xyz[2] > 1 || xyz[1] > 5)) return 'new'; // > 1.5.1
	if (xyz[0] > 0 && xyz[1] > 2 && xyz[2] >= 0) return 'old'; // > 1.3.0 && < 1.5.1
	else return 'beforeCompat'; // < 1.3.0
}

var links = versions.slice(1).map(function(version){
	var suffix = suffixes[getSuffix(version)];
	return {
		version: version,
		files: suffix.map(function(key, i){
			return {
				link: 'http://ajax.googleapis.com/ajax/libs/mootools/'+ version + '/mootools' + key + '.js',
				label: suffixes.names[i]
			};
		})
	};
});

module.exports = function(app){

	var core = function(req, res, next){
		res.locals.site = 'core';
		next();
	};

	app.get('/core', core, function(req, res){
		res.render('core/index', {
			title: "MooTools Core",
			navigation: 'core',
			project: 'Core',
			version: versions[0],
			versions: links
		});
	});

	app.get('/core/builder/:hash?', hash, core, function(req, res){
		res.render('builder/index', {
			title: 'MooTools Core Builder',
			navigation: 'builder',
			project: 'Core',
			hashDependencies: res.locals.hash || [],
			version: versions[0],
			versions: links,
			dependencies: require('../builder/dependencies.js')(project, versions[0])
		});
	});

	app.get('/core/docs', core, docs);
	app.get('/core/docs/:version', core, docs);
	app.all('/core/docs/:version/*', core, docs);

	app.get('/core/guides', core, guides.index);
	app.get('/core/guides/:guide', core, guides.article);

	// hash build redirect
	app.get('/core/:hash', function(req, res){
		res.redirect('/core/builder/' + req.params.hash);
	});

};
