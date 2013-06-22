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

function spawnCmd(cmd, callback){
	spawn('node', cmd, {
		stdio: 'inherit',
		cwd: __dirname + '/..'
	}).on('close', callback);
}

async.series([
	async.apply(spawnCmd, ["build/repositories"]),
	async.apply(async.each, cmds, spawnCmd)
]);
