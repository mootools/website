"use strict";

var fs = require('fs');

function loadJSON(file, callback){

	fs.readFile(file, function(err, json){
		if (err) return callback(err);
		try {
			callback(null, JSON.parse(json));
		} catch (e){
			callback(e);
		}
	});

}

module.exports = loadJSON;
