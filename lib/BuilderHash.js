"use strict";

var path = require('path');
var async = require('async');
var sqlite3 = require('sqlite3');
var md5 = require('md5');
var waitForIt = require('../lib/waitForIt');

function BuilderDatabase(paths){
	this.paths = paths;
	this.databases = {};
}

BuilderDatabase.prototype.getDatabase = function(project, callback){
	var getDB = this.databases[project];
	if (getDB){
		return getDB.get(callback);
	}
	var dbPath = path.resolve(__dirname, '..', this.paths[project]);
	if (!path){
		return callback(Error('No database found for "' + project + '".'));
	}
	getDB = waitForIt(function(cb){
		var db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, function(error){
			if (error) cb(error);
			else cb(null, db);
		});
	});
	getDB.get(callback);
};

BuilderDatabase.prototype.loadHash = function(project, hash, callback){
	function getHash(db, cb){
		db.get('SELECT * FROM hashes WHERE md5 = ?', {1: hash}, function(err, row){
			cb(err, row ? {hash: row.md5, packages: row.packages.split(';')} : null);
		});
	}
	async.compose(
		getHash,
		this.getDatabase.bind(this, project)
	)(callback);
};

BuilderDatabase.prototype.saveHash = function(project, packages, callback){
	if (!packages || !packages.length){
		if (callback) callback(null);
		return;
	}

	var packageString = typeof packages == 'string' ? packages : packages.join(';');
	var hash = md5.digest_s(packageString);

	function hashCount(db, cb){
		db.get('SELECT COUNT(*) AS count FROM hashes WHERE md5 = ?', {1: hash}, function(err, row){
			cb(err, row && {count: row.count, db: db, hash: hash});
		});
	}
	function insertIfNotExisting(res, cb){
		if (res.hash && res.count > 0){
			cb(null, {hash: hash, packages: packages});
		} else {
			var values = {1: hash, 2: packageString, 3: Math.round(Date.now() / 1000)};
			res.db.run('INSERT INTO hashes (md5, packages, date) VALUES (?, ?, ?)', values, function(error){
				if (error) cb(error);
				else cb(null, {hash: hash, packages: packages});
			});
		}
	}

	async.compose(
		insertIfNotExisting,
		hashCount,
		this.getDatabase.bind(this, project)
	)(callback);
};

module.exports = function(paths){
	var db = new BuilderDatabase(paths);
	return {
		load: db.loadHash.bind(db),
		save: db.saveHash.bind(db)
	};
};
