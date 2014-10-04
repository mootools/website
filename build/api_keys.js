"use strict";

var fs = require('fs-extra');
var async = require('async');
var spawn = require('child_process').spawn;
var APIkeys = require('./../config/api_keys.json');
var prompt = require('sync-prompt').prompt;

function checkKeys(api, name){
	Object.keys(api).forEach(function(key){
		api[key] = prompt('Please insert ' + name + '\'s ' + key + ': ') || api[key];
	});
}

function question(what){
	var answer = prompt('Do you want to add or change keys for ' + what + '? (y/n): ');
	return answer.toLowerCase() == 'y';
}

module.exports = function(){
	for (var name in APIkeys){
		if (question(name)) checkKeys(APIkeys[name], name);
	}
	fs.writeFileSync('./config/api_keys.json', JSON.stringify(APIkeys, null, 4));
}
