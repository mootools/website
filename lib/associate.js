"use strict";

function associate(keys, values){
	var length = Math.min(keys.length, values.length);
	var associated = {};
	for (var i = 0; i < length; i++){
		associated[keys[i]] = values[i];
	}
	return associated;
}

module.exports = associate;
