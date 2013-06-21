"use strict";

var async = require('async');
var spawn = require('child_process').spawn;

var cmds = [
	["build/docs", "prime"],
	["build/docs", "elements"],
	["build/docs", "moofx"],
	["build/docs", "agent"],
	["build/guides", "prime"],
//	["build/guides", "elements"],
	["build/guides", "moofx"],
	["build/guides", "agent"],
	["build/blog"],
	["node_modules/.bin/wrapup-webbuilder-init"]
];

async.each(cmds, function(cmd, callback){
	var node = spawn('node', cmd, {
		stdio: 'inherit',
		cwd: __dirname + '/..'
	});
	node.on('close', callback);
});
