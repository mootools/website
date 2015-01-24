"use strict";

var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var YAML = require('js-yaml');
var pkg = require('../package.json');
var compile = require('../lib/compile-md');
var getFiles = require('../lib/getFiles');
var HEADER_REGEXP = /\/\*\s*^---([\s\S]+?)^(?:\.\.\.|---)\s*\*\//mg;
var DESC_REGEXP = /...\n?\*\/\n*([\s\S]*)/m;

var args = process.argv;

if (args.length < 3){
	console.log('usage: node demos.js "demos"');
	process.exit(1);
}

var project = args[2];
var placeholder = ''; // a possible generic text string
var outputDir = path.join(__dirname, "../", pkg._buildOutput, project, "docs");

build(project, outputDir);

function processDetails(chunk){
	var headers = chunk.match(HEADER_REGEXP)[0];
	var html = chunk.match(DESC_REGEXP);
	return {
		YAML: YAML.load(headers.slice(2, -2)),
		HTML: html ? html[1] : placeholder
	}
}

function copy(src, target){
	var folder = path.dirname(target);
	var subFolder = path.dirname(folder);
	if (!fs.existsSync(subFolder)){
	    fs.mkdirSync(subFolder);
	}
	fs.mkdir(folder + '/', function(err){
		if (err && err.code != 'EEXIST') console.error(err);
		src && fse.copy(src, target, function(err){
			if (err) console.error(err);
		});
	});
}

function build(project, dir){
	var repoPath = path.join(dir, "demos", "demos");
	var demoFolder = fs.readdirSync(repoPath);
	var tocDemos = {};

	demoFolder.forEach(function(demo){

		var demoPath = path.join(repoPath, demo);
		var type = fs.statSync(demoPath);
		if (!type.isDirectory()) return;

		var partials = getFiles(demoPath, null);
		var jsFiddle = {};
		jsFiddle.highlighted = {};
		var yamlHeader;

		partials.forEach(function(file){

			var ext = path.extname(file).slice(1);
			var content = fs.readFileSync(file, 'utf8');

			if (!ext.match(/html|css|js|details/)){
				var lastPath = file.split(demo)[1];
				var target = path.join(__dirname, "../", "public", "demos", demo, lastPath);
				return copy(file, target);
			}

			if (ext == 'details'){
				var details = processDetails(content);
				yamlHeader = details.YAML;
				content = details.HTML;
			} else {
				// add tab so the compiler reads as a tabbed .md code block
				var preparedContent = '\t' + content.replace(/\n/g, '\n\t');
				jsFiddle.highlighted[ext] = compile(preparedContent).content;
			}

			jsFiddle[ext] = content;
		});

		tocDemos[demo] = {
			link: '/demos/?demo=' + demo,
			description:  yamlHeader
		}
		fs.writeFile(path.join(dir, demo + '.json'), JSON.stringify(jsFiddle, null, 2));
	});
	fs.writeFile(dir + '/toc-demos.json', JSON.stringify(tocDemos, null, 2));
}
