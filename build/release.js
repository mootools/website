"use strict";

var async = require('async');
var path = require('path');
var fs = require('fs');
var semver = require('semver');

var args = process.argv;

if (args.length != 4){
	console.error("Usage: " + args[0] + " " + path.relative(process.cwd(), args[1]) + " [project] [version]");
	process.exit(1);
}

var project = args[2];
var version = args[3];

if (!semver.valid(version)){
	console.error("invalid semver version format (use vx.x.x)");
	process.exit(1);
}

var pkgFile = __dirname + '/../package.json';

var pkg = require(pkgFile);
var projects = pkg._projects;
var builder = pkg._wrapupWebbuilderConfig;

if (!projects[project]){
	console.error("project does not exist");
	process.exit(1);
}

var versions = projects[project].versions;
var builderv = builder.modules[project];

if (versions.indexOf(version) == -1) versions.push(version);
if (builderv.indexOf(version) == -1) builderv.push(version);

fs.writeFile(pkgFile, JSON.stringify(pkg, null, 2), function(err){
	if (err) throw err;
	console.log("saved package.json with the new " + project + " version");
	console.log("now you might want to run build/repositories and build/all");
});
