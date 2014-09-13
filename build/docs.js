"use strict";

var fs = require('fs');
var async = require('async');
var path = require('path');
var semver = require('semver');
var compile = require('../lib/compile-md');
var pkg = require('../package.json');

var args = process.argv;

if (args.length < 3){
	console.log('usage: node docs.js [project]');
	process.exit(1);
}

var project = args[2];
var frameworkProjects = ['core', 'more'];
var optionalDocFiles = ['readme', 'intro', 'license'];

var docsdir = path.join(__dirname, "../", pkg._buildOutput, project, "docs");

build(project, docsdir);

// fix path for sidebar toc anchor links
function fixPath(mdFilePath, ver){
	var fullPath = mdFilePath.slice(0, -3).split('/');
	var tocPath = fullPath.slice(fullPath.indexOf("Docs") + 1).join('/');
	var version = ver.split('-')[1];
	return project + '/docs/' + tocPath + '/' + version;
}

// get all .md files inside each project-version
function getFiles(dir, files_){

	files_ = files_ || [];
	if (typeof files_ === 'undefined') files_ = [];
	var files = fs.readdirSync(dir);
	for (var i in files){
		if (!files.hasOwnProperty(i)) continue;
		var name = dir + '/' + files[i];
		if (fs.statSync(name).isDirectory()) getFiles(name, files_);
		else if (path.extname(files[i]) === ".md") files_.push(name);
	}
	return files_;
}

// distinguish Core, More from Prime & friends builder
function build(project, docsdir){
	if (~frameworkProjects.indexOf(project)) buildFrameworkDocs(project, docsdir);
	else buildModuleDocs(project, docsdir);
}

function buildFrameworkDocs(project, docsdir){

	var projectFiles = fs.readdirSync(docsdir);
	var verionsIndex = [];
	projectFiles.forEach(function(library){

		var type = fs.statSync(docsdir + '/' + library);
		if (!type.isDirectory()) return;

		var versionPath = docsdir + '/' + library + '/Docs';
		var docFiles = getFiles(versionPath, null);
		var version = library.split('-')[1];
		if (!~verionsIndex.indexOf(version)) verionsIndex.push(version);

		var toc = [];
		docFiles.forEach(function(mdFile){

			var projectMD = fs.readFileSync(mdFile);
			var html = compile(projectMD, '/' + fixPath(mdFile, library));
			var fileName = path.basename(mdFile, '.md');
			var optionalDocFile = ~optionalDocFiles.indexOf(fileName.toLowerCase());
			if (!optionalDocFile) toc.push(html.toc[0]);

			var submodule = fileName.toLowerCase() == 'intro' ? '' : fileName + '-';
			fs.writeFile(docsdir + '/' + 'content-' + submodule + version + '.html', html.content);
		});

		// make file with toc for sidebar
		fs.writeFile(docsdir + '/' + 'toc-' + version + '.json', JSON.stringify(toc, null, 2));
	});

	verionsIndex = verionsIndex.sort(semver.rcompare);
	fs.writeFile(docsdir + '/versions.json', JSON.stringify(verionsIndex, null, 2));
}

function buildModuleDocs(project, docsdir){

	async.auto({

		readdir: function(callback){
			fs.readdir(docsdir, function(err, files){
				if (err) return callback(err);
				async.filter(files, function(file, cb){
					fs.stat(docsdir + '/' + file, function(err, stat){
						cb(!err && stat.isDirectory());
					});
				}, function(files){
					callback(null, files);
				});
			});
		},

		doc: ['readdir', function(callback, res){
			async.map(res.readdir, function(file, cb){
				async.filter([
					docsdir + '/' + file + '/doc/' + project + '.md',
					docsdir + '/' + file + '/README.md'
				], fs.exists, function(results){
					if (results[0]) fs.readFile(results[0], "utf-8", cb);
					else cb(new Error("Could not find documentation file"));
				});
			}, callback);
		}],

		compile: ['readdir', 'doc', function(callback, res){
			var files = res.readdir;
			async.each(files, function(file, cb){
				var md = res.doc[files.indexOf(file)];
				var html = compile(md);
				var version = file.slice(project.length + 1);
				async.parallel([
					async.apply(fs.writeFile, docsdir + '/' + 'toc-' + version + '.json', JSON.stringify(html.toc, null, 2)),
					async.apply(fs.writeFile, docsdir + '/' + 'content-' + version + '.html', html.content)
				], cb);
			}, callback);
		}],

		versions: ['readdir', function(cb, res){
			cb(null, res.readdir.map(function(file){
				return file.slice(project.length + 1);
			}).sort(semver.rcompare));
		}],

		makeVerionsIndex: ['versions', function(cb, res){
			fs.writeFile(docsdir + '/versions.json', JSON.stringify(res.versions, null, 2), cb);
		}]

	}, function(err){
		if (err) console.error(err);
		console.log("done building documentation html files for " + project);
	});

}
