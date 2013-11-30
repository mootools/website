"use strict";

var pkg = require('../package');
var fs = require('fs');
var path = require('path');
var async = require('async');
var needle = require('needle');
var unzip = require('unzip');
var es = require('event-stream');

var url = 'http://fontello.com';
var config = __dirname + '/../design/assets/fonts';
var dest = __dirname + '/../public/fonts';
var stylDest = __dirname + '/../views/css/';

var readConfig = async.apply(fs.readFile, config);

function getSessionID(font, callback){
	needle.post(url, {
		config: {
			file: config + '/' + font + '.json',
			content_type: 'application/json'}
		},
		{multipart: true},
		function(err, response, body){
			if (response.statusCode == 200) callback(err, {
				id: body,
				font: font
			});
			else callback(err || new Error(response.body));
		});
}

var stylFunctionify = es.map(function(data, cb){
	var re = /(\.icon\-[\w-]+)(\:before)(\s?)/g;
	data = String(data).replace(re, function($0, $1){
		return $1.slice(1) + '() ';
	});
	cb(null, data);
});

function download(data, callback){
	var r = needle.get(url + '/' + data.id + '/get', function(err, res, body){
		if (err) callback(err);
	});
	r.pipe(unzip.Parse())
		.on('entry', function(entry){
			var filename = entry.path;
			var type = entry.type;
			var match = /\/css\/.*\-codes\.css$/;
			var file;

			if (filename.indexOf('/font/') != -1){
				file = path.basename(filename);
				entry.pipe(fs.createWriteStream(dest + '/' + file));
			} else if (filename.match(match) && !filename.match(/ie7/)){
				entry
					.pipe(stylFunctionify)
					.pipe(fs.createWriteStream(stylDest + '/' + data.font + '.styl'));
			} else {
				entry.autodrain();
			}
		})
		.on('finish', function(){
			callback();
		});
}

var downloadZip = async.compose(download, getSessionID);

if (!process.argv[2]){
	console.error('please specificy a font type');
	process.exit(1);
}

downloadZip(process.argv[2], function(err){
	if (err) console.err(err);
	else console.log('written font files');
});
