"use strict";

var fs = require('fs-extra');
var async = require('async');
var path = require('path');
var slug = require ('slugify');
var compile = require('../lib/compile-md');
var fm = require('front-matter');
var pkg = require('../package.json');

var args = process.argv;

if (args.length < 3){
	console.log('usage: node guides.js [project]');
	process.exit(1);
}

var project = args[2];

var srcdir  = path.join(__dirname, "../", project, "guides");
var destdir  = path.join(__dirname, "../", pkg._buildOutput, project, "guides");

build(project, srcdir, destdir);

function build(project, srcdir, destdir){

	async.auto({

		mkdir: async.apply(fs.mkdirs, destdir),

		readdir: function(callback){
			fs.readdir(srcdir, function(err, files){
				if (err) return callback(err);
				callback(null, files.filter(function(file){
					return (/\.md$/).test(file);
				}));
			});
		},

		readfiles: ['readdir', function(callback, res){
			async.map(res.readdir, function(file, cb){
				fs.readFile(srcdir + '/' + file, "utf-8", function(err, data){
					if (err) return cb(err);
					cb(null, {file: file, md: data});
				});
			}, callback);
		}],

		compile: ['readfiles', function(callback, res){
			async.map(res.readfiles, function(file, cb){
				var parts = fm(file.md);
				var data = parts.attributes;
				data.slug = slug(data.title);
				data.file = file.file;
				data.htmlFile = file.file.replace(/\.md$/, '.html');
				var html = compile(parts.body, data.htmlFile);
				cb(null, [data, html]);
			}, callback);
		}],

		saveHTML: ['compile', function(callback, res){
			async.map(res.compile.map(function(file, i){
				return {
					html: file[1],
					file: destdir + '/' + file[0].htmlFile
				};
			}), function(file, cb){
				fs.writeFile(file.file, file.html.content, cb);
			}, callback);
		}],

		saveJSON: ['compile', function(callback, res){
			var guides = {};
			res.compile.forEach(function(file){
				guides[file[0].slug] = file[0];
			});
			fs.writeFile(destdir + '/guides.json', JSON.stringify(guides, null, 2), callback);
		}]

	}, function(err, res){
		if (err) console.error(err);
		console.log("done building guides html files for " + project);
	});

}
