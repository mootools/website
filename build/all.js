"use strict";

var async = require('async');
var spawn = require('child_process').spawn;
var getKeys = require('./api_keys');
var options = process.argv.splice(2);

function checkKeys(){
	if (options.indexOf('--add-keys') != -1){
		getKeys();
	}
}

var cmds = [
	["build/docs", "core"],
	["build/docs", "more"],
	["build/guides", "core"],
	["build/guides", "more"],
	["build/blog"]
];

function spawnCmd(cmd, callback){
	spawn("node", cmd, {
		stdio: 'inherit',
		cwd: __dirname + '/..'
	})
		.on('close', callback)
		.on('error', function(err){
			throw err;
		});
}

async.series([
	async.apply(spawnCmd, ["build/repositories"]),
	async.apply(async.each, cmds, spawnCmd)
], checkKeys);
