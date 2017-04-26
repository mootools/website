"use strict";

var fs = require('fs');
var path = require('path');
var async = require('async');
var processPost = require('./index');
var files = require('./archive/filelist');
var fileNames = Object.keys(files);

function getVersion(str){
    var semver = str.match(/\d.\d.\d/);
	if (semver) return parseInt(semver[0].split('.').join(''), 10);
    return false;
}

async.each(fileNames, function(fileName, callback){

	// map each files content to "files" object
	var filePath = path.resolve(__dirname, 'archive', fileName);
	fs.readFile(filePath, 'utf8', function(err, content){
		if (err) console.log(err);
		files[fileName] = content;
		callback();
	});
}, function(err){
	if (err) console.log('Error serving archived files for download.', err);

});

module.exports = function(req, res){

	var requestedFile = req.path.split('/').pop();
	if (fileNames.indexOf(requestedFile) != -1){

		// file exists in archive
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,POST');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		res.setHeader('Content-Type', 'application/javascript');
		res.setHeader('Content-Disposition', 'attachment; filename=' + requestedFile);
		res.write(files[requestedFile]);
		return res.end();
	}

	var version = getVersion(requestedFile);
	if (version > 145) {

		// newer version that packager can handle
		if (!req.body) req.body = {};
		req.body.project = 'Core';
		req.body.version = requestedFile.match(/\d.\d.\d/)[0];
		if (requestedFile.indexOf('min') != -1) req.body.minified = '1';
		if (requestedFile.indexOf('compat') != -1) req.body.compat = '1'; // mootools website naming
		if (requestedFile.indexOf('nocompat') != -1) delete req.body.compat; // Google CDN naming
		return processPost(req, res);
	}

	// path didn't match anything...
	res.redirect(301, '/core');
};
