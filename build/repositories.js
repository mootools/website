"use strict";

var prime = require('prime');
var async = require('async');
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
require('colors');

function inverseFsExists(version, callback){
	fs.exists(version.dir, function(exists){
		callback(!exists);
	});
}

function findNonExisting(versions, callback){
	async.filter(versions, inverseFsExists, callback.bind(null, null));
}

function clone(vers, callback){
	console.log(("cloning " + vers.repository + " to " + vers.dir).green);
	spawn('git', ['clone', vers.repository, vers.dir], {
		stdio: 'inherit'
	}).on('close', function(code){
		callback(code, vers);
	});
}

function checkout(vers, callback){
	console.log(("checking out " + vers.version + " in " + vers.dir).green);
	spawn('git', ['checkout', vers.version], {
		stdio: 'inherit',
		cwd: vers.dir
	}).on('close', function(code){
		callback(code, vers);
	});
}

var cloneAndCheckout = async.compose(checkout, clone);

function cloneAndCheckoutAll(versions, callback){
	async.map(versions, cloneAndCheckout, callback);
}

var cloneNonExisting = async.compose(cloneAndCheckoutAll, findNonExisting);

var pkg = require('../package.json');
var projects = pkg._projects;

var versions = [];

prime.each(projects, function(project, name){
	project.versions.forEach(function(version){
		versions.push({
			dir: path.join(__dirname, '../', pkg._buildOutput, name, 'docs', name + '-' + version),
			repository: project.repository,
			version: version
		});
	});
});

cloneNonExisting(versions, function(err, results){
	if (err) throw err;
	if (results.length){
		results.forEach(function(vers){
			console.log(('cloned into ' + vers.dir + '').green.bold);
		});
	} else {
		console.log('no need to clone repos'.yellow.bold);
	}
});
