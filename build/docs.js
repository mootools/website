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

var docsdir = path.join(__dirname, "../", pkg._buildOutput, project, "docs");

build(project, docsdir);

function build(project, docsdir){

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
