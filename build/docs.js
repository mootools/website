"use strict";

var fs = require('fs');
var async = require('async');
var path = require('path');
var compile = require('../lib/compile-md');
var pkg = require('../package.json');
var getFiles = require('../lib/getFiles');
var compareSEMVER = require('../lib/compareSEMVER');

var args = process.argv;

if (args.length < 3){
	console.log('usage: node docs.js [project]');
	process.exit(1);
}

var project = args[2];
var optionalDocFiles = ['readme', 'intro', 'license', 'more'];
var placeholder = '<div class="heading clearfix"><h1><a href="#">API Documentation</a></h1></div>';
var docsdir = path.join(__dirname, "../", pkg._buildOutput, project, "docs");
var docsIndex = pkg._projects[project].docsIntro;

build(project, docsdir);

// fix path for sidebar toc anchor links
function fixPath(mdFilePath, ver){
	var fullPath = mdFilePath.slice(0, -3).split('/');
	var tocPath = fullPath.slice(fullPath.indexOf("Docs") + 1).join('/');
	var version = ver.split('-')[1];
	return project + '/docs/' + version + '/' + tocPath;
}

function makeFileAndModuleName(path){
	var subPath = path.split('/Docs')[1].slice(0, -3); // drop ".md" and get module name
	return subPath.split('/').join('-');
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
		if (verionsIndex.indexOf(version) == -1){
			verionsIndex.push(version);
		}

		var toc = [];
		var intro;

		docFiles.forEach(function(mdFile){
			var projectMD = fs.readFileSync(mdFile, 'utf8');
			var html      = compile(projectMD, '/' + fixPath(mdFile, library));
			var tocItem   = html.toc[0];
			var fileName  = path.basename(mdFile, '.md');
			var uniquename = makeFileAndModuleName(mdFile);

			fs.writeFile(docsdir + '/content-' + uniquename + '-' + version + '.html', html.content);
			if (mdFile.indexOf(docsIndex) != -1){
				fs.writeFile(docsdir + '/content-' + version + '.html', html.content);
				intro = true;
			}

			var optionalDocFile = optionalDocFiles.indexOf(fileName.toLowerCase()) != -1;
			tocItem.optional = optionalDocFile;
			var mdFileDir = path.dirname(path.relative(versionPath, mdFile));
			tocItem.path = path.join(mdFileDir, fileName);
			tocItem.file = uniquename;
			toc.push(tocItem);
		});

		if (!intro) fs.writeFile(docsdir + '/content-' + version + '.html', placeholder);
		// make file with toc for sidebar
		fs.writeFile(docsdir + '/' + 'toc-' + version + '.json', JSON.stringify(toc, null, 2));
	});

	verionsIndex = verionsIndex.sort(compareSEMVER).reverse();
	fs.writeFile(docsdir + '/versions.json', JSON.stringify(verionsIndex, null, 2));
}
