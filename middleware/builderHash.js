'use strict';

var sqlite3 = require('sqlite3'),
	md5 = require('md5');

var databasePaths = {},
	databases = {};

function getDatabase(project){
	if (!databases[project]) {
		var path = databasePaths[project];
		if (path){
			databases[project] = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, function(error){
				if (error) throw error;
			});
		} else {
			throw Error('No database found for "' + project + '".');
		}
	}
	return databases[project];
}

function loadHash(project, hash, callback){
	getDatabase(project).get('SELECT * FROM hashes WHERE md5 = ?', {1: hash}, function(error, row){
		var data = null;
		if (row) data = {hash: row.md5, packages: row.packages.split(';')};
		if (callback) callback(data);
	});
}

function saveHash(project, packages, callback){
	if (packages && packages.length){
		var db = getDatabase(project),
			packageString = packages.join(';'),
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

module.exports = function(paths){
	for (var key in paths){
		databasePaths[key] = paths[key];
	}
	return {
		load: loadHash,
		save: saveHash
	}
}
