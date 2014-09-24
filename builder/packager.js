/*
 * refactor from: grunt-mootools-packager
 * https://github.com/ibolmo/grunt-mootools-packager
 *
 * Copyright (c) 2014 Olmo Maldonado
 * Licensed under the MIT license.
 */

'use strict';

var YAML = require('js-yaml');
var fs = require('fs');

module.exports = function(directPath, options){

	var DESC_REGEXP = /\/\*\s*^---([.\s\S]*)^(?:\.\.\.|---)\s*\*\//m;
	var SL_STRIP_EXP = ['\\/[\\/*]\\s*<', '>(.*?)<\\/', '>(?:\\s*\\*\\/)?'];
	var ML_STRIP_EXP = ['\\/[\\/*]\\s*<', '>([.\\s\\S]*?)<\\/', '>(?:\\s*\\*\\/)?'];
	var PACKAGE_DOT_STAR = /(.*)\/\*$/;

	// ensures the definition has a name and a provision
	function validDefinition(definition){
		return 'name' in definition && 'provides' in definition;
	}

	// returns primary key of a definition
	function getPrimaryKey(definition){
		return definition.package + '/' + definition.name;
	}

	// provides keys to the source file based on the name and the components provided
	function getKeys(definition){
		return definition.provides.map(function(component){
			return definition.package + '/' + component;
		}).concat(getPrimaryKey(definition));
	}

	// matches project name with component's path
	function getProjectName(componentPath, optionsName){
		if (typeof optionsName == 'string') return optionsName;
		var projectName;
		for (var prj in optionsName){
			if (~componentPath.indexOf(optionsName[prj])) projectName = prj;
		}
		if (!projectName) console.log('Missing name in options for component with path: ' + componentPath);
		return projectName;
	}

	// wraps item in an array if it isn't one
	function toArray(object){
		if (!object || !object.length) return [];
		return typeof object == 'string' ? [object] : object;
	}

	// verifies that an item is in the registry of components
	function checkRegistry(registry, key, path){
		if (registry[key] == undefined){
			throw new Error('Dependency not found: ' + key + ' in ' + path);
		}
	}

	// fixes requires keys to use package/key; allows for dependencies that
	// use the `/Key` or just `Key` convention to refer to a component within
	// the same package
	function fixDependencyKey(key, packageName){
		// support `requires: /SomethingInThisPackage`
		if (key.indexOf('/') == 0) key = packageName + key;
		// support `requires: SomethingInThisPackage`
		if (key.indexOf('/') == -1) key = packageName + '/' + key;
		return key;
	}

	function getFiles(dir, files_, fileType){
		files_ = files_ || [];
		var regex = new RegExp('\\' + fileType + '$');
		if (typeof files_ === 'undefined') files_ = [];
		var files = fs.readdirSync(dir);
		for (var i in files){
			if (!files.hasOwnProperty(i)) continue;
			var name = dir + '/' + files[i];
			if (fs.statSync(name).isDirectory()){
				getFiles(name, files_, fileType);
			} else {
				files[i].match(regex) && files_.push(name);
			}
		}
		return files_;
	}

	var registry = {}, buffer = [],
		included = {}, set = [],
		packages = {};

	options.strip = options.strip || [];
	options.separator = process.platform === 'win32' ? '\r\n' : '\n';

	function resolveDeps(definition){
		definition.key = fixDependencyKey(definition.key);
		if (included[definition.key]) return;
		included[definition.key] = true;

		if (!options.ignoreYAMLheader){
			definition.requires.forEach(function(key){
				key = fixDependencyKey(key, definition.package);
				checkRegistry(registry, key, definition.filepath);
				resolveDeps(registry[key]);
			});
		}
		buffer.push(definition);
	}

	// loads a component and its dependencies
	// if the key given is a package and a wildcard, loads all of them
	// e.g. `Package/Component` OR `Package/*`
	var loadComponent = function(key){
		var wildCardMatch = key.match(PACKAGE_DOT_STAR);
		if (wildCardMatch){
			packages[wildCardMatch[1]].forEach(loadComponent);
		} else {
			if (key in registry) resolveDeps(registry[key]);
			else throw new Error('Missing key: ' + key);
		}
	}

	var files;
	directPath.forEach(function(path, i){
		files = getFiles(path, files, '.js');
	});

	// read files and populate registry map
	files.forEach(function(filepath){

		var source = fs.readFileSync(filepath, 'utf8');
		var definition = YAML.load(source.match(DESC_REGEXP)[1] || '');
		if (!definition || !validDefinition(definition)) return console.log('invalid definition: ' + filepath);
		definition.filepath = filepath;
		definition.package = getProjectName(filepath, options.name);
		definition.source = source;
		definition.key = getPrimaryKey(definition);
		definition.provides = toArray(definition.provides);
		
		// assume requires are relative to the package, if no package provided
		definition.requires = toArray(definition.requires).map(function(component){
			return~component.indexOf('/') ? component : (definition.package + '/' + component);
		});
		// track all files collected, used to check that all sources were included
		set.push(definition.key);

		getKeys(definition).forEach(function(key){
			if (key in registry && key != definition.key){
				return console.log('key: ' + key + ', has repeated definition: ' + filepath);
			}
			registry[key] = definition;
		});

	});

	set.forEach(function(key){
		var definition = registry[key];
		if (!packages[definition.package]) packages[definition.package] = []
		packages[definition.package].push(key);
	});

	var only = options.only;
	// load each component into the buffer list
	(only ? toArray(only) : set).forEach(loadComponent);
	// convert the buffer into the actual source
	buffer = buffer.map(function(def){
		return def.source;
	}).join(options.separator);

	// strip blocks
	toArray(options.strip).forEach(function(block){
		buffer = buffer.replace(RegExp(SL_STRIP_EXP.join(block), 'gm'), '')
			.replace(RegExp(ML_STRIP_EXP.join(block), 'gm'), '');
	});

	var cb = options.callback;
	if (cb) cb(buffer);
};
