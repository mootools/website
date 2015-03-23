"use strict";

var fs = require('fs');
var path = require('path');

module.exports = function(project){

	return function(){
		var pkgPath = path.join(__dirname, '..', 'package.json');
		if (require.cache[pkgPath]) delete require.cache[pkgPath];
		var pkg = require(pkgPath);

		return {
			buildOutput: pkg._buildOutput,
			versions: pkg._projects[project].versions,
			lastVersion: pkg._projects[project].versions[0]
		}
	}
};
