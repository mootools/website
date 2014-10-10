"use strict";

function splitVersion(ver){
	return ver.split('.').map(function(part){
		return parseInt(part, 10);
	});
}

// from http://stackoverflow.com/a/6832706/2256325
module.exports = function(a, b){

	if (a === b) return 0;

	var aComponents = splitVersion(a);
	var bComponents = splitVersion(b);
	var len = Math.min(aComponents.length, bComponents.length);

	// loop while the components are equal
	for (var i = 0; i < len; i++){
		if (aComponents[i] > bComponents[i]) return 1;
		if (aComponents[i] < bComponents[i]) return -1;
	}

	// If one's a prefix of the other, the longer one is greater.
	if (aComponents.length > bComponents.length) return 1;
	if (aComponents.length < bComponents.length) return -1;

	// Otherwise they are the same.
	return 0;
}
