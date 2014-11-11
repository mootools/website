'use strict';

var sqlite3 = require('sqlite3'),
	md5 = require('md5'),
	pkgProjects = require('../package.json')._projects;

function BuilderDatabase(projects){
	this.databasePaths = {};
	this.databases = {};
	this.paths = projects.reduce(function(pathObject, project){
	    pathObject[project] = pkgProjects[project].hashStorage;
		return pathObject;
	}, {});

	for (var key in this.paths){
		this.databasePaths[key] = this.paths[key];
	}

	this.getDatabase = function(project){
		if (!this.databases[project]){
			var path = this.databasePaths[project];
			if (path){
				this.databases[project] = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, function(error){
					if (error) throw error;
				});
			} else {
				throw Error('No database found for "' + project + '".');
			}
		}
		return this.databases[project];
	}

	this.loadHash = function(project, hash, callback){
		this.getDatabase(project).get('SELECT * FROM hashes WHERE md5 = ?', {1: hash}, function(error, row){
			var data = null;
			if (row) data = {hash: row.md5, packages: row.packages.split(';')};
			if (callback) callback(data);
		});
	}

	this.saveHash = function(project, packages, callback){
		if (packages && packages.length){
			var db = this.getDatabase(project),
				packageString = typeof packages == 'string' ? packages : packages.join(';'),
				hash = md5.digest_s(packageString);
			db.get('SELECT COUNT(*) AS count FROM hashes WHERE md5 = ?', {1: hash}, function(error, row){
				if (error) throw error;
				if (row.count){
					if (callback) callback({hash: hash, packages: packages});
				} else {
					var values = {1: hash, 2: packageString, 3: Math.round(Date.now() / 1000)};
					db.run('INSERT INTO hashes (md5, packages, date) VALUES (?, ?, ?)', values, function(error){
						if (error) throw error;
						if (callback) callback({hash: hash, packages: packages});
					});
				}
			});
		} else {
			if (callback) callback(null);
		}
	}
}

module.exports = function(paths){
  var db = new BuilderDatabase(paths);
  return {load: db.loadHash.bind(db), save: db.saveHash.bind(db)};
};
