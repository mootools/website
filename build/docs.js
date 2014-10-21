"use strict";

var fs = require('fs');
var async = require('async');
var path = require('path');
var compile = require('../lib/compile-md');
var pkg = require('../package.json');
var getFiles = require('../lib/getFiles');
var compareSEMVER = require('../lib/compareSEMVER');
var docsIndex = (function(){
	var projects = {};
	for (var key in pkg._projects) projects[key] = pkg._projects[key].docsIntro;
	return projects;
})();

var args = process.argv;

if (args.length < 3){
	console.log('usage: node docs.js [project]');
	process.exit(1);
}

var project = args[2];
var optionalDocFiles = ['readme', 'intro', 'license', 'more'];
var placeholder = '<div class="heading clearfix"><h1><a href="#">API Documentation</a></h1></div>';
var docsdir = path.join(__dirname, "../", pkg._buildOutput, project, "docs");

build(project, docsdir);

// fix path for sidebar toc anchor links
function fixPath(mdFilePath, ver){
	var fullPath = mdFilePath.slice(0, -3).split('/');
	var tocPath = fullPath.slice(fullPath.indexOf("Docs") + 1).join('/');
	var version = ver.split('-')[1];
	return project + '/docs/' + version + '/' + tocPath;
}


// distinguish Core, More from Prime & friends builder
function build(project, docsdir){

	var projectFiles = fs.readdirSync(docsdir);
	var verionsIndex = [];
	projectFiles.forEach(function(library){

		var type = fs.statSync(docsdir + '/' + library);
		var versionPath = docsdir + '/' + library + '/Docs';
		if (!type.isDirectory()) return;

		// get all .md files inside each project-version
		var docFiles = getFiles(versionPath, null, '.md');
		var version = library.split('-')[1];
		if (!~verionsIndex.indexOf(version)) verionsIndex.push(version);

		var toc = [], intro;
		docFiles.forEach(function(mdFile){
			var projectMD = fs.readFileSync(mdFile);
			var html = compile(projectMD, '/' + fixPath(mdFile, library));
			var fileName = path.basename(mdFile, '.md');
			var optionalDocFile = ~optionalDocFiles.indexOf(fileName.toLowerCase());
			if (!optionalDocFile) toc.push(html.toc[0]);
			var module = ~mdFile.indexOf(docsIndex[project]) ? '' : fileName + '-';
			if (!module) intro = true;
			fs.writeFile(docsdir + '/content-' + module + version + '.html', html.content);
		});

		if (!intro) fs.writeFile(docsdir + '/content-' + version + '.html', placeholder);
		// make file with toc for sidebar
		fs.writeFile(docsdir + '/' + 'toc-' + version + '.json', JSON.stringify(toc, null, 2));
	});

	verionsIndex = verionsIndex.sort(compareSEMVER).reverse();
	fs.writeFile(docsdir + '/versions.json', JSON.stringify(verionsIndex, null, 2));
}
