"use strict";

var fs = require('fs');
var async = require('async');
var path = require('path');
var array = require('prime/shell/array');
var slug = require ('slugify');
var compile = require('../lib/compile-md');
var splitMetaData = require('../lib/splitMarkdownMetaData');

var args = process.argv;

if (args.length < 3){
	console.log('usage: node guides.js [project]');
	process.exit(1);
}

var project = args[2];

build(project, __dirname + "/../" + project + "/guides");

function build(project, dir){

	async.auto({

		readdir: function(callback){
			fs.readdir(dir, function(err, files){
				if (err) return callback(err);
				callback(null, files.filter(function(file){
					return (/\.md$/).test(file);
				}));
			});
		},

		readfiles: ['readdir', function(callback, res){
			async.map(res.readdir, function(file, cb){
				fs.readFile(dir + '/' + file, "utf-8", function(err, data){
					if (err) return cb(err);
					cb(null, {file: file, md: data});
				});
			}, callback);
		}],

		compile: ['readfiles', function(callback, res){
			async.map(res.readfiles, function(file, cb){
				var parts = splitMetaData(file.md);
				var data = JSON.parse(parts[0]);
				data.slug = slug(data.title);
				data.file = file.file;
				data.htmlFile = file.file.replace(/\.md$/, '.html');
				var html = compile(parts[1]);
				cb(null, [data, html]);
			}, callback);
		}],

		saveHTML: ['compile', function(callback, res){
			async.map(res.compile.map(function(file, i){
				return {
					html: file[1],
					file: dir + '/' + file[0].htmlFile
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
			fs.writeFile(dir + '/guides.json', JSON.stringify(guides, null, 2), callback);
		}]

	}, function(err, res){
		if (err) console.error(err);
		console.log("done building guides html files for " + project);
	});

}
