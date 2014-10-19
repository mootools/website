'use strict';

var allVersions = require('../package.json');

function projectPath(project_, version_){
	var versions = allVersions._projects[project_].versions;
	if (versions.indexOf(version_) == -1) version_ = versions.filter(function(ver){
		return ver.slice(0, -2) <= version_.slice(0, -2);
	})[0];
	return 'cache/' + project_.toLowerCase() + '/docs/' + project_.toLowerCase() + '-' + version_ + '/Source/';
}

module.exports = projectPath;
