'use strict';

var fs = require('fs');

// dir: string - path to directory from script path
// files_: array - files array to add to, optional
// fileType: string - filter fileextension, defaults to no filter

function getFiles(dir, files_, fileType){
	files_ = files_ || [];
	var regex = fileType ? new RegExp('\\' + fileType + '$') : '';
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

module.exports = getFiles;
