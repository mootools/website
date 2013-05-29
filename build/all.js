"use strict";

var async = require('async');
var spawn = require('child_process').spawn;

var cmds = [
	["docs", "prime"],
	["docs", "elements"],
	["docs", "moofx"],
	["docs", "agent"],
	["guides", "prime"],
//	["guides", "elements"],
	["guides", "moofx"],
	["guides", "agent"],
	["blog"]
];

async.each(cmds, function(cmd, callback){
	var node = spawn('node', cmd, {
		stdio: 'inherit',
		cwd: __dirname
	});
	node.on('close', callback);
});
