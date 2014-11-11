var fs = require('fs');
var path = require('path');
var file = path.join(__dirname, 'more.db');
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var sampleData = require('./sampleData.json');

if (!exists){
	console.log('Creating DB file.');
	fs.openSync(file, 'w');
}

var db = new sqlite3.Database(file);
db.serialize(function(){

	if (!exists) db.run("CREATE TABLE hashes (md5, packages, date)");

	if (!exists) sampleData.forEach(function (sample) {
		var values = sample;
		db.run('INSERT INTO hashes (md5, packages, date) VALUES (?, ?, ?)', values, function(error){
			if (error) throw error;
		});
	});

	db.each("SELECT md5, packages, date FROM hashes", function(err, row){
		console.log(row.md5);
		console.log(row.packages);
		console.log(row.date);
		console.log('.....................');
	});
});

db.close();
